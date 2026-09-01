// src/components/study/quantitative-analysis/QuantitativeAnalysisTopicView.jsx

import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Layers,
  Menu,
  List,
  X,
  PanelRight,
  PanelRightClose,
  Eraser,
  Trash2,
  GripVertical,
  PenTool,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Download,
  FileText,
  Calculator,
  HelpCircle,
  Maximize2,
  Minimize2,
  Search,
  MessageSquare,
  ShieldCheck,
  Compass,
  Sigma,
  Binary
} from "lucide-react";

// Lazy-loaded auxiliary study tools (canvas, annotator, dictionary)
const MathSymbolDictionary = React.lazy(() => import("../../common/MathSymbolDictionary"));
const ScreenAnnotator = React.lazy(() => import("../../common/ScreenAnnotator"));
const StudyWhiteboard = React.lazy(() => import("../../common/StudyWhiteboard"));
const CNATMamChatbot = React.lazy(() => import("./common/CNATMamChatbot"));

// Cache for dynamically loaded topic components to prevent recreation on re-render
const topicComponentCache = new Map();
function getLazyTopicComponent(importFn) {
  if (!topicComponentCache.has(importFn)) {
    topicComponentCache.set(importFn, React.lazy(importFn));
  }
  return topicComponentCache.get(importFn);
}

// ------------------------------------------------------------------------
// DYNAMIC IMPORT FOR TOPIC FILES
// ------------------------------------------------------------------------
const localTopicModules = import.meta.glob("./topics/*/Topic*.jsx");

// ========================================================================
// OUTER WRAPPER
// ========================================================================
export default function StudyTopicView({
  roadmapData,
  subjectKey = roadmapData?.folder || "study",
  topicModules: externalTopicModules = localTopicModules,
  topicBasePath = "./topics",
}) {
  const { moduleSlug, topicIndex } = useParams();
  return (
    <TopicViewInner
      key={`${moduleSlug}-${topicIndex}`}
      moduleSlug={moduleSlug}
      topicIndex={topicIndex}
      roadmapData={roadmapData}
      subjectKey={subjectKey}
      topicModules={externalTopicModules}
      topicBasePath={topicBasePath}
    />
  );
}

