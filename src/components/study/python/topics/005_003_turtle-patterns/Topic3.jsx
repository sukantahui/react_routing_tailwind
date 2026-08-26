import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";

// Import Python Files
import archimedeanCode from "./topic3_files/archimedean_spiral_polar.py?raw";
import polygonalSpiralsCode from "./topic3_files/square_and_hexagonal_spirals.py?raw";
import goldenSpiralCode from "./topic3_files/logarithmic_golden_spiral.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spiralGlow {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.4)); }
  50% { filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.8)); }
}
`;

const Topic3 = () => {
  const [spiralType, setSpiralType] = useState("archimedean"); // archimedean, square, golden
  const [turnAngle, setTurnAngle] = useState(91);

  const prototypes = [
    {
      name: "Archimedean: r = a * θ",
      returnType: "Linear Distance",
      purpose: "Distance from origin grows uniformly; constant spacing between consecutive coils.",
      usage: "t.forward(i * 0.4); t.left(10)"
    },
    {
      name: "Polygonal Spiral: (θ ± 1°)",
      returnType: "Vortex Geometry",
      purpose: "Uses non-divisor angles (e.g. 91° or 61°) to twist regular polygons into spiral vortices.",
      usage: "for i in range(100): t.forward(i*3); t.left(91)"
    },
    {
      name: "Logarithmic: r = a * e^(bθ)",
      returnType: "Exponential Curve",
      purpose: "Models natural growth (nautilus shells, hurricanes, galaxies) with constant shape scaling.",
      usage: "r = a * math.exp(b * theta)"
    },
    {
      name: "Fibonacci Golden Arcs",
      returnType: "90° Arc Segments",
      purpose: "Approximates the golden spiral using quarter circles of increasing Fibonacci sequence radii.",
      usage: "for r in fib: t.circle(r, 90)"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_003 · Turtle Patterns & Geometric Mathematics · Topic 3
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Spirals, Archimedean Spirals & Radial Symmetry
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unleash the mathematics of continuous curves. Explore Archimedean linear coils, craft hypnotic 91° square spiral vortices, and construct organic Fibonacci golden spirals.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌀 Archimedean Linear Coils
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📐 91° Polygonal Spiral Vortices
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🐚 Fibonacci Golden Arcs
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE SPIRAL MATHEMATICS SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🌀</span> Spiral Mathematics Laboratory
              </h3>
              <p className="text-xs text-slate-400">
                Select a spiral paradigm and tweak angle parameters to observe real-time algorithmic vortex generation.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setSpiralType("archimedean")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  spiralType === "archimedean"
                    ? "bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              &gt;
                Archimedean (r = aθ)
              </button>

              <button
                onClick={() => setSpiralType("square")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  spiralType === "square"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              &gt;
                Square Vortex ({turnAngle}°)
              </button>

              <button
                onClick={() => setSpiralType("golden")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  spiralType === "golden"
                    ? "bg-purple-500 text-slate-950 font-bold shadow-lg shadow-purple-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              &gt;
                Fibonacci Golden Spiral
              </button>

              {spiralType === "square" && (
                <div className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-400">Angle:</span>
                  <input
                    type="range"
                    min="85"
                    max="95"
                    value={turnAngle}
                    onChange={(e) => setTurnAngle(Number(e.target.value))}
                    className="w-16 accent-emerald-400 cursor-pointer"
                  /&gt;
                  <span className="font-mono text-xs text-emerald-300 w-6">{turnAngle}°</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg h-auto">
              <rect width="500" height="240" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              <g transform="translate(250, 120)">
                {spiralType === "archimedean" && (() => {
                  const points = [];
                  for (let i = 0; i < 180; i++) {
                    const theta = (i * Math.PI) / 15;
                    const r = 0.5 * theta * 8;
                    points.push(`${r * Math.cos(theta)},${r * Math.sin(theta)}`);
                  }
                  return (
                    <polyline
                      points={points.join(" ")}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {spiralType === "square" && (() => {
                  let cx = 0, cy = 0;
                  let heading = 0;
                  const pts = ["0,0"];
                  for (let i = 1; i &le; 35; i++) {
                    const len = i * 4.5;
                    const rad = (heading * Math.PI) / 180;
                    cx += len * Math.cos(rad);
                    cy += len * Math.sin(rad);
                    pts.push(`${cx},${cy}`);
                    heading += turnAngle;
                  }
                  return (
                    <polyline
                      points={pts.join(" ")}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  );
                })()}

                {spiralType === "golden" && (() => {
                  // Golden spiral arcs representation
                  const path = "M 0,0 A 5,5 0 0,1 5,5 A 8,8 0 0,1 -3,13 A 13,13 0 0,1 -16,0 A 21,21 0 0,1 5,-21 A 34,34 0 0,1 39,13 A 55,55 0 0,1 -16,68 A 89,89 0 0,1 -105,-21";
                  return (
                    <path
                      d={path}
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Central anchor node */}
                <circle cx="0" cy="0" r="4" fill="#ffffff" />
                <text x="0" y="105" fill="#94a3b8" fontSize="11" textAnchor="middle">
                  {spiralType === "archimedean"
                    ? "Archimedean Spiral: r = a * θ (Uniform Spacing)"
                    : spiralType === "square"
                    ? `Polygonal Vortex: Turn = ${turnAngle}° (Angle Deviation)`
                    : "Logarithmic Golden Spiral: Exponential Curvature"}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Mathematical Spiral Types & Equations
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Spiral Category</th>
                  <th className="py-3 px-4">Growth Law</th>
                  <th className="py-3 px-4">Geometric Nature</th>
                  <th className="py-3 px-4">Python Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-sky-300 font-bold text-xs">{proto.name}</td>
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
            <span>💻</span> Professional Python Spiral Algorithm Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: archimedean_spiral_polar.py */}
            <PythonFileLoader
              fileModule={archimedeanCode}
              title="archimedean_spiral_polar.py"
              highlightLines={[18, 20, 21]}
            />

            {/* File 2: square_and_hexagonal_spirals.py */}
            <PythonFileLoader
              fileModule={polygonalSpiralsCode}
              title="square_and_hexagonal_spirals.py"
              highlightLines={[19, 21, 22, 27, 29, 30]}
            />

            {/* File 3: logarithmic_golden_spiral.py */}
            <PythonFileLoader
              fileModule={goldenSpiralCode}
              title="logarithmic_golden_spiral.py"
              highlightLines={[17, 22, 24]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🌀</span> Barrackpore Physics Lab: The 91° Square Vortex
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita and Mahima simulate atmospheric cyclonic flow by generating a 100-step polygonal spiral with <code className="text-sky-300 font-mono">t.left(91)</code>. The 1-degree angular offset continuously shifts the square vertices outward, forming an optical spiral vortex that perfectly models storm spirals for their physics exhibition.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-purple-400 text-lg flex items-center gap-2">
              <span>🐚</span> Jadavpur Biomimicry Studio: Fibonacci Nautilus
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata constructs a biological nautilus shell using consecutive quarter-circle arcs of Fibonacci radii (<code className="text-purple-300 font-mono">[2, 3, 5, 8, 13, 21, 34, 55, 89, 144]</code>). The resulting logarithmic curve demonstrates how biological organisms grow larger while preserving perfect self-similar geometric proportions.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Spiral Algorithm Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Using Exact Polygon Divisor Angles</strong>
              <p className="text-slate-400">
                Turning exactly 90° or 60° does not produce a spiral—it draws static axis-aligned nested polygons! Always introduce an angular offset (e.g. 91° or 61°).
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Linear Arcs Instead of Exponential Radii</strong>
              <p className="text-slate-400">
                Incrementing arc radii linearly (<code className="text-rose-300 font-mono">10, 20, 30</code>) produces an Archimedean coil, NOT a Golden Spiral. Golden spirals require Fibonacci or exponential growth.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Canvas Coordinate Overflow</strong>
              <p className="text-slate-400">
                Spirals grow rapidly. A 500-step loop with <code className="text-rose-300">i * 3</code> expands to 1,500px radius, far off the screen. Scale step coefficients to fit window dimensions.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Forgetting tracer(0) on 300+ Steps</strong>
              <p className="text-slate-400">
                Drawing 300+ tiny spiral segments one by one causes noticeable UI delays. Always wrap in <code className="text-emerald-300 font-mono">screen.tracer(0)</code> and <code className="text-emerald-300 font-mono">screen.update()</code>.
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
              "I understand why Archimedean spirals (r = a * theta) maintain constant coil spacing",
              "I know how 91° and 61° angular offsets produce square and hexagonal spiral vortices",
              "I can construct a Fibonacci Golden Spiral using chained 90° circular arcs",
              "I know how to scale step increments (i * step) to keep spirals within canvas bounds",
              "I understand the difference between linear (Archimedean) and exponential (Logarithmic) spirals",
              "I know how to use screen.tracer(0) for smooth, instantaneous spiral rendering"
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
              👉 <strong>Think about:</strong> Why phonograph vinyl records use an inward Archimedean spiral groove to store audio tracks at constant spacing!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting the turn angle to 144° turns the spiral into an expanding 5-pointed star vortex!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Increase the pen width proportionally with loop index (<code className="text-sky-300 font-mono">t.pensize(1 + i * 0.05)</code>) to create a striking 3D funnel perspective illusion!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spirals are nature's most efficient geometric design pattern, appearing across all scales from <strong>DNA double helices and sunflower seed packing</strong> to atmospheric hurricanes and spiral galaxies. Understanding how parametric polar equations (<code className="text-purple-300 font-mono">r(θ)</code>) translate into vector displacements builds deep intuition for computational fluid dynamics, procedural terrain generation, and particle physics simulations.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Spirals & Radial Symmetry FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Spirals & Radial Symmetry Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic3_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we teach spirals at Coder & AccoTax in Barrackpore and Kolkata, students are mesmerized by the 91-degree square spiral. Just 1 degree of angular deviation transforms rigid boxes into a dynamic, cosmic vortex. I always encourage students: experiment with 89°, 91°, 121°, and 144°—you will discover that simple mathematical nudges yield infinite varieties of natural beauty!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic3;
