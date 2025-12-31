import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Textbox, PencilBrush, Line } from "fabric";
import {
  MousePointer2, Pencil, Square, Circle as CircleIcon,
  Download, Undo, Redo, Type, Trash, Grid3X3, Copy, ArrowUp, ArrowDown
} from "lucide-react";
import { saveAs } from "file-saver";

export default function Whiteboard() {

  const canvasRef = useRef(null);
  const board = useRef(null);
  const history = useRef([]);
  const redoStack = useRef([]);
  const restoring = useRef(false);

  const drawingObj = useRef(null);
  const start = useRef({ x: 0, y: 0 });

  const gridLines = useRef([]);
  const [showGrid, setShowGrid] = useState(false);

  const [tool, setTool] = useState("select");
  const [strokeColor, setStrokeColor] = useState("#38bdf8");
  const [fillColor, setFillColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [bgColor, setBgColor] = useState("#0f172a");

  /* ============== INIT ============== */

  useEffect(() => {
    const c = board.current;
    if (!c) return;

    c.backgroundColor = bgColor;
    c.renderAll();
  }, [bgColor]);

  useEffect(() => {
    const c = new Canvas(canvasRef.current, {
      backgroundColor: "#0f172a",
      preserveObjectStacking: true,
      selection: true
    });

    board.current = c;

    let ctrlDown = false;

    window.addEventListener("keydown", e => {
      if (e.key === "Control") ctrlDown = true;
    });
    window.addEventListener("keyup", e => {
      if (e.key === "Control") ctrlDown = false;
    });

    c.on("mouse:wheel", opt => {
      if (!ctrlDown) return;   // 🛡 only zoom with Ctrl

      let zoom = c.getZoom();
      zoom *= 0.999 ** opt.e.deltaY;
      zoom = Math.min(3, Math.max(0.5, zoom));
      c.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);

      opt.e.preventDefault();
      opt.e.stopPropagation();
    });



    const save = () => {
      if (restoring.current) return;
      history.current.push(JSON.stringify(c.toJSON()));
      redoStack.current = [];
    };

    c.on("mouse:up", save);
    c.on("object:modified", save);
    save();

    const handleKey = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const obj = c.getActiveObject();
        if (!obj) return;
        if (obj.type === "activeSelection") obj.forEachObject(o => c.remove(o));
        else c.remove(obj);
        c.discardActiveObject();
        c.requestRenderAll();
        save();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      c.dispose();
    };
  }, []);

  /* ============== TOOL HANDLING ============== */
  useEffect(() => {
    const c = board.current;
    if (!c) return;

    c.isDrawingMode = tool === "draw";

    if (tool === "draw") {
      c.freeDrawingBrush = new PencilBrush(c);
      c.freeDrawingBrush.color = strokeColor;
      c.freeDrawingBrush.width = lineWidth;
    }

    c.off("mouse:down");
    c.off("mouse:move");
    c.off("mouse:up");

    if (tool === "rect" || tool === "circle") {
      c.on("mouse:down", (opt) => {
        const p = c.getScenePoint(opt.e);
        start.current = p;

        drawingObj.current =
          tool === "rect"
            ? new Rect({ left: p.x, top: p.y, width: 1, height: 1, stroke: strokeColor, strokeWidth: lineWidth, fill: fillColor })
            : new Circle({ left: p.x, top: p.y, radius: 1, stroke: strokeColor, strokeWidth: lineWidth, fill: fillColor });

        c.add(drawingObj.current);
      });

      c.on("mouse:move", (opt) => {
        if (!drawingObj.current) return;
        let p = c.getScenePoint(opt.e);
        if (showGrid && tool !== "draw") {
          p = { x: snap(p.x), y: snap(p.y) };
        }

        if (tool === "rect") {
          const x = Math.min(p.x, start.current.x);
          const y = Math.min(p.y, start.current.y);
          let w = Math.abs(p.x - start.current.x);
          let h = Math.abs(p.y - start.current.y);

          if (opt.e.shiftKey) {
            const size = Math.max(w, h);
            w = h = size;
          }
          drawingObj.current.set({ left: x, top: y, width: w || 1, height: h || 1 });
        }

        if (tool === "circle") {
          let r = Math.max(Math.abs(p.x - start.current.x), Math.abs(p.y - start.current.y));
          if (opt.e.shiftKey) r = r;
          drawingObj.current.set({ radius: r / 2 });
        }

        drawingObj.current.setCoords();
        c.requestRenderAll();
      });

      c.on("mouse:up", () => {
        drawingObj.current = null;
        setTool("select");
      });
    }
  }, [tool, strokeColor, fillColor, lineWidth]);

  /* ============== STYLE UPDATE ============== */
  useEffect(() => {
    const c = board.current;
    const obj = c?.getActiveObject();
    if (!obj) return;
    obj.set({ stroke: strokeColor, fill: fillColor, strokeWidth: lineWidth });
    c.requestRenderAll();
  }, [strokeColor, fillColor, lineWidth]);

  /* ============== HISTORY ============== */
  const undo = () => {
    if (history.current.length < 2) return;
    restoring.current = true;
    redoStack.current.push(history.current.pop());
    board.current.loadFromJSON(history.current.at(-1), () => {
      board.current.renderAll();
      restoring.current = false;
    });
  };

  const redo = () => {
    if (!redoStack.current.length) return;
    restoring.current = true;
    const next = redoStack.current.pop();
    history.current.push(next);
    board.current.loadFromJSON(next, () => {
      board.current.renderAll();
      restoring.current = false;
    });
  };

  const clearCanvas = () => {
    board.current.getObjects().forEach(o => board.current.remove(o));
    board.current.renderAll();
  };

  /* ============== NEW FEATURES ============== */
  // const snap = (v, size = 20) => Math.round(v / size) * size;
  // const snap = (v, size = 20) => showGrid ? Math.round(v / size) * size : v;
  const snap = (v, size = 20) => {
    if (!showGrid) return v;
    return Math.round(v / size) * size;
  };
  const toggleGrid = () => {
    const c = board.current;
    if (!c) return;

    if (!showGrid) {
      const size = 20;   // 🔹 grid cell size
      for (let i = 0; i < 1100; i += size) {
        const v = new Line([i, 0, i, 600], { stroke: "#1e293b", selectable: false, evented: false });
        const h = new Line([0, i, 1100, i], { stroke: "#1e293b", selectable: false, evented: false });
        gridLines.current.push(v, h);
        c.add(v); c.add(h);
      }
    } else {
      gridLines.current.forEach(l => c.remove(l));
      gridLines.current = [];
    }
    setShowGrid(!showGrid);
    c.requestRenderAll();
  };

  const duplicateObject = () => {
    const c = board.current;
    const active = c.getActiveObject();
    if (!active) return;

    if (active.type === "activeSelection") {
      const objects = active.getObjects();
      c.discardActiveObject();

      objects.forEach(obj => {
        obj.clone(clone => {
          clone.set({
            left: obj.left + 30,
            top: obj.top + 30
          });
          c.add(clone);
        });
      });

    } else {
      active.clone(clone => {
        clone.set({
          left: active.left + 30,
          top: active.top + 30
        });
        c.add(clone);
        c.setActiveObject(clone);
      });
    }

    c.requestRenderAll();
  };





  const bringToFront = () => {
    const c = board.current;
    const obj = c.getActiveObject();
    if (!obj) return;

    c.remove(obj);
    c.add(obj);
    c.setActiveObject(obj);
    c.requestRenderAll();
  };

  const sendToBack = () => {
    const c = board.current;
    const obj = c.getActiveObject();
    if (!obj) return;

    c.remove(obj);
    c.insertAt(0, obj);
    c.setActiveObject(obj);
    c.requestRenderAll();
  };

  const exportPNG = () => {
    const url = board.current.toDataURL({ format: "png" });
    fetch(url).then(r => r.blob()).then(b => saveAs(b, "whiteboard.png"));
  };

  const btn = (n) =>
    `p-2 rounded-md ${tool === n ? "bg-sky-600 text-white" : "text-slate-300 hover:bg-slate-700"}`;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl">
      <div className="flex flex-wrap gap-2 p-3 bg-slate-800 border-b border-slate-700">
        <button className={btn("select")} onClick={() => setTool("select")}><MousePointer2 size={18} /></button>
        <button className={btn("draw")} onClick={() => setTool("draw")}><Pencil size={18} /></button>
        <button className={btn("rect")} onClick={() => setTool("rect")}><Square size={18} /></button>
        <button className={btn("circle")} onClick={() => setTool("circle")}><CircleIcon size={18} /></button>
        <button onClick={() => board.current.add(new Textbox("Type here", { left: 100, top: 100, fill: strokeColor, fontSize: 16, width: 200 }))}><Type size={18} /></button>
        <button onClick={undo}><Undo size={18} /></button>
        <button onClick={redo}><Redo size={18} /></button>
        <button onClick={clearCanvas}><Trash size={18} /></button>
        <button onClick={toggleGrid}><Grid3X3 size={18} /></button>
        <button onClick={duplicateObject}><Copy size={18} /></button>
        <button onClick={bringToFront}><ArrowUp size={18} /></button>
        <button onClick={sendToBack}><ArrowDown size={18} /></button>
        <button onClick={exportPNG}><Download size={18} /></button>

        <input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} />
        <input type="color" value={fillColor} onChange={e => setFillColor(e.target.value)} />
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          title="Canvas Background"
        />

        <input type="range" min="1" max="10" value={lineWidth} onChange={e => setLineWidth(+e.target.value)} />
      </div>

      <canvas ref={canvasRef} width={1100} height={600} />
    </div>
  );
}
