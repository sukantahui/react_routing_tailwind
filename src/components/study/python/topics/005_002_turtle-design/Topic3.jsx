import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";

// Import Python Files
import fillBasicsCode from "./topic3_files/fill_mechanics_basic.py?raw";
import compositeHouseCode from "./topic3_files/multi_color_house_composite.py?raw";
import starFillCode from "./topic3_files/star_polygon_winding_fill.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fillPulse {
  0%, 100% { fill-opacity: 0.8; }
  50% { fill-opacity: 1; }
}
`;

const Topic3 = () => {
  const [fillActive, setFillActive] = useState(true);
  const [activeShape, setActiveShape] = useState("pentagon");

  const prototypes = [
    {
      name: "turtle.begin_fill()",
      returnType: "None",
      purpose: "Marks the starting vertex of a closed polygon path for color filling.",
      usage: "t.begin_fill()"
    },
    {
      name: "turtle.end_fill()",
      returnType: "None",
      purpose: "Renders the interior color and completes the active fill path buffer.",
      usage: "t.end_fill()"
    },
    {
      name: "turtle.fillcolor(color)",
      returnType: "str / tuple / None",
      purpose: "Sets or queries the interior shape fill color.",
      usage: "t.fillcolor('#065f46')"
    },
    {
      name: "turtle.filling()",
      returnType: "bool",
      purpose: "Returns True if begin_fill() is currently active without matching end_fill().",
      usage: "if not t.filling(): t.begin_fill()"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_002 · Turtle Design & Aesthetic Customization · Topic 3
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
            Fill Mechanics: <span className="font-mono">begin_fill()</span>, <span className="font-mono">end_fill()</span> & Fills
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform wireframe outlines into solid, vibrant illustrations. Learn the vertex recording protocol, automatic polygon closure, multi-component composition, and winding rules.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🟢 begin_fill() & end_fill()
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🏠 Multi-Part Composite Art
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⭐ Self-Intersecting Star Parity
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE FILL SIMULATOR STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Polygon Fill Mechanics Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Toggle the fill state to observe how Python Turtle handles internal rasterization and wireframe outlines.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFillActive(!fillActive)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  fillActive
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25"
                    : "bg-gray-800 text-slate-400 border border-slate-700 hover:bg-gray-700"
                }`}
              >
                <span>{fillActive ? "✔ end_fill() Active" : "⭕ Wireframe Only (No Fill)"}</span>
              </button>

              <div className="flex bg-gray-900 p-1 rounded-xl border border-slate-700">
                {["pentagon", "star", "house"].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setActiveShape(shape)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition cursor-pointer ${
                      activeShape === shape ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              <rect x="10" y="10" width="680" height="200" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {activeShape === "pentagon" && (
                <g transform="translate(350, 110)">
                  <polygon
                    points="0,-75 71,-23 44,61 -44,61 -71,-23"
                    fill={fillActive ? "#065f46" : "none"}
                    stroke="#34d399"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <text x="0" y="5" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    {fillActive ? "Filled Pentagon" : "Wireframe Pentagon"}
                  </text>
                  <text x="0" y="25" fill="#34d399" fontSize="11" textAnchor="middle">
                    {fillActive ? "fillcolor('#065f46')" : "begin_fill() omitted"}
                  </text>
                </g>
              )}

              {activeShape === "star" && (
                <g transform="translate(350, 115)">
                  <polygon
                    points="0,-70 20,-20 70,-20 30,10 45,60 0,30 -45,60 -30,10 -70,-20 -20,-20"
                    fill={fillActive ? "#d97706" : "none"}
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <text x="0" y="85" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                    5-Pointed Star ({fillActive ? "Solid Fill" : "Hollow Stroke"})
                  </text>
                </g>
              )}

              {activeShape === "house" && (
                <g transform="translate(350, 120)">
                  {/* Base */}
                  <rect
                    x="-80"
                    y="-30"
                    width="160"
                    height="80"
                    fill={fillActive ? "#0369a1" : "none"}
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                  {/* Roof */}
                  <polygon
                    points="-95,-30 0,-85 95,-30"
                    fill={fillActive ? "#be123c" : "none"}
                    stroke="#f43f5e"
                    strokeWidth="3"
                  />
                  {/* Door */}
                  <rect
                    x="-20"
                    y="10"
                    width="40"
                    height="40"
                    fill={fillActive ? "#b45309" : "none"}
                    stroke="#fbbf24"
                    strokeWidth="2"
                  />
                  <text x="0" y="75" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Composite Multi-Part Fills
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Fill Mechanics Method Prototypes
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Name</th>
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Functionality</th>
                  <th className="py-3 px-4">Code Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-amber-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs">{proto.returnType}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{proto.purpose}</td>
                    <td className="py-3.5 px-4 font-mono text-sky-300 text-xs">{proto.usage}</td>
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
            <span>💻</span> Practical Python Fill Mechanics Code Files
          </h2>

          <div className="space-y-6">
            {/* File 1: fill_mechanics_basic.py */}
            <PythonFileLoader
              fileModule={fillBasicsCode}
              title="fill_mechanics_basic.py"
              highlightLines={[18, 19, 23, 29, 33]}
            />

            {/* File 2: multi_color_house_composite.py */}
            <PythonFileLoader
              fileModule={compositeHouseCode}
              title="multi_color_house_composite.py"
              highlightLines={[18, 24, 29, 34, 39, 45]}
            />

            {/* File 3: star_polygon_winding_fill.py */}
            <PythonFileLoader
              fileModule={starFillCode}
              title="star_polygon_winding_fill.py"
              highlightLines={[18, 22, 27, 31]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-amber-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Jadavpur Architecture Project: Village Landscape
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata and Mahima design a detailed landscape scene with hills, trees, and cottages. By isolating each component with its own <code className="text-amber-300 font-mono">begin_fill()</code> and <code className="text-amber-300 font-mono">end_fill()</code> pair, they compose multi-layered scenes without color bleeding.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-teal-400 text-lg flex items-center gap-2">
              <span>🇮🇳</span> Barrackpore National Pride: Tiranga Flag Generator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu codes the Indian National Flag in Python Turtle. He renders three distinct filled rectangles (Saffron, White, Green) and overlays the 24-spoke navy blue Ashoka Chakra in the center with mathematical precision.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Fill Mechanics Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting end_fill()</strong>
              <p className="text-slate-400">
                Calling <code className="text-amber-300">begin_fill()</code> without <code className="text-emerald-300">end_fill()</code> leaves the polygon buffer open and no color will ever render!
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Shared Fill Across Multiple Shapes</strong>
              <p className="text-slate-400">
                Moving to a second shape before calling <code className="text-emerald-300">end_fill()</code> joins both shapes into one distorted, merged polygon fill.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Changing fillcolor After end_fill()</strong>
              <p className="text-slate-400">
                <code className="text-sky-300">fillcolor()</code> must be set *before* or during the fill path; changing it after has zero effect on the completed shape.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Winding Rule Surprises in Star Shapes</strong>
              <p className="text-slate-400">
                Self-intersecting paths may leave inner star holes uncolored due to the even-odd parity rule. Use convex outer vertices for solid stars.
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
              "I know the 3-step fill sequence: fillcolor() → begin_fill() → draw → end_fill()",
              "I understand that end_fill() automatically closes unclosed polygon endpoints",
              "I can check whether a fill is currently active using the t.filling() boolean query",
              "I know to isolate each sub-component in composite illustrations with its own fill pair",
              "I understand how the even-odd winding rule behaves with self-intersecting stars",
              "I can create borderless solid color fills by matching pencolor to fillcolor"
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
              👉 <strong>Think about:</strong> Why 2D vector graphic formats (SVG) separate path strokes (`stroke`) from interior area fills (`fill`).
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How calling <code className="text-sky-300">t.circle(r)</code> inside <code className="text-sky-300">begin_fill()</code> and <code className="text-sky-300">end_fill()</code> renders perfectly smooth solid disks.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Build a crescent moon by drawing a large white circle, then overlaying an offset circle filled with the dark canvas background color!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In game engines and vector rasterizers, polygon rasterization converts vector vertex coordinates into filled pixel buffers via scanline or triangulation algorithms. In Turtle, mastering <code className="text-purple-300 font-mono">begin_fill()</code> and <code className="text-purple-300 font-mono">end_fill()</code> gives you the foundational mental model for sprite rendering, CAD solid modeling, and procedural vector geometry.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Turtle Fill Mechanics FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Turtle Fill Mechanics Study Note"
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
            note="When we build graphic applications at Coder & AccoTax in Barrackpore and Kolkata, students often forget that Turtle connects the beginning and end of a fill with an invisible straight line. I always remind students: 'Every begin_fill() MUST have its own end_fill() before you pick up the pen to start the next shape!' Once students master modular component fills, they can build stunning castles, solar systems, and interactive board games."
          />
        </div>

      </div>
    </div>
  );
};

export default Topic3;
