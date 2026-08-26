import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";

// Import Python Files
import lineProgressionCode from "./topic1_files/line_thickness_progression.py?raw";
import calligraphyCode from "./topic1_files/tapered_calligraphy_pen.py?raw";
import cursorStylingCode from "./topic1_files/shape_scale_and_cursor_styling.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes strokeGlow {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.4)); }
  50% { filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.8)); }
}
`;

const Topic1 = () => {
  const [selectedStrokeWeight, setSelectedStrokeWeight] = useState(6);

  const prototypes = [
    {
      name: "turtle.pensize(width) / turtle.width(w)",
      returnType: "int / None",
      purpose: "Sets or queries the line drawing stroke thickness in integer screen pixels.",
      usage: "t.pensize(6)"
    },
    {
      name: "turtle.shapesize(wid, len, outline) / turtlesize()",
      returnType: "tuple / None",
      purpose: "Scales the visual dimensions and outline border of the turtle cursor icon.",
      usage: "t.shapesize(2, 2, outline=3)"
    },
    {
      name: "turtle.pen(**kwargs)",
      returnType: "dict / None",
      purpose: "Returns or updates the complete dictionary of pen attributes simultaneously.",
      usage: "t.pen(pensize=4, pencolor='cyan')"
    },
    {
      name: "turtle.resizemode(rmode)",
      returnType: "str / None",
      purpose: "Sets cursor resize behavior ('auto', 'user', or 'noresize').",
      usage: "t.resizemode('user')"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_002 · Turtle Design & Aesthetic Customization · Topic 1
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
            Line Thickness, <span className="font-mono">pensize()</span> & Cursor Scaling
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Establish professional visual hierarchy in your Python graphics. Discover stroke weight hierarchies, calligraphic dynamic tapering, and cursor geometry customization.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              📏 Stroke Hierarchy (1px – 15px)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🖋️ Calligraphy Nib Tapering
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🐢 shapesize() Cursor Scale
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE STROKE HIERARCHY COMPARISON STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Stroke Weight & Join Studio
              </h3>
              <p className="text-xs text-slate-400">
                Select different stroke weights to see how stroke thickness transforms geometry and visual prominence.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {[1, 3, 6, 10, 15].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedStrokeWeight(w)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition cursor-pointer ${
                    selectedStrokeWeight === w
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                &gt;
                  pensize({w})
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              <rect x="10" y="10" width="680" height="180" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Sample Geometric Square */}
              <rect
                x="80"
                y="40"
                width="120"
                height="120"
                fill="none"
                stroke="#38bdf8"
                strokeWidth={selectedStrokeWeight}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="140" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                {selectedStrokeWeight}px Stroke
              </text>

              {/* Sample Concentric Circles */}
              <circle cx="360" cy="100" r="50" fill="none" stroke="#34d399" strokeWidth={selectedStrokeWeight} />
              <circle cx="360" cy="100" r="25" fill="none" stroke="#34d399" strokeWidth={Math.max(1, selectedStrokeWeight / 2)} />
              <text x="360" y="175" fill="#34d399" fontSize="11" textAnchor="middle">Circle Vector</text>

              {/* Sample Scaled Cursor Icon */}
              <g transform="translate(560, 100)">
                <polygon
                  points="0,-25 35,0 0,25 8,0"
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth={Math.max(1, selectedStrokeWeight / 2)}
                  transform={`scale(${Math.max(0.8, selectedStrokeWeight / 4)})`}
                />
                <text x="0" y="55" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                  shapesize({(selectedStrokeWeight / 4).toFixed(1)})
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
            <span>⚙️</span> Line Thickness & Cursor Method Signatures
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Name & Aliases</th>
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Code Pattern</th>
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
            <span>💻</span> Professional Python Code for Stroke Styling
          </h2>

          <div className="space-y-6">
            {/* File 1: line_thickness_progression.py */}
            <PythonFileLoader
              fileModule={lineProgressionCode}
              title="line_thickness_progression.py"
              highlightLines={[16, 28, 30]}
            />

            {/* File 2: tapered_calligraphy_pen.py */}
            <PythonFileLoader
              fileModule={calligraphyCode}
              title="tapered_calligraphy_pen.py"
              highlightLines={[15, 20, 22]}
            />

            {/* File 3: shape_scale_and_cursor_styling.py */}
            <PythonFileLoader
              fileModule={cursorStylingCode}
              title="shape_scale_and_cursor_styling.py"
              highlightLines={[14, 18, 22, 27]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Jadavpur Tech Festival: Isometric Poster Design
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata and Mahima design an event poster featuring 3D isometric cubes. By applying <code className="text-sky-300">pensize(8)</code> for the nearest front vertices and <code className="text-slate-400">pensize(2)</code> for the receding back lines, they create depth perception without complex 3D libraries.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🖋️</span> Barrackpore Calligraphy Studio: Ribbon Spirals
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita writes an algorithmic calligraphy script that modulates <code className="text-emerald-300">pensize()</code> based on mathematical sine functions. The resulting ribbon spirals simulate traditional Asian ink brush calligraphy with organic stroke pressure.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Stroke Styling Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Confusing pensize with shapesize</strong>
              <p className="text-slate-400">
                <code className="text-amber-300">pensize()</code> changes line width. <code className="text-sky-300">shapesize()</code> changes the cursor icon size. They are completely independent.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Overly Thick Strokes Swallowing Shapes</strong>
              <p className="text-slate-400">
                Drawing a 20px polygon with <code className="text-rose-300">pensize(30)</code> swallows the internal shape area, turning your geometry into an unrecognizable blob.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Expecting pensize to Change Stamps</strong>
              <p className="text-slate-400">
                <code className="text-amber-300">t.stamp()</code> size is governed by <code className="text-sky-300">shapesize()</code>, not by <code className="text-amber-300">pensize()</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Monolithic Stroke Weight Everywhere</strong>
              <p className="text-slate-400">
                Using default 1px lines for every element results in flat, amateurish graphics. Always establish a clear stroke hierarchy.
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
              "I know that pensize(w) and width(w) set line stroke thickness",
              "I know that shapesize(wid, len, outline) scales the cursor representation",
              "I can inspect and batch-update pen state using the t.pen() dictionary",
              "I understand how stroke hierarchy (1px, 4px, 10px) improves visual clarity",
              "I can generate calligraphic tapering effects by varying pensize in loops",
              "I understand why stamp() depends on shapesize rather than pensize"
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
              👉 <strong>Think about:</strong> How road maps use thin 1px lines for footpaths, 3px lines for city streets, and 8px double lines for national highways.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting <code className="text-sky-300">t.shapesize(3, 3, outline=4)</code> creates a prominent cursor that helps students follow live classroom demonstrations.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Create a neon glowing effect by drawing a line with <code className="text-amber-300">pensize(12)</code> in dark blue, then overdrawing it with <code className="text-emerald-300">pensize(2)</code> in bright cyan!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In professional vector graphics engines like Adobe Illustrator, Figma, and Cairo, stroke cap joins (Round, Miter, Bevel) and stroke weight calibration form the bedrock of digital illustration. In Turtle, mastering <code className="text-purple-300 font-mono">pensize()</code> and <code className="text-purple-300 font-mono">t.pen()</code> dictionary state transitions builds the essential foundation for procedural rendering.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Line Thickness & Cursor Styling FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Line Thickness & Pen Styling Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic1_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we teach geometry and vector graphics at Coder & AccoTax in Barrackpore and Kolkata, line weight is the secret sauce that brings drawings to life. Don't let students draw everything with default 1px lines! Challenge them to use 3 tiers of stroke thickness in every project: 1px for helper grids, 4px for primary shapes, and 8px for bold title frames. It instantly makes student work look published and professional."
          />
        </div>

      </div>
    </div>
  );
};

export default Topic1;
