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

import MathSymbolDictionary from "../../common/MathSymbolDictionary";
import ScreenAnnotator from "../../common/ScreenAnnotator";
import StudyWhiteboard from "../../common/StudyWhiteboard";

// Import tldraw
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

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
// SMOOTHING UTILITY – Adaptive Catmull‑Rom spline
// ========================================================================
function catmullRomSpline(points, baseSegments = 40) {
  if (!points || points.length < 2) return points || [];
  const result = [];
  const pts = [points[0], ...points, points[points.length - 1]];
  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const segments = Math.min(60, Math.max(baseSegments, Math.ceil(dist / 1.5)));
    for (let t = 0; t < 1; t += 1 / segments) {
      const t2 = t * t;
      const t3 = t2 * t;
      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      );
      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      );
      result.push({ x, y });
    }
  }
  result.push(points[points.length - 1]);
  return result;
}

// ========================================================================
// TL DRAW WRAPPER
// ========================================================================
function TldrawWrapper({ onEditorReady, subjectKey }) {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    if (editor && onEditorReady) onEditorReady(editor);
  }, [editor, onEditorReady]);
  return (
    <div className="flex-1 relative bg-white">
      <Tldraw
        defaultStyles={{ size: 'xs', color: '#0284c7' }}
        onMount={(e) => setEditor(e)}
        autoFocus
        persistenceKey={`${subjectKey}-tldraw-storage`}
      />
    </div>
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
  const { moduleData, segmentData } = useMemo(() => {
    let foundModule = null;
    let foundSegment = null;

    for (const segment of roadmapData.segments) {
      const found = segment.modules.find((m) => m.slug === moduleSlug);
      if (found) {
        foundModule = found;
        foundSegment = segment;
        break;
      }
    }
    return { moduleData: foundModule, segmentData: foundSegment };
  }, [moduleSlug]);

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

  const [activeRightTab, setActiveRightTab] = useState('canvas'); // 'canvas' | 'tldraw' | 'scratchpad' | 'cheatsheet' | 'math'
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

  // tldraw editor ref
  const tldrawEditorRef = useRef(null);
  const [selectedShortcut, setSelectedShortcut] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState('');

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
  }, [index, moduleSlug, moduleData, progressKey, lastTopicKey]);

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



  // TLDraw Shortcuts helper
  const handleShortcutClick = (key, toolName) => {
    setSelectedShortcut(toolName);
    setCopyFeedback(`Tool: ${toolName}`);
    setTimeout(() => setCopyFeedback(''), 1500);
    if (tldrawEditorRef.current) {
      try {
        const toolMap = {
          'draw': 'draw', 'eraser': 'erase', 'rectangle': 'rect',
          'circle': 'ellipse', 'line': 'line', 'text': 'text', 'select': 'select'
        };
        const toolId = toolMap[toolName] || 'select';
        tldrawEditorRef.current.setCurrentTool(toolId);
      } catch (e) {
        console.warn('Failed to switch tool:', e);
      }
    }
  };

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

  const TopicPage = topicKey
    ? React.lazy(topicModules[topicKey])
    : null;

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden select-text selection:bg-slate-800 selection:text-slate-200">

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
      {/* TOP HEADER */}
      {/* ========================================================== */}
      {!focusMode && (
        <header className="relative z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">

            {/* Left: Navigation & Context Breadcrumbs */}
            <div className="flex items-center gap-3">
              <Link
                to={`/${roadmapData.folder}/module/${moduleSlug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
              >
                <ArrowLeft size={15} />
                <span className="hidden sm:inline">Module Overview</span>
              </Link>

              <div className="h-5 w-px bg-slate-800 hidden sm:block" />

              <div className="flex flex-col leading-tight min-w-0">
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-slate-500">
                  <Layers size={13} className="text-sky-400" />
                  <span className="truncate">{segmentData?.title?.split("–")[0]?.trim() || "Segment"}</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-slate-200 truncate max-w-[220px] sm:max-w-xs md:max-w-md">
                  {moduleData.title}
                </span>
              </div>
            </div>

            {/* Right: Controls, Tools & Prev/Next */}
            <div className="flex items-center gap-2 flex-wrap">

              {/* Progress counter */}
              <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
                <BookOpen size={15} className="text-sky-400" />
                <span className="font-semibold">{index + 1} / {totalTopics}</span>
                <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="font-bold text-slate-200">{progressPercent}%</span>
              </div>

              {/* Sidebar toggle buttons */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold border transition flex items-center gap-1.5 ${showSidebar
                    ? "bg-slate-800 border-slate-700 text-slate-100"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                title="Toggle topics sidebar"
              >
                <List size={16} />
                <span className="hidden md:inline">{showSidebar ? "Hide Topics" : "Topic Index"}</span>
              </button>

              <button
                onClick={() => setShowRightSidebar(!showRightSidebar)}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold border transition flex items-center gap-1.5 ${showRightSidebar
                    ? "bg-slate-800 border-slate-700 text-slate-100"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                title="Toggle study workspace & whiteboard"
              >
                {showRightSidebar ? <PanelRightClose size={16} /> : <PanelRight size={16} />}
                <span className="hidden md:inline">{showRightSidebar ? "Close Workspace" : "Workspace"}</span>
              </button>

              {/* Draw anywhere button */}
              <button
                onClick={() => setDrawAnywhere(!drawAnywhere)}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold border transition flex items-center gap-1.5 ${drawAnywhere
                    ? "bg-rose-950/80 border-rose-700 text-rose-300"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                title="Annotate directly on screen"
              >
                <PenTool size={16} className={drawAnywhere ? "text-rose-400" : "text-slate-400"} />
                <span className="hidden md:inline">{drawAnywhere ? "Stop Annotating" : "Annotate"}</span>
              </button>

              {/* Math Symbol Dictionary button */}
              <button
                onClick={() => setShowMathSymbols(true)}
                className="px-3 py-1.5 rounded-xl text-sm font-semibold border transition flex items-center gap-1.5 bg-purple-950/40 border-purple-800/80 text-purple-300 hover:bg-purple-900/60 hover:text-white hover:border-purple-600 shadow-sm"
                title="Open Mathematical Symbols & Pronunciation Dictionary"
              >
                <Sigma size={16} className="text-purple-400" />
                <span className="hidden xl:inline">Math Symbols</span>
              </button>

              {/* Focus mode button */}
              <button
                onClick={() => setFocusMode(!focusMode)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
                title="Focus Mode (Hide sidebars & clutter)"
              >
                {focusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              {/* Font size toggle */}
              <button
                onClick={() => setFontSize((f) => (f === 'normal' ? 'large' : 'normal'))}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-sm font-bold font-mono transition"
                title={`Font Size: ${fontSize === 'normal' ? 'Normal (Click for Large)' : 'Large (Click for Normal)'}`}
              >
                {fontSize === 'normal' ? 'A+' : 'A-'}
              </button>

              {/* Bookmark & Link */}
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-xl border transition ${isBookmarked
                    ? "bg-slate-800 border-slate-700 text-amber-400"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                title={isBookmarked ? "Remove bookmark" : "Bookmark topic"}
              >
                {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </button>

              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
                title="Copy topic link"
              >
                {copiedLink ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>

              {/* Prev / Next Topic Buttons */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                {hasPrev ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-sm font-semibold flex items-center gap-1 transition"
                    title="Previous Topic (Shortcut: [ )"
                  >
                    <ArrowLeft size={15} />
                    <span className="hidden sm:inline">Prev</span>
                  </Link>
                ) : (
                  <button disabled className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-600 border border-slate-900 text-sm cursor-not-allowed flex items-center gap-1">
                    <ArrowLeft size={15} />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                )}

                {hasNext ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-sm font-bold flex items-center gap-1 transition"
                    title="Next Topic (Shortcut: ] )"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <button disabled className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-600 border border-slate-900 text-sm cursor-not-allowed flex items-center gap-1">
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 sm:hidden"
              >
                <Menu size={16} />
              </button>

            </div>

          </div>
        </header>
      )}

      {/* Floating Exit Focus Mode Button if Focus Mode active */}
      {focusMode && (
        <button
          onClick={() => setFocusMode(false)}
          className="fixed top-5 right-5 z-50 px-4 py-2 rounded-xl bg-slate-900/95 border border-slate-700 text-sm font-semibold text-slate-200 hover:text-white backdrop-blur shadow-2xl flex items-center gap-2 transition"
        >
          <Minimize2 size={16} /> Exit Focus Mode
        </button>
      )}

      {/* ========================================================== */}
      {/* MAIN LAYOUT (Left Index + Reader + Right Workspace) */}
      {/* ========================================================== */}
      <div className="relative z-20 flex-1 flex justify-center min-h-0">
        <div ref={rowContainerRef} className="w-full flex min-h-[calc(100vh-60px)]">

          {/* ============================================================== */}
          {/* LEFT TOPIC NAVIGATION SIDEBAR (Desktop) */}
          {/* ============================================================== */}
          {showSidebar && !focusMode && (
            <aside className="hidden lg:flex flex-col w-80 shrink-0 border-r border-slate-800 bg-slate-950/80 backdrop-blur-md pt-5 pb-6 px-4 h-full overflow-hidden">

              {/* Module Info & Progress Bar */}
              <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 text-sm">
                <div className="flex items-center justify-between mb-2 text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider">Module Progress</span>
                  <span className="font-bold text-slate-100">{completedCount}/{totalTopics} ({progressPercent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2.5">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{moduleData.estimatedHours} hrs course</span>
                  <span>{moduleData.difficulty || "Standard"}</span>
                </div>
              </div>

              {/* Search topics inside module */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter module topics..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-sm focus:outline-none focus:border-slate-700"
                />
                {sidebarSearch && (
                  <button
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Topics List Scrollable Area */}
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-sm custom-scrollbar">
                {filteredSidebarTopics.map(({ title, idx }) => {
                  const isActive = idx === index;
                  const isDone = completedTopics.includes(idx);

                  return (
                    <Link
                      key={idx}
                      ref={isActive ? activeTopicRef : null}
                      to={`/${roadmapData.folder}/topic/${moduleSlug}/${idx}`}
                      className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all text-sm leading-normal ${isActive
                          ? "border-slate-700 bg-slate-800/90 text-white font-bold shadow-md"
                          : isDone
                            ? "border-slate-850 bg-slate-900/40 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                            : "border-transparent text-slate-300 hover:bg-slate-900/80 hover:border-slate-800"
                        }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      ) : (
                        <span className={`w-4 h-4 rounded-full border shrink-0 ${isActive ? "border-sky-400" : "border-slate-600"}`} />
                      )}

                      <span className="truncate">
                        <span className="text-slate-500 font-mono mr-1.5 text-xs font-semibold">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                        </span>
                        {title}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Quick Links */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs sm:text-sm">
                <Link
                  to={`/${roadmapData.folder}/module/${moduleSlug}`}
                  className="block px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium transition"
                >
                  ← Back to Module Overview
                </Link>
                <Link
                  to={`/${roadmapData.folder}/roadmap`}
                  className="block px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium transition"
                >
                  📍 Course Roadmap ({roadmapData.subjectCode})
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
              <aside className="fixed inset-y-0 left-0 z-50 w-80 bg-slate-950 border-r border-slate-800 p-5 flex flex-col lg:hidden">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Layers size={18} className="text-sky-400" />
                    <span className="text-sm font-bold text-slate-200 truncate max-w-[200px]">{moduleData.title}</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1.5 text-sm">
                  {topics.map((t, i) => {
                    const isActive = i === index;
                    const isDone = completedTopics.includes(i);
                    return (
                      <Link
                        key={i}
                        to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-sm ${isActive
                            ? "bg-slate-800 text-white font-bold"
                            : isDone
                              ? "text-slate-400"
                              : "text-slate-300 hover:bg-slate-900"
                          }`}
                      >
                        {isDone ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Circle size={16} className="text-slate-600" />}
                        <span className="truncate">{i + 1}. {t}</span>
                      </Link>
                    );
                  })}
                </div>
              </aside>
            </>
          )}

          {/* ============================================================== */}
          {/* MAIN TOPIC CONTENT READER */}
          {/* ============================================================== */}
          <main ref={mainContentRef} className="flex-1 px-4 sm:px-8 lg:px-10 py-6 lg:py-10 overflow-y-auto h-full relative">
            <div className="max-w-5xl mx-auto space-y-6">

              {/* Topic Hero Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-7 shadow-sm">

                {/* Meta details line */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800">
                      Topic {index + 1 < 10 ? `0${index + 1}` : index + 1} / {totalTopics}
                    </span>

                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800">
                      {moduleData.title}
                    </span>
                  </div>

                  {/* Toggle Completed Pill Button */}
                  <button
                    onClick={toggleTopicCompletion}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold border transition ${isCurrentTopicDone
                        ? "bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-750"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                      }`}
                  >
                    {isCurrentTopicDone ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Circle size={16} />}
                    <span>{isCurrentTopicDone ? "Completed" : "Mark as Completed"}</span>
                  </button>
                </div>

                {/* Topic Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {topicTitle}
                </h1>

              </div>

              {/* Dynamic Topic Content Page */}
              <article className={`rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 md:p-10 shadow-sm ${fontSize === 'large' ? 'text-lg sm:text-xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed'}`}>
                <Suspense fallback={
                  <div className="py-14 text-center text-slate-400 space-y-3">
                    <div className="w-8 h-8 border-2 border-slate-700 border-t-sky-400 rounded-full animate-spin mx-auto" />
                    <p className="text-sm">Loading topic formulation & calculations…</p>
                  </div>
                }>
                  {TopicPage ? (
                    <TopicPage key={topicKey} />
                  ) : (
                    <div className="text-slate-300 text-base py-10 text-center space-y-4">
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
              </article>

              {/* ========================================================== */}
              {/* WhatsApp Question & Doubt Clearance Widget */}
              {/* ========================================================== */}
              <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
                <div className="flex items-center gap-2 text-slate-100">
                  <MessageSquare size={18} className="text-emerald-400" />
                  <h3 className="text-base font-bold">Have a Question About This Topic?</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ask your calculation, formulation, or theorem doubt directly to instructor {teacher.name}.
                </p>
                <textarea
                  id="qaTopicDoubt"
                  placeholder="Type your question or problem statement here..."
                  className="w-full bg-slate-950 text-slate-200 p-3.5 rounded-xl border border-slate-800 text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-600"
                  rows={3}
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-100 hover:text-white border border-slate-700 text-sm font-semibold transition shadow-sm"
                >
                  <MessageSquare size={16} className="text-emerald-400" />
                  <span>Send Query via WhatsApp</span>
                </button>
              </section>

              {/* Bottom Topic Navigation */}
              <nav className="flex items-center justify-between gap-4 pt-2 pb-10">
                {hasPrev ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`}
                    className="flex-1 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-medium text-slate-300 hover:text-white transition flex items-center gap-3"
                  >
                    <ArrowLeft size={16} className="text-slate-500 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs text-slate-500 uppercase font-bold">Previous Topic</div>
                      <div className="truncate text-slate-200 font-semibold">{topics[index - 1]}</div>
                    </div>
                  </Link>
                ) : <div className="flex-1" />}

                {hasNext ? (
                  <Link
                    to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`}
                    className="flex-1 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-semibold text-slate-200 hover:text-white transition flex items-center justify-between text-right gap-3"
                  >
                    <div className="truncate flex-1">
                      <div className="text-xs text-slate-500 uppercase font-bold">Next Topic</div>
                      <div className="truncate text-white font-bold">{topics[index + 1]}</div>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 shrink-0" />
                  </Link>
                ) : <div className="flex-1" />}
              </nav>

            </div>

            {/* PROFESSIONAL DRAW ANYWHERE CANVAS OVERLAY */}
            {drawAnywhere && (
              <ScreenAnnotator
                containerRef={mainContentRef}
                storageKey={`${subjectKey}-drawanywhere-${moduleSlug}-${topicIndex}`}
                onClose={() => setDrawAnywhere(false)}
                showToast={showToast}
              />
            )}
          </main>

          {/* ============================================================== */}
          {/* DRAGGABLE SPLIT RESIZE HANDLE */}
          {/* ============================================================== */}
          {showRightSidebar && !focusMode && (
            <div
              ref={dividerRef}
              className="flex-shrink-0 w-2.5 bg-slate-850 hover:bg-slate-700 cursor-col-resize relative group transition-colors z-20 flex items-center justify-center"
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
              className="hidden lg:flex flex-col border-l border-slate-800 bg-slate-950/90 backdrop-blur-md pt-4 pb-6 px-4 h-full overflow-hidden"
              style={{
                width: `${rightSidebarWidth}px`,
                flexShrink: 0,
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
                      onClick={() => setActiveRightTab('tldraw')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeRightTab === 'tldraw'
                          ? "bg-slate-800 text-slate-100 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                        }`}
                    >
                      TLDraw
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
                  <StudyWhiteboard
                    storageKey={`${subjectKey}-whiteboard-${moduleSlug}-${topicIndex}`}
                    topicTitle={topicTitle}
                    showToast={showToast}
                  />
                )}

                {/* TAB 2: TLDRAW CANVAS */}
                {activeRightTab === 'tldraw' && (
                  <div className="flex-1 flex flex-col border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 min-h-0">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-850 border-b border-slate-800 text-xs text-slate-300 font-medium">
                      <span>Tools:</span>
                      {['d', 'draw', 'e', 'eraser', 'r', 'rectangle', 'o', 'circle', 'l', 'line', 't', 'text', 'v', 'select'].map((key, i, arr) => {
                        if (i % 2 === 0) {
                          const toolName = arr[i + 1];
                          return (
                            <button
                              key={key}
                              onClick={() => handleShortcutClick(key, toolName)}
                              className={`px-2 py-0.5 rounded-md uppercase font-mono text-xs ${selectedShortcut === toolName ? "bg-slate-700 text-white font-bold" : "bg-slate-900 text-slate-400 hover:text-slate-200"
                                }`}
                            >
                              {key}
                            </button>
                          );
                        }
                        return null;
                      })}
                      {copyFeedback && <span className="text-xs text-emerald-400 ml-auto font-medium">{copyFeedback}</span>}
                    </div>
                    <TldrawWrapper
                      subjectKey={subjectKey}
                      onEditorReady={(editor) => {
                        tldrawEditorRef.current = editor;
                      }}
                    />
                  </div>
                )}

                {/* TAB 3: NOTES & SCRATCHPAD */}
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
                    <MathSymbolDictionary className="p-3 sm:p-4 rounded-xl border border-slate-800 bg-slate-900/90 shadow-none" />
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

            <MathSymbolDictionary />
          </div>
        </div>
      )}

    </div>
  );
}