import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import {
  Pencil,
  Square,
  Circle,
  Trash2,
  Type,
  Download,
  Undo,
  Redo,
} from "lucide-react";
import { saveAs } from "file-saver";

export default function Whiteboard() {
  const canvasEl = useRef(null);
  const canvas = useRef(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasEl.current, {
      backgroundColor: "#0f172a",
      isDrawingMode: false,
    });

    canvas.current.on("object:added", saveState);
    canvas.current.on("object:modified", saveState);
    canvas.current.on("object:removed", saveState);

    saveState();

    return () => canvas.current.dispose();
  }, []);

  const saveState = () => {
    setHistory((h) => [...h, JSON.stringify(canvas.current.toJSON())]);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length < 2) return;
    const prev = history[history.length - 2];
    setRedoStack((r) => [history[history.length - 1], ...r]);
    canvas.current.loadFromJSON(prev, () => canvas.current.renderAll());
    setHistory((h) => h.slice(0, -1));
  };

  const redo = () => {
    if (!redoStack.length) return;
    const next = redoStack[0];
    canvas.current.loadFromJSON(next, () => canvas.current.renderAll());
    setRedoStack((r) => r.slice(1));
    setHistory((h) => [...h, next]);
  };

  const enableDraw = () => {
    canvas.current.isDrawingMode = true;
    canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas.current);
    canvas.current.freeDrawingBrush.color = "#38bdf8";
    canvas.current.freeDrawingBrush.width = 2;
  };

  const disableDraw = () => (canvas.current.isDrawingMode = false);

  const addRect = () => {
    disableDraw();
    canvas.current.add(
      new fabric.Rect({
        width: 120,
        height: 60,
        fill: "transparent",
        stroke: "#fff",
        left: 50,
        top: 50,
      })
    );
  };

  const addCircle = () => {
    disableDraw();
    canvas.current.add(
      new fabric.Circle({
        radius: 30,
        fill: "transparent",
        stroke: "#fff",
        left: 100,
        top: 100,
      })
    );
  };

  const addText = () => {
    disableDraw();
    canvas.current.add(
      new fabric.Textbox("Type here", {
        fill: "#fff",
        left: 150,
        top: 150,
        fontSize: 16,
      })
    );
  };

  const clearBoard = () => {
    canvas.current.clear();
    canvas.current.setBackgroundColor("#0f172a", canvas.current.renderAll.bind(canvas.current));
    saveState();
  };

  const exportPNG = () => {
    const dataURL = canvas.current.toDataURL({ format: "png" });
    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, "whiteboard.png"));
  };

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl border border-slate-700">
      <div className="flex gap-3 p-3 border-b border-slate-700 bg-slate-800">
        <button onClick={enableDraw}><Pencil size={18} /></button>
        <button onClick={addRect}><Square size={18} /></button>
        <button onClick={addCircle}><Circle size={18} /></button>
        <button onClick={addText}><Type size={18} /></button>
        <button onClick={undo}><Undo size={18} /></button>
        <button onClick={redo}><Redo size={18} /></button>
        <button onClick={exportPNG}><Download size={18} /></button>
        <button onClick={clearBoard}><Trash2 size={18} /></button>
      </div>

      <canvas
        ref={canvasEl}
        width={1100}
        height={600}
        className="rounded-b-xl"
      />
    </div>
  );
}