// ========================================================================
// MAIN VIEW COMPONENT
// ========================================================================
function TopicViewInner({ moduleSlug, topicIndex, roadmapData, subjectKey, topicModules, topicBasePath }) {
  const index = Number.parseInt(topicIndex, 10) || 0;
  const activeTopicRef = useRef(null);

  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md text-center p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <HelpCircle size={44} className="text-amber-400 mx-auto mb-3" />
          <h1 className="text-xl font-bold">Study topic data unavailable</h1>
          <p className="text-sm text-slate-400 mt-2">
            No roadmap data was supplied to the master topic view.
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // 1. MODULE & SEGMENT LOOKUP
  // ----------------------------------------------------------------
  const { moduleData, segmentData, nextModuleOfSameSegment, prevModuleOfSameSegment } = useMemo(() => {
    let foundModule = null;
    let foundSegment = null;

    for (const segment of roadmapData.segments || []) {
      const found = segment.modules?.find((m) => m.slug === moduleSlug || m.moduleId === moduleSlug);
      if (found) {
        foundModule = found;
        foundSegment = segment;
        break;
      }
    }

    let nextModule = null;
    let prevModule = null;
    if (foundSegment?.modules && foundModule) {
      const currentIdx = foundSegment.modules.findIndex(
        (m) => m.slug === foundModule.slug || m.moduleId === foundModule.moduleId
      );
      if (currentIdx > 0) {
        prevModule = foundSegment.modules[currentIdx - 1];
      }
      if (currentIdx !== -1 && currentIdx < foundSegment.modules.length - 1) {
        nextModule = foundSegment.modules[currentIdx + 1];
      }
    }

    return {
      moduleData: foundModule,
      segmentData: foundSegment,
      nextModuleOfSameSegment: nextModule,
      prevModuleOfSameSegment: prevModule
    };
  }, [moduleSlug, roadmapData]);

  const topics = useMemo(() => {
    return Array.isArray(moduleData?.topics) ? moduleData.topics : [];
  }, [moduleData]);
  const totalTopics = topics.length;
  const topicTitle = topics[index];

  // ----------------------------------------------------------------
  // 2. UI & PANEL STATE
  // ----------------------------------------------------------------
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(() => {
    try {
      const stored = localStorage.getItem(`${subjectKey}-topic-sidebar-visible`);
      return stored !== null ? JSON.parse(stored) : true;
    } catch (e) {
      void e;
      return true;
    }
  });

  const [showRightSidebar, setShowRightSidebar] = useState(() => {
    try {
      const stored = localStorage.getItem(`${subjectKey}-topic-right-sidebar-visible`);
      return stored !== null ? JSON.parse(stored) : false;
    } catch (e) {
      void e;
      return false;
    }
  });

  const [activeRightTab, setActiveRightTab] = useState('canvas'); // 'canvas' | 'scratchpad' | 'cheatsheet' | 'math'
  const [focusMode, setFocusMode] = useState(false); // hides sidebars for reading focus
  const [drawAnywhere, setDrawAnywhere] = useState(false);
  const [showMathSymbols, setShowMathSymbols] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large'
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Notes scratchpad state
  const [scratchpadText, setScratchpadText] = useState(() => {
    try {
      return localStorage.getItem(`${subjectKey}-scratchpad-${moduleSlug}-${topicIndex}`) || "";
    } catch (e) {
      void e;
      return "";
    }
  });

  // Right sidebar resizing
  const [rightSidebarPercent, setRightSidebarPercent] = useState(0.45);
  const [containerWidth, setContainerWidth] = useState(0);
  const rowContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dividerRef = useRef(null);

  // ----------------------------------------------------------------
  // 3. PERSISTENCE & TOAST HELPERS
  // ----------------------------------------------------------------
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(`${subjectKey}-topic-sidebar-visible`, JSON.stringify(showSidebar));
    } catch (e) {
      void e;
    }
  }, [showSidebar]);

  useEffect(() => {
    try {
      localStorage.setItem(`${subjectKey}-topic-right-sidebar-visible`, JSON.stringify(showRightSidebar));
    } catch (e) {
      void e;
    }
  }, [showRightSidebar]);

  // Topic Completion Progress
  const progressKey = `${subjectKey}_module_progress_${moduleData?.moduleId || moduleSlug}`;
  const lastTopicKey = `${subjectKey}_module_lastTopic_${moduleData?.moduleId || moduleSlug}`;
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    if (!moduleData) return;
    try {
      const raw = localStorage.getItem(progressKey) || "[]";
      let parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) parsed = [];
      if (!parsed.includes(index)) {
        parsed.push(index);
        parsed.sort((a, b) => a - b);
        localStorage.setItem(progressKey, JSON.stringify(parsed));
      }
      setCompletedTopics(parsed);
      localStorage.setItem(lastTopicKey, String(index));

      // Record last visited module & segment
      const visitedData = {
        slug: moduleSlug,
        title: moduleData.title,
        moduleId: moduleData.moduleId || moduleSlug,
        segmentId: segmentData?.segmentId || "",
        segmentTitle: segmentData?.title || "",
        topicIndex: index,
        topicTitle: topicTitle || "",
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`${subjectKey}-last-visited-module`, JSON.stringify(visitedData));
    } catch (e) {
      void e;
    }

    // Check bookmark
    try {
      const bm = localStorage.getItem(`${subjectKey}-topic-bookmark-${moduleSlug}-${index}`) === "true";
      setIsBookmarked(bm);
    } catch (e) {
      void e;
    }
  }, [index, moduleSlug, moduleData, segmentData, topicTitle, subjectKey, progressKey, lastTopicKey]);

  // ----------------------------------------------------------------
  // AUTO-SCROLL ACTIVE TOPIC INTO VIEW IN SIDEBAR
  // ----------------------------------------------------------------
  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [index, showSidebar]);

  const isCurrentTopicDone = completedTopics.includes(index);
  const completedCount = completedTopics.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  const hasPrev = index > 0;
  const hasNext = index < totalTopics - 1;

  const toggleTopicCompletion = () => {
    setCompletedTopics((prev) => {
      let updated;
      if (prev.includes(index)) {
        updated = prev.filter((i) => i !== index);
        showToast("Marked topic incomplete.");
      } else {
        updated = [...prev, index].sort((a, b) => a - b);
        showToast("✅ Marked topic completed.");
      }
      try {
        localStorage.setItem(progressKey, JSON.stringify(updated));
      } catch (e) {
        void e;
      }
      return updated;
    });
  };

  const toggleBookmark = () => {
    const nextVal = !isBookmarked;
    setIsBookmarked(nextVal);
    try {
      localStorage.setItem(`${subjectKey}-topic-bookmark-${moduleSlug}-${index}`, String(nextVal));
    } catch (e) {
      void e;
    }
    showToast(nextVal ? "Topic bookmarked." : "Bookmark removed.");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast("Topic link copied to clipboard.");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleScratchpadChange = (val) => {
    setScratchpadText(val);
    try {
      localStorage.setItem(`${subjectKey}-scratchpad-${moduleSlug}-${topicIndex}`, val);
    } catch (e) {
      void e;
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === '[' && hasPrev) {
        window.location.href = `/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`;
      } else if (e.key === ']' && hasNext) {
        window.location.href = `/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`;
      } else if (e.key.toLowerCase() === 'f') {
        setFocusMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext, moduleSlug, index]);

  // ----------------------------------------------------------------
  // 4. RESIZABLE SPLIT PANEL
  // ----------------------------------------------------------------
  const leftSidebarWidth = showSidebar && !focusMode ? 310 : 0;
  const getRightSidebarWidth = useCallback(() => {
    if (!containerWidth) return 600;
    const available = containerWidth - leftSidebarWidth - 4;
    let width = available * rightSidebarPercent;
    width = Math.max(300, Math.min(900, width));
    return width;
  }, [containerWidth, leftSidebarWidth, rightSidebarPercent]);
  const rightSidebarWidth = getRightSidebarWidth();

  useEffect(() => {
    const container = rowContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(container);
    setContainerWidth(container.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  const startDrag = (e) => { e.preventDefault(); setIsDragging(true); };

  useEffect(() => {
    let rafId = null;
    const onMouseMove = (e) => {
      if (!isDragging) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const container = rowContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const newWidth = rect.right - e.clientX - 4;
        const available = rect.width - leftSidebarWidth - 4;
        if (available <= 0) return;
        let newPercent = newWidth / available;
        newPercent = Math.max(0.25, Math.min(0.75, newPercent));
        setRightSidebarPercent(newPercent);
        rafId = null;
      });
    };
    const onMouseUp = () => {
      setIsDragging(false);
      if (rafId) cancelAnimationFrame(rafId);
    };
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, leftSidebarWidth]);





  // ----------------------------------------------------------------
  // 6. MAIN CONTENT REF
  // ----------------------------------------------------------------
  const mainContentRef = useRef(null);

  // ----------------------------------------------------------------
  // 7. DYNAMIC TOPIC COMPONENT
  // ----------------------------------------------------------------

  const normalizePath = (value) =>
    String(value || "")
      .replace(/\\/g, "/")
      .replace(/^\.\/+/, "")
      .replace(/^(\.\.\/)+/, "")
      .replace(/\/+/g, "/")
      .replace(/\/$/, "");

  const normalizedBasePath = normalizePath(topicBasePath);

  const normalizedModuleSlug = decodeURIComponent(
    String(moduleSlug || "")
  ).trim().toLowerCase();

  const normalizedTopicIndex = Number.parseInt(topicIndex, 10) || 0;

  const topicFileName = `Topic${normalizedTopicIndex}.jsx`;

  const topicKey = Object.keys(topicModules || {}).find((key) => {
    const normalizedKey = normalizePath(key).toLowerCase();

    return (
      normalizedKey.endsWith(
        `${normalizedModuleSlug}/${topicFileName.toLowerCase()}`
      )
    );
  });

  const TopicPage = useMemo(() => {
    if (!topicKey || !topicModules || typeof topicModules[topicKey] !== 'function') {
      return null;
    }
    return getLazyTopicComponent(topicModules[topicKey]);
  }, [topicKey, topicModules]);

  // ----------------------------------------------------------------
  // MODULE NOT FOUND CHECK
  // ----------------------------------------------------------------
  if (!moduleData || !topicTitle) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md text-center p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <HelpCircle size={44} className="text-amber-400 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-slate-100">Topic Not Found</h1>
          <p className="text-sm text-slate-400 mt-2 mb-6">
            The topic index {topicIndex} could not be located in module "{moduleSlug}".
          </p>
          <Link
            to={`/${roadmapData.folder}/module/${moduleSlug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition"
          >
            <ArrowLeft size={16} /> Back to Module
          </Link>
        </div>
      </div>
    );
  }

  // Filtered topics for left sidebar search
  const filteredSidebarTopics = topics
    .map((t, i) => ({ title: t, idx: i }))
    .filter(({ title }) =>
      sidebarSearch.trim() === "" || title.toLowerCase().includes(sidebarSearch.toLowerCase().trim())
    );

  const teacher = roadmapData.teacher || {
    name: "Sukanta Hui",
    social: { whatsapp: "+917003756860" }
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden select-text selection:bg-slate-800 selection:text-slate-200">

      {/* ========================================================== */}
      {/* Toast Notification */}
      {/* ========================================================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 shadow-2xl backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================== */}
      {/* TOP HEADER (ULTRA COMPACT SINGLE ROW) */}
      {/* ========================================================== */}
      {!focusMode && (
        <header className="sticky top-14 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md flex-shrink-0">
          <div className="w-full px-2.5 sm:px-4 py-1.5 flex items-center justify-between gap-2 overflow-x-auto custom-scrollbar">

            {/* Left: Navigation & Context Breadcrumbs */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to={`/${roadmapData.folder}/module/${moduleSlug}`}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
              >
                <ArrowLeft size={13} />
                <span className="hidden sm:inline">Overview</span>
              </Link>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-xs text-slate-400 min-w-0 max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg truncate">
                <Layers size={13} className="text-sky-400 shrink-0" />
                <span className="truncate font-semibold text-slate-200">
                  {moduleData.title}
                </span>
              </div>

              {nextModuleOfSameSegment && (
                <Link
                  to={`/${roadmapData.folder}/topic/${nextModuleOfSameSegment.slug}/0`}
                  className="hidden md:inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 px-2 py-1 text-[11px] font-semibold text-indigo-300 hover:text-white transition shadow-sm shrink-0"
                  title={`Next Module in ${segmentData?.title || 'Segment'}: ${nextModuleOfSameSegment.title}`}
                >
                  <span>Next Module</span>
                  <ArrowRight size={11} />
                </Link>
              )}
            </div>

            {/* Right: Controls, Tools & Prev/Next */}
            <div className="flex items-center gap-1.5 shrink-0">

              {/* Progress counter */}
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <BookOpen size={13} className="text-sky-400" />
                <span className="font-semibold">{index + 1}/{totalTopics}</span>
                <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="font-bold text-slate-200">{progressPercent}%</span>
              </div>

              {/* Sidebar toggle buttons */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition flex items-center gap-1 ${showSidebar
                    ? "bg-slate-800 border-slate-700 text-slate-100"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                title="Toggle topics sidebar"
              >
                <List size={13} />
                <span className="hidden md:inline">{showSidebar ? "Hide Topics" : "Topics"}</span>
              </button>

              <button
                onClick={() => setShowRightSidebar(!showRightSidebar)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition flex items-center gap-1 ${showRightSidebar
                    ? "bg-slate-800 border-slate-700 text-slate-100"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                title="Toggle study workspace & whiteboard"
              >
                {showRightSidebar ? <PanelRightClose size={13} /> : <PanelRight size={13} />}
                <span className="hidden md:inline">{showRightSidebar ? "Close Workspace" : "Workspace"}</span>
              </button>

              {/* Draw anywhere button */}
              <button
                onClick={() => setDrawAnywhere(!drawAnywhere)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition flex items-center gap-1 ${drawAnywhere
                    ? "bg-rose-950/80 border-rose-700 text-rose-300"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                title="Annotate directly on screen"
              >
                <PenTool size={13} className={drawAnywhere ? "text-rose-400" : "text-slate-400"} />
                <span className="hidden md:inline">{drawAnywhere ? "Stop" : "Annotate"}</span>
              </button>

              {/* Math Symbol Dictionary button */}
              <button
                onClick={() => setShowMathSymbols(true)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition flex items-center gap-1 bg-purple-950/40 border-purple-800/80 text-purple-300 hover:bg-purple-900/60 hover:text-white hover:border-purple-600 shadow-sm"
                title="Open Mathematical Symbols & Pronunciation Dictionary"
              >
                <Sigma size={13} className="text-purple-400" />
                <span className="hidden xl:inline">Math</span>
              </button>

              {/* Focus mode button */}
              <button
                onClick={() => setFocusMode(!focusMode)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
                title="Focus Mode (Hide sidebars & clutter)"
              >
                {focusMode ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>

              {/* Font size toggle */}
              <button
                onClick={() => setFontSize((f) => (f === 'normal' ? 'large' : 'normal'))}
                className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold font-mono transition"
                title={`Font Size: ${fontSize === 'normal' ? 'Normal' : 'Large'}`}
              >
                {fontSize === 'normal' ? 'A+' : 'A-'}
              </button>

              {/* Bookmark & Link */}
              <button
                onClick={toggleBookmark}
                className={`p-1.5 rounded-lg border transition ${isBookmarked
                    ? "bg-slate-800 border-slate-700 text-amber-400"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                title={isBookmarked ? "Remove bookmark" : "Bookmark topic"}
              >
                {isBookmarked ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
              </button>

              <button
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
                title="Copy topic link"
              >
                {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>

              {/* Mark as Completed Button */}
              <button
                onClick={toggleTopicCompletion}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${isCurrentTopicDone
                    ? "bg-emerald-950/80 border-emerald-700 text-emerald-300"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                title={isCurrentTopicDone ? "Topic completed" : "Mark as completed"}
              >
                {isCurrentTopicDone ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Circle size={13} />}
                <span>{isCurrentTopicDone ? "Done" : "Mark Done"}</span>
              </button>

              {/* Prev / Next Topic Buttons */}
              <div className="flex items-center gap-1 pl-1.5 border-l border-slate-800">
                {hasPrev ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1 transition"
                    title="Previous Topic (Shortcut: [ )"
                  >
                    <ArrowLeft size={13} />
                    <span className="hidden sm:inline">Prev</span>
                  </Link>
                ) : (
                  <button disabled className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-600 border border-slate-900 text-xs cursor-not-allowed flex items-center gap-1">
                    <ArrowLeft size={13} />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                )}

                {hasNext ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold flex items-center gap-1 transition"
                    title="Next Topic (Shortcut: ] )"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight size={13} />
                  </Link>
                ) : (
                  <button disabled className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-600 border border-slate-900 text-xs cursor-not-allowed flex items-center gap-1">
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 sm:hidden"
              >
                <Menu size={14} />
              </button>

            </div>

          </div>
        </header>
      )}

      {/* Floating Exit Focus Mode Button if Focus Mode active */}
      {focusMode && (
        <button
          onClick={() => setFocusMode(false)}
          className="fixed top-3 right-3 z-50 px-3 py-1.5 rounded-lg bg-slate-900/95 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white backdrop-blur shadow-2xl flex items-center gap-1.5 transition"
        >
          <Minimize2 size={13} /> Exit Focus Mode
        </button>
      )}

      {/* ========================================================== */}
      {/* MAIN LAYOUT (Left Index + Reader + Right Workspace) */}
      {/* ========================================================== */}
      <div className="relative z-20 flex-1 flex justify-center min-h-0">
        <div ref={rowContainerRef} className="w-full flex min-h-[calc(100vh-48px)]">

          {/* ============================================================== */}
          {/* LEFT TOPIC NAVIGATION SIDEBAR (Desktop - Static / Fixed) */}
          {/* ============================================================== */}
          {showSidebar && !focusMode && (
            <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-950/95 backdrop-blur-md pt-3 pb-4 px-3 fixed top-24 left-0 bottom-0 z-20 overflow-hidden shadow-lg">

              {/* Module Info & Progress Bar */}
              <div className="mb-2.5 rounded-lg border border-slate-800 bg-slate-900/80 p-2.5 text-xs">
                <div className="flex items-center justify-between mb-1.5 text-slate-400">
                  <span className="font-bold uppercase tracking-wider text-[10px]">Module Progress</span>
                  <span className="font-bold text-slate-100 text-[11px]">{completedCount}/{totalTopics} ({progressPercent}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-1.5">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{moduleData.estimatedHours} hrs</span>
                  <span>{moduleData.difficulty || "Standard"}</span>
                </div>
              </div>

              {/* Search topics inside module */}
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter topics..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs focus:outline-none focus:border-slate-700"
                />
                {sidebarSearch && (
                  <button
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Topics List Scrollable Area */}
              <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-xs custom-scrollbar">
                {filteredSidebarTopics.map(({ title, idx }) => {
                  const isActive = idx === index;
                  const isDone = completedTopics.includes(idx);

                  return (
                    <Link
                      key={idx}
                      ref={isActive ? activeTopicRef : null}
                      to={`/${roadmapData.folder}/topic/${moduleSlug}/${idx}`}
                      className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all text-xs leading-normal ${
                        isActive
                          ? "border-slate-700 bg-slate-800 text-white font-bold shadow-sm"
                          : isDone
                          ? "border-transparent bg-slate-950/40 text-slate-300 hover:bg-slate-900/70 hover:text-white"
                          : "border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      ) : (
                        <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${isActive ? "border-sky-400" : "border-slate-600"}`} />
                      )}

                      <span className="truncate">
                        <span className="text-slate-500 font-mono mr-1 text-[11px] font-semibold">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                        </span>
                        {title}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Quick Links */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1 text-xs">
                {nextModuleOfSameSegment && (
                  <Link
                    to={`/${roadmapData.folder}/topic/${nextModuleOfSameSegment.slug}/0`}
                    className="block px-2.5 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400 text-indigo-200 hover:text-white font-semibold transition text-[11px] shadow-sm"
                    title={`Next module in ${segmentData?.title || 'Segment'}: ${nextModuleOfSameSegment.title}`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                      <span>Next Module</span>
                      <ArrowRight size={11} />
                    </div>
                    <div className="truncate text-slate-200 font-medium mt-0.5">{nextModuleOfSameSegment.title}</div>
                  </Link>
                )}
                <Link
                  to={`/${roadmapData.folder}/module/${moduleSlug}`}
                  className="block px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium transition text-[11px]"
                >
                  ← Module Overview
                </Link>
                <Link
                  to={`/${roadmapData.folder}/roadmap`}
                  className="block px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium transition text-[11px]"
                >
                  📍 Course Roadmap
                </Link>
              </div>

            </aside>
          )}

          {/* ============================================================== */}
          {/* MOBILE SIDEBAR DRAWER */}
          {/* ============================================================== */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 p-4 flex flex-col lg:hidden">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-sky-400" />
                    <span className="text-xs font-bold text-slate-200 truncate max-w-[180px]">{moduleData.title}</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 text-xs">
                  {topics.map((t, i) => {
                    const isActive = i === index;
                    const isDone = completedTopics.includes(i);
                    return (
                      <Link
                        key={i}
                        to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs ${isActive
                            ? "bg-slate-800 text-white font-bold"
                            : isDone
                              ? "text-slate-400"
                              : "text-slate-300 hover:bg-slate-900"
                          }`}
                      >
                        {isDone ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Circle size={13} />}
                        <span className="truncate">{i + 1}. {t}</span>
                      </Link>
                    );
                  })}
                </div>
              </aside>
            </>
          )}

          {/* ============================================================== */}
          {/* MAIN TOPIC CONTENT READER (MAXIMUM VIEWABLE AREA) */}
          {/* ============================================================== */}
          <main
            ref={mainContentRef}
            className="flex-1 px-2 sm:px-4 lg:px-6 py-4 min-w-0 transition-all duration-150 relative"
            style={{
              marginLeft: showSidebar && !focusMode ? "16rem" : "0px",
              marginRight: showRightSidebar && !focusMode ? `${rightSidebarWidth}px` : "0px",
            }}
          >
            <div className="w-full space-y-4">

              {/* Dynamic Topic Content Page */}
              <div className={`w-full ${fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base'}`}>
                <Suspense fallback={
                  <div className="py-14 text-center text-slate-400 space-y-3">
                    <div className="w-8 h-8 border-2 border-slate-700 border-t-sky-400 rounded-full animate-spin mx-auto" />
                    <p className="text-sm">Loading topic formulation & calculations…</p>
                  </div>
                }>
                  {TopicPage ? (
                    <TopicPage key={topicKey} />
                  ) : (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-slate-300 text-base py-10 text-center space-y-4">
                      <FileText size={42} className="text-slate-600 mx-auto" />
                      <h3 className="text-lg font-bold text-slate-200">Topic Component In Development</h3>
                      <p className="text-sm text-slate-400 max-w-md mx-auto">
                        The content for "{topicTitle}" is being compiled for the curriculum.
                      </p>
                      <pre className="text-slate-400 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-lg mx-auto overflow-x-auto text-left">
                        {`src/components/study/${roadmapData.folder}/topics/${moduleSlug}/Topic${topicIndex}.jsx`}
                      </pre>
                    </div>
                  )}
                </Suspense>
              </div>

              {/* WhatsApp Question & Doubt Clearance Widget */}
              <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-slate-100">
                  <MessageSquare size={18} className="text-emerald-400" />
                  <h3 className="text-base font-bold">Have a Question About This Topic?</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Ask your calculation, formulation, or theorem doubt directly to instructor {teacher.name}.
                </p>
                <textarea
                  id="qaTopicDoubt"
                  placeholder="Type your question or problem statement here..."
                  className="w-full bg-slate-950 text-slate-200 p-3.5 rounded-xl border border-slate-800 text-xs sm:text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-600"
                  rows={2}
                />
                <button
                  onClick={() => {
                    const el = document.getElementById("qaTopicDoubt");
                    const queryText = el ? el.value.trim() : "";
                    if (!queryText) {
                      showToast("Please type your question first.");
                      return;
                    }
                    const cleanPhone = (teacher.social?.whatsapp || "+917003756860").replace(/\D/g, "");
                    const message = encodeURIComponent(
                      `Hello Sir,\nI have a question on Quantitative Analysis:\n\n• Module: ${moduleData.title}\n• Topic ${index + 1}: ${topicTitle}\n\nMy Question:\n${queryText}`
                    );
                    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-100 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold transition shadow-sm"
                >
                  <MessageSquare size={15} className="text-emerald-400" />
                  <span>Send Query via WhatsApp</span>
                </button>
              </section>

              {/* Next Module of Same Segment Banner */}
              {nextModuleOfSameSegment && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 shadow-md">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                      <Layers size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">
                        {segmentData?.title ? `Same Segment: ${segmentData.title}` : "Next Module in Same Segment"}
                      </div>
                      <div className="text-sm font-bold text-slate-100 truncate">
                        {nextModuleOfSameSegment.title}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/${roadmapData.folder}/topic/${nextModuleOfSameSegment.slug}/0`}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                  >
                    <span>Go to Next Module</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              {/* Bottom Topic Navigation */}
              <nav className="flex items-center justify-between gap-4 pt-2 pb-10">
                {hasPrev ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`}
                    className="flex-1 p-3 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition flex items-center gap-3"
                  >
                    <ArrowLeft size={16} className="text-slate-500 shrink-0" />
                    <div className="truncate">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Previous Topic</div>
                      <div className="truncate text-slate-200 font-semibold">{topics[index - 1]}</div>
                    </div>
                  </Link>
                ) : <div className="flex-1" />}

                {hasNext ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`}
                    className="flex-1 p-3 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition flex items-center justify-between text-right gap-3"
                  >
                    <div className="truncate flex-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Next Topic</div>
                      <div className="truncate text-white font-bold">{topics[index + 1]}</div>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 shrink-0" />
                  </Link>
                ) : nextModuleOfSameSegment ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${nextModuleOfSameSegment.slug}/0`}
                    className="flex-1 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 via-indigo-900/40 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 text-xs sm:text-sm font-semibold text-white transition flex items-center justify-between text-right gap-3 shadow-lg group"
                  >
                    <div className="truncate flex-1">
                      <div className="text-[10px] text-indigo-300 uppercase font-bold flex items-center justify-end gap-1">
                        <span>Next Module in Segment</span>
                        <Sparkles size={11} className="text-amber-400" />
                      </div>
                      <div className="truncate text-white font-bold">{nextModuleOfSameSegment.title}</div>
                    </div>
                    <ArrowRight size={16} className="text-sky-300 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                ) : <div className="flex-1" />}
              </nav>

            </div>

            {/* PROFESSIONAL DRAW ANYWHERE CANVAS OVERLAY */}
            {drawAnywhere && (
              <Suspense fallback={null}>
                <ScreenAnnotator
                  containerRef={mainContentRef}
                  storageKey={`${subjectKey}-drawanywhere-${moduleSlug}-${topicIndex}`}
                  onClose={() => setDrawAnywhere(false)}
                  showToast={showToast}
                />
              </Suspense>
            )}
          </main>

          {/* ============================================================== */}
          {/* DRAGGABLE SPLIT RESIZE HANDLE */}
          {/* ============================================================== */}
          {showRightSidebar && !focusMode && (
            <div
              ref={dividerRef}
              className="hidden lg:flex flex-shrink-0 w-2.5 bg-slate-850 hover:bg-slate-700 cursor-col-resize fixed top-24 bottom-0 z-25 items-center justify-center transition-colors"
              style={{
                right: `${rightSidebarWidth - 2}px`,
              }}
              onMouseDown={startDrag}
            >
              <div className="p-0.5 rounded bg-slate-800 border border-slate-700 text-slate-500 group-hover:text-slate-300">
                <GripVertical size={16} />
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* RIGHT STUDY WORKSPACE (Whiteboard, TLDraw, Notes, Formulas) */}
          {/* ============================================================== */}
          {showRightSidebar && !focusMode && (
            <aside
              className="hidden lg:flex flex-col border-l border-slate-800 bg-slate-950/95 backdrop-blur-md pt-4 pb-6 px-4 fixed top-24 right-0 bottom-0 z-20 overflow-hidden shadow-lg"
              style={{
                width: `${rightSidebarWidth}px`,
                transition: isDragging ? 'none' : 'width 0.15s ease',
              }}
            >
              <div className="flex flex-col h-full">

                {/* Workspace Header Tabs */}
                <div className="flex items-center justify-between gap-1 pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setActiveRightTab('canvas')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeRightTab === 'canvas'
                          ? "bg-slate-800 text-slate-100 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                        }`}
                    >
                      Whiteboard
                    </button>

                    <button
                      onClick={() => setActiveRightTab('scratchpad')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeRightTab === 'scratchpad'
                          ? "bg-slate-800 text-slate-100 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                        }`}
                    >
                      Notes
                    </button>

                    <button
                      onClick={() => setActiveRightTab('cheatsheet')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeRightTab === 'cheatsheet'
                          ? "bg-slate-800 text-slate-100 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                        }`}
                    >
                      Formulas
                    </button>

                    <button
                      onClick={() => setActiveRightTab('math')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeRightTab === 'math'
                          ? "bg-purple-900/80 text-purple-200 border border-purple-700 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                        }`}
                    >
                      Symbols
                    </button>
                  </div>

                  <button
                    onClick={() => setShowRightSidebar(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                    title="Close workspace"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* TAB 1: CANVAS WHITEBOARD */}
                {activeRightTab === 'canvas' && (
                  <Suspense fallback={
                    <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mr-3" />
                      Loading Whiteboard Canvas...
                    </div>
                  }>
                    <StudyWhiteboard
                      storageKey={`${subjectKey}-whiteboard-${moduleSlug}-${topicIndex}`}
                      topicTitle={topicTitle}
                      showToast={showToast}
                    />
                  </Suspense>
                )}

                {/* TAB 2: NOTES & SCRATCHPAD */}
                {activeRightTab === 'scratchpad' && (
                  <div className="flex-1 flex flex-col min-h-0 space-y-2.5">
                    <div className="flex items-center justify-between text-sm text-slate-400 font-medium">
                      <span>Auto-saved Topic Notes</span>
                      <button
                        onClick={() => {
                          const blob = new Blob([scratchpadText], { type: "text/plain" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `notes-${moduleSlug}-topic-${topicIndex}.txt`;
                          a.click();
                          showToast("Notes downloaded.");
                        }}
                        className="p-1.5 text-slate-400 hover:text-white"
                        title="Download notes"
                      >
                        <Download size={15} />
                      </button>
                    </div>
                    <textarea
                      value={scratchpadText}
                      onChange={(e) => handleScratchpadChange(e.target.value)}
                      placeholder="Write your calculations, scratch notes, formulas here..."
                      className="flex-1 w-full bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-800 text-sm font-mono placeholder:text-slate-600 focus:outline-none focus:border-slate-700 resize-none leading-relaxed"
                    />
                  </div>
                )}

                {/* TAB 4: FORMULAS CHEAT SHEET */}
                {activeRightTab === 'cheatsheet' && (
                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-sm custom-scrollbar leading-relaxed">

                    {/* Linear Programming Reference */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-slate-100 text-sm sm:text-base">
                        <Sigma size={16} className="text-sky-400" />
                        <span>Linear Programming Essentials</span>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Standard Form: Max/Min Z = Σ c_j x_j subject to Σ a_ij x_j = b_i, x_j ≥ 0.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Constraints: For ≤ constraints, add slack variable s ≥ 0. For ≥ constraints, subtract surplus s ≥ 0 and add artificial variable A ≥ 0.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Big-M Method: Penalty (+M) in minimization, (-M) in maximization for artificial variables.
                      </p>
                    </div>

                    {/* Transportation Reference */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-slate-100 text-sm sm:text-base">
                        <Calculator size={16} className="text-teal-400" />
                        <span>Transportation Problems</span>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Balanced Condition: Total Supply = Total Demand. If unbalanced, add dummy row or column.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Initial BFS: North-West Corner Rule (NWCR), Matrix Minima (Least Cost), Vogel's Approximation Method (VAM).
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • MODI Optimality: u_i + v_j = c_ij for allocated cells; Opportunity cost d_ij = c_ij - (u_i + v_j) for unallocated cells.
                      </p>
                    </div>

                    {/* Assignment & Hungarian */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-slate-100 text-sm sm:text-base">
                        <Binary size={16} className="text-amber-400" />
                        <span>Assignment Problem (Hungarian)</span>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Step 1: Row reduction (subtract minimum element of each row).
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Step 2: Column reduction (subtract minimum element of each column).
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Step 3: Draw minimum lines N to cover all zeros. If N = n, optimal assignment is reached.
                      </p>
                    </div>

                    {/* CPM & PERT */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-slate-100 text-sm sm:text-base">
                        <Compass size={16} className="text-indigo-400" />
                        <span>CPM & PERT Calculations</span>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Forward Pass: ES_j = max(EF_i), EF = ES + t.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Backward Pass: LF_i = min(LS_j), LS = LF - t.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Expected Time (PERT): t_e = (a + 4m + b) / 6, Variance σ² = ((b - a) / 6)².
                      </p>
                    </div>

                    {/* Game Theory */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-slate-100 text-sm sm:text-base">
                        <ShieldCheck size={16} className="text-rose-400" />
                        <span>Game Theory Principles</span>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Saddle Point: Maximin = Minimax.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • Dominance: Row A dominates B if every payoff in A ≥ B. Column A dominates B if every payoff in A ≤ B.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm">
                        • 2x2 Mixed Strategy: p1 = (a22 - a21) / [(a11 + a22) - (a12 + a21)].
                      </p>
                    </div>

                  </div>
                )}

                {/* TAB 5: MATH SYMBOL & PRONUNCIATION DICTIONARY */}
                {activeRightTab === 'math' && (
                  <div className="flex-1 overflow-y-auto pr-1">
                    <Suspense fallback={
                      <div className="p-4 text-center text-slate-400 text-sm">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400 mx-auto mb-2" />
                        Loading Math Symbols Dictionary...
                      </div>
                    }>
                      <MathSymbolDictionary className="p-3 sm:p-4 rounded-xl border border-slate-800 bg-slate-900/90 shadow-none" />
                    </Suspense>
                  </div>
                )}

              </div>
            </aside>
          )}

        </div>
      </div>



      {/* ============================================================== */}
      {/* GLOBAL MATH SYMBOLS & PRONUNCIATION MODAL DIALOG */}
      {/* ============================================================== */}
      {showMathSymbols && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-purple-500/50 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-slate-900 z-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔣</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Mathematical Symbol &amp; Pronunciation Dictionary</h3>
                  <p className="text-xs text-slate-400">Available across all course modules &amp; topics</p>
                </div>
              </div>
              <button
                onClick={() => setShowMathSymbols(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <Suspense fallback={
              <div className="py-12 text-center text-slate-400 text-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-3" />
                Loading Mathematical Dictionary...
              </div>
            }>
              <MathSymbolDictionary />
            </Suspense>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CNAT MAM AI CHATBOT STUDENT ASSISTANT */}
      {/* ========================================================================= */}
      <Suspense fallback={null}>
        <CNATMamChatbot
          topicTitle={topicTitle || "Study Topic"}
          moduleSlug={moduleSlug}
          subjectKey={subjectKey}
        />
      </Suspense>

    </div>
  );
}