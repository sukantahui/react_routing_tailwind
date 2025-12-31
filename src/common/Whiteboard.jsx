import React, { useEffect, useRef, useState } from "react";
import {
  Canvas,
  Rect,
  Circle,
  Textbox,
  PencilBrush
} from "fabric";
import {
  Pencil,
  Square,
  Circle as CircleIcon,
  Trash2,
  Download,
  Undo,
  Redo,
  Type
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

  // ================= INIT =================
  useEffect(() => {
    const c = new Canvas(canvasRef.current, {
      backgroundColor: "#0f172a",
      preserveObjectStacking: true,
      selection: true,
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
    return () => c.dispose();
  }, []);

  const btn = (name) =>
    `p-2 rounded-md transition
     ${tool === name ? "bg-sky-600 text-white shadow" : "text-slate-300 hover:bg-slate-700"}`;

  // ================= TOOLS =================
  const enableDraw = () => {
    const c = board.current;
    c.isDrawingMode = true;
    c.freeDrawingBrush = new PencilBrush(c);
    c.freeDrawingBrush.color = color;
    c.freeDrawingBrush.width = 2;
    setTool("draw");
  };

  const addRect = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Rect({
      width: 140,
      height: 70,
      left: 80,
      top: 80,
      stroke: color,
      strokeWidth: 2,
      fill: "transparent",
    }));
    setTool("rect");
  };

  const addCircle = () => {
    const c = board.current;
    c.isDrawingMode = false;
    c.add(new Circle({
      radius: 35,
      left: 120,
      top: 120,
      stroke: color,
      strokeWidth: 2,
      fill: "transparent",
    }));
    setTool("circle");
  };

  const addText = () => {
    const c = board.current;
    c.isDrawingMode = false;
    setTool("text");

    c.once("mouse:down", (opt) => {
      const p = c.getScenePoint(opt.e);

      const text = new Textbox("Type here", {
        left: p.x,
        top: p.y,
        fill: color,
        fontSize: 18,
      });

      c.add(text);
      c.setActiveObject(text);
      c.renderAll();
    });
  };

  const deleteSelected = () => {
    const c = board.current;
    const obj = c.getActiveObject();
    if (obj) c.remove(obj);
  };

  const clearBoard = () => {
    const c = board.current;
    c.clear();
    c.setBackgroundColor("#0f172a", c.renderAll.bind(c));
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

        <button className={btn("draw")} onClick={enableDraw}><Pencil size={18} /></button>
        <button className={btn("rect")} onClick={addRect}><Square size={18} /></button>
        <button className={btn("circle")} onClick={addCircle}><CircleIcon size={18} /></button>
        <button className={btn("text")} onClick={addText}><Type size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={undo}><Undo size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={redo}><Redo size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={deleteSelected}><Trash2 size={18} /></button>
        <button className="p-2 hover:bg-slate-700" onClick={clearBoard}>🧹</button>
        <button className="p-2 hover:bg-slate-700" onClick={exportPNG}><Download size={18} /></button>

        {/* 🎨 COLOR PICKER */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="ml-3 w-8 h-8 cursor-pointer rounded"
          title="Pick color"
        />

      </div>

      <canvas ref={canvasRef} width={1100} height={600} />
    </div>
  );
}
