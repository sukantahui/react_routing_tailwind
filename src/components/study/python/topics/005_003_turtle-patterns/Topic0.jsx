import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";

// Import Python Files
import loopBasicsCode from "./topic0_files/repetitive_loops_basics.py?raw";
import squareTunnelCode from "./topic0_files/geometric_square_tunnel.py?raw";
import pinwheelCode from "./topic0_files/circular_pinwheel_spokes.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes loopSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

const Topic0 = () => {
  const [polygonSides, setPolygonSides] = useState(6);
  const [tunnelLayers, setTunnelLayers] = useState(8);

  const prototypes = [
    {
      name: "for _ in range(n):",
      returnType: "Iteration Block",
      purpose: "Executes drawing statements exactly n times for regular polygons.",
      usage: "for _ in range(4): t.forward(100); t.left(90)"
    },
    {
      name: "Exterior Turn: 360 / n",
      returnType: "float / deg",
      purpose: "Calculates the exact turning angle required to close an n-sided regular polygon.",
      usage: "angle = 360 / n"
    },
    {
      name: "Concentric Scaling: i * step",
      returnType: "Dynamic Dimension",
      purpose: "Scales dimensions by loop index i to create tunnels, nests, and perspective depth.",
      usage: "side = i * 15"
    },
    {
      name: "Radial Symmetry: 360 / spokes",
      returnType: "Rotational Angle",
      purpose: "Rotates a custom motif around the central hub to generate mandalas and pinwheels.",
      usage: "t.left(360 / total_spokes)"
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
            Module 005_003 · Turtle Patterns & Geometric Mathematics · Topic 0
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            Using Loops for Repetitive Geometric Structures
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate repetitive boilerplate code. Harness Python for-loops to generate regular polygons, construct concentric square tunnels, and orchestrate rotational pinwheel rosettes.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🔄 for _ in range(N)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌀 Concentric 3D Tunnels
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎡 Radial Pinwheel Rosettes
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE LOOP SIMULATOR & POLYGON STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🔄</span> Interactive Loop Geometry Generator
              </h3>
              <p className="text-xs text-slate-400">
                Adjust the number of polygon sides and tunnel layers to observe how Python loops construct geometric patterns.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Sides (N):</span>
                {[3, 4, 5, 6, 8, 12].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPolygonSides(s)}
                    className={`w-6 h-6 rounded text-xs font-bold transition cursor-pointer ${
                      polygonSides === s ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">Tunnel Layers:</span>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={tunnelLayers}
                  onChange={(e) => setTunnelLayers(Number(e.target.value))}
                  className="w-20 accent-cyan-400 cursor-pointer"
                />
                <span className="font-mono text-xs text-cyan-300 w-4">{tunnelLayers}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              <rect x="10" y="10" width="680" height="200" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* View 1: N-Sided Polygon (Left) */}
              <g transform="translate(180, 110)">
                {(() => {
                  const points = [];
                  const radius = 65;
                  for (let i = 0; i < polygonSides; i++) {
                    const angle = (i * 2 * Math.PI) / polygonSides - Math.PI / 2;
                    points.push(`${radius * Math.cos(angle)},${radius * Math.sin(angle)}`);
                  }
                  return (
                    <polygon
                      points={points.join(" ")}
                      fill="#0284c7"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  );
                })()}
                <text x="0" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  for _ in range({polygonSides}): left({(360 / polygonSides).toFixed(1)}°)
                </text>
              </g>

              {/* View 2: Concentric Tunnel (Right) */}
              <g transform="translate(500, 110)">
                {Array.from({ length: tunnelLayers }).map((_, i) => {
                  const size = (i + 1) * (130 / tunnelLayers);
                  return (
                    <rect
                      key={i}
                      x={-size / 2}
                      y={-size / 2}
                      width={size}
                      height={size}
                      fill="none"
                      stroke={i % 2 === 0 ? "#34d399" : "#fbbf24"}
                      strokeWidth="1.5"
                    />
                  );
                })}
                <text x="0" y="85" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  for i in range(1, {tunnelLayers + 1}): side = i * {(130 / tunnelLayers).toFixed(0)}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Geometric Loop Patterns & Mathematical Models
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Loop Pattern</th>
                  <th className="py-3 px-4">Mathematical Model</th>
                  <th className="py-3 px-4">Geometric Application</th>
                  <th className="py-3 px-4">Python Code Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs">{proto.returnType}</td>
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
            <span>💻</span> Practical Python Geometric Loop Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: repetitive_loops_basics.py */}
            <PythonFileLoader
              fileModule={loopBasicsCode}
              title="repetitive_loops_basics.py"
              highlightLines={[18, 19, 27, 28, 36, 37]}
            />

            {/* File 2: geometric_square_tunnel.py */}
            <PythonFileLoader
              fileModule={squareTunnelCode}
              title="geometric_square_tunnel.py"
              highlightLines={[17, 18, 20, 26]}
            />

            {/* File 3: circular_pinwheel_spokes.py */}
            <PythonFileLoader
              fileModule={pinwheelCode}
              title="circular_pinwheel_spokes.py"
              highlightLines={[17, 18, 20, 31]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Jadavpur Mathematics Seminar: Tessellation Tunnels
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata and Susmita build an animated 3D optical illusion using 25 concentric squares. By incrementing side width by 12px per loop iteration and alternating cyan and emerald stroke colors, they produce a stunning infinite perspective tunnel for the university math expo.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🎡</span> Barrackpore Design Lab: 36-Petal Pinwheel Rosette
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu uses a 36-iteration radial rotational loop with <code className="text-emerald-300 font-mono">t.left(10)</code> turns to rotate a custom diamond petal motif around the origin. The resulting radial pinwheel demonstrates mathematical rotational symmetry with zero code duplication.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Geometric Loop Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Using Interior Instead of Exterior Angles</strong>
              <p className="text-slate-400">
                Turning 60° for a triangle draws a hexagon instead! Always turn the exterior angle: <code className="text-emerald-300 font-mono">360 / N</code> (e.g. 120° for a triangle).
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Multiplying by Zero on Iteration 0</strong>
              <p className="text-slate-400">
                <code className="text-amber-300">range(5)</code> starts at 0, making <code className="text-rose-300">i * 20 = 0px</code>. Always use <code className="text-emerald-300">range(1, count + 1)</code> for dimensional scaling.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Cumulative Positional Drift</strong>
              <p className="text-slate-400">
                Failing to return the turtle to origin between rotational spoke iterations creates asymmetric, lopsided pinwheels.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Hardcoded Loop Iteration Constants</strong>
              <p className="text-slate-400">
                Writing <code className="text-amber-300">range(4)</code> and <code className="text-amber-300">left(90)</code> manually prevents parameterization. Always bind to variable <code className="text-sky-300 font-mono">n</code>!
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
              "I know that regular polygon exterior angles are calculated using 360 / N",
              "I can construct regular polygons (triangles, squares, hexagons, octagons) in loops",
              "I know how to center concentric scaling shapes by offsetting coordinates by -side / 2",
              "I can create radial mandalas and pinwheels by turning 360 / total_spokes per spoke",
              "I know how to cycle color palettes inside loops using modulo indexing (i % len(palette))",
              "I understand why range(1, count + 1) prevents zero-dimension visual artifacts"
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
              👉 <strong>Think about:</strong> Why kaleidoscope mirrors produce beautiful radial patterns by reflecting simple geometric motifs around 360 degrees.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting <code className="text-sky-300">n = 360</code> with <code className="text-sky-300">forward(1)</code> and <code className="text-sky-300">left(1)</code> reveals that a circle is mathematically an infinite polygon!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Modify the square tunnel turn angle from 90° to 91° and watch the tunnel twist into a dynamic 3D vortex!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In generative algorithms and shader programming, iteration is the primary engine of creation. Understanding how a single mathematical equation (<code className="text-purple-300 font-mono">theta = 360 / N</code>) executed across a loop can generate everything from simple polygons to kaleidoscopic mandalas unlocks the core mindset of procedural computing.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Repetitive Loops & Polygon Geometry FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Repetitive Loops Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic0_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we teach loops to beginners at Coder & AccoTax in Barrackpore and Kolkata, Turtle Graphics provides the ultimate 'Aha!' moment. When a student sees that replacing 40 lines of manual code with a 3-line for-loop draws a perfect geometric star, they truly fall in love with the elegance of computer programming. Always encourage students to play with loop angles—small 1-degree tweaks turn ordinary shapes into breathtaking algorithmic art!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic0;
