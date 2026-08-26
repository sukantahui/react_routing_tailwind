import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Pen,
  Highlighter,
  Type,
  ArrowUpRight,
  Square,
  Circle as CircleIcon,
  Minus,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Copy,
  Grid,
  AlignLeft,
  Sparkles,
  Tag,
  Star,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  MoveVertical,
  ArrowUp,
  ArrowDown,
  Plus,
  Maximize2,
  Minimize2,
  Move,
  LayoutTemplate
} from "lucide-react";
import clsx from "clsx";

/**
 * StudyWhiteboard
 * 
 * Ultra-Flexible Digital Blackboard with Vertical Infinite Scroll & Free Floating:
 * - Vertical Infinite Canvas (2400px+ with smooth scroll, quick Top/Bottom jump, & +600px extend)
 * - Free Floating & Draggable Mode: Pop out and place whiteboard at ANY vertical screen position
 * - Liquid-Smooth Quadratic Bézier Curve Smoothing (60/120 FPS)
 * - Tools: Pen, Highlighter, Text, Arrow, Rectangle, Circle, Line, Eraser, Stamps
 * - Grid Styles: Dark Plain, Engineering Grid, Notebook Ruled, Pure White
 * - Multi-Level Undo & Redo History
 * - 1-Click Copy Image to Clipboard & High-Res PNG Download
 * - Topic LocalStorage Auto-Save Persistence
 */
