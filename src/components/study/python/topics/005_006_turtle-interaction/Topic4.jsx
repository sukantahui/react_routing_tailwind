import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";

// Import Python Source Files
import freehandCode from "./topic4_files/freehand_drawing_canvas_ondrag.py?raw";
import puzzleCode from "./topic4_files/drag_and_drop_puzzle_piece.py?raw";
import sliderCode from "./topic4_files/interactive_draggable_slider_ui.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes glowKnob {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
  50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.9)); }
}
`;

const Topic4 = () => {
  const [sliderVal, setSliderVal] = useState(65); // 0% to 100%
  const [activeColor, setActiveColor] = useState("#38bdf8");
  const [strokes, setStrokes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a855f7"];

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStrokes((prev) => [...prev, [{ x, y, color: activeColor }]]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const lastStroke = [...prev[prev.length - 1], { x, y, color: activeColor }];
      return [...prev.slice(0, -1), lastStroke];
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearBoard = () => {
    setStrokes([]);
  };

  const prototypes = [
    {
      name: "turtle.ondrag(fun, btn=1)",
      returnType: "Mouse Drag Listener",
      purpose: "Binds callback `fun(x, y)` executing continuously while dragging that specific turtle sprite.",
      usage: "pen.ondrag(on_drag)"
    },
    {
      name: "turtle.onrelease(fun, btn=1)",
      returnType: "Drag Release Listener",
      purpose: "Fires callback when mouse button is released after dragging, ideal for snap-to-grid logic.",
      usage: "block.onrelease(snap_to_grid)"
    },
    {
      name: "Unbind-Rebind Pattern",
      returnType: "Queue Overflow Prevention",
      purpose: "Calls `ondrag(None)` -> moves turtle -> re-enables `ondrag(handler)` to prevent lag.",
      usage: "t.ondrag(None)\nt.goto(x, y)\nt.ondrag(on_drag)"
    },
    {
      name: "1D Axis Clamping",
      returnType: "Widget Constraint Math",
      purpose: "Locks orthogonal axis and clamps X between `[min_x, max_x]` for GUI sliders.",
      usage: "clamped_x = max(-150, min(150, x))"
    }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_006 · Event Handling & Interaction · Topic 4
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
            Mouse Drag Events: turtle.ondrag() & Freehand Drawing
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Build interactive whiteboards and drag-and-drop mechanics. Master <span className="text-cyan-300 font-semibold">turtle.ondrag()</span>, the <span className="text-emerald-400 font-bold">Unbind-Rebind Performance Pattern</span>, <span className="text-amber-300 font-semibold">Snap-to-Grid Puzzles</span>, and <span className="text-purple-400 font-semibold">Custom GUI Sliders</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎨 Freehand Digital Whiteboard
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🧩 Drag-and-Drop Grid Snapping
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎚️ 1D Clamped GUI Slider Widget
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE WHITEBOARD & SLIDER STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Whiteboard & Custom Slider Studio
              </h3>
              <p className="text-xs text-slate-400">
                Click and drag on the canvas to draw freehand strokes, choose palette colors, or adjust the live GUI slider widget below.
              </p>
            </div>

            {/* Color Palette Buttons & Clear */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full cursor-pointer transition transform ${
                      activeColor === c ? "scale-110 ring-2 ring-white" : "opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={clearBoard}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/40 transition cursor-pointer"
              >
                Clear Board
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Freehand Drawing Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Freehand Drawing Surface (Click & Drag Mouse)
              </span>
              <svg
                viewBox="0 0 320 180"
                xmlns="http://www.w3.org/2000/svg"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full max-w-sm h-auto bg-slate-950 rounded-lg cursor-crosshair border border-slate-800 select-none"
              >
                {/* Drawn Strokes */}
                {strokes.map((stroke, sIdx) => {
                  if (stroke.length === 0) return null;
                  const d = stroke.reduce(
                    (acc, pt, pIdx) => (pIdx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
                    ""
                  );
                  return (
                    <path
                      key={sIdx}
                      d={d}
                      stroke={stroke[0].color}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  );
                })}

                {strokes.length === 0 && (
                  <text x="160" y="95" fill="#475569" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    CLICK & DRAG TO DRAW WITH ondrag()
                  </text>
                )}
              </svg>
            </div>

            {/* View 2: Draggable Custom GUI Slider Widget */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Custom Draggable Slider Widget</span>
                <span className="font-mono text-xs text-emerald-300 font-bold">{sliderVal}% Level</span>
              </div>

              {/* Interactive SVG Slider */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center space-y-3">
                <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>0% (MIN)</span>
                  <span className="text-cyan-300 font-bold">1D CLAMPED TRACK</span>
                  <span>100% (MAX)</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="text-[11px] font-mono text-emerald-400">
                  knob_x = {((sliderVal / 100) * 300 - 150).toFixed(0)} px | status: ONDRAG_CONNECTED
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Unbind-Rebind Drag Blueprint
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`def on_drag(x, y):
    pen.ondrag(None)  # 1. Unbind (prevent queue flooding)
    pen.goto(x, y)    # 2. Update coordinate
    pen.ondrag(on_drag) # 3. Rebind handler`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Drag & Drop Architectural APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method / Keyword</th>
                  <th className="py-3 px-4">Lifecycle Phase</th>
                  <th className="py-3 px-4">Spatial Interaction Role</th>
                  <th className="py-3 px-4">Standard Syntax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-indigo-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300 text-xs">{proto.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            PYTHON CODE IMPLEMENTATION SCRIPTS
        ========================================================================= */}
        <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>💻</span> Professional Python Implementation Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: freehand_drawing_canvas_ondrag.py */}
            <PythonFileLoader
              fileModule={freehandCode}
              title="freehand_drawing_canvas_ondrag.py"
              highlightLines={[29, 30, 31, 32, 37, 40]}
            />

            {/* File 2: drag_and_drop_puzzle_piece.py */}
            <PythonFileLoader
              fileModule={puzzleCode}
              title="drag_and_drop_puzzle_piece.py"
              highlightLines={[32, 33, 34, 38, 39, 42, 43]}
            />

            {/* File 3: interactive_draggable_slider_ui.py */}
            <PythonFileLoader
              fileModule={sliderCode}
              title="interactive_draggable_slider_ui.py"
              highlightLines={[31, 32, 38, 40, 41, 44]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🧩</span> Barrackpore Jigsaw Puzzle Game
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila built a 6-piece jigsaw puzzle in Barrackpore. When players dragged puzzle pieces across the screen, she used <code className="text-cyan-300 font-mono">piece.onrelease()</code> to check if the piece was within 30px of its target slot, snapping it perfectly into place with a chime sound effect!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🎚️</span> Kolkata RGB Color Synthesizer
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima in Kolkata developed a custom graphics tool with 3 draggable RGB sliders. By mapping each slider knob's <code className="text-amber-300 font-mono">x</code> coordinate from <code className="text-cyan-300 font-mono">[-150, 150]</code> to <code className="text-emerald-300 font-mono">[0, 255]</code>, she synthesized live background colors dynamically in real time!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Mouse Drag Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Event Queue Overflow (Drag Lag)</strong>
              <p className="text-slate-400">
                Rapid mouse dragging without the <code className="text-cyan-300 font-mono">t.ondrag(None)</code> unbind pattern queues thousands of moves, making the cursor lag 3 seconds behind the physical mouse.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Forgetting pen.speed(0)</strong>
              <p className="text-slate-400">
                If the drawing pen turtle has default animation speed, it animates each crawl step slowly, destroying freehand drawing fluidity. Always set <code className="text-cyan-300 font-mono">speed(0)</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Dragging Sliders Off Track</strong>
              <p className="text-slate-400">
                Failing to lock <code className="text-amber-300 font-mono">y = 0</code> allows users to drag horizontal slider knobs vertically all over the screen. Always lock the inactive axis.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Dragging Hidden Turtles</strong>
              <p className="text-slate-400">
                <code className="text-rose-300 font-mono">ondrag()</code> requires a visible turtle shape to register mouse interaction; hidden turtles cannot be dragged.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-cyan-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">📝 Student Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I know that `turtle.ondrag()` fires continuously while clicking and dragging a turtle",
              "I implement the `t.ondrag(None)` unbind-rebind pattern to eliminate queue lag",
              "I set `pen.speed(0)` for zero-latency freehand brush drawing",
              "I use `round(x / grid_size) * grid_size` to snap draggable puzzle pieces to grids",
              "I clamp 1D slider knobs using `max(min_x, min(max_x, x))` and lock the Y axis",
              "I use `turtle.onrelease()` to detect mouse button releases after dragging"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HINTS & EXPERT MINDSET
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-cyan-900/20 rounded-2xl p-5 border border-cyan-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-cyan-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How modern digital drawing tools like Figma, Procreate, and Photoshop track continuous mouse/stylus drag coordinates to render smooth Bezier strokes!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How drawing on our canvas creates smooth colored paths instantly while adjusting the slider updates the level telemetry!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add an eraser toggle that switches the pen color to the background dark slate color!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Drag-and-drop is the gold standard for intuitive desktop interaction. When you master spatial clamping, event throttling, and release snapping, you unlock the ability to construct rich digital whiteboards, customized control panels, puzzle games, and full-featured desktop productivity software.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Mouse Drag & ondrag() FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Mouse Drag Events Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic4_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="Freehand drawing with turtle.ondrag() is one of the most exciting projects for our students at Coder & AccoTax in Barrackpore and Kolkata. Just remember my golden rule: always unbind ondrag before moving the turtle to prevent event queue flooding! With that simple trick, your digital whiteboard will glide as smoothly as silk!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic4;
