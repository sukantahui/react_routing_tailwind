import React, { useEffect, useRef } from "react";
import { Canvas, Rect, PencilBrush } from "fabric";
import {
  Pencil,
  Square,
  Trash2,
  Download,
  Undo,
  Redo,
} from "lucide-react";
import { saveAs } from "file-saver";

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const history = useRef([]);
  const redoStack = useRef([]);
  const isRestoring = useRef(false);

  // ================= INIT =================
  useEffect(() => {
    const c = new Canvas(canvasRef.current, {
      backgroundColor: "#0f172a",
      preserveObjectStacking: true,
      selection: true,
    });

    canvas.current = c;

    const save = () => {
      if (isRestoring.current) return;
      history.current.push(JSON.stringify(c.toJSON()));
      redoStack.current = [];
    };

    c.on("mouse:up", save);
    c.on("object:modified", save);
    save();

    return () => c.dispose();
  }, []);

  // ================= DRAW =================
  const draw = () => {
    const c = canvas.current;
    c.isDrawingMode = true;
    c.freeDrawingBrush = new PencilBrush(c);
    c.freeDrawingBrush.color = "#38bdf8";
    c.freeDrawingBrush.width = 2;
  };

  // ================= RECT =================
  const rect = () => {
    const c = canvas.current;
    c.isDrawingMode = false;
    c.add(
      new Rect({
        width: 140,
        height: 70,
        left: 80,
        top: 80,
        stroke: "#38bdf8",
        strokeWidth: 2,
        fill: "transparent",
        rx: 6,
        ry: 6,
      })
    );
  };

  // ================= UNDO =================
  const undo = () => {
    if (history.current.length < 2) return;
    isRestoring.current = true;
    redoStack.current.push(history.current.pop());

    canvas.current.loadFromJSON(history.current.at(-1), () => {
      canvas.current.renderAll();
      isRestoring.current = false;
    });
  };

  // ================= REDO =================
  const redo = () => {
    if (!redoStack.current.length) return;
    isRestoring.current = true;
    const next = redoStack.current.pop();
    history.current.push(next);

    canvas.current.loadFromJSON(next, () => {
      canvas.current.renderAll();
      isRestoring.current = false;
    });
  };

  // ================= EXPORT =================
  const exportPNG = () => {
    const url = canvas.current.toDataURL({ format: "png" });
    fetch(url)
      .then((r) => r.blob())
      .then((b) => saveAs(b, "board.png"));
  };

  // ================= CLEAR =================
  const clear = () => {
    canvas.current.clear();
    canvas.current.setBackgroundColor("#0f172a", canvas.current.renderAll.bind(canvas.current));
    history.current = [];
    redoStack.current = [];
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl">
      <div className="flex gap-2 p-3 bg-slate-800 border-b border-slate-700">
        <button onClick={draw}><Pencil size={18} /></button>
        <button onClick={rect}><Square size={18} /></button>
        <button onClick={undo}><Undo size={18} /></button>
        <button onClick={redo}><Redo size={18} /></button>
        <button onClick={exportPNG}><Download size={18} /></button>
        <button onClick={clear}><Trash2 size={18} /></button>
      </div>

      <canvas ref={canvasRef} width={1100} height={600} />
    </div>
  );
}
