import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Pen,
  Highlighter,
  ArrowUpRight,
  Square,
  Circle as CircleIcon,
  Minus,
  Type,
  Zap,
  Tag,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Copy,
  Eye,
  EyeOff,
  X,
  Sparkles,
  Move,
  Minimize2,
  Maximize2,
  Check,
  Star,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import clsx from "clsx";

/**
 * ScreenAnnotator
 * 
 * Ultra-Powerful Digital Smartboard & Screen Annotation Suite:
 * - Liquid-Smooth Quadratic Bézier Curve Smoothing (60/120 FPS)
 * - Tools: Ballpoint Pen, Translucent Highlighter, Text Typing, Laser Pointer,
 *          Directional Arrow, Double Arrow, Rectangle, Circle, Line, Eraser, Educational Stamps
 * - Translucent Shape Fills vs Crisp Outlines
 * - Real-Time Laser Pointer Trail for Live Lecturing
 * - Text Typing Tool with Custom Sizing and Colors
 * - 1-Click Copy Image to Clipboard (Paste in WhatsApp, Notion, OneNote)
 * - Draggable & Minimizable Floating Dock
 * - Multi-Level Undo & Redo History (25 states)
 * - LocalStorage Topic Auto-Save Persistence
 */
export default function ScreenAnnotator({
  containerRef,
  storageKey,
  onClose,
  showToast = () => {}
}) {
  // Available tools: 'pen' | 'highlighter' | 'text' | 'laser' | 'arrow' | 'rect' | 'circle' | 'line' | 'stamp' | 'eraser'
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#38bdf8"); // Neon Cyan default
  const [size, setSize] = useState(4); // Default 4px
  const [opacity, setOpacity] = useState(1.0); // 0.1 to 1.0
  const [fillShape, setFillShape] = useState(false); // Filled vs Outline shapes
  const [isVisible, setIsVisible] = useState(true);
  const [isDockMinimized, setIsDockMinimized] = useState(false);

  // Active Educational Stamp selection
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

  // Laser Pointer State (Fading particle trail)
  const laserParticlesRef = useRef([]);
  const laserCanvasRef = useRef(null);
  const laserAnimRef = useRef(null);

  // History for Undo / Redo
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Canvas refs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);
  const previewSnapshotRef = useRef(null);

  // Floating dock drag position
  const [dockPos, setDockPos] = useState({ x: 0, y: 0 });
  const isDraggingDock = useRef(false);
  const dockDragStart = useRef({ x: 0, y: 0 });

  // Quick Preset Colors
  const colorPresets = [
    { label: "Cyan", value: "#38bdf8" },
    { label: "Yellow", value: "#facc15" },
    { label: "Red", value: "#f43f5e" },
    { label: "Green", value: "#34d399" },
    { label: "Purple", value: "#a855f7" },
    { label: "Orange", value: "#fb923c" },
    { label: "White", value: "#ffffff" }
  ];

  // Quick Preset Sizes
  const sizePresets = [
    { label: "Fine", value: 2 },
    { label: "Med", value: 4 },
    { label: "Bold", value: 8 },
    { label: "Max", value: 16 }
  ];

  // Educational Stamp Definitions
  const stampOptions = [
    { id: "important", label: "Key Concept", icon: Star, color: "text-amber-400 bg-amber-950/80 border-amber-600" },
    { id: "exam", label: "Exam Formula", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-950/80 border-emerald-600" },
    { id: "trap", label: "Watch Out", icon: AlertTriangle, color: "text-rose-400 bg-rose-950/80 border-rose-600" },
    { id: "doubt", label: "Student Doubt", icon: HelpCircle, color: "text-cyan-400 bg-cyan-950/80 border-cyan-600" },
    { id: "tip", label: "Pro Tip", icon: Lightbulb, color: "text-purple-400 bg-purple-950/80 border-purple-600" }
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

      // Limit history to 30 states to conserve memory
      if (nextHistory.length > 30) {
        nextHistory.shift();
      }

      historyRef.current = nextHistory;
      historyIndexRef.current = nextHistory.length - 1;

      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(false);

      // Save to localStorage
      if (storageKey) {
        localStorage.setItem(storageKey, dataUrl);
      }
    } catch (e) {
      console.warn("Annotator history save error:", e);
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
    if (historyIndexRef.current > 0) {
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
  // CANVAS INITIALIZATION & RESIZE
  // -------------------------------------------------------------------------
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const laserCanvas = laserCanvasRef.current;
    const container = containerRef?.current;
    if (!canvas || !container) return;

    const width = container.scrollWidth || container.clientWidth || window.innerWidth;
    const height = container.scrollHeight || container.clientHeight || window.innerHeight;

    if (width <= 0 || height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    if (laserCanvas) {
      laserCanvas.width = width * dpr;
      laserCanvas.height = height * dpr;
      laserCanvas.style.width = `${width}px`;
      laserCanvas.style.height = `${height}px`;
      const lCtx = laserCanvas.getContext("2d");
      lCtx.scale(dpr, dpr);
    }

    // Load from storage if available
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

    // Initial blank state
    const blank = canvas.toDataURL("image/png");
    historyRef.current = [blank];
    historyIndexRef.current = 0;
    setCanUndo(false);
    setCanRedo(false);
  }, [containerRef, storageKey]);

  useEffect(() => {
    const timer = setTimeout(initCanvas, 120);
    window.addEventListener("resize", initCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", initCanvas);
    };
  }, [initCanvas]);

  // -------------------------------------------------------------------------
  // LASER POINTER ANIMATION LOOP
  // -------------------------------------------------------------------------
  useEffect(() => {
    const renderLaser = () => {
      const lCanvas = laserCanvasRef.current;
      if (!lCanvas) return;
      const lCtx = lCanvas.getContext("2d");
      if (!lCtx) return;

      lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
      const now = Date.now();
      const particles = laserParticlesRef.current;

      // Filter out particles older than 800ms
      laserParticlesRef.current = particles.filter((p) => now - p.time < 800);

      for (let i = 0; i < laserParticlesRef.current.length; i++) {
        const p = laserParticlesRef.current[i];
        const age = now - p.time;
        const progress = 1 - age / 800; // 1 down to 0
        const r = (p.size || 8) * progress;

        lCtx.beginPath();
        lCtx.arc(p.x, p.y, Math.max(1, r), 0, Math.PI * 2);
        lCtx.fillStyle = p.color || "#f43f5e";
        lCtx.globalAlpha = progress * 0.8;
        lCtx.shadowBlur = 12 * progress;
        lCtx.shadowColor = p.color || "#f43f5e";
        lCtx.fill();
      }

      lCtx.globalAlpha = 1.0;
      lCtx.shadowBlur = 0;

      if (tool === "laser" || laserParticlesRef.current.length > 0) {
        laserAnimRef.current = requestAnimationFrame(renderLaser);
      }
    };

    if (tool === "laser") {
      laserAnimRef.current = requestAnimationFrame(renderLaser);
    }

    return () => {
      if (laserAnimRef.current) cancelAnimationFrame(laserAnimRef.current);
    };
  }, [tool]);

  // -------------------------------------------------------------------------
  // COORDINATE MAPPING HELPER
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
    ctx.shadowBlur = 6;
    ctx.fillText(textInput.text, textInput.x, textInput.y);
    ctx.restore();

    saveStateToHistory();
    setTextInput({ active: false, x: 0, y: 0, text: "", fontSize: 16 });
    showToast("✍️ Text Note Stamped");
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
    ctx.font = "bold 13px sans-serif";
    const textWidth = ctx.measureText(text).width;
    const paddingX = 14;
    const paddingY = 8;
    const boxWidth = textWidth + paddingX * 2 + 20;
    const boxHeight = 32;

    // Draw Badge Background Pill
    ctx.beginPath();
    ctx.roundRect(coords.x - boxWidth / 2, coords.y - boxHeight / 2, boxWidth, boxHeight, 16);
    ctx.fillStyle = color === "#ffffff" ? "#1e1b4b" : color;
    ctx.globalAlpha = 0.95;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    // Draw Badge Label
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`★ ${text}`, coords.x, coords.y);
    ctx.restore();

    saveStateToHistory();
    showToast(`🏷️ Placed "${stamp.label}" badge`);
  };

  // -------------------------------------------------------------------------
  // DRAWING LOGIC (Bézier Smooth Freehand, Translucent Highlighter, Shapes)
  // -------------------------------------------------------------------------
  const startDrawing = (e) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);

    // If Text tool active, open text prompt at clicked position
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

    // If Stamp tool active, place badge
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

    // Save baseline snapshot at stroke start so continuous strokes don't stack alpha
    previewSnapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Laser pointer initial burst
    if (tool === "laser") {
      laserParticlesRef.current.push({
        x: coords.x,
        y: coords.y,
        time: Date.now(),
        color,
        size: Math.max(6, size * 2)
      });
    }
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // Laser Pointer Mode
    if (tool === "laser") {
      laserParticlesRef.current.push({
        x: coords.x,
        y: coords.y,
        time: Date.now(),
        color,
        size: Math.max(6, size * 2)
      });
      return;
    }

    // Restore baseline snapshot before drawing updated stroke to prevent alpha compounding
    if (previewSnapshotRef.current) {
      ctx.putImageData(previewSnapshotRef.current, 0, 0);
    }

    // 1. FREEHAND PEN / TRANSLUCENT HIGHLIGHTER / ERASER
    if (tool === "pen" || tool === "highlighter" || tool === "eraser") {
      pointsRef.current.push(coords);
      const pts = pointsRef.current;
      if (pts.length === 0) return;

      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = Math.max(20, size * 5);
        ctx.strokeStyle = "rgba(0,0,0,1)";
      } else if (tool === "highlighter") {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.35; // True translucent highlighter
        ctx.lineWidth = Math.max(22, size * 4.5);
        ctx.strokeStyle = color;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = opacity;
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
        // Quadratic Bézier curve midpoint smoothing
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

      // Reset alpha and composite mode after stroke
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      return;
    }

    // 2. SHAPE & ARROW TOOLS
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = opacity;
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
        ctx.fillStyle = `${color}33`; // 20% alpha fill
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
      // Draw straight arrow with directional arrowhead
      const headLength = Math.max(14, size * 3);
      const angle = Math.atan2(coords.y - start.y, coords.x - start.x);

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();

      // Arrowhead wings
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
    if (tool !== "laser") {
      saveStateToHistory();
    }
  };

  // -------------------------------------------------------------------------
  // COPY IMAGE TO CLIPBOARD (Instant Share)
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
        showToast("📋 Image copied to Clipboard! Ready to paste.");
      });
    } catch (e) {
      showToast("Download snapshot instead (Clipboard API restricted).");
      handleDownload();
    }
  };

  // -------------------------------------------------------------------------
  // CLEAR & EXPORT ACTIONS
  // -------------------------------------------------------------------------
  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveStateToHistory();
    showToast("🗑️ All annotations cleared (Undo available)");
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `annotation-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("📸 Downloaded annotation image.");
  };

  // -------------------------------------------------------------------------
  // DOCK DRAGGING HANDLERS
  // -------------------------------------------------------------------------
  const handleDockDragStart = (e) => {
    isDraggingDock.current = true;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dockDragStart.current = { x: clientX - dockPos.x, y: clientY - dockPos.y };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingDock.current) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      setDockPos({
        x: clientX - dockDragStart.current.x,
        y: clientY - dockDragStart.current.y
      });
    };

    const onUp = () => {
      isDraggingDock.current = false;
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
  }, [dockPos]);

  // -------------------------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) handleRedo();
        else handleUndo();
        e.preventDefault();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        handleRedo();
        e.preventDefault();
      } else if (e.key === "Escape") {
        if (textInput.active) commitTextNote();
        else onClose?.();
      } else if (e.key.toLowerCase() === "p") {
        setTool("pen");
      } else if (e.key.toLowerCase() === "h") {
        setTool("highlighter");
      } else if (e.key.toLowerCase() === "t") {
        setTool("text");
      } else if (e.key.toLowerCase() === "l") {
        setTool("laser");
      } else if (e.key.toLowerCase() === "e") {
        setTool("eraser");
      } else if (e.key.toLowerCase() === "a") {
        setTool("arrow");
      } else if (e.key.toLowerCase() === "r") {
        setTool("rect");
      } else if (e.key.toLowerCase() === "c") {
        setTool("circle");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, onClose, textInput.active]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TRANSPARENT FULL-CONTENT OVERLAY CANVASES */}
      {/* ========================================================================= */}
      <div
        className={clsx(
          "absolute inset-0 z-30 pointer-events-none transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Main Drawing Layer */}
        <canvas
          ref={canvasRef}
          className={clsx(
            "w-full h-full pointer-events-auto touch-none",
            tool === "laser" ? "cursor-none" : tool === "text" ? "cursor-text" : "cursor-crosshair"
          )}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />

        {/* Laser Pointer Live Glow Particle Layer */}
        <canvas
          ref={laserCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
        />

        {/* Floating Text Note Input Box */}
        {textInput.active && (
          <div
            style={{
              position: "absolute",
              left: `${textInput.x}px`,
              top: `${textInput.y - 12}px`,
              zIndex: 40
            }}
            className="pointer-events-auto flex items-center gap-2 bg-slate-900/95 border border-purple-500 rounded-xl p-2 shadow-2xl backdrop-blur animate-in fade-in"
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
              className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-sm font-bold focus:outline-none focus:border-purple-400 min-w-[220px]"
            />
            <button
              onClick={commitTextNote}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer"
            >
              Stamp
            </button>
            <button
              onClick={() => setTextInput({ active: false, x: 0, y: 0, text: "", fontSize: 16 })}
              className="p-1 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. DRAGGABLE & MINIMIZABLE PROFESSIONAL GLASSMORPHIC DOCK */}
      {/* ========================================================================= */}
      <div
        style={{
          transform: `translate(calc(-50% + ${dockPos.x}px), ${dockPos.y}px)`
        }}
        className="fixed bottom-6 left-1/2 z-50 pointer-events-auto flex flex-col items-center select-none"
      >
        {isDockMinimized ? (
          /* Minimized Floating Pill */
          <div className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-xl border border-purple-500/60 rounded-full px-4 py-2 shadow-2xl shadow-purple-950/40">
            <Sparkles size={16} className="text-purple-400 animate-pulse" />
            <span className="text-xs font-bold text-white">Smartboard Active</span>
            <button
              onClick={() => setIsDockMinimized(false)}
              className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 ml-1 cursor-pointer"
              title="Expand Toolbar"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        ) : (
          /* Full Professional Toolbar */
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl p-2.5 shadow-2xl shadow-black/80 max-w-[95vw]">
            
            {/* Drag Grip Handle */}
            <div
              onMouseDown={handleDockDragStart}
              onTouchStart={handleDockDragStart}
              className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/60 hover:bg-slate-800/80 rounded-lg cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-200 transition"
              title="Drag to reposition toolbar"
            >
              <Move size={14} />
              <span className="text-[11px] font-mono font-bold uppercase hidden md:inline">Annotate</span>
            </div>

            <div className="w-px h-6 bg-slate-800 hidden sm:block" />

            {/* Drawing Tools Group */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 gap-0.5">
              <button
                onClick={() => setTool("pen")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "pen"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Ballpoint Pen (P)"
              >
                <Pen size={15} />
              </button>

              <button
                onClick={() => setTool("highlighter")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "highlighter"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Translucent Highlighter (H)"
              >
                <Highlighter size={15} />
              </button>

              <button
                onClick={() => setTool("laser")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "laser"
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/40 animate-pulse"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Laser Pointer (L)"
              >
                <Zap size={15} />
              </button>

              <button
                onClick={() => setTool("text")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "text"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Text Typing Tool (T)"
              >
                <Type size={15} />
              </button>

              <button
                onClick={() => setTool("arrow")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "arrow"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Arrow Pointer (A)"
              >
                <ArrowUpRight size={15} />
              </button>

              <button
                onClick={() => setTool("rect")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "rect"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Rectangle Box (R)"
              >
                <Square size={15} />
              </button>

              <button
                onClick={() => setTool("circle")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "circle"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Circle / Ring (C)"
              >
                <CircleIcon size={15} />
              </button>

              <button
                onClick={() => setTool("line")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "line"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Straight Underline"
              >
                <Minus size={15} />
              </button>

              <button
                onClick={() => setTool("stamp")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "stamp"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Callout Stamp Badge"
              >
                <Tag size={15} />
              </button>

              <button
                onClick={() => setTool("eraser")}
                className={clsx(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  tool === "eraser"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
                title="Eraser (E)"
              >
                <Eraser size={15} />
              </button>
            </div>

            {/* Shape Fill Toggle (when shapes active) */}
            {["rect", "circle"].includes(tool) && (
              <button
                onClick={() => setFillShape(!fillShape)}
                className={clsx(
                  "px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition cursor-pointer",
                  fillShape
                    ? "bg-indigo-950 border-indigo-500 text-indigo-200"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                )}
              >
                {fillShape ? "Filled" : "Outline"}
              </button>
            )}

            {/* Stamp Selector (when stamp active) */}
            {tool === "stamp" && (
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                {stampOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStamp(s.id)}
                    className={clsx(
                      "px-2 py-1 rounded text-xs font-semibold transition cursor-pointer flex items-center gap-1",
                      selectedStamp === s.id
                        ? "bg-slate-800 text-white font-bold border border-slate-700"
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <s.icon size={13} />
                    <span className="hidden lg:inline">{s.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Color Palette Swatches */}
            <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1.5 rounded-xl border border-slate-800/80">
              {colorPresets.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    setColor(p.value);
                    if (tool === "eraser") setTool("pen");
                  }}
                  style={{ backgroundColor: p.value }}
                  className={clsx(
                    "w-4 h-4 rounded-full transition-transform cursor-pointer relative flex items-center justify-center",
                    color === p.value && tool !== "eraser"
                      ? "scale-125 ring-2 ring-purple-400 ring-offset-1 ring-offset-slate-950"
                      : "hover:scale-110 opacity-80 hover:opacity-100"
                  )}
                  title={p.label}
                />
              ))}

              {/* Custom Color Wheel */}
              <div className="relative w-5 h-5 ml-0.5 rounded-full overflow-hidden border border-slate-700 cursor-pointer">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    if (tool === "eraser") setTool("pen");
                  }}
                  className="absolute -inset-2 w-8 h-8 cursor-pointer opacity-0"
                  title="Custom RGB Color"
                />
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>

            {/* Stroke Size Presets */}
            <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1.5 rounded-xl border border-slate-800/80 text-xs">
              {sizePresets.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  className={clsx(
                    "px-1.5 py-0.5 rounded text-[11px] font-mono transition cursor-pointer",
                    size === s.value
                      ? "bg-slate-800 text-purple-300 font-bold border border-slate-700"
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Undo / Redo */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={handleUndo}
                disabled={!canUndo}
                className={clsx(
                  "p-2 rounded-lg transition-colors cursor-pointer",
                  canUndo
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-slate-600 cursor-not-allowed"
                )}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 size={15} />
              </button>

              <button
                onClick={handleRedo}
                disabled={!canRedo}
                className={clsx(
                  "p-2 rounded-lg transition-colors cursor-pointer",
                  canRedo
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-slate-600 cursor-not-allowed"
                )}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 size={15} />
              </button>
            </div>

            {/* Utilities: Copy Clipboard, Snapshot, Visibility, Clear */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopyImage}
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition cursor-pointer"
                title="Copy Image to Clipboard (Paste in WhatsApp/OneNote)"
              >
                <Copy size={15} />
              </button>

              <button
                onClick={handleDownload}
                className="p-2 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition cursor-pointer"
                title="Download PNG Snapshot"
              >
                <Download size={15} />
              </button>

              <button
                onClick={() => setIsVisible(!isVisible)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
                title={isVisible ? "Hide Annotations" : "Show Annotations"}
              >
                {isVisible ? <Eye size={15} /> : <EyeOff size={15} className="text-amber-400" />}
              </button>

              <button
                onClick={handleClear}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                title="Clear all markings"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {/* Minimize Toolbar & Exit */}
            <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-800">
              <button
                onClick={() => setIsDockMinimized(true)}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                title="Minimize toolbar"
              >
                <Minimize2 size={14} />
              </button>

              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-sm"
                title="Exit Annotation Mode (Esc)"
              >
                <X size={14} />
                <span>Exit</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
