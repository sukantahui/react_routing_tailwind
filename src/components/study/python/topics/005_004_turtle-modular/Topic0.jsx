import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";

// Import Python Source Files
import primitivesCode from "./topic0_files/reusable_shapes_primitives.py?raw";
import houseBuilderCode from "./topic0_files/composite_house_builder.py?raw";
import villageLandscapeCode from "./topic0_files/modular_village_landscape.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseGlow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.5)); }
}
`;

const Topic0 = () => {
  // Interactive Scene Builder State
  const [houseSize, setHouseSize] = useState(100);
  const [wallColor, setWallColor] = useState("#0284c7");
  const [roofColor, setRoofColor] = useState("#f43f5e");
  const [showTrees, setShowTrees] = useState(true);
  const [showStars, setShowStars] = useState(true);

  const prototypes = [
    {
      name: "def draw_square(t, x, y, size, fill_color)",
      returnType: "Void Primitive",
      purpose: "Draws a 4-sided closed square anchored at bottom-left (x, y) with specified dimensions and fill.",
      usage: "draw_square(t, -100, 50, 80, '#38bdf8')"
    },
    {
      name: "def draw_triangle(t, x, y, size, fill_color)",
      returnType: "Void Primitive",
      purpose: "Draws an equilateral 3-sided triangle anchored at (x, y) for roofs, arrows, and mountains.",
      usage: "draw_triangle(t, 0, 100, 90, '#f43f5e')"
    },
    {
      name: "def draw_star(t, x, y, size, color)",
      returnType: "Void Primitive",
      purpose: "Draws a 5-pointed self-intersecting star centered approximately at (x, y).",
      usage: "draw_star(t, 120, 180, 25, '#fbbf24')"
    },
    {
      name: "def draw_house(t, x, y, size, wall_col, roof_col)",
      returnType: "Composite Function",
      purpose: "Composes base walls, triangular roof, door, and illuminated window into a single unified object.",
      usage: "draw_house(t, -200, -80, size=110)"
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
            Module 005_004 · Modular Graphics with Functions · Topic 0
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Writing Reusable Drawing Functions
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Decompose monolithic spaghetti code into elegant, parameterized building blocks. Master functional composition by creating <code className="text-cyan-300 font-mono">draw_square</code>, <code className="text-rose-300 font-mono">draw_star</code>, and composite <code className="text-emerald-300 font-mono">draw_house</code> primitives.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🧩 Parameterized Primitives
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🏠 Composite Functional Architecture
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌲 Scalable Scene Orchestration
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE MODULAR SCENE COMPOSER
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Modular Scene Composer
              </h3>
              <p className="text-xs text-slate-400">
                Adjust function parameters to see how parameterized functions generate responsive vector geometry in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTrees}
                  onChange={(e) => setShowTrees(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                Trees
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showStars}
                  onChange={(e) => setShowStars(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                Stars
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: SVG Real-Time Canvas Preview */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Rendered Canvas View (Modular Composition)
              </span>
              <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Night Sky Stars */}
                {showStars && (
                  <>
                    <polygon points="40,25 43,33 51,33 45,38 47,46 40,41 33,46 35,38 29,33 37,33" fill="#fbbf24" />
                    <polygon points="120,40 122,46 128,46 123,50 125,56 120,52 115,56 117,50 112,46 118,46" fill="#fef08a" />
                    <polygon points="220,20 222,26 228,26 223,30 225,36 220,32 215,36 217,30 212,26 218,26" fill="#fbbf24" />
                    <polygon points="280,45 282,51 288,51 283,55 285,61 280,57 275,61 277,55 272,51 278,51" fill="#fef08a" />
                  </>
                )}

                {/* Ground Line */}
                <line x1="10" y1="180" x2="310" y2="180" stroke="#334155" strokeWidth="3" />

                {/* Modular Pine Trees */}
                {showTrees && (
                  <>
                    {/* Tree 1 */}
                    <rect x="35" y="155" width="10" height="25" fill="#78350f" />
                    <polygon points="40,110 20,145 60,145" fill="#15803d" />
                    <polygon points="40,130 25,160 55,160" fill="#166534" />

                    {/* Tree 2 */}
                    <rect x="265" y="155" width="10" height="25" fill="#78350f" />
                    <polygon points="270,110 250,145 290,145" fill="#15803d" />
                    <polygon points="270,130 255,160 285,160" fill="#166534" />
                  </>
                )}

                {/* Composite House (Centered) */}
                {/* Wall Base */}
                <rect
                  x={160 - houseSize * 0.5}
                  y={180 - houseSize * 0.8}
                  width={houseSize}
                  height={houseSize * 0.8}
                  fill={wallColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Triangular Roof */}
                <polygon
                  points={`
                    ${160},${180 - houseSize * 1.3}
                    ${160 - houseSize * 0.6},${180 - houseSize * 0.8}
                    ${160 + houseSize * 0.6},${180 - houseSize * 0.8}
                  `}
                  fill={roofColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Door */}
                <rect
                  x={160 - houseSize * 0.35}
                  y={180 - houseSize * 0.45}
                  width={houseSize * 0.25}
                  height={houseSize * 0.45}
                  fill="#78350f"
                  stroke="#ffffff"
                  strokeWidth="1"
                />

                {/* Window */}
                <rect
                  x={160 + houseSize * 0.1}
                  y={180 - houseSize * 0.65}
                  width={houseSize * 0.25}
                  height={houseSize * 0.25}
                  fill="#fef08a"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* View 2: Parameter Controls & Live Python Code Call */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400">
                Function Arguments & Live Python Invocation
              </div>

              {/* Slider: House Size */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Parameter: <code className="text-cyan-300 font-mono">size</code></span>
                  <span className="font-mono font-bold text-cyan-400">{houseSize} px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={houseSize}
                  onChange={(e) => setHouseSize(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Color Controls */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-400 mb-1">Wall Color (wall_color):</label>
                  <div className="flex gap-1.5">
                    {["#0284c7", "#059669", "#7c3aed", "#e11d48"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setWallColor(c)}
                        className={`w-6 h-6 rounded-full border transition cursor-pointer ${
                          wallColor === c ? "border-white scale-110 shadow-md" : "border-transparent opacity-70"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Roof Color (roof_color):</label>
                  <div className="flex gap-1.5">
                    {["#f43f5e", "#eab308", "#fb923c", "#10b981"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setRoofColor(c)}
                        className={`w-6 h-6 rounded-full border transition cursor-pointer ${
                          roofColor === c ? "border-white scale-110 shadow-md" : "border-transparent opacity-70"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated Live Python Call */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Live Python Function Call
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`draw_house(
    t,
    x=0, y=-120,
    size=${houseSize},
    wall_color="${wallColor}",
    roof_color="${roofColor}"
)`}
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
            <span>⚙️</span> Modular Drawing Function Architecture
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Function Signature</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Architectural Purpose</th>
                  <th className="py-3 px-4">Sample Invocation</th>
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
            {/* File 1: reusable_shapes_primitives.py */}
            <PythonFileLoader
              fileModule={primitivesCode}
              title="reusable_shapes_primitives.py"
              highlightLines={[12, 13, 23, 24, 34, 35]}
            />

            {/* File 2: composite_house_builder.py */}
            <PythonFileLoader
              fileModule={houseBuilderCode}
              title="composite_house_builder.py"
              highlightLines={[12, 23, 33, 36, 39, 43, 47]}
            />

            {/* File 3: modular_village_landscape.py */}
            <PythonFileLoader
              fileModule={villageLandscapeCode}
              title="modular_village_landscape.py"
              highlightLines={[11, 19, 39, 61, 62, 69, 73]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Barrackpore School Project: The 300-Line Refactor
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata wrote a 450-line script to draw a miniature neighborhood in Barrackpore. When the teacher requested changing the roof style from triangular to rounded tile, she had to manually edit 12 different sections. After refactoring her drawing code into a modular <code className="text-cyan-300 font-mono">draw_house()</code> function, she changed the roof style across all 12 houses in just <strong>2 lines of code</strong>!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-indigo-400 text-lg flex items-center gap-2">
              <span>🌆</span> Kolkata Generative Art: Procedural Skylines
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu in Kolkata created an animated nighttime city skyline by writing a single <code className="text-indigo-300 font-mono">draw_building(t, x, y, width, height, floors)</code> function and feeding it a list of randomized coordinates. What used to take hours of manual coordinate math now renders dynamically in 0.05 seconds.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Modular Graphics Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting penup() Before Repositioning</strong>
              <p className="text-slate-400">
                Calling <code className="text-rose-300 font-mono">t.goto(x, y)</code> without calling <code className="text-cyan-300 font-mono">t.penup()</code> leaves unwanted diagonal drag lines connecting consecutive shapes.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Neglecting Heading Reset (setheading)</strong>
              <p className="text-slate-400">
                If a preceding function leaves the turtle facing at 45°, calling <code className="text-amber-300 font-mono">draw_square()</code> without <code className="text-cyan-300 font-mono">t.setheading(0)</code> produces a tilted diamond instead of an upright square.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Hardcoding Coordinates Inside Functions</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">t.goto(100, 200)</code> inside a function completely destroys reusability. Always accept <code className="text-cyan-300 font-mono">(x, y)</code> as arguments.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Unmatched begin_fill() / end_fill()</strong>
              <p className="text-slate-400">
                Leaving <code className="text-amber-300 font-mono">t.begin_fill()</code> unclosed causes fill colors to bleed uncontrollably across unrelated objects drawn later in the program.
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
              "I always pass the turtle instance `t` as the first argument to drawing functions",
              "I lift the pen with `penup()` before moving to the starting anchor `(x, y)`",
              "I enforce upright alignment by calling `t.setheading(0)` inside shape functions",
              "I understand how composite functions build complex scenes from simpler primitives",
              "I use default arguments to provide flexible yet convenient styling options",
              "I keep `screen.update()` in the scene orchestrator rather than inside individual helpers"
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
          <div className="bg-sky-900/20 rounded-2xl p-5 border border-sky-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-sky-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How video games like Minecraft or Terraria build entire procedural worlds by stamping modular tile functions across coordinate grids!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How passing <code className="text-cyan-300 font-mono">size=120</code> vs <code className="text-cyan-300 font-mono">size=60</code> automatically scales the walls, roof, doors, and windows proportionately without recalculating manual offsets!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add a chimney function <code className="text-amber-300 font-mono">draw_chimney(t, x, y, width, height)</code> and call it inside <code className="text-emerald-300 font-mono">draw_house()</code>!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Software engineering is the art of abstraction. When you transform raw sequential turtle movements into clean, parameterized geometric abstractions, you transition from simply drawing on a canvas to designing scalable, professional graphic systems and rendering engines.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Modular Drawing Functions FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Modular Drawing Functions Study Note"
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
            note="In Module 005_004 at Coder & AccoTax in Barrackpore and Kolkata, this topic represents a major cognitive milestone. When students stop thinking in 'steps' and start thinking in 'reusable modular shapes', their code shrinks by 70% while their graphical capabilities expand tenfold. Always remember the Golden Rule of Modular Drawing: decouple state, parameterize coordinates, and restore heading!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic0;