export default function StudyWhiteboard({
  storageKey,
  topicTitle = "Whiteboard",
  showToast = () => {}
}) {
  // Available tools: 'pen' | 'highlighter' | 'text' | 'arrow' | 'rect' | 'circle' | 'line' | 'stamp' | 'eraser'
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#38bdf8"); // Neon Cyan
  const [size, setSize] = useState(3);
  const [fillShape, setFillShape] = useState(false);
  const [bgStyle, setBgStyle] = useState("grid"); // 'plain' | 'grid' | 'ruled' | 'light'

  // Vertical Infinite Board State
  const [canvasHeight, setCanvasHeight] = useState(2400); // 2400px initial vertical workspace
  const scrollContainerRef = useRef(null);

  // Floating Pop-Out Mode (Can be dragged to any vertical position on screen)
  const [isFloating, setIsFloating] = useState(false);
  const [floatingPos, setFloatingPos] = useState({ x: 0, y: 0 });
  const isDraggingFloating = useRef(false);
  const floatingDragStart = useRef({ x: 0, y: 0 });

  // Educational Stamp state
  const [selectedStamp, setSelectedStamp] = useState("important");

  // Text Tool State
  const [textInput, setTextInput] = useState({
    active: false,
    x: 0,
    y: 0,
    text: "",
    fontSize: 16
  });
  const textInputRef = useRef(null);

  // History for Undo / Redo
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Canvas Refs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);
  const previewSnapshotRef = useRef(null);

  // Quick Preset Colors
  const colorPresets = [
    { label: "Cyan", value: "#38bdf8" },
    { label: "Yellow", value: "#facc15" },
    { label: "Red", value: "#f43f5e" },
    { label: "Green", value: "#34d399" },
    { label: "Purple", value: "#a855f7" },
    { label: "White", value: "#ffffff" }
  ];

  // Quick Preset Sizes
  const sizePresets = [
    { label: "Fine", value: 2 },
    { label: "Med", value: 4 },
    { label: "Bold", value: 7 },
    { label: "Broad", value: 14 }
  ];

  // Stamps Definitions
  const stampOptions = [
    { id: "important", label: "Key Concept", icon: Star, bg: "#f59e0b" },
    { id: "exam", label: "Exam Formula", icon: CheckCircle2, bg: "#10b981" },
    { id: "trap", label: "Watch Out", icon: AlertTriangle, bg: "#f43f5e" },
    { id: "doubt", label: "Doubt", icon: HelpCircle, bg: "#06b6d4" },
    { id: "tip", label: "Pro Tip", icon: Lightbulb, bg: "#8b5cf6" }
  ];

  // -------------------------------------------------------------------------
  // HISTORY MANAGEMENT (Undo / Redo)
  // -------------------------------------------------------------------------
  const saveStateToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const nextHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
      nextHistory.push(dataUrl);

      if (nextHistory.length > 25) {
        nextHistory.shift();
      }

      historyRef.current = nextHistory;
      historyIndexRef.current = nextHistory.length - 1;

      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(false);

      if (storageKey) {
        localStorage.setItem(storageKey, dataUrl);
      }
    } catch (e) {
      console.warn("Whiteboard save error:", e);
    }
  }, [storageKey]);

  const restoreState = useCallback((index) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || index < 0 || index >= historyRef.current.length) return;

    const dataUrl = historyRef.current[index];
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      historyIndexRef.current = index;
      setCanUndo(index > 0);
      setCanRedo(index < historyRef.current.length - 1);

      if (storageKey) {
        localStorage.setItem(storageKey, dataUrl);
      }
    };
    img.src = dataUrl;
  }, [storageKey]);

  const handleUndo = useCallback(() => {
    if (historyIndexRef.current &gt; 0) {
      restoreState(historyIndexRef.current - 1);
      showToast("↩️ Undone");
    }
  }, [restoreState, showToast]);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      restoreState(historyIndexRef.current + 1);
      showToast("↪️ Redone");
    }
  }, [restoreState, showToast]);

  // -------------------------------------------------------------------------
  // CANVAS INITIALIZATION & RESIZE (High-DPI Retina Scaled)
  // -------------------------------------------------------------------------
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!canvas || !scrollContainer) return;

    const width = scrollContainer.clientWidth || 600;
    const height = canvasHeight;
    if (width &le; 0 || height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    
    // Save current drawing image before resizing to prevent content loss
    let previousImage = null;
    if (ctxRef.current && canvas.width > 0 && canvas.height &gt; 0) {
      try {
        previousImage = canvas.toDataURL("image/png");
      } catch (e) {
        void e;
      }
    }

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // Restore previous drawing or load from storage
    if (previousImage) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = previousImage;
      return;
    }

    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          historyRef.current = [saved];
          historyIndexRef.current = 0;
          setCanUndo(false);
          setCanRedo(false);
        };
        img.src = saved;
        return;
      }
    }

    const blank = canvas.toDataURL("image/png");
    historyRef.current = [blank];
    historyIndexRef.current = 0;
    setCanUndo(false);
    setCanRedo(false);
  }, [storageKey, canvasHeight]);

  useEffect(() => {
    const timer = setTimeout(initCanvas, 120);
    window.addEventListener("resize", initCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", initCanvas);
    };
  }, [initCanvas]);

  // -------------------------------------------------------------------------
  // VERTICAL SCROLL NAVIGATION (Top, Bottom, +600px Extend)
  // -------------------------------------------------------------------------
  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  const handleExtendHeight = () => {
    setCanvasHeight((prev) => prev + 800);
    showToast("📏 Canvas vertically extended +800px!");
  };

  // -------------------------------------------------------------------------
  // COORDINATE MAPPING HELPER (Scroll Aware)
  // -------------------------------------------------------------------------
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width / (window.devicePixelRatio || 1)),
      y: (clientY - rect.top) * (canvas.height / rect.height / (window.devicePixelRatio || 1))
    };
  };

  // -------------------------------------------------------------------------
  // TEXT NOTE TOOL COMMIT HANDLER
  // -------------------------------------------------------------------------
  const commitTextNote = () => {
    if (!textInput.active || !textInput.text.trim()) {
      setTextInput({ active: false, x: 0, y: 0, text: "", fontSize: 16 });
      return;
    }

    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.save();
    ctx.font = `bold ${textInput.fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    ctx.fillText(textInput.text, textInput.x, textInput.y);
    ctx.restore();

    saveStateToHistory();
    setTextInput({ active: false, x: 0, y: 0, text: "", fontSize: 16 });
    showToast("✍️ Text Note Added");
  };

  // -------------------------------------------------------------------------
  // EDUCATIONAL STAMP PLACER
  // -------------------------------------------------------------------------
  const placeStamp = (coords) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const stamp = stampOptions.find((s) => s.id === selectedStamp) || stampOptions[0];
    const text = stamp.label.toUpperCase();

    ctx.save();
    ctx.font = "bold 12px sans-serif";
    const textWidth = ctx.measureText(text).width;
    const boxWidth = textWidth + 34;
    const boxHeight = 28;

    ctx.beginPath();
    ctx.roundRect(coords.x - boxWidth / 2, coords.y - boxHeight / 2, boxWidth, boxHeight, 14);
    ctx.fillStyle = stamp.bg || color;
    ctx.globalAlpha = 0.95;
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`★ ${text}`, coords.x, coords.y);
    ctx.restore();

    saveStateToHistory();
    showToast(`🏷️ Stamped "${stamp.label}"`);
  };

  // -------------------------------------------------------------------------
  // DRAWING LOGIC (Bézier Smoothing, Translucent Highlighter, Shapes)
  // -------------------------------------------------------------------------
  const startDrawing = (e) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);

    if (tool === "text") {
      commitTextNote();
      setTextInput({
        active: true,
        x: coords.x,
        y: coords.y,
        text: "",
        fontSize: Math.max(14, size * 4)
      });
      setTimeout(() => textInputRef.current?.focus(), 50);
      return;
    }

    if (tool === "stamp") {
      placeStamp(coords);
      return;
    }

    isDrawingRef.current = true;
    startPosRef.current = coords;
    pointsRef.current = [coords];

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    previewSnapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    if (previewSnapshotRef.current) {
      ctx.putImageData(previewSnapshotRef.current, 0, 0);
    }

    // 1. FREEHAND PEN / HIGHLIGHTER / ERASER
    if (tool === "pen" || tool === "highlighter" || tool === "eraser") {
      pointsRef.current.push(coords);
      const pts = pointsRef.current;
      if (pts.length === 0) return;

      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = Math.max(22, size * 5);
        ctx.strokeStyle = "rgba(0,0,0,1)";
      } else if (tool === "highlighter") {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.35; // True translucent highlighter
        ctx.lineWidth = Math.max(20, size * 4);
        ctx.strokeStyle = color;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      if (pts.length < 3) {
        const b = pts[0];
        ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
      } else {
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 2; i++) {
          const c = (pts[i].x + pts[i + 1].x) / 2;
          const d = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, c, d);
        }
        const last = pts.length - 1;
        ctx.quadraticCurveTo(
          pts[last - 1].x,
          pts[last - 1].y,
          pts[last].x,
          pts[last].y
        );
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      return;
    }

    // 2. SHAPE & ARROW TOOLS
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const start = startPosRef.current;

    if (tool === "line") {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (tool === "rect") {
      if (fillShape) {
        ctx.fillStyle = `${color}33`;
        ctx.fillRect(start.x, start.y, coords.x - start.x, coords.y - start.y);
      }
      ctx.strokeRect(start.x, start.y, coords.x - start.x, coords.y - start.y);
    } else if (tool === "circle") {
      const radiusX = Math.abs(coords.x - start.x) / 2;
      const radiusY = Math.abs(coords.y - start.y) / 2;
      const centerX = Math.min(start.x, coords.x) + radiusX;
      const centerY = Math.min(start.y, coords.y) + radiusY;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      if (fillShape) {
        ctx.fillStyle = `${color}33`;
        ctx.fill();
      }
      ctx.stroke();
    } else if (tool === "arrow") {
      const headLength = Math.max(14, size * 3);
      const angle = Math.atan2(coords.y - start.y, coords.x - start.x);

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(
        coords.x - headLength * Math.cos(angle - Math.PI / 6),
        coords.y - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(
        coords.x - headLength * Math.cos(angle + Math.PI / 6),
        coords.y - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }
  };

  const endDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    pointsRef.current = [];
    previewSnapshotRef.current = null;
    saveStateToHistory();
  };

  // -------------------------------------------------------------------------
  // CLIPBOARD COPY & DOWNLOAD ACTIONS
  // -------------------------------------------------------------------------
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        showToast("📋 Full whiteboard copied to Clipboard!");
      });
    } catch (e) {
      handleDownload();
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("📸 Downloaded whiteboard PNG.");
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveStateToHistory();
    showToast("🗑️ Whiteboard cleared (Undo available)");
  };

  // -------------------------------------------------------------------------
  // DRAGGABLE FLOATING WINDOW HANDLERS
  // -------------------------------------------------------------------------
  const handleFloatingDragStart = (e) => {
    isDraggingFloating.current = true;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    floatingDragStart.current = { x: clientX - floatingPos.x, y: clientY - floatingPos.y };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingFloating.current) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      setFloatingPos({
        x: clientX - floatingDragStart.current.x,
        y: clientY - floatingDragStart.current.y
      });
    };

    const onUp = () => {
      isDraggingFloating.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [floatingPos]);

  // -------------------------------------------------------------------------
  // BACKGROUND PATTERNS
  // -------------------------------------------------------------------------
  const getBgClass = () => {
    switch (bgStyle) {
      case "grid":
        return "bg-slate-950 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]";
      case "ruled":
        return "bg-slate-950 bg-[linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:100%_28px]";
      case "light":
        return "bg-slate-100";
      default:
        return "bg-slate-950";
    }
  };

  const content = (
    <div className="flex-1 flex flex-col min-h-0 space-y-2 select-none h-full">
      {/* ========================================================================= */}
      {/* 1. TOP CONTROLS & VERTICAL POSITION NAVIGATOR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 p-2 bg-slate-900/95 rounded-2xl border border-slate-800 text-xs shadow-md">
        
        {/* Drag Handle (if in floating mode) */}
        {isFloating && (
          <div
            onMouseDown={handleFloatingDragStart}
            onTouchStart={handleFloatingDragStart}
            className="flex items-center gap-1 px-2 py-1 bg-slate-950/80 hover:bg-slate-800 rounded-lg cursor-grab active:cursor-grabbing text-purple-400"
            title="Drag to reposition whiteboard anywhere on screen"
          >
            <Move size={14} />
            <span className="font-bold text-[10px] uppercase">Move</span>
          </div>
        )}

        {/* Tools Cluster */}
        <div className="flex items-center bg-slate-950/90 p-0.5 rounded-xl border border-slate-800/80 gap-0.5">
          <button
            onClick={() => setTool("pen")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "pen"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Ballpoint Pen"
          &gt;
            <Pen size={13} />
          </button>

          <button
            onClick={() => setTool("highlighter")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "highlighter"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Translucent Highlighter"
          &gt;
            <Highlighter size={13} />
          </button>

          <button
            onClick={() => setTool("text")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "text"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Text Note"
          &gt;
            <Type size={13} />
          </button>

          <button
            onClick={() => setTool("arrow")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "arrow"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Directional Arrow"
          &gt;
            <ArrowUpRight size={13} />
          </button>

          <button
            onClick={() => setTool("rect")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "rect"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Rectangle Box"
          &gt;
            <Square size={13} />
          </button>

          <button
            onClick={() => setTool("circle")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "circle"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Circle / Ring"
          &gt;
            <CircleIcon size={13} />
          </button>

          <button
            onClick={() => setTool("line")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "line"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Straight Line"
          &gt;
            <Minus size={13} />
          </button>

          <button
            onClick={() => setTool("stamp")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "stamp"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Educational Stamps"
          &gt;
            <Tag size={13} />
          </button>

          <button
            onClick={() => setTool("eraser")}
            className={clsx(
              "p-1.5 rounded-lg transition cursor-pointer",
              tool === "eraser"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
            title="Eraser"
          &gt;
            <Eraser size={13} />
          </button>
        </div>

        {/* Color Palette Swatches */}
        <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-xl border border-slate-800/80">
          {colorPresets.map((p) => (
            <button
              key={p.value}
              onClick={() => {
                setColor(p.value);
                if (tool === "eraser") setTool("pen");
              }}
              style={{ backgroundColor: p.value }}
              className={clsx(
                "w-3 h-3 rounded-full transition-transform cursor-pointer relative",
                color === p.value && tool !== "eraser"
                  ? "scale-125 ring-2 ring-purple-400 ring-offset-1 ring-offset-slate-950"
                  : "hover:scale-110 opacity-80 hover:opacity-100"
              )}
              title={p.label}
            /&gt;
          ))}

          {/* Custom Color Wheel */}
          <div className="relative w-3.5 h-3.5 ml-0.5 rounded-full overflow-hidden border border-slate-700 cursor-pointer">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                if (tool === "eraser") setTool("pen");
              }}
              className="absolute -inset-2 w-8 h-8 cursor-pointer opacity-0"
              title="Custom Color"
            /&gt;
            <div
              className="w-full h-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        {/* Vertical Position Navigator & Canvas Height Controls */}
        <div className="flex items-center gap-0.5 bg-slate-950/90 p-0.5 rounded-xl border border-slate-800/80 text-[10px] font-mono">
          <button
            onClick={scrollToTop}
            className="px-1.5 py-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-0.5 cursor-pointer"
            title="Jump to Top of Whiteboard"
          >
            <ArrowUp size={11} />
            <span>Top</span>
          </button>
          <button
            onClick={scrollToBottom}
            className="px-1.5 py-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-0.5 cursor-pointer"
            title="Jump to Bottom of Whiteboard"
          >
            <ArrowDown size={11} />
            <span>End</span>
          </button>
          <button
            onClick={handleExtendHeight}
            className="px-1.5 py-1 rounded bg-purple-950/80 border border-purple-800/60 text-purple-200 hover:bg-purple-900 flex items-center gap-0.5 cursor-pointer font-bold"
            title="Add +800px Vertical Writing Space"
          >
            <Plus size={11} />
            <span>Extend</span>
          </button>
        </div>

        {/* Floating Mode Toggle & Utilities */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsFloating(!isFloating)}
            className={clsx(
              "p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 text-[11px]",
              isFloating
                ? "bg-purple-600 border-purple-400 text-white font-bold shadow-md"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
            )}
            title={isFloating ? "Dock back to Sidebar" : "Float Whiteboard Anywhere on Screen"}
          &gt;
            <LayoutTemplate size={13} />
            <span className="hidden sm:inline">{isFloating ? "Dock" : "Float"}</span>
          </button>

          <button
            onClick={handleCopyImage}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition cursor-pointer"
            title="Copy Image to Clipboard"
          >
            <Copy size={13} />
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition cursor-pointer"
            title="Download PNG Snapshot"
          >
            <Download size={13} />
          </button>

          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
            title="Clear Whiteboard"
          >
            <Trash2 size={13} />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. VERTICALLY SCROLLABLE EXTENDED WORKSPACE CANVAS */}
      {/* ========================================================================= */}
      <div
        ref={scrollContainerRef}
        className={clsx(
          "flex-1 relative border border-slate-800 rounded-2xl overflow-y-auto overflow-x-hidden shadow-inner custom-scrollbar transition-colors",
          getBgClass()
        )}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          className={clsx(
            "touch-none w-full block",
            tool === "text" ? "cursor-text" : "cursor-crosshair"
          )}
        />

        {/* Text Note Input Overlay */}
        {textInput.active && (
          <div
            style={{
              position: "absolute",
              left: `${textInput.x}px`,
              top: `${textInput.y - 12}px`,
              zIndex: 30
            }}
            className="flex items-center gap-1.5 bg-slate-900/95 border border-purple-500 rounded-xl p-1.5 shadow-2xl backdrop-blur animate-in fade-in"
          >
            <input
              ref={textInputRef}
              type="text"
              value={textInput.text}
              onChange={(e) => setTextInput((prev) => ({ ...prev, text: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitTextNote();
                if (e.key === "Escape") setTextInput({ active: false, x: 0, y: 0, text: "", fontSize: 16 });
              }}
              placeholder="Type note & press Enter..."
              style={{ color }}
              className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-bold focus:outline-none focus:border-purple-400 min-w-[180px]"
            />
            <button
              onClick={commitTextNote}
              className="px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold transition cursor-pointer"
            >
              Add
            </button>
            <button
              onClick={() => setTextInput({ active: false, x: 0, y: 0, text: "", fontSize: 16 })}
              className="p-1 text-slate-400 hover:text-white text-xs"
            &gt;
              ✕
            </button>
          </div>
        )}
      </div>

    </div>
  );

  // If floating mode is active, render as a draggable floating panel anywhere on screen
  if (isFloating) {
    return (
      <div
        style={{
          position: "fixed",
          left: `calc(50% + ${floatingPos.x}px)`,
          top: `calc(50% + ${floatingPos.y}px)`,
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(680px, 92vw)",
          height: "min(720px, 85vh)"
        }}
        className="bg-slate-900/98 backdrop-blur-2xl border-2 border-purple-500/80 rounded-3xl p-3 shadow-2xl shadow-black flex flex-col"
      >
        {content}
      </div>
    );
  }

  return content;
}
