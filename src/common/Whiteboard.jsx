import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Textbox, PencilBrush } from "fabric";
import {
  MousePointer2, Pencil, Square, Circle as CircleIcon,
  Trash2, Download, Undo, Redo, Type, Trash
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

  const [tool, setTool] = useState("select");
  const [strokeColor, setStrokeColor] = useState("#38bdf8");
  const [fillColor, setFillColor] = useState("#00000000");
  const [lineWidth, setLineWidth] = useState(2);

  /* ============== INIT ============== */
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
      if (e.key === "Delete" || e.key === "Backspace") {
        const obj = c.getActiveObject();
        if (!obj) return;
        if (obj.type === "activeSelection") {
          obj.forEachObject(o => c.remove(o));
        } else c.remove(obj);
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
        const p = c.getPointer(opt.e);
        start.current = p;

        drawingObj.current =
          tool === "rect"
            ? new Rect({
              left: p.x, top: p.y, width: 1, height: 1,
              stroke: strokeColor, strokeWidth: lineWidth,
              fill: fillColor === "#00000000" ? "rgba(0,0,0,0)" : fillColor
            })
            : new Circle({
              left: p.x, top: p.y, radius: 1,
              stroke: strokeColor, strokeWidth: lineWidth,
              fill: fillColor === "#00000000" ? "rgba(0,0,0,0)" : fillColor
            });

        c.add(drawingObj.current);
      });

      c.on("mouse:move", (opt) => {
        if (!drawingObj.current) return;
        const p = c.getPointer(opt.e);

        if (tool === "rect") {
          drawingObj.current.set({
            width: Math.abs(p.x - start.current.x),
            height: Math.abs(p.y - start.current.y)
          });
        } else {
          drawingObj.current.set({
            radius: Math.abs(p.x - start.current.x) / 2
          });
        }
        c.requestRenderAll();
      });

      c.on("mouse:up", () => {
        drawingObj.current = null;
        setTool("select");          // 👈 AUTO SWITCH TO SELECTION TOOL
      });

    }
  }, [tool, strokeColor, fillColor, lineWidth]);

  /* ============== LIVE STYLE UPDATE ============== */
  useEffect(() => {
    const c = board.current;
    const obj = c?.getActiveObject();
    if (!obj) return;
    obj.set({
      stroke: strokeColor,
      fill: fillColor === "#00000000" ? "rgba(0,0,0,0)" : fillColor,
      strokeWidth: lineWidth
    });
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
    history.current.push(JSON.stringify(board.current.toJSON()));
  };

  /* ============== EXPORT ============== */
  const exportPNG = () => {
    const url = board.current.toDataURL({ format: "png" });
    fetch(url).then(r => r.blob()).then(b => saveAs(b, "whiteboard.png"));
  };

  const btn = (name) =>
    `p-2 rounded-md ${tool === name ? "bg-sky-600 text-white" : "text-slate-300 hover:bg-slate-700"}`;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl">

      <div className="flex flex-wrap gap-2 p-3 bg-slate-800 border-b border-slate-700">
        <button className={btn("select")} onClick={() => setTool("select")}><MousePointer2 size={18} /></button>
        <button className={btn("draw")} onClick={() => setTool("draw")}><Pencil size={18} /></button>
        <button className={btn("rect")} onClick={() => setTool("rect")}><Square size={18} /></button>
        <button className={btn("circle")} onClick={() => setTool("circle")}><CircleIcon size={18} /></button>

        {/* FIXED TEXT SIZE */}
        <button
          className={btn("text")}
          onClick={() =>
            board.current.add(
              new Textbox("Type here", {
                left: 100,
                top: 100,
                fill: strokeColor,
                fontSize: 16,
                editable: true,
                width: 200
              })
            )
          }
        >
          <Type size={18} />
        </button>

        <button onClick={undo}><Undo size={18} /></button>
        <button onClick={redo}><Redo size={18} /></button>
        <button onClick={clearCanvas}><Trash size={18} /></button>
        <button onClick={exportPNG}><Download size={18} /></button>

        <input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} />
        <input type="color" value={fillColor.slice(0, 7)} onChange={e => setFillColor(e.target.value)} />
        <input type="range" min="1" max="10" value={lineWidth} onChange={e => setLineWidth(+e.target.value)} />
      </div>

      <canvas ref={canvasRef} width={1100} height={600} />
    </div>
  );
}
