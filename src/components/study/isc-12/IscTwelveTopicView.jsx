// ========================================================================
// FILE: src/components/study/IscElevenTopicView.jsx
// DESCRIPTION: Topic view with resizable layout – slider controls percentage.
// ========================================================================

import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Layers,
  Menu,
  List,
  X,
  PanelRight,
  PanelRightClose,
  Pencil,
  Eraser,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";
import roadmapData from "./isc12-roadmap.json";

// ------------------------------------------------------------------------
// DYNAMIC IMPORT FOR TOPIC FILES
// ------------------------------------------------------------------------
const topicModules = import.meta.glob("./topics/*/Topic*.jsx");

// ========================================================================
// OUTER WRAPPER – Forces clean remount on topic change
// ========================================================================
export default function IscTweleveTopicView() {
  const { moduleSlug, topicIndex } = useParams();
  return (
    <TopicViewInner
      key={`${moduleSlug}-${topicIndex}`}
      moduleSlug={moduleSlug}
      topicIndex={topicIndex}
    />
  );
}

// ========================================================================
// MAIN VIEW COMPONENT
// ========================================================================
function TopicViewInner({ moduleSlug, topicIndex }) {
  // ----------------------------------------------------------------
  // 1. ROUTING & STATE
  // ----------------------------------------------------------------
  const index = Number.parseInt(topicIndex, 10) || 0;
  const activeTopicRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showSidebar, setShowSidebar] = useState(() => {
    const stored = localStorage.getItem('topic-sidebar-visible');
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [showRightSidebar, setShowRightSidebar] = useState(() => {
    const stored = localStorage.getItem('topic-right-sidebar-visible');
    return stored !== null ? JSON.parse(stored) : false;
  });

  const [hideMain, setHideMain] = useState(false);

  // ---- Right sidebar resizing (percentage based) ----
  const [rightSidebarPercent, setRightSidebarPercent] = useState(0.45); // 30% to 70%
  const [containerWidth, setContainerWidth] = useState(0);
  const rowContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dividerRef = useRef(null);

  // Persist sidebar states
  useEffect(() => {
    localStorage.setItem('topic-sidebar-visible', JSON.stringify(showSidebar));
  }, [showSidebar]);
  useEffect(() => {
    localStorage.setItem('topic-right-sidebar-visible', JSON.stringify(showRightSidebar));
  }, [showRightSidebar]);

  // ---- Compute right sidebar width based on percentage ----
  const leftSidebarWidth = showSidebar ? 288 : 0; // w-72 = 288px
  const getRightSidebarWidth = useCallback(() => {
    if (!containerWidth) return 600; // fallback
    const available = containerWidth - leftSidebarWidth - 4; // minus divider gap
    let width = available * rightSidebarPercent;
    // Clamp to sensible min/max
    width = Math.max(300, Math.min(900, width));
    return width;
  }, [containerWidth, leftSidebarWidth, rightSidebarPercent]);

  const rightSidebarWidth = getRightSidebarWidth();

  // ---- Observe container width for proportional sizing ----
  useEffect(() => {
    const container = rowContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    // Initial width
    setContainerWidth(container.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  // ---- Drag handlers (update percentage) ----
  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const container = rowContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newWidth = rect.right - e.clientX - 4;
      const available = rect.width - leftSidebarWidth - 4;
      if (available <= 0) return;
      let newPercent = newWidth / available;
      newPercent = Math.max(0.3, Math.min(0.7, newPercent));
      setRightSidebarPercent(newPercent);
    };
    const onMouseUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, leftSidebarWidth]);

  const startDragTouch = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  useEffect(() => {
    const onTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const container = rowContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newWidth = rect.right - touch.clientX - 4;
      const available = rect.width - leftSidebarWidth - 4;
      if (available <= 0) return;
      let newPercent = newWidth / available;
      newPercent = Math.max(0.3, Math.min(0.7, newPercent));
      setRightSidebarPercent(newPercent);
    };
    const onTouchEnd = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, leftSidebarWidth]);

  // ----------------------------------------------------------------
  // 2. MODULE DATA LOOKUP
  // ----------------------------------------------------------------
  let moduleData = null;
  let segmentData = null;
  for (const segment of roadmapData.segments) {
    const found = segment.modules.find((m) => m.slug === moduleSlug);
    if (found) {
      moduleData = found;
      segmentData = segment;
      break;
    }
  }

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Module Not Found</h1>
        <Link to={`/${roadmapData.folder}/roadmap`} className="text-sky-400 underline mt-4 inline-block">
          ← Back to Roadmap
        </Link>
      </div>
    );
  }

  const topicTitle = moduleData.topics[index];
  if (!topicTitle) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Topic Not Found</h1>
        <Link
          to={`/${roadmapData.folder}/module/${moduleSlug}`}
          className="text-sky-400 underline mt-4 inline-block"
        >
          ← Back to Module
        </Link>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // 3. PROGRESS TRACKING
  // ----------------------------------------------------------------
  const storageKey = `js-progress-${moduleSlug}`;
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey) || "[]";
    let parsed = [];
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = [];
    }
    if (!parsed.includes(index)) parsed.push(index);
    parsed.sort((a, b) => a - b);
    localStorage.setItem(storageKey, JSON.stringify(parsed));
    setCompletedTopics(parsed);
  }, [index, storageKey]);

  const totalTopics = moduleData.topics.length;
  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  const hasPrev = index > 0;
  const hasNext = index < totalTopics - 1;

  const resetProgress = () => {
    localStorage.removeItem(storageKey);
    setCompletedTopics([]);
  };

  // ----------------------------------------------------------------
  // 4. DYNAMIC TOPIC IMPORT
  // ----------------------------------------------------------------
  const topicKey = `./topics/${moduleSlug}/Topic${topicIndex}.jsx`;
  const TopicPage = topicModules[topicKey]
    ? React.lazy(topicModules[topicKey])
    : null;

  // ----------------------------------------------------------------
  // 5. SCROLL ACTIVE TOPIC INTO VIEW & CLOSE MOBILE SIDEBAR
  // ----------------------------------------------------------------
  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [moduleSlug, topicIndex]);

  // ----------------------------------------------------------------
  // 6. WHATSAPP SHARING STATE
  // ----------------------------------------------------------------
  const [waPhone, setWaPhone] = useState("");
  const [waStudentName, setWaStudentName] = useState(() => {
    try {
      const s = localStorage.getItem("student_name");
      return s || "";
    } catch {
      return "";
    }
  });
  const [waIncludeLink, setWaIncludeLink] = useState(true);
  const [waPreviewOpen, setWaPreviewOpen] = useState(false);
  const [waLastMessage, setWaLastMessage] = useState("");

  const buildTopicListText = (topics) =>
    topics.map((t, i) => `${i + 1}. ${t}`).join("\n");

  // ----------------------------------------------------------------
  // 7. WHITEBOARD STATE & REFS
  // ----------------------------------------------------------------
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  const [drawingColor, setDrawingColor] = useState('#38bdf8');
  const [drawingSize, setDrawingSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);

  const loadDrawing = () => {
    const key = `whiteboard-${moduleSlug}-${topicIndex}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const image = new Image();
        image.onload = () => {
          const ctx = contextRef.current;
          if (ctx) {
            ctx.drawImage(image, 0, 0);
          }
        };
        image.src = saved;
      } catch (e) {
        console.warn("Failed to load whiteboard", e);
      }
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const key = `whiteboard-${moduleSlug}-${topicIndex}`;
    localStorage.setItem(key, dataUrl);
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width - 4;
    const height = rect.height - 4;

    if (width <= 0 || height <= 0) return;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    contextRef.current = ctx;

    loadDrawing();
  };

  useEffect(() => {
    if (showRightSidebar) {
      const timer = setTimeout(initCanvas, 150);
      return () => clearTimeout(timer);
    }
  }, [showRightSidebar, moduleSlug, topicIndex, hideMain, rightSidebarWidth]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveDrawing();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [moduleSlug, topicIndex]);

  useEffect(() => {
    if (!showRightSidebar) return;
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initCanvas, 200);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [showRightSidebar]);

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    isDrawingRef.current = true;
    lastXRef.current = x;
    lastYRef.current = y;
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(lastXRef.current, lastYRef.current);
    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraser ? '#0f172a' : drawingColor;
    ctx.lineWidth = isEraser ? 20 : drawingSize;
    ctx.stroke();
    lastXRef.current = x;
    lastYRef.current = y;
  };

  const endDrawing = (e) => {
    e.preventDefault();
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      saveDrawing();
    }
  };

  const clearCanvas = () => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveDrawing();
  };

  // ----------------------------------------------------------------
  // 8. COMPUTE IF ANY SIDEBAR IS OPEN
  // ----------------------------------------------------------------
  const anySidebar = showSidebar || showRightSidebar;

  // ========================================================================
  // RENDER
  // ========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">

      {/* ---------- BACKGROUND DECORATIONS ---------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-40 -left-40 opacity-40" width="420" height="420">
          <defs>
            <radialGradient id="jsTopicBlob1" cx="0" cy="0" r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0,0) rotate(45) scale(400)">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#jsTopicBlob1)" />
        </svg>
        <svg className="absolute bottom-[-160px] right-[-130px] opacity-40" width="420" height="420">
          <defs>
            <radialGradient id="jsTopicBlob2" cx="0" cy="0" r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400,400) rotate(225) scale(400)">
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="200" fill="url(#jsTopicBlob2)" />
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
          <defs>
            <pattern id="jsTopicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#1f2937" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jsTopicGrid)" />
        </svg>
      </div>

      {/* ---------- HEADER ---------- */}
      <header className="relative z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Module Info */}
          <div className="flex items-center gap-3">
            <Link
              to={`/${roadmapData.folder}/roadmap`}
              className="hidden sm:inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              <ArrowLeft size={12} className="mr-1" />
              Roadmap
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <Layers size={12} className="text-sky-400" />
                <span>{roadmapData.trackTitle}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {segmentData?.title} • {moduleData.title}
              </p>
            </div>
          </div>

          {/* Right: Progress + Navigation + Slider */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Progress */}
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <BookOpen size={13} className="text-sky-400" />
                <span>Topic {index + 1} of {totalTopics}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] text-sky-300 font-semibold">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Toggle Left Sidebar */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full 
             bg-gradient-to-r from-slate-800 to-slate-700 
             hover:from-sky-600 hover:to-sky-500 
             text-xs font-medium uppercase tracking-wider
             border border-slate-600 hover:border-sky-400
             shadow-md hover:shadow-sky-500/20
             transition-all duration-300 ease-in-out
             hover:scale-[1.02] active:scale-[0.98]"
            >
              <List size={14} className="text-current" />
              {showSidebar ? "Hide Topics" : "Show Topics"}
            </button>

            {/* Toggle Right Sidebar (Whiteboard) */}
            <button
              onClick={() => setShowRightSidebar(!showRightSidebar)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full 
             bg-gradient-to-r from-slate-800 to-slate-700 
             hover:from-purple-600 hover:to-purple-500 
             text-xs font-medium uppercase tracking-wider
             border border-slate-600 hover:border-purple-400
             shadow-md hover:shadow-purple-500/20
             transition-all duration-300 ease-in-out
             hover:scale-[1.02] active:scale-[0.98]"
            >
              {showRightSidebar ? <PanelRightClose size={14} /> : <PanelRight size={14} />}
              {showRightSidebar ? "Hide Panel" : "Show Panel"}
            </button>

            {/* Toggle Hide Main Content */}
            <button
              onClick={() => setHideMain(!hideMain)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full 
             bg-gradient-to-r from-slate-800 to-slate-700 
             hover:from-amber-600 hover:to-amber-500 
             text-xs font-medium uppercase tracking-wider
             border border-slate-600 hover:border-amber-400
             shadow-md hover:shadow-amber-500/20
             transition-all duration-300 ease-in-out
             hover:scale-[1.02] active:scale-[0.98]"
            >
              {hideMain ? <Eye size={14} /> : <EyeOff size={14} />}
              {hideMain ? "Show Topic" : "Hide Topic"}
            </button>

            {/* ---- NEW: Proportional Slider ---- */}
            {showRightSidebar && !hideMain && (
              <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700">
                <span className="text-[10px] text-slate-400 font-medium">Width:</span>
                <input
                  type="range"
                  min="30"
                  max="70"
                  value={Math.round(rightSidebarPercent * 100)}
                  onChange={(e) => setRightSidebarPercent(Number(e.target.value) / 100)}
                  className="w-24 h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  title="Adjust topic width proportionally"
                />
                <span className="text-[10px] text-sky-300 font-mono min-w-[36px] text-center">
                  {Math.round(rightSidebarPercent * 100)}%
                </span>
              </div>
            )}

            {/* Prev/Next */}
            <div className="hidden sm:flex items-center gap-2">
              {hasPrev ? (
                <Link
                  to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800"
                >
                  <ArrowLeft size={13} /> Prev
                </Link>
              ) : (
                <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 text-slate-600 border border-slate-900 text-[11px]">
                  <ArrowLeft size={13} /> Prev
                </button>
              )}
              {hasNext ? (
                <Link
                  to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 border border-sky-500 text-[11px] text-white"
                >
                  Next <ArrowRight size={13} />
                </Link>
              ) : (
                <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 text-slate-600 border border-slate-900 text-[11px]">
                  Next <ArrowRight size={13} />
                </button>
              )}
            </div>

            {/* Mobile Topics Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-100 sm:hidden"
            >
              <Menu size={14} /> Topics
            </button>
          </div>
        </div>
      </header>

      {/* ---------- MAIN LAYOUT ---------- */}
      <div className="relative z-20 flex-1 flex justify-center min-h-0">
        <div
          ref={rowContainerRef}
          className="w-full flex min-h-[calc(100vh-80px)] row-container"
        >

          {/* ==============================================================
              LEFT SIDEBAR (Desktop)
              ============================================================== */}
          {showSidebar && (
            <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-slate-800 bg-slate-950/60 backdrop-blur-xl pt-6 pb-8 px-4 h-full overflow-y-auto">
              {/* Progress Card */}
              <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">
                    Progress
                  </span>
                  <span className="text-[11px] text-sky-300 font-semibold">
                    {completedCount}/{totalTopics}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={resetProgress}
                  className="mt-2 text-[11px] text-rose-300 hover:text-rose-400"
                >
                  Reset Progress
                </button>
              </div>

              {/* Topic List */}
              <div className="space-y-2 text-sm">
                {moduleData.topics.map((title, i) => {
                  const isActive = i === index;
                  const isCompleted = completedTopics.includes(i);
                  return (
                    <Link
                      key={i}
                      ref={isActive ? activeTopicRef : null}
                      to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`}
                      className={`
                      relative flex items-center gap-3 px-3 py-2 rounded-xl border transition
                      ${isActive
                          ? "border-sky-500 bg-sky-600/90 text-white shadow-lg"
                          : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"
                        }
                    `}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[3px] ${isActive ? "bg-sky-300" : "bg-slate-700"
                          }`}
                      />
                      {isCompleted ? (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />
                      )}
                      <span className="truncate">
                        <span className="text-sky-300 mr-1 text-xs">{i + 1}.</span>
                        {title}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Footer Links */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
                <Link
                  to={`/${roadmapData.folder}/module/${moduleSlug}`}
                  className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                >
                  ← Back to Module Overview
                </Link>
                <Link
                  to={`/${roadmapData.folder}/roadmap`}
                  className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                >
                  📍 {roadmapData.subject} Roadmap
                </Link>
                <a
                  href="/play"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                >
                  🧪 CNAT Playground
                </a>
              </div>

              {/* WhatsApp Topic Sharing Block */}
              <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500">
                    Send Topics List
                  </p>
                  <span className="text-[11px] text-slate-400">{moduleData.topics.length} topics</span>
                </div>
                <label className="text-[11px] text-slate-400">Student name (optional)</label>
                <input
                  id="waStudentNameInput"
                  value={waStudentName}
                  onChange={(e) => setWaStudentName(e.target.value)}
                  type="text"
                  placeholder="e.g., Ritaja Ghosh"
                  className="w-full bg-slate-800 text-slate-200 p-2 rounded-lg border border-slate-600 text-xs mt-1 mb-3 focus:outline-none focus:border-sky-500"
                />
                <label className="text-[11px] text-slate-400">WhatsApp number</label>
                <input
                  id="waPhoneInput"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  type="text"
                  placeholder="e.g., 919876543210"
                  className="w-full bg-slate-800 text-slate-200 p-2 rounded-lg border border-slate-600 text-xs mt-1 focus:outline-none focus:border-sky-500"
                />
                <div className="flex items-center gap-2 mt-3">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={waIncludeLink}
                      onChange={() => setWaIncludeLink((v) => !v)}
                      className="accent-sky-500"
                    />
                    Include module link
                  </label>
                  <button
                    onClick={() => {
                      const phone = waPhone.trim();
                      if (!phone) return alert("Please enter a WhatsApp phone number.");
                      const moduleLink = `${window.location.origin}/${roadmapData.folder}/module/${moduleSlug}`;
                      const topicsText = buildTopicListText(moduleData.topics);
                      const namePart = waStudentName.trim() ? `Hi ${waStudentName.trim()},\n\n` : "";
                      const greeting = `${namePart}📘 *Ultra Premium Topic List*\n━━━━━━━━━━━━━━━━━━━━`;
                      const header = `*Module:* ${moduleData.title}\n*Topics:* ${moduleData.topics.length}\n`;
                      const body = `\n*Topics Preview:*\n${topicsText}\n`;
                      const linkPart = waIncludeLink ? `\n🔗 Module Link:\n${moduleLink}\n` : "";
                      const footer = `\n━━━━━━━━━━━━━━━━━━━━\nSent via Coder & AccoTax Learning Platform • Barrackpore\nwww.codernaccotax.co.in`;
                      const fullMessage = `${greeting}\n${header}\n${body}${linkPart}${footer}`;
                      try {
                        navigator.clipboard.writeText(fullMessage);
                        alert("Message preview copied to clipboard.");
                        setWaLastMessage(fullMessage);
                        setWaPreviewOpen(true);
                      } catch (err) {
                        setWaLastMessage(fullMessage);
                        setWaPreviewOpen(true);
                      }
                    }}
                    className="ml-auto px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:bg-slate-900"
                  >
                    Copy Preview
                  </button>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      const moduleLink = `${window.location.origin}/${roadmapData.folder}/module/${moduleSlug}`;
                      const topicsText = buildTopicListText(moduleData.topics);
                      const namePart = waStudentName.trim() ? `Hi ${waStudentName.trim()},\n\n` : "";
                      const greeting = `${namePart}📘 *Ultra Premium Topic List*\n━━━━━━━━━━━━━━━━━━━━`;
                      const header = `*Module:* ${moduleData.title}\n*Topics:* ${moduleData.topics.length}\n`;
                      const body = `\n*Topics Preview:*\n${topicsText}\n`;
                      const linkPart = waIncludeLink ? `\n🔗 Module Link:\n${moduleLink}\n` : "";
                      const footer = `\n━━━━━━━━━━━━━━━━━━━━\nSent via Coder & AccoTax Learning Platform • Barrackpore\nwww.codernaccotax.co.in`;
                      const fullMessage = `${greeting}\n${header}\n${body}${linkPart}${footer}`;
                      setWaLastMessage(fullMessage);
                      setWaPreviewOpen((s) => !s);
                    }}
                    className="w-full mt-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white transition"
                  >
                    {waPreviewOpen ? "Hide Preview" : "Preview Message"}
                  </button>
                </div>
                {waPreviewOpen && (
                  <pre className="mt-3 whitespace-pre-wrap text-[13px] bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-200 text-xs">
                    {waLastMessage || "No preview available."}
                  </pre>
                )}
                <button
                  onClick={() => {
                    const phoneRaw = waPhone.trim();
                    if (!phoneRaw) {
                      return alert("Please enter the WhatsApp phone number (with country code). Example: 919876543210");
                    }
                    const phone = phoneRaw.replace(/[^0-9]/g, "");
                    if (!/^\d{10,15}$/.test(phone)) {
                      if (!confirm("Phone number looks unusual. Continue anyway?")) return;
                    }
                    const moduleLink = `${window.location.origin}/${roadmapData.folder}/module/${moduleSlug}`;
                    const topicsText = buildTopicListText(moduleData.topics);
                    const namePart = waStudentName.trim() ? `Hi ${waStudentName.trim()},\n\n` : "";
                    const greeting = `${namePart}📘 *Ultra Premium Topic List*\n━━━━━━━━━━━━━━━━━━━━`;
                    const header = `*Module:* ${moduleData.title}\n*Topics:* ${moduleData.topics.length}\n`;
                    const body = `\n*Topics Preview:*\n${topicsText}\n`;
                    const linkPart = waIncludeLink ? `\n🔗 Module Link:\n${moduleLink}\n` : "";
                    const closing = `\n━━━━━━━━━━━━━━━━━━━━\nNeed help? Reply with "HELP" and we'll assist you.\nSent via Coder & AccoTax Learning Platform • Barrackpore\nwww.codernaccotax.co.in`;
                    const fullMessage = `${greeting}\n${header}\n${body}${linkPart}${closing}`;
                    try {
                      localStorage.setItem("student_name", waStudentName.trim());
                    } catch { /* ignore */ }
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full mt-3 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-xs font-semibold text-white transition"
                >
                  📤 Send Ultra Premium Topic Message
                </button>
                <p className="text-[11px] text-slate-500 mt-2">
                  Tip: include country code (e.g., 91 for India). You can preview or copy the message before sending.
                </p>
              </div>
            </aside>
          )}

          {/* ==============================================================
              MOBILE SIDEBAR (Drawer)
              ============================================================== */}
          {sidebarOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 pt-4 pb-6 px-4 flex flex-col lg:hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-sky-400" />
                    <span className="text-sm font-semibold text-sky-300">
                      {moduleData.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-[11px] text-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">
                      Progress
                    </span>
                    <span className="text-sky-300 font-semibold">
                      {completedCount}/{totalTopics}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 border border-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={resetProgress}
                    className="mt-2 text-[10px] text-rose-300 hover:text-rose-400"
                  >
                    Reset Progress
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 text-sm">
                  {moduleData.topics.map((title, i) => {
                    const isActive = i === index;
                    const isCompleted = completedTopics.includes(i);
                    return (
                      <Link
                        key={i}
                        to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          relative flex items-center gap-3 px-3 py-2 rounded-xl border transition
                          ${isActive
                            ? "border-sky-500 bg-sky-600/90 text-white shadow-lg"
                            : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"
                          }
                        `}
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-[3px] ${isActive ? "bg-sky-300" : "bg-slate-700"
                            }`}
                        />
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />
                        )}
                        <span className="truncate">
                          <span className="text-sky-300 mr-1 text-xs">{i + 1}.</span>
                          {title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <Link
                    to={`/${roadmapData.folder}/module/${moduleSlug}`}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                  >
                    ← Back to Module Overview
                  </Link>
                  <Link
                    to={`/${roadmapData.folder}/roadmap`}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                  >
                    📍 {roadmapData.subject} Roadmap
                  </Link>
                  <a
                    href="/play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                  >
                    🧪 CNAT Playground
                  </a>
                </div>
              </aside>
            </>
          )}

          {/* ==============================================================
              MAIN CONTENT (Topic Reader) – CONDITIONALLY RENDERED
              ============================================================== */}
          {!hideMain && (
            <main className="flex-1 px-4 lg:px-8 py-6 lg:py-10 overflow-y-auto h-full">
              <div className="w-full">
                {/* Topic Header */}
                <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl relative overflow-hidden">
                  <svg className="absolute top-0 left-0 w-full h-1.5">
                    <defs>
                      <linearGradient id="jsTopicHeaderLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#jsTopicHeaderLine)" />
                  </svg>
                  <div className="p-6 flex flex-col md:flex-row md:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 px-2 py-[2px] text-[9px] text-sky-300">
                          Topic {index + 1} / {totalTopics}
                        </span>
                        {moduleData.level || "Module"} • {moduleData.difficulty || "Difficulty"}
                      </p>
                      <h1 className="text-xl md:text-2xl font-bold text-sky-300">
                        {topicTitle}
                      </h1>
                      <p className="text-[12px] text-slate-400 mt-1">
                        Module: <span className="text-slate-200">{moduleData.title}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      {hasPrev ? (
                        <Link
                          to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800"
                        >
                          <ArrowLeft size={13} /> Prev
                        </Link>
                      ) : (
                        <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[11px] text-slate-600">
                          <ArrowLeft size={13} /> Prev
                        </button>
                      )}
                      {hasNext ? (
                        <Link
                          to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`}
                          className="px-2.5 py-1.5 rounded-lg bg-sky-600 border border-sky-500 text-[11px] text-white hover:bg-sky-500"
                        >
                          Next <ArrowRight size={13} />
                        </Link>
                      ) : (
                        <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[11px] text-slate-600">
                          Next <ArrowRight size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Topic Content */}
                <section className="relative rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-lg shadow-[0_22px_45px_rgba(15,23,42,0.75)] px-5 md:px-8 py-6 md:py-8">
                  <Suspense fallback={<p className="text-slate-400 text-sm">Loading topic content…</p>}>
                    {TopicPage ? (
                      <TopicPage key={topicKey} />
                    ) : (
                      <div className="text-slate-300 text-sm">
                        <p className="mb-1">Topic file missing:</p>
                        <pre className="text-sky-400 mt-2 text-xs bg-slate-950/60 rounded-lg p-3 border border-slate-800 overflow-x-auto">
                          {`src/components/study/${roadmapData.folder}/topics/${moduleSlug}/Topic${topicIndex}.jsx`}
                        </pre>
                      </div>
                    )}
                  </Suspense>

                  {/* WhatsApp Query Box */}
                  <div className="mt-10 p-5 rounded-2xl border border-slate-700 bg-slate-900/60 shadow-lg space-y-3">
                    <h3 className="text-lg font-semibold text-sky-300">
                      Have a Question About This Topic?
                    </h3>
                    <p className="text-sm text-slate-400">
                      Send your doubts directly on WhatsApp. I will reply as soon as possible.
                    </p>
                    <textarea
                      id="waQuery"
                      placeholder="Type your question here..."
                      className="w-full bg-slate-800 text-slate-200 p-3 rounded-xl border border-slate-600 text-sm focus:outline-none focus:border-sky-500"
                      rows={3}
                    ></textarea>
                    <button
                      onClick={() => {
                        const msg = document.getElementById("waQuery").value.trim();
                        if (!msg) return alert("Please type your question first.");
                        const phone = "919432456083";
                        const text = encodeURIComponent(
                          `Hello Sir,\nI have a query regarding:\n\n• Module: ${moduleData.title}\n• Topic: ${topicTitle}\n\nMy Question:\n${msg}`
                        );
                        window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                      }}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition"
                    >
                      📲 Send WhatsApp Query
                    </button>
                  </div>
                </section>
              </div>
            </main>
          )}

          {/* ==============================================================
              DIVIDER – DRAGGABLE RESIZE HANDLE
              ============================================================== */}
          {showRightSidebar && !hideMain && (
            <div
              ref={dividerRef}
              className="flex-shrink-0 w-2 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600 hover:from-sky-500 hover:via-sky-400 hover:to-sky-500 cursor-col-resize relative group transition-all duration-200 z-10"
              onMouseDown={startDrag}
              onTouchStart={startDragTouch}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-sky-400/20 blur-sm" />
              <div className="absolute inset-y-0 -left-3 -right-3 flex items-center justify-center">
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-md px-1 py-2 border border-slate-700 group-hover:border-sky-400 transition-colors duration-200">
                  <GripVertical
                    size={20}
                    className="text-slate-400 group-hover:text-sky-300 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              RIGHT SIDEBAR – WHITEBOARD (Desktop)
              ============================================================== */}
          {showRightSidebar && (
            <aside
              className="hidden lg:flex flex-col border-l border-slate-800 bg-slate-950/60 backdrop-blur-xl pt-6 pb-8 px-4 h-full"
              style={{
                width: hideMain ? '100%' : `${rightSidebarWidth}px`,
                flexShrink: 0,
              }}
            >
              <div className="flex flex-col h-full">
                <h4 className="text-sky-300 font-semibold text-base mb-3 flex items-center gap-2">
                  <Pencil size={16} />
                  Whiteboard
                </h4>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 mb-3 bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                  <input
                    type="color"
                    value={drawingColor}
                    onChange={(e) => {
                      setDrawingColor(e.target.value);
                      setIsEraser(false);
                    }}
                    className="w-7 h-7 p-0 border-0 rounded cursor-pointer bg-transparent"
                    title="Pen color"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">Size</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={drawingSize}
                      onChange={(e) => {
                        setDrawingSize(Number(e.target.value));
                        setIsEraser(false);
                      }}
                      className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-300 w-4">{drawingSize}</span>
                  </div>
                  <button
                    onClick={() => setIsEraser(!isEraser)}
                    className={`p-1.5 rounded-md transition ${isEraser ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    title="Eraser"
                  >
                    <Eraser size={14} />
                  </button>
                  <button
                    onClick={clearCanvas}
                    className="p-1.5 rounded-md bg-rose-800/70 hover:bg-rose-700 text-rose-200 transition"
                    title="Clear"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button
                    onClick={saveDrawing}
                    className="p-1.5 rounded-md bg-emerald-800/70 hover:bg-emerald-700 text-emerald-200 transition text-[10px] px-2"
                    title="Save now"
                  >
                    💾
                  </button>
                </div>

                {/* Canvas container */}
                <div className="flex-1 relative border border-slate-700 rounded-xl overflow-hidden bg-slate-900/40">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={endDrawing}
                    className="touch-none w-full h-full"
                  />
                </div>

                <p className="text-[10px] text-slate-500 mt-2 text-center">
                  Draw freely · Auto‑saved
                </p>
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
}