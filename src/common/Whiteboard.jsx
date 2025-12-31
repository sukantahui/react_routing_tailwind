import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Textbox, PencilBrush } from "fabric";
import {
  MousePointer2, Pencil, Square, Circle as CircleIcon,
  Trash2, Download, Undo, Redo, Type, Eraser
} from "lucide-react";
import { saveAs } from "file-saver";

export default function Whiteboard() {

  const canvasRef = useRef(null);
  const board = useRef(null);
  const history = useRef([]);
  const redoStack = useRef([]);
  const restoring = useRef(false);

  const [tool, setTool] = useState("select");
  const [color, setColor] = useState("#38bdf8");
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
      if (e.key === "Delete" || e.key === "Backspace") deleteSelected();
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
    c.freeDrawingBrush.color = color;
    c.freeDrawingBrush.width = lineWidth;
    setTool("draw");
  };

  const rect = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Rect({
      width: 140,
      height: 70,
      left: 80,
      top: 80,
      stroke: color,
      strokeWidth: lineWidth,
      fill: "transparent"
    }));
    setTool("rect");
  };

  const circle = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Circle({
      radius: 35,
      left: 120,
      top: 120,
      stroke: color,
      strokeWidth: lineWidth,
      fill: "transparent"
    }));
    setTool("circle");
  };

  const text = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Textbox("Type here", {
      left: 180,
      top: 150,
      fill: color,
      fontSize: 18 + lineWidth
    }));
    setTool("text");
  };

  // ================= DELETE SELECTED =================
  const deleteSelected = () => {
    const c = board.current;
    const active = c.getActiveObject();
    if (!active) return;

    if (active.type === "activeSelection") {
      active.forEachObject(obj => c.remove(obj));
      c.discardActiveObject();
    } else c.remove(active);

    c.requestRenderAll();
  };

  // ================= CLEAR CANVAS =================
  const clearCanvas = () => {
    const c = board.current;
    c.getObjects().forEach(obj => c.remove(obj));
    c.backgroundColor = "#0f172a";
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

  // ================= EXPORT =================
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
        <button className="p-2 hover:bg-slate-700" onClick={deleteSelected}><Trash2 size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={clearCanvas}><Eraser size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={exportPNG}><Download size={18} /></button>

        <input type="color" value={color} onChange={e => setColor(e.target.value)}
          className="w-8 h-8 ml-2 border border-slate-600 bg-transparent rounded" />

        <input type="range" min="1" max="10" value={lineWidth}
          onChange={(e) => setLineWidth(+e.target.value)}
          className="w-24 ml-2" />

        <span className="text-xs text-slate-400">{lineWidth}px</span>
      </div>

      <canvas ref={canvasRef} width={1100} height={600} />
    </div>
  );
}
