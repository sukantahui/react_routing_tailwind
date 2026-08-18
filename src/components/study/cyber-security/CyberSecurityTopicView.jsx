// ========================================================================
// FILE: src/components/study/IscElevenTopicView.jsx
// DESCRIPTION: Topic view with ultra‑smooth draw‑anywhere and smooth resizing.
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
  Palette,
  Square,
  Circle,
  Minus,
  Type,
  MousePointer2,
  PenTool,
} from "lucide-react";
import roadmapData from "./cyber-securty-roadmap.json";

// Import tldraw
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

// ------------------------------------------------------------------------
// DYNAMIC IMPORT FOR TOPIC FILES
// ------------------------------------------------------------------------
const topicModules = import.meta.glob("./topics/*/Topic*.jsx");

// ========================================================================
// OUTER WRAPPER
// ========================================================================
export default function CyberSecurityTopicView() {
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
function TldrawWrapper({ onEditorReady }) {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    if (editor && onEditorReady) onEditorReady(editor);
  }, [editor, onEditorReady]);
  return (
    <div className="flex-1 relative bg-white">
      <Tldraw
        defaultStyles={{ size: 'xs', color: '#38bdf8' }}
        onMount={(e) => setEditor(e)}
        autoFocus
        persistenceKey="tldraw-storage"
      />
    </div>
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
  const [drawMode, setDrawMode] = useState('canvas');
  const [selectedShortcut, setSelectedShortcut] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState('');
  const tldrawEditorRef = useRef(null);
  const [drawAnywhere, setDrawAnywhere] = useState(false);

  // ---- Right sidebar resizing ----
  const [rightSidebarPercent, setRightSidebarPercent] = useState(0.45);
  const [containerWidth, setContainerWidth] = useState(0);
  const rowContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dividerRef = useRef(null);
  let rafId = null;

  useEffect(() => {
    localStorage.setItem('topic-sidebar-visible', JSON.stringify(showSidebar));
  }, [showSidebar]);
  useEffect(() => {
    localStorage.setItem('topic-right-sidebar-visible', JSON.stringify(showRightSidebar));
  }, [showRightSidebar]);

  const leftSidebarWidth = showSidebar ? 288 : 0;
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
      for (let entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(container);
    setContainerWidth(container.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  const startDrag = (e) => { e.preventDefault(); setIsDragging(true); };
  const startDragTouch = (e) => { e.preventDefault(); setIsDragging(true); };

  // ---- Smooth drag with rAF ----
  useEffect(() => {
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
        newPercent = Math.max(0.3, Math.min(0.7, newPercent));
        setRightSidebarPercent(newPercent);
        rafId = null;
      });
    };
    const onMouseUp = () => {
      setIsDragging(false);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
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

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!isDragging) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
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
        rafId = null;
      });
    };
    const onTouchEnd = () => {
      setIsDragging(false);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };
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
    if (found) { moduleData = found; segmentData = segment; break; }
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
        <Link to={`/${roadmapData.folder}/module/${moduleSlug}`} className="text-sky-400 underline mt-4 inline-block">
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
    try { parsed = JSON.parse(raw); } catch { parsed = []; }
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
  const TopicPage = topicModules[topicKey] ? React.lazy(topicModules[topicKey]) : null;

  // ----------------------------------------------------------------
  // 5. SCROLL & SIDEBAR
  // ----------------------------------------------------------------
  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [index]);
  useEffect(() => setSidebarOpen(false), [moduleSlug, topicIndex]);

  // ----------------------------------------------------------------
  // 6. WHATSAPP SHARING
  // ----------------------------------------------------------------
  const [waPhone, setWaPhone] = useState("");
  const [waStudentName, setWaStudentName] = useState(() => {
    try { return localStorage.getItem("student_name") || ""; } catch { return ""; }
  });
  const [waIncludeLink, setWaIncludeLink] = useState(true);
  const [waPreviewOpen, setWaPreviewOpen] = useState(false);
  const [waLastMessage, setWaLastMessage] = useState("");
  const buildTopicListText = (topics) => topics.map((t, i) => `${i + 1}. ${t}`).join("\n");

  // ----------------------------------------------------------------
  // 7. CANVAS WHITEBOARD (right panel)
  // ----------------------------------------------------------------
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const pendingPoints = useRef([]);
  const drawPendingRef = useRef(false);
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
          if (ctx) ctx.drawImage(image, 0, 0);
        };
        image.src = saved;
      } catch (e) { console.warn("Failed to load whiteboard", e); }
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    localStorage.setItem(`whiteboard-${moduleSlug}-${topicIndex}`, dataUrl);
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
    if (showRightSidebar && drawMode === 'canvas') {
      const timer = setTimeout(initCanvas, 150);
      return () => clearTimeout(timer);
    }
  }, [showRightSidebar, moduleSlug, topicIndex, hideMain, rightSidebarWidth, drawMode]);

  useEffect(() => {
    const handleBeforeUnload = () => { if (drawMode === 'canvas') saveDrawing(); };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [moduleSlug, topicIndex, drawMode]);

  const startDrawing = (e) => {
    if (drawMode !== 'canvas') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    isDrawingRef.current = true;
    pendingPoints.current = [];
    drawPendingRef.current = false;
    lastXRef.current = x;
    lastYRef.current = y;
  };

  const processPending = () => {
    const ctx = contextRef.current;
    if (!ctx) { drawPendingRef.current = false; return; }
    const rawPoints = pendingPoints.current;
    if (rawPoints.length === 0) { drawPendingRef.current = false; return; }
    const allPoints = [{ x: lastXRef.current, y: lastYRef.current }, ...rawPoints];
    const smoothed = catmullRomSpline(allPoints, 40);
    if (smoothed.length < 2) {
      ctx.beginPath();
      ctx.moveTo(allPoints[0].x, allPoints[0].y);
      for (let i = 1; i < allPoints.length; i++) ctx.lineTo(allPoints[i].x, allPoints[i].y);
      ctx.strokeStyle = isEraser ? '#0f172a' : drawingColor;
      ctx.lineWidth = isEraser ? 20 : drawingSize;
      ctx.stroke();
      const lastRaw = allPoints[allPoints.length - 1];
      lastXRef.current = lastRaw.x;
      lastYRef.current = lastRaw.y;
    } else {
      ctx.beginPath();
      ctx.moveTo(smoothed[0].x, smoothed[0].y);
      for (let i = 1; i < smoothed.length; i++) ctx.lineTo(smoothed[i].x, smoothed[i].y);
      ctx.strokeStyle = isEraser ? '#0f172a' : drawingColor;
      ctx.lineWidth = isEraser ? 20 : drawingSize;
      ctx.stroke();
      const lastSmoothed = smoothed[smoothed.length - 1];
      lastXRef.current = lastSmoothed.x;
      lastYRef.current = lastSmoothed.y;
    }
    pendingPoints.current = [];
    drawPendingRef.current = false;
    if (pendingPoints.current.length > 0) {
      drawPendingRef.current = true;
      requestAnimationFrame(processPending);
    }
  };

  const draw = (e) => {
    if (drawMode !== 'canvas') return;
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    pendingPoints.current.push({ x, y });
    if (!drawPendingRef.current) {
      drawPendingRef.current = true;
      requestAnimationFrame(processPending);
    }
  };

  const endDrawing = (e) => {
    if (drawMode !== 'canvas') return;
    e.preventDefault();
    if (isDrawingRef.current) {
      if (pendingPoints.current.length > 0) {
        if (!drawPendingRef.current) {
          drawPendingRef.current = true;
          requestAnimationFrame(() => { processPending(); saveDrawing(); });
        } else {
          const saveAfter = () => {
            if (drawPendingRef.current) requestAnimationFrame(saveAfter);
            else saveDrawing();
          };
          requestAnimationFrame(saveAfter);
        }
      } else saveDrawing();
      isDrawingRef.current = false;
    }
  };

  const clearCanvas = () => {
    if (drawMode !== 'canvas') return;
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveDrawing();
  };

  // ---- tldraw shortcuts ----
  const handleShortcutClick = (key, toolName) => {
    setSelectedShortcut(toolName);
    navigator.clipboard.writeText(key);
    setCopyFeedback(`'${key}' pressed!`);
    setTimeout(() => setCopyFeedback(''), 2000);
    if (tldrawEditorRef.current) {
      try {
        const toolMap = {
          'draw': 'draw', 'eraser': 'erase', 'rectangle': 'rect',
          'circle': 'ellipse', 'line': 'line', 'text': 'text', 'select': 'select'
        };
        const toolId = toolMap[toolName] || 'select';
        tldrawEditorRef.current.setCurrentTool(toolId);
      } catch (e) { console.warn('Failed to switch tool:', e); }
    }
  };
  const handleEditorReady = (editor) => { tldrawEditorRef.current = editor; };

  // ================================================================
  // DRAW ANYWHERE – scrollable canvas (inside main content)
  // ================================================================
  const overlayCanvasRef = useRef(null);
  const overlayCtxRef = useRef(null);
  const overlayIsDrawing = useRef(false);
  const overlayLastX = useRef(0);
  const overlayLastY = useRef(0);
  const overlayPending = useRef([]);
  const overlayDrawPending = useRef(false);
  const mainContentRef = useRef(null);

  const overlayLoadDrawing = () => {
    const key = `drawanywhere-${moduleSlug}-${topicIndex}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const image = new Image();
        image.onload = () => {
          const ctx = overlayCtxRef.current;
          if (ctx) ctx.drawImage(image, 0, 0);
        };
        image.src = saved;
      } catch (e) { console.warn("Failed to load overlay drawing", e); }
    }
  };

  const overlaySaveDrawing = () => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    localStorage.setItem(`drawanywhere-${moduleSlug}-${topicIndex}`, dataUrl);
  };

  const initOverlayCanvas = () => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const container = mainContentRef.current;
    if (!container) return;
    const width = container.scrollWidth;
    const height = container.scrollHeight;
    if (width <= 0 || height <= 0) return;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    overlayCtxRef.current = ctx;
    overlayLoadDrawing();
  };

  useEffect(() => {
    if (drawAnywhere && mainContentRef.current) {
      const timer = setTimeout(initOverlayCanvas, 100);
      return () => clearTimeout(timer);
    }
  }, [drawAnywhere, moduleSlug, topicIndex]);

  useEffect(() => {
    if (!drawAnywhere) return;
    const container = mainContentRef.current;
    if (!container) return;
    const handleUpdate = () => {
      const canvas = overlayCanvasRef.current;
      if (!canvas) return;
      const imageData = canvas.toDataURL('image/png');
      initOverlayCanvas();
      const img = new Image();
      img.onload = () => {
        const ctx = overlayCtxRef.current;
        if (ctx) ctx.drawImage(img, 0, 0);
      };
      img.src = imageData;
    };
    const resizeObserver = new ResizeObserver(handleUpdate);
    resizeObserver.observe(container);
    let scrollTimer;
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleUpdate, 200);
    };
    container.addEventListener('scroll', onScroll);
    const onResize = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleUpdate, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(scrollTimer);
    };
  }, [drawAnywhere]);

  const overlayStartDrawing = (e) => {
    if (!drawAnywhere) return;
    e.preventDefault();
    e.stopPropagation();
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    overlayIsDrawing.current = true;
    overlayPending.current = [];
    overlayDrawPending.current = false;
    overlayLastX.current = x;
    overlayLastY.current = y;
  };

  const overlayProcessPending = () => {
    const ctx = overlayCtxRef.current;
    if (!ctx) { overlayDrawPending.current = false; return; }
    const points = overlayPending.current;
    if (points.length === 0) { overlayDrawPending.current = false; return; }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const allPoints = [{ x: overlayLastX.current, y: overlayLastY.current }, ...points];
    const smoothed = catmullRomSpline(allPoints, 40);
    if (isEraser) ctx.globalCompositeOperation = 'destination-out';
    if (smoothed.length < 2) {
      ctx.beginPath();
      ctx.moveTo(allPoints[0].x, allPoints[0].y);
      for (let i = 1; i < allPoints.length; i++) ctx.lineTo(allPoints[i].x, allPoints[i].y);
      ctx.strokeStyle = isEraser ? '#fff' : drawingColor;
      ctx.lineWidth = isEraser ? 20 : drawingSize;
      ctx.stroke();
      const last = allPoints[allPoints.length - 1];
      overlayLastX.current = last.x;
      overlayLastY.current = last.y;
    } else {
      ctx.beginPath();
      ctx.moveTo(smoothed[0].x, smoothed[0].y);
      for (let i = 1; i < smoothed.length; i++) ctx.lineTo(smoothed[i].x, smoothed[i].y);
      ctx.strokeStyle = isEraser ? '#fff' : drawingColor;
      ctx.lineWidth = isEraser ? 20 : drawingSize;
      ctx.stroke();
      const last = smoothed[smoothed.length - 1];
      overlayLastX.current = last.x;
      overlayLastY.current = last.y;
    }
    ctx.globalCompositeOperation = 'source-over';
    overlayPending.current = [];
    overlayDrawPending.current = false;
    if (overlayPending.current.length > 0) {
      overlayDrawPending.current = true;
      requestAnimationFrame(overlayProcessPending);
    }
  };

  const overlayDraw = (e) => {
    if (!drawAnywhere || !overlayIsDrawing.current) return;
    e.preventDefault();
    e.stopPropagation();
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    overlayPending.current.push({ x, y });
    if (!overlayDrawPending.current) {
      overlayDrawPending.current = true;
      requestAnimationFrame(overlayProcessPending);
    }
  };

  const overlayEndDrawing = (e) => {
    if (!drawAnywhere) return;
    e.preventDefault();
    e.stopPropagation();
    if (overlayIsDrawing.current) {
      if (overlayPending.current.length > 0) {
        if (!overlayDrawPending.current) {
          overlayDrawPending.current = true;
          requestAnimationFrame(() => { overlayProcessPending(); overlaySaveDrawing(); });
        } else {
          const saveAfter = () => {
            if (overlayDrawPending.current) requestAnimationFrame(saveAfter);
            else overlaySaveDrawing();
          };
          requestAnimationFrame(saveAfter);
        }
      } else overlaySaveDrawing();
      overlayIsDrawing.current = false;
    }
  };

  const overlayClear = () => {
    const ctx = overlayCtxRef.current;
    const canvas = overlayCanvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    overlaySaveDrawing();
  };

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

      {/* ---------- HEADER (beautified) ---------- */}
      <header className="relative z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Link to={`/${roadmapData.folder}/roadmap`} className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300 hover:border-sky-500 hover:text-sky-300 hover:shadow-md hover:shadow-sky-500/10 transition-all duration-200">
              <ArrowLeft size={12} /> Roadmap
            </Link>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <Layers size={12} className="text-sky-400" />
                <span>{roadmapData.trackTitle}</span>
              </div>
              <p className="text-[11px] text-slate-400">{segmentData?.title} • {moduleData.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/50">
              <BookOpen size={13} className="text-sky-400" />
              <span className="text-[11px] text-slate-300">Topic {index + 1}/{totalTopics}</span>
              <div className="w-16 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="text-[11px] text-sky-300 font-semibold">{progressPercent}%</span>
            </div>

            <button onClick={() => setShowSidebar(!showSidebar)} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 px-3 py-1.5 text-[11px] font-medium text-slate-200 border border-slate-600 hover:from-sky-600 hover:to-sky-500 hover:border-sky-400 hover:shadow-md hover:shadow-sky-500/20 transition-all duration-200 hover:scale-105 active:scale-95">
              <List size={14} /> <span className="hidden md:inline">{showSidebar ? 'Hide Topics' : 'Show Topics'}</span>
            </button>

            <button onClick={() => setShowRightSidebar(!showRightSidebar)} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 px-3 py-1.5 text-[11px] font-medium text-slate-200 border border-slate-600 hover:from-purple-600 hover:to-purple-500 hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-200 hover:scale-105 active:scale-95">
              {showRightSidebar ? <PanelRightClose size={14} /> : <PanelRight size={14} />}
              <span className="hidden md:inline">{showRightSidebar ? 'Hide Panel' : 'Show Panel'}</span>
            </button>

            <button onClick={() => setHideMain(!hideMain)} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 px-3 py-1.5 text-[11px] font-medium text-slate-200 border border-slate-600 hover:from-amber-600 hover:to-amber-500 hover:border-amber-400 hover:shadow-md hover:shadow-amber-500/20 transition-all duration-200 hover:scale-105 active:scale-95">
              {hideMain ? <Eye size={14} /> : <EyeOff size={14} />}
              <span className="hidden md:inline">{hideMain ? 'Show Topic' : 'Hide Topic'}</span>
            </button>

            <button onClick={() => setDrawAnywhere(!drawAnywhere)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${drawAnywhere ? 'bg-rose-600/90 hover:bg-rose-500 border border-rose-400 text-white shadow-lg shadow-rose-500/30' : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/50 text-white shadow-md hover:shadow-emerald-500/20'}`}>
              <PenTool size={14} /> <span>{drawAnywhere ? 'Exit Draw' : 'Draw Anywhere'}</span>
            </button>

            {showRightSidebar && !hideMain && (
              <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                <span className="text-[10px] text-slate-400 font-medium">Width</span>
                <input type="range" min="30" max="70" step="0.5" value={Math.round(rightSidebarPercent * 100)} onChange={(e) => setRightSidebarPercent(Number(e.target.value) / 100)} className="w-20 h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-sky-400" title="Adjust topic width proportionally" />
                <span className="text-[10px] text-sky-300 font-mono min-w-[36px] text-center">{Math.round(rightSidebarPercent * 100)}%</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              {hasPrev ? (
                <Link to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`} className="inline-flex items-center gap-1 rounded-lg bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-200 border border-slate-700/50 hover:bg-slate-800 hover:border-sky-400 hover:shadow-sm transition-all duration-200">
                  <ArrowLeft size={13} /> <span className="hidden md:inline">Prev</span>
                </Link>
              ) : (
                <button disabled className="inline-flex items-center gap-1 rounded-lg bg-slate-950/50 px-2.5 py-1.5 text-[11px] text-slate-500 border border-slate-800 cursor-not-allowed">
                  <ArrowLeft size={13} /> <span className="hidden md:inline">Prev</span>
                </button>
              )}
              {hasNext ? (
                <Link to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`} className="inline-flex items-center gap-1 rounded-lg bg-sky-600/90 hover:bg-sky-500 px-2.5 py-1.5 text-[11px] text-white border border-sky-400/50 shadow-md hover:shadow-sky-500/20 transition-all duration-200 hover:scale-105 active:scale-95">
                  <span className="hidden md:inline">Next</span> <ArrowRight size={13} />
                </Link>
              ) : (
                <button disabled className="inline-flex items-center gap-1 rounded-lg bg-slate-950/50 px-2.5 py-1.5 text-[11px] text-slate-500 border border-slate-800 cursor-not-allowed">
                  <span className="hidden md:inline">Next</span> <ArrowRight size={13} />
                </button>
              )}
            </div>

            <button type="button" onClick={() => setSidebarOpen(true)} className="inline-flex items-center gap-1 rounded-lg bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-200 border border-slate-700/50 hover:bg-slate-800 hover:border-sky-400 transition-all duration-200 sm:hidden">
              <Menu size={14} /> Topics
            </button>
          </div>
        </div>
      </header>

      {/* ---------- MAIN LAYOUT ---------- */}
      <div className="relative z-20 flex-1 flex justify-center min-h-0">
        <div ref={rowContainerRef} className="w-full flex min-h-[calc(100vh-80px)] row-container">

          {/* ==============================================================
              LEFT SIDEBAR (Desktop)
              ============================================================== */}
          {showSidebar && (
            <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-slate-800 bg-slate-950/60 backdrop-blur-xl pt-6 pb-8 px-4 h-full overflow-y-auto">
              <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">Progress</span>
                  <span className="text-[11px] text-sky-300 font-semibold">{completedCount}/{totalTopics}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${progressPercent}%` }} />
                </div>
                <button type="button" onClick={resetProgress} className="mt-2 text-[11px] text-rose-300 hover:text-rose-400">Reset Progress</button>
              </div>
              <div className="space-y-2 text-sm">
                {moduleData.topics.map((title, i) => {
                  const isActive = i === index;
                  const isCompleted = completedTopics.includes(i);
                  return (
                    <Link key={i} ref={isActive ? activeTopicRef : null} to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`}
                      className={`relative flex items-center gap-3 px-3 py-2 rounded-xl border transition ${isActive ? "border-sky-500 bg-sky-600/90 text-white shadow-lg" : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"}`}>
                      <span className={`absolute left-0 top-0 h-full w-[3px] ${isActive ? "bg-sky-300" : "bg-slate-700"}`} />
                      {isCompleted ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> : <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />}
                      <span className="truncate"><span className="text-sky-300 mr-1 text-xs">{i + 1}.</span>{title}</span>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
                <Link to={`/${roadmapData.folder}/module/${moduleSlug}`} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">← Back to Module Overview</Link>
                <Link to={`/${roadmapData.folder}/roadmap`} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">📍 {roadmapData.subject} Roadmap</Link>
                <a href="/play" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">🧪 CNAT Playground</a>
              </div>
              {/* WhatsApp sharing block (keep as is – omitted for brevity but can be added) */}
            </aside>
          )}

          {/* ==============================================================
              MOBILE SIDEBAR (Drawer)
              ============================================================== */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 pt-4 pb-6 px-4 flex flex-col lg:hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-sky-400" />
                    <span className="text-sm font-semibold text-sky-300">{moduleData.title}</span>
                  </div>
                  <button type="button" onClick={() => setSidebarOpen(false)} className="p-1 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"><X size={14} /></button>
                </div>
                <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-[11px] text-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="uppercase tracking-[0.18em] text-[10px] text-slate-500">Progress</span>
                    <span className="text-sky-300 font-semibold">{completedCount}/{totalTopics}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 border border-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <button type="button" onClick={resetProgress} className="mt-2 text-[10px] text-rose-300 hover:text-rose-400">Reset Progress</button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 text-sm">
                  {moduleData.topics.map((title, i) => {
                    const isActive = i === index;
                    const isCompleted = completedTopics.includes(i);
                    return (
                      <Link key={i} to={`/${roadmapData.folder}/topic/${moduleSlug}/${i}`} onClick={() => setSidebarOpen(false)}
                        className={`relative flex items-center gap-3 px-3 py-2 rounded-xl border transition ${isActive ? "border-sky-500 bg-sky-600/90 text-white shadow-lg" : "border-slate-800 bg-slate-900/90 text-slate-200 hover:bg-slate-800/90"}`}>
                        <span className={`absolute left-0 top-0 h-full w-[3px] ${isActive ? "bg-sky-300" : "bg-slate-700"}`} />
                        {isCompleted ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> : <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0" />}
                        <span className="truncate"><span className="text-sky-300 mr-1 text-xs">{i + 1}.</span>{title}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <Link to={`/${roadmapData.folder}/module/${moduleSlug}`} onClick={() => setSidebarOpen(false)} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">← Back to Module Overview</Link>
                  <Link to={`/${roadmapData.folder}/roadmap`} onClick={() => setSidebarOpen(false)} className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">📍 {roadmapData.subject} Roadmap</Link>
                  <a href="/play" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200">🧪 CNAT Playground</a>
                </div>
              </aside>
            </>
          )}

          {/* ==============================================================
              MAIN CONTENT (Topic Reader)
              ============================================================== */}
          {!hideMain && (
            <main ref={mainContentRef} className="flex-1 px-4 lg:px-8 py-6 lg:py-10 overflow-y-auto h-full relative">
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
                        <span className="inline-flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 px-2 py-[2px] text-[9px] text-sky-300">Topic {index + 1} / {totalTopics}</span>
                        {moduleData.level || "Module"} • {moduleData.difficulty || "Difficulty"}
                      </p>
                      <h1 className="text-xl md:text-2xl font-bold text-sky-300">{topicTitle}</h1>
                      <p className="text-[12px] text-slate-400 mt-1">Module: <span className="text-slate-200">{moduleData.title}</span></p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      {hasPrev ? (
                        <Link to={`/${roadmapData.folder}/topic/${moduleSlug}/${index - 1}`} className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800">
                          <ArrowLeft size={13} /> Prev
                        </Link>
                      ) : (
                        <button disabled className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[11px] text-slate-600">
                          <ArrowLeft size={13} /> Prev
                        </button>
                      )}
                      {hasNext ? (
                        <Link to={`/${roadmapData.folder}/topic/${moduleSlug}/${index + 1}`} className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 border border-sky-500 text-[11px] text-white">
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
                    {TopicPage ? <TopicPage key={topicKey} /> : (
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
                    <h3 className="text-lg font-semibold text-sky-300">Have a Question About This Topic?</h3>
                    <p className="text-sm text-slate-400">Send your doubts directly on WhatsApp. I will reply as soon as possible.</p>
                    <textarea id="waQuery" placeholder="Type your question here..." className="w-full bg-slate-800 text-slate-200 p-3 rounded-xl border border-slate-600 text-sm focus:outline-none focus:border-sky-500" rows={3}></textarea>
                    <button onClick={() => {
                      const msg = document.getElementById("waQuery").value.trim();
                      if (!msg) return alert("Please type your question first.");
                      const phone = "919432456083";
                      const text = encodeURIComponent(`Hello Sir,\nI have a query regarding:\n\n• Module: ${moduleData.title}\n• Topic: ${topicTitle}\n\nMy Question:\n${msg}`);
                      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                    }} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition">
                      📲 Send WhatsApp Query
                    </button>
                  </div>
                </section>
              </div>

              {/* DRAW ANYWHERE CANVAS */}
              {drawAnywhere && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  <canvas
                    ref={overlayCanvasRef}
                    className="w-full h-full pointer-events-auto touch-none"
                    style={{ touchAction: 'none' }}
                    onMouseDown={overlayStartDrawing}
                    onMouseMove={overlayDraw}
                    onMouseUp={overlayEndDrawing}
                    onMouseLeave={overlayEndDrawing}
                    onTouchStart={overlayStartDrawing}
                    onTouchMove={overlayDraw}
                    onTouchEnd={overlayEndDrawing}
                  />
                </div>
              )}
            </main>
          )}

          {/* ==============================================================
              DIVIDER
              ============================================================== */}
          {showRightSidebar && !hideMain && (
            <div ref={dividerRef} className="flex-shrink-0 w-2 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600 hover:from-sky-500 hover:via-sky-400 hover:to-sky-500 cursor-col-resize relative group transition-all duration-200 z-10"
              onMouseDown={startDrag} onTouchStart={startDragTouch}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-sky-400/20 blur-sm" />
              <div className="absolute inset-y-0 -left-3 -right-3 flex items-center justify-center">
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-md px-1 py-2 border border-slate-700 group-hover:border-sky-400 transition-colors duration-200">
                  <GripVertical size={20} className="text-slate-400 group-hover:text-sky-300 transition-colors duration-200" />
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              RIGHT SIDEBAR – with smooth transition
              ============================================================== */}
          {showRightSidebar && (
            <aside
              className="hidden lg:flex flex-col border-l border-slate-800 bg-slate-950/60 backdrop-blur-xl pt-6 pb-8 px-4 h-full"
              style={{
                width: hideMain ? '100%' : `${rightSidebarWidth}px`,
                flexShrink: 0,
                transition: isDragging ? 'none' : 'width 0.15s ease',
                willChange: 'width',
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sky-300 font-semibold text-base flex items-center gap-2">
                    <Pencil size={16} /> {drawMode === 'canvas' ? 'Whiteboard' : 'tldraw'}
                  </h4>
                  <button onClick={() => setDrawMode(drawMode === 'canvas' ? 'tldraw' : 'canvas')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-400 text-xs text-slate-300 hover:text-sky-300 transition-all duration-200">
                    <Palette size={14} /> {drawMode === 'canvas' ? 'Switch to tldraw' : 'Switch to Canvas'}
                  </button>
                </div>

                {drawMode === 'canvas' && (
                  <>
                    <div className="flex flex-wrap items-center gap-2 mb-3 bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                      <input type="color" value={drawingColor} onChange={(e) => { setDrawingColor(e.target.value); setIsEraser(false); }} className="w-7 h-7 p-0 border-0 rounded cursor-pointer bg-transparent" title="Pen color" />
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400">Size</span>
                        <input type="range" min="1" max="20" value={drawingSize} onChange={(e) => { setDrawingSize(Number(e.target.value)); setIsEraser(false); }} className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                        <span className="text-[10px] text-slate-300 w-4">{drawingSize}</span>
                      </div>
                      <button onClick={() => setIsEraser(!isEraser)} className={`p-1.5 rounded-md transition ${isEraser ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} title="Eraser"><Eraser size={14} /></button>
                      <button onClick={clearCanvas} className="p-1.5 rounded-md bg-rose-800/70 hover:bg-rose-700 text-rose-200 transition" title="Clear"><Trash2 size={14} /></button>
                      <button onClick={saveDrawing} className="p-1.5 rounded-md bg-emerald-800/70 hover:bg-emerald-700 text-emerald-200 transition text-[10px] px-2" title="Save now">💾</button>
                    </div>
                    <div className="flex-1 relative border border-slate-700 rounded-xl overflow-hidden bg-slate-900/40">
                      <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseLeave={endDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={endDrawing} className="touch-none w-full h-full" />
                    </div>
                  </>
                )}

                {drawMode === 'tldraw' && (
                  <div className="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
                    <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-slate-800/80 border-b border-slate-700">
                      <span className="text-[10px] text-slate-400 font-medium mr-1">Shortcuts:</span>
                      <div className="flex items-center gap-1.5">
                        {['d','draw','e','eraser','r','rectangle','o','circle','l','line','t','text','v','select'].map((key, i, arr) => {
                          if (i%2===0) {
                            const toolName = arr[i+1];
                            return (
                              <div key={key} onClick={() => handleShortcutClick(key, toolName)} className={`flex items-center gap-0.5 text-[10px] text-slate-300 px-1.5 py-0.5 rounded cursor-pointer transition-all duration-150 ${selectedShortcut === toolName ? 'bg-sky-600/50 border border-sky-400' : 'bg-slate-700/50 hover:bg-slate-600/70'}`}>
                                {toolName === 'draw' && <Pencil size={12} className="text-sky-400" />}
                                {toolName === 'eraser' && <Eraser size={12} className="text-rose-400" />}
                                {toolName === 'rectangle' && <Square size={12} className="text-emerald-400" />}
                                {toolName === 'circle' && <Circle size={12} className="text-purple-400" />}
                                {toolName === 'line' && <Minus size={12} className="text-yellow-400" />}
                                {toolName === 'text' && <Type size={12} className="text-indigo-400" />}
                                {toolName === 'select' && <MousePointer2 size={12} className="text-sky-300" />}
                                <kbd className="text-[9px] font-mono text-slate-400">{key.toUpperCase()}</kbd>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                      {copyFeedback && <span className="text-[10px] text-green-400 ml-2 animate-pulse">{copyFeedback}</span>}
                    </div>
                    <TldrawWrapper onEditorReady={handleEditorReady} />
                  </div>
                )}
                <p className="text-[10px] text-slate-500 mt-2 text-center">{drawMode === 'canvas' ? 'Draw freely · Auto‑saved' : 'Powered by tldraw library'}</p>
              </div>
            </aside>
          )}

        </div>
      </div>

      {/* ==============================================================
          FLOATING TOOLBAR – Draw Anywhere (fixed)
          ============================================================== */}
      {drawAnywhere && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[101] pointer-events-auto flex flex-wrap items-center gap-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl px-3 py-2 shadow-2xl">
          <button onClick={() => setDrawAnywhere(false)} className="p-1.5 rounded-md bg-rose-800/70 hover:bg-rose-700 text-rose-200 transition text-xs font-medium px-3">✕ Exit</button>
          <div className="w-px h-6 bg-slate-700" />
          <input type="color" value={drawingColor} onChange={(e) => { setDrawingColor(e.target.value); setIsEraser(false); }} className="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent" title="Pen color" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400">Size</span>
            <input type="range" min="1" max="20" value={drawingSize} onChange={(e) => { setDrawingSize(Number(e.target.value)); setIsEraser(false); }} className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400" />
            <span className="text-[10px] text-slate-300 w-4">{drawingSize}</span>
          </div>
          <button onClick={() => setIsEraser(!isEraser)} className={`p-1.5 rounded-md transition ${isEraser ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} title="Eraser"><Eraser size={16} /></button>
          <button onClick={overlayClear} className="p-1.5 rounded-md bg-rose-800/70 hover:bg-rose-700 text-rose-200 transition" title="Clear"><Trash2 size={16} /></button>
        </div>
      )}
    </div>
  );
}