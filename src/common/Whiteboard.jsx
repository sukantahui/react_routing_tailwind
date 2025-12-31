import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Textbox, PencilBrush } from "fabric";
import {
  MousePointer2,
  Pencil,
  Square,
  Circle as CircleIcon,
  Trash2,
  Download,
  Undo,
  Redo,
  Type,
  PaintBucket
} from "lucide-react";
import { saveAs } from "file-saver";

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const board = useRef(null);
  const history = useRef([]);
  const redoStack = useRef([]);
  const restoring = useRef(false);

  const [tool, setTool] = useState("select");
  const [strokeColor, setStrokeColor] = useState("#38bdf8");
  const [fillColor, setFillColor] = useState("transparent");
  const [lineWidth, setLineWidth] = useState(2);

  // ================= INIT =================
  useEffect(() => {
    const c = new Canvas(canvasRef.current, {
      backgroundColor: "#0f172a",
      preserveObjectStacking: true,
      selection: true
    });

    board.current = c;

    const save = () => {
      if (restoring.current) return;
      history.current.push(JSON.stringify(c.toJSON()));
      redoStack.current = [];
    };

    c.on("mouse:up", save);
    c.on("object:modified", save);
    save();

    const handleKey = (e) => {
      if (e.key === "Delete") {
        const obj = c.getActiveObject();
        if (!obj) return;

        if (obj.type === "activeSelection") {
          obj.forEachObject(o => c.remove(o));
          c.discardActiveObject();
        } else c.remove(obj);

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

  const btn = (name) =>
    `p-2 rounded-md transition ${
      tool === name
        ? "bg-sky-600 text-white shadow"
        : "text-slate-300 hover:bg-slate-700"
    }`;

  // ================= TOOLS =================

  const selectTool = () => {
    board.current.isDrawingMode = false;
    setTool("select");
  };

  const draw = () => {
    const c = board.current;
    c.isDrawingMode = true;
    c.freeDrawingBrush = new PencilBrush(c);
    c.freeDrawingBrush.color = strokeColor;
    c.freeDrawingBrush.width = lineWidth;
    setTool("draw");
  };

  const rect = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Rect({
      left: 120,
      top: 120,
      width: 120,
      height: 70,
      stroke: strokeColor,
      strokeWidth: lineWidth,
      fill: fillColor,
      strokeUniform: true
    }));
    setTool("rect");
  };

  const circle = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Circle({
      left: 200,
      top: 200,
      radius: 40,
      stroke: strokeColor,
      strokeWidth: lineWidth,
      fill: fillColor,
      strokeUniform: true
    }));
    setTool("circle");
  };

  const text = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Textbox("Type here", {
      left: 220,
      top: 180,
      fill: strokeColor,
      fontSize: 18 + lineWidth,
      strokeUniform: true
    }));
    setTool("text");
  };

  const applyFill = () => {
    const c = board.current;
    const obj = c.getActiveObject();
    if (!obj) return;

    if (obj.type === "activeSelection") {
      obj.forEachObject(o => o.set("fill", fillColor));
    } else {
      obj.set("fill", fillColor);
    }

    c.requestRenderAll();
  };

  const clearBoard = () => {
    const c = board.current;
    c.getObjects().forEach(o => c.remove(o));
    c.requestRenderAll();
    history.current = [];
    redoStack.current = [];
  };

  // ================= HISTORY =================

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

  const exportPNG = () => {
    const url = board.current.toDataURL({ format: "png" });
    fetch(url).then(r => r.blob()).then(b => saveAs(b, "whiteboard.png"));
  };

  // ================= UI =================

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl">
      <div className="flex flex-wrap gap-2 p-3 bg-slate-800 border-b border-slate-700 items-center">

        <button className={btn("select")} onClick={selectTool}><MousePointer2 size={18} /></button>
        <button className={btn("draw")} onClick={draw}><Pencil size={18} /></button>
        <button className={btn("rect")} onClick={rect}><Square size={18} /></button>
        <button className={btn("circle")} onClick={circle}><CircleIcon size={18} /></button>
        <button className={btn("text")} onClick={text}><Type size={18} /></button>

        <button className="p-2 hover:bg-slate-700" onClick={undo}><Undo size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={redo}><Redo size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={clearBoard}><Trash2 size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={exportPNG}><Download size={18} /></button>

        {/* Stroke Color */}
        <input type="color" value={strokeColor}
          onChange={e => setStrokeColor(e.target.value)}
          className="w-8 h-8 ml-2 border border-slate-600 bg-transparent rounded" />

        {/* Fill Color */}
        <input type="color" value={fillColor === "transparent" ? "#000000" : fillColor}
          onChange={e => setFillColor(e.target.value)}
          className="w-8 h-8 border border-slate-600 bg-transparent rounded" />

        <button className="p-2 hover:bg-slate-700" onClick={applyFill}>
          <PaintBucket size={18} />
        </button>

        {/* Line Width */}
        <input type="range" min="1" max="10"
          value={lineWidth}
          onChange={e => setLineWidth(Number(e.target.value))}
          className="w-24 ml-2" />
        <span className="text-xs text-slate-400">{lineWidth}px</span>

      </div>

      <canvas ref={canvasRef} width={1100} height={600} />
    </div>
  );
}
