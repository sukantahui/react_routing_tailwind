import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";

// Import Python Files
import rosetteMandalaCode from "./topic2_files/nested_loop_rosette_mandala.py?raw";
import matrixGridCode from "./topic2_files/matrix_grid_tessellation.py?raw";
import fractalSpinCode from "./topic2_files/spinning_fractal_squares.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes mandalaSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

const Topic2 = () => {
  const [outerSpokes, setOuterSpokes] = useState(18);
  const [innerSides, setInnerSides] = useState(4);
  const [gridDim, setGridDim] = useState(4);

  const prototypes = [
    {
      name: "Outer Loop: for spoke in range(N)",
      returnType: "Global Transform",
      purpose: "Rotates the turtle around 360° or steps across 2D grid coordinates (rows).",
      usage: "for spoke in range(36): ... t.left(10)"
    },
    {
      name: "Inner Loop: for side in range(S)",
      returnType: "Local Geometry",
      purpose: "Renders the local geometric polygon or spoke motif at the current orientation.",
      usage: "for _ in range(4): t.forward(100); t.left(90)"
    },
    {
      name: "2D Grid: for r ... for c ...",
      returnType: "Spatial Matrix",
      purpose: "Generates 2D planar matrix layouts with row/column coordinate offsets.",
      usage: "t.goto(x0 + c*dx, y0 - r*dy)"
    },
    {
      name: "Dynamic Scaling: (i * scale)",
      returnType: "Logarithmic Depth",
      purpose: "Increases or shrinks polygon side dimensions across successive outer iterations.",
      usage: "side = i * 4 + 20"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_003 · Turtle Patterns & Geometric Mathematics · Topic 2
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Nested Loops for Complex Geometric Patterns
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Harness two-dimensional iteration. Master nested loops to orchestrate kaleidoscopic mandalas, tessellate 2D matrix checkerboards, and generate swirling fractal vortices.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌀 Outer Spoke Rotation
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📐 Inner Polygon Geometry
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🏁 2D Matrix Grid Tessellations
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE NESTED MANDALA & GRID VISUALIZER
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🌀</span> Interactive Nested Mandala & Matrix Studio
              </h3>
              <p className="text-xs text-slate-400">
                Adjust the outer spoke count and inner polygon sides to see how nested loops generate intricate algorithmic mandalas.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Spokes (Outer):</span>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="2"
                  value={outerSpokes}
                  onChange={(e) => setOuterSpokes(Number(e.target.value))}
                  className="w-20 accent-emerald-400 cursor-pointer"
                /&gt;
                <span className="font-mono text-xs text-emerald-300 w-5">{outerSpokes}</span>
              </div>

              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Sides (Inner):</span>
                {[3, 4, 5, 6].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInnerSides(s)}
                    className={`w-6 h-6 rounded text-xs font-bold transition cursor-pointer ${
                      innerSides === s ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  &gt;
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Grid:</span>
                {[3, 4, 5].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGridDim(g)}
                    className={`w-6 h-6 rounded text-xs font-bold transition cursor-pointer ${
                      gridDim === g ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  &gt;
                    {g}x{g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Radial Rosette Mandala */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-emerald-400 mb-2">
                Outer ({outerSpokes} spokes) × Inner ({innerSides} sides) = {outerSpokes * innerSides} Ops
              </span>
              <svg viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                <g transform="translate(130, 110)">
                  {Array.from({ length: outerSpokes }).map((_, spoke) => {
                    const rot = (spoke * 360) / outerSpokes;
                    return (
                      <g key={spoke} transform={`rotate(${rot})`}>
                        {innerSides === 4 ? (
                          <rect
                            x="0"
                            y="0"
                            width="55"
                            height="55"
                            fill="none"
                            stroke={spoke % 2 === 0 ? "#34d399" : "#38bdf8"}
                            strokeWidth="1.2"
                            opacity="0.8"
                          />
                        ) : innerSides === 3 ? (
                          <polygon
                            points="0,0 60,0 30,-50"
                            fill="none"
                            stroke={spoke % 2 === 0 ? "#34d399" : "#fbbf24"}
                            strokeWidth="1.2"
                            opacity="0.8"
                          />
                        ) : (
                          <circle
                            cx="30"
                            cy="0"
                            r="30"
                            fill="none"
                            stroke={spoke % 2 === 0 ? "#a78bfa" : "#38bdf8"}
                            strokeWidth="1.2"
                            opacity="0.8"
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* View 2: 2D Matrix Grid */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                2D Matrix: {gridDim} rows × {gridDim} cols = {gridDim * gridDim} Cells
              </span>
              <svg viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                <g transform="translate(30, 20)">
                  {Array.from({ length: gridDim }).map((_, r) =>
                    Array.from({ length: gridDim }).map((_, c) => {
                      const cellSize = 170 / gridDim;
                      const isEven = (r + c) % 2 === 0;
                      return (
                        <rect
                          key={`${r}-${c}`}
                          x={c * cellSize}
                          y={r * cellSize}
                          width={cellSize - 4}
                          height={cellSize - 4}
                          rx="4"
                          fill={isEven ? "#0284c7" : "#059669"}
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                      );
                    })
                  )}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Nested Loop Architectural Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Loop Layer</th>
                  <th className="py-3 px-4">Responsibility</th>
                  <th className="py-3 px-4">Mathematical Model</th>
                  <th className="py-3 px-4">Python Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-emerald-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300 text-xs">{proto.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            PYTHON CODE IMPLEMENTATION FILES
        ========================================================================= */}
        <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>💻</span> Professional Python Nested Pattern Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: nested_loop_rosette_mandala.py */}
            <PythonFileLoader
              fileModule={rosetteMandalaCode}
              title="nested_loop_rosette_mandala.py"
              highlightLines={[21, 25, 26, 30]}
            />

            {/* File 2: matrix_grid_tessellation.py */}
            <PythonFileLoader
              fileModule={matrixGridCode}
              title="matrix_grid_tessellation.py"
              highlightLines={[21, 25, 29, 36, 37]}
            />

            {/* File 3: spinning_fractal_squares.py */}
            <PythonFileLoader
              fileModule={fractalSpinCode}
              title="spinning_fractal_squares.py"
              highlightLines={[18, 23, 24, 28]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Barrackpore Design Studio: 36-Square Radial Mandala
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata creates an intricate generative mandala for a digital textile exhibition. By placing a 4-side square drawing loop inside a 36-iteration radial spoke loop with <code className="text-emerald-300 font-mono">t.left(10)</code> turns, she creates a breathtaking optical pattern with only 8 lines of code.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>♟️</span> Jadavpur Game Development: 8x8 Chessboard Matrix
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu programs an 8x8 tournament chessboard using nested row and column loops. By evaluating <code className="text-cyan-300 font-mono">(row + col) % 2 == 0</code>, the turtle automatically determines whether each cell square should be filled with obsidian black or cream white.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Nested Loop Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Indentation Scrambling</strong>
              <p className="text-slate-400">
                Placing the outer spoke pivot <code className="text-rose-300 font-mono">t.left(10)</code> inside the inner loop turns every single side, ruining the polygon geometry. Always keep pivot turns in the outer loop block!
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Connecting Streak Artifacts in Grids</strong>
              <p className="text-slate-400">
                Failing to call <code className="text-amber-300 font-mono">t.penup()</code> before repositioning to the next grid cell draws ugly diagonal line streaks across the matrix.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Severe Rendering Freezes</strong>
              <p className="text-slate-400">
                A 30x30 grid with 4-side squares executes 3,600 drawing actions. Without <code className="text-emerald-300 font-mono">screen.tracer(0)</code>, this will freeze the browser canvas for minutes.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Variable Shadowing Collisions</strong>
              <p className="text-slate-400">
                Using the same iteration variable <code className="text-rose-300 font-mono">for i in ... for i in ...</code> overwrites the outer counter, breaking the entire outer loop execution.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT CHECKLIST
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-emerald-500/30 animate-[fadeInUp_0.6s_ease-out_0.6s]">
          <h3 className="text-xl font-semibold text-emerald-400 mb-3">📝 Student Mastery Checklist</h3>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-gray-200">
            {[
              "I understand how outer loops control global position/rotation and inner loops draw primitives",
              "I can construct radial mandalas with outer spoke pivots (360 / total_spokes)",
              "I know how to build 2D matrix grids using nested row (Y) and column (X) loops",
              "I can create checkerboard parity fills using (row + col) % 2 == 0",
              "I know how to lift the pen (penup/pendown) to navigate between grid cells cleanly",
              "I understand why screen.tracer(0) is necessary for high-iteration nested loops"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HINTS & EXPERT MINDSET
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.7s]">
          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How 3 levels of nested loops (Rows → Columns → Spokes) can generate an entire gallery grid of intricate mandalas in seconds!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How slightly non-symmetric spoke turns (e.g. 71° instead of 72°) transform static rosettes into dynamic swirling vortex stars!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Replace the inner square with a 6-sided hexagon or 5-sided star to see how motif complexity cascades across the mandala!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nested loops are the backbone of <strong>rasterization, ray tracing, and procedural texture synthesis</strong>. When a GPU renders a 4K frame (3840 × 2160 pixels), it executes nested iterations across millions of pixels. Mastering the mental model of outer spatial loops governing inner primitive shaders is the foundational intuition of graphics engineering.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Nested Loops & Mandala Geometry FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Nested Loops Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic2_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we introduce nested loops at Coder & AccoTax in Barrackpore and Kolkata, students are often captivated by how simple mathematical combinations yield breathtaking complexity. I always remind students: keep the inner loop responsible solely for drawing the individual shape, and let the outer loop handle world transformations (stepping coordinates or rotating spokes). That clean mental separation prevents 99% of beginner geometry bugs!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic2;
