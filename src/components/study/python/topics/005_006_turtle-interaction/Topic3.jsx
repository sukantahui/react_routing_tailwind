import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";

// Import Python Source Files
import onclickCompareCode from "./topic3_files/screen_vs_turtle_onclick_mechanics.py?raw";
import multiButtonCode from "./topic3_files/multi_button_mouse_dispatcher.py?raw";
import targetGalleryCode from "./topic3_files/interactive_point_and_click_target.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes targetPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); filter: drop-shadow(0 0 10px rgba(244, 63, 94, 0.7)); }
}
`;

const Topic3 = () => {
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [targets, setTargets] = useState([
    { id: 1, x: 70, y: 70, color: "#f43f5e", r: 16 },
    { id: 2, x: 160, y: 110, color: "#fbbf24", r: 16 },
    { id: 3, x: 250, y: 60, color: "#34d399", r: 16 }
  ]);
  const [stamps, setStamps] = useState([]);
  const [lastEvent, setLastEvent] = useState("Click targets or background");

  // Move targets randomly on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTargets((prev) =>
        prev.map((t) => ({
          ...t,
          x: Math.max(30, Math.min(290, t.x + (Math.random() - 0.5) * 30)),
          y: Math.max(30, Math.min(140, t.y + (Math.random() - 0.5) * 30))
        }))
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleTargetClick = (targetId, e) => {
    e.stopPropagation(); // Stop propagation to canvas background!
    setScore((s) => s + 100);
    setHits((h) => h + 1);
    setLastEvent(`🎯 TURTLE.ONCLICK: Hit Target #${targetId}! (+100 pts)`);

    // Relocate target immediately
    setTargets((prev) =>
      prev.map((t) =>
        t.id === targetId
          ? { ...t, x: Math.random() * 240 + 40, y: Math.random() * 100 + 40 }
          : t
      )
    );
  };

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    setStamps((prev) => [...prev.slice(-6), { x: cx, y: cy, color: "#38bdf8" }]);
    setLastEvent(`✨ SCREEN.ONCLICK: Stamped Star at (${cx.toFixed(0)}, ${cy.toFixed(0)})`);
  };

  const prototypes = [
    {
      name: "screen.onclick(fun, btn=1)",
      returnType: "Canvas Background Listener",
      purpose: "Fires when user clicks anywhere on the canvas background, passing (x, y) coordinates.",
      usage: "screen.onclick(on_canvas_click, btn=1)"
    },
    {
      name: "turtle.onclick(fun, btn=1)",
      returnType: "Sprite-Specific Listener",
      purpose: "Fires ONLY when clicking that specific visible turtle's shape polygon (hit-box).",
      usage: "target_turtle.onclick(on_hit)"
    },
    {
      name: "Multi-Button Mouse Indices",
      returnType: "Button Dispatching",
      purpose: "btn=1 (Left Click), btn=2 (Middle Scroll Wheel Click), btn=3 (Right Click).",
      usage: "screen.onclick(left_click, 1)\nscreen.onclick(right_click, 3)"
    },
    {
      name: "e.stopPropagation()",
      returnType: "Event Isolation",
      purpose: "Prevents a sprite click from bubbling through to trigger background screen clicks.",
      usage: "target_turtle.onclick(hit_handler)"
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
            Module 005_006 · Event Handling & Interaction · Topic 3
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
            Mouse Click Handling: screen.onclick() & turtle.onclick()
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Build interactive point-and-click software. Master the critical difference between <span className="text-cyan-300 font-semibold">screen.onclick() (Global Canvas)</span> and <span className="text-rose-400 font-semibold">turtle.onclick() (Sprite Hit-Testing)</span>, multi-button bindings, and arcade shooting galleries.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎯 turtle.onclick() Sprite Hit-Testing
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🖱️ Left / Middle / Right Click Dispatching
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎮 Point-and-Click Shooting Gallery
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE SHOOTING GALLERY & CLICK LAB
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎯</span> Interactive Point-and-Click Shooting Gallery
              </h3>
              <p className="text-xs text-slate-400">
                Click moving targets directly to trigger <code className="text-rose-400 font-mono">turtle.onclick()</code>, or click the background canvas to trigger <code className="text-cyan-300 font-mono">screen.onclick()</code>.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 font-bold">
                SCORE: {score} pts
              </span>
              <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 font-bold">
                HITS: {hits}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Canvas SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Shooting Gallery Arena (Click Targets / Background)
              </span>
              <svg
                viewBox="0 0 320 180"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleCanvasClick}
                className="w-full max-w-sm h-auto bg-slate-950 rounded-lg cursor-crosshair border border-slate-800"
              >
                {/* Background Stamped Stars */}
                {stamps.map((s, idx) => (
                  <g key={idx} transform={`translate(${s.x}, ${s.y})`}>
                    <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" fill={s.color} opacity="0.8" />
                  </g>
                ))}

                {/* Moving Interactive Target Turtles */}
                {targets.map((tgt) => (
                  <g
                    key={tgt.id}
                    transform={`translate(${tgt.x}, ${tgt.y})`}
                    onClick={(e) => handleTargetClick(tgt.id, e)}
                    className="cursor-pointer transition-all duration-500 animate-[targetPulse_2s_infinite]"
                  >
                    {/* Outer Ring */}
                    <circle cx="0" cy="0" r={tgt.r} fill={tgt.color} stroke="#ffffff" strokeWidth="2" />
                    {/* Inner Bullseye */}
                    <circle cx="0" cy="0" r={tgt.r * 0.5} fill="#ffffff" />
                    <circle cx="0" cy="0" r={tgt.r * 0.25} fill={tgt.color} />
                  </g>
                ))}

                {/* Instruction HUD */}
                <text x="160" y="168" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="monospace">
                  CLICK TARGET = turtle.onclick() | CLICK BG = screen.onclick()
                </text>
              </svg>
            </div>

            {/* View 2: Event Telemetry & Mechanics Breakdown */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Mouse Event Dispatch Telemetry</span>
                <span className="font-mono text-xs text-emerald-300">Hit-Testing ACTIVE</span>
              </div>

              {/* Status Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Last Mouse Dispatch Event</div>
                <div className="text-xs font-mono font-bold mt-1 text-cyan-300">
                  {lastEvent}
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Screen vs Turtle Click Architecture
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`# 1. Global Canvas Background Clicks
screen.onclick(stamp_star, btn=1)

# 2. Specific Interactive Sprite Clicks
target_turtle.onclick(handle_target_hit)`}
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
            <span>⚙️</span> Mouse Click Event Core APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Signature</th>
                  <th className="py-3 px-4">Scope</th>
                  <th className="py-3 px-4">Event Dispatch Role</th>
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
            {/* File 1: screen_vs_turtle_onclick_mechanics.py */}
            <PythonFileLoader
              fileModule={onclickCompareCode}
              title="screen_vs_turtle_onclick_mechanics.py"
              highlightLines={[25, 33, 40, 48, 49]}
            />

            {/* File 2: multi_button_mouse_dispatcher.py */}
            <PythonFileLoader
              fileModule={multiButtonCode}
              title="multi_button_mouse_dispatcher.py"
              highlightLines={[19, 24, 30, 36, 37, 38]}
            />

            {/* File 3: interactive_point_and_click_target.py */}
            <PythonFileLoader
              fileModule={targetGalleryCode}
              title="interactive_point_and_click_target.py"
              highlightLines={[28, 35, 36, 37, 43, 44]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-rose-400 text-lg flex items-center gap-2">
              <span>🎯</span> Barrackpore Duck Hunt: Hit-Testing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima developed a retro Duck Hunt shooting gallery in Barrackpore. When flying ducks crossed the screen, she bound <code className="text-rose-400 font-mono">duck_turtle.onclick()</code> to trigger quacking sound effects, award 200 points, and spawn falling feather animations upon direct hits!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🎨</span> Kolkata Digital Paint Studio
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita in Kolkata constructed a graphic design paint app. By mapping Left Click (<code className="text-cyan-300 font-mono">btn=1</code>) to brush strokes, Right Click (<code className="text-amber-300 font-mono">btn=3</code>) to color pickers, and Middle Click (<code className="text-rose-300 font-mono">btn=2</code>) to clear canvas, she built an intuitive multi-tool painting workstation!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Mouse Click Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Attempting to Click Hidden Turtles</strong>
              <p className="text-slate-400">
                Calling <code className="text-rose-300 font-mono">t.onclick()</code> on a hidden turtle (<code className="text-rose-300 font-mono">t.hideturtle()</code>) never triggers because Tkinter cannot hit-test invisible polygons.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Defining 0-Argument Click Handlers</strong>
              <p className="text-slate-400">
                <code className="text-cyan-300 font-mono">onclick</code> automatically passes <code className="text-amber-300 font-mono">(x, y)</code>. Defining <code className="text-rose-300 font-mono">def click():</code> raises a <code className="text-rose-300 font-mono">TypeError: takes 0 positional arguments but 2 were given</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Small Clickable Hit-Boxes</strong>
              <p className="text-slate-400">
                Default 20px turtles are frustratingly tiny to click on high-DPI screens. Always scale interactive button shapes using <code className="text-cyan-300 font-mono">t.shapesize(2.5, 5)</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Confusing Mouse Button Indices</strong>
              <p className="text-slate-400">
                Setting <code className="text-rose-300 font-mono">btn=2</code> expecting right click fails because 2 is the middle scroll wheel. Right click is strictly <code className="text-cyan-300 font-mono">btn=3</code>.
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
              "I know the difference between `screen.onclick` (canvas) and `turtle.onclick` (sprite)",
              "I understand that `onclick` callbacks automatically receive `(x, y)` coordinates",
              "I know the mouse button indices: `btn=1` (Left), `btn=2` (Middle), `btn=3` (Right)",
              "I ensure turtles are visible (`t.isvisible()`) before attaching `turtle.onclick()`",
              "I scale button hit boxes using `t.shapesize()` for comfortable clicking",
              "I can build point-and-click target shooting games and interactive digital paint tools"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================================          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct spatial interaction is at the core of human-computer interfaces. By mastering mouse click coordinate routing and sprite hit-testing, you gain the power to turn static visual elements into responsive buttons, tactile game characters, and interactive desktop applications.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Mouse Click Handling FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Mouse Click Handling Study Note"
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
            note="When we teach point-and-click mechanics at Coder & AccoTax in Barrackpore and Kolkata, students love building interactive target games and digital artboards. Always remember: screen.onclick is for the world; turtle.onclick is for the actors in that world. Combine both, and you have the complete toolkit for rich interactive software!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic3;
