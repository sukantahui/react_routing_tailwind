import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";

// Import Python Files
import penBasicsCode from "./topic0_files/pen_control_basics.py?raw";
import dashedLinesCode from "./topic0_files/dotted_dashed_lines.py?raw";
import islandHoppingCode from "./topic0_files/island_hopping_shapes.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.2); }
  50% { box-shadow: 0 0 25px rgba(56, 189, 248, 0.4); }
}
`;

const Topic0 = () => {
  const [penState, setPenState] = useState("down");
  const [currentPenSize, setCurrentPenSize] = useState(4);

  const prototypes = [
    {
      name: "turtle.penup() / turtle.up() / turtle.pu()",
      returnType: "None",
      purpose: "Lifts the pen off the canvas. Subsequent movements do not draw lines.",
      usage: "t.penup()"
    },
    {
      name: "turtle.pendown() / turtle.down() / turtle.pd()",
      returnType: "None",
      purpose: "Lowers the pen back onto the canvas so movements resume drawing lines.",
      usage: "t.pendown()"
    },
    {
      name: "turtle.pensize(width) / turtle.width(w)",
      returnType: "int / None",
      purpose: "Sets the line drawing thickness in integer pixels (default is 1).",
      usage: "t.pensize(5)"
    },
    {
      name: "turtle.isdown()",
      returnType: "bool",
      purpose: "Returns True if the pen is currently down; False if lifted.",
      usage: "if not t.isdown(): t.pendown()"
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
            Module 005_002 · Turtle Design & Aesthetic Customization · Topic 0
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Pen Control: <span className="font-mono">penup()</span>, <span className="font-mono">pendown()</span> & <span className="font-mono">pensize()</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master the art of canvas navigation without stray marks. Learn how to lift the pen for island-hopping, create patterned dashed lines, and dynamically alter stroke widths.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ✒️ Stroke Thickness
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🦘 Island Hopping (penup)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              〰️ Dashed & Dotted Patterns
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE PEN SIMULATOR & SVG ARCHITECTURE
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎨</span> Interactive Pen Control Visualizer
              </h3>
              <p className="text-xs text-slate-400">
                Toggle pen states and adjust stroke width to observe how Turtle renders vector paths.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPenState(penState === "down" ? "up" : "down")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  penState === "down"
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                }`}
              &gt;
                <span>{penState === "down" ? "🖊️ Pen DOWN (Drawing)" : "✋ Pen UP (Lifted)"}</span>
              </button>

              <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400">pensize:</span>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={currentPenSize}
                  onChange={(e) => setCurrentPenSize(Number(e.target.value))}
                  className="w-24 accent-sky-400 cursor-pointer"
                /&gt;
                <span className="font-mono text-xs text-sky-400 font-bold w-4">{currentPenSize}px</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              <rect x="10" y="10" width="680" height="160" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Segment 1: Solid Line */}
              <line x1="50" y1="90" x2="220" y2="90" stroke="#38bdf8" strokeWidth={currentPenSize} strokeLinecap="round" />
              <circle cx="50" cy="90" r="5" fill="#38bdf8" />
              <text x="135" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. pendown()</text>
              <text x="135" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">Solid Line (pensize={currentPenSize})</text>

              {/* Segment 2: Gap (Penup) */}
              <line x1="230" y1="90" x2="380" y2="90" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="305" y="65" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">2. penup()</text>
              <text x="305" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">Clean Gap (No Ink!)</text>

              {/* Segment 3: Resumed Drawing */}
              <line
                x1="390"
                y1="90"
                x2="560"
                y2="90"
                stroke={penState === "down" ? "#34d399" : "#475569"}
                strokeWidth={penState === "down" ? currentPenSize : 1}
                strokeDasharray={penState === "down" ? "none" : "2,2"}
                strokeLinecap="round"
              />
              <circle cx="560" cy="90" r="6" fill={penState === "down" ? "#34d399" : "#94a3b8"} />
              <text x="475" y="65" fill={penState === "down" ? "#34d399" : "#94a3b8"} fontSize="11" fontWeight="bold" textAnchor="middle">
                3. {penState === "down" ? "Drawing Resumed" : "Pen is Lifted"}
              </text>
              <text x="475" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">
                {penState === "down" ? "Active Canvas Ink" : "Invisible Transit"}
              </text>

              {/* Turtle Indicator Icon */}
              <g transform={`translate(${penState === "down" ? 560 : 380}, 90)`}>
                <polygon points="0,-10 15,0 0,10 4,0" fill="#fbbf24" />
              </g>
            </svg>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Pen Control Method Prototypes & Syntax
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Name & Aliases</th>
                  <th className="py-3 px-4">Return</th>
                  <th className="py-3 px-4">Functionality</th>
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
            <span>💻</span> Practical Python Scripts for Pen Control
          </h2>

          <div className="space-y-6">
            {/* File 1: pen_control_basics.py */}
            <PythonFileLoader
              fileModule={penBasicsCode}
              title="pen_control_basics.py"
              highlightLines={[14, 21, 28, 33]}
            />

            {/* File 2: dotted_dashed_lines.py */}
            <PythonFileLoader
              fileModule={dashedLinesCode}
              title="dotted_dashed_lines.py"
              highlightLines={[14, 21, 23, 25]}
            />

            {/* File 3: island_hopping_shapes.py */}
            <PythonFileLoader
              fileModule={islandHoppingCode}
              title="island_hopping_shapes.py"
              highlightLines={[12, 17, 27, 30, 33]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Jadavpur University: Coordinate Grid Plotter
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Student Mamata plots disconnected data points across 4 quadrants. By calling <code className="text-sky-300">penup()</code> before jumping to each coordinate, she renders a clean Cartesian grid without unwanted diagonal lines connecting the origin to each point.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🚂</span> Barrackpore Station: Railway Track Pattern
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu uses alternating <code className="text-emerald-300">pendown()</code> and <code className="text-emerald-300">penup()</code> cycles inside a loop to draw railway sleeper ties and dashed road lanes across a 500-pixel street scene.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Pen Control Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting to Lower the Pen</strong>
              <p className="text-slate-400">
                Calling <code className="text-amber-300">penup()</code> and forgetting <code className="text-emerald-300">pendown()</code> results in the turtle moving invisibly without drawing any shapes.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Forgetting to Lift Before goto()</strong>
              <p className="text-slate-400">
                Moving to a new starting point while the pen is down leaves an ugly diagonal line directly through your artwork.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Passing 0 or Negative pensize</strong>
              <p className="text-slate-400">
                <code className="text-rose-300">pensize(0)</code> causes inconsistent rendering across platforms. Always use positive integers <code className="text-emerald-300">pensize(1)</code> or higher.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Global Pen State Side-Effects</strong>
              <p className="text-slate-400">
                Modifying pensize inside a helper function without resetting it causes subsequent drawings to inherit thick strokes unintentionally.
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
              "I know how to lift the pen using penup() to reposition without drawing",
              "I can lower the pen using pendown() to resume drawing lines",
              "I can change line thickness dynamically using pensize(pixels)",
              "I understand how to create dashed borders by alternating penup and pendown",
              "I can check active pen drawing state using the isdown() query",
              "I always lift the pen before using goto() to start a new disconnected shape"
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
              👉 <strong>Think about:</strong> Why architectural blueprints and CAD tools separate geometry into discrete stroke weights (fine gridlines vs bold outer walls).
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How <code className="text-sky-300">t.dot()</code> stamps perfect circular points even when the pen is lifted with <code className="text-sky-300">t.penup()</code>.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Increase <code className="text-amber-300">pensize(i)</code> inside a spiral loop to create calligraphic 3D depth effects.
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In professional computer graphics and SVG rendering, path commands are divided into <strong>MoveTo (M)</strong> and <strong>LineTo (L)</strong> instructions. In Turtle, <code className="text-purple-300">penup() + goto()</code> represents MoveTo, while <code className="text-purple-300">pendown() + forward()</code> represents LineTo. Mastering this distinction unlocks the mental model for 2D vector engines.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Pen Control & pensize() FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Pen Control Study Note"
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
            note="When teaching graphics in Barrackpore and Kolkata, I always emphasize that pen control is what separates messy beginner sketches from clean, professional vector art. Always drill into students the 3-step mantra: 'Pen UP -> Goto Coordinates &rarr; Pen DOWN'. Once this habit is second nature, students can place complex buildings, celestial constellations, and multi-colored mandalas across their canvas with pinpoint mathematical precision."
          /&gt;
        </div>

      </div>
    </div>
  );
};

export default Topic0;
