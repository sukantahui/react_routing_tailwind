import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";

// Import Python Source Files
import buttonEngineCode from "./topic7_files/clickable_canvas_button_engine.py?raw";
import tactileButtonsCode from "./topic7_files/tactile_animated_turtle_buttons.py?raw";
import toolbarDashboardCode from "./topic7_files/complete_interactive_game_toolbar.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes clickDepress {
  0% { transform: scale(1); }
  50% { transform: scale(0.92); }
  100% { transform: scale(1); }
}
`;

const Topic7 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [score, setScore] = useState(120);
  const [lastAction, setLastAction] = useState("Click any dashboard button");
  const [depressedBtn, setDepressedBtn] = useState(null);

  const triggerButtonAction = (btnId, name, callback) => {
    setDepressedBtn(btnId);
    setTimeout(() => setDepressedBtn(null), 150);
    setLastAction(`⚡ Action Dispatched: [${name.toUpperCase()}]`);
    if (callback) callback();
  };

  const prototypes = [
    {
      name: "Bounding Box Hit-Testing",
      returnType: "Spatial Geometry Math",
      purpose: "Tests if mouse (x, y) coordinates fall within button rectangle: `bx <= x <= bx + bw` and `by <= y <= by + bh`.",
      usage: "if (bx <= x <= bx + bw) and (by <= y <= by + bh):\n    dispatch_action()"
    },
    {
      name: "turtle.onclick() Sprite Buttons",
      returnType: "Tactile Sprite UI",
      purpose: "Instantiates turtle button shapes with `shapesize(2.5, 6)` and tactile depression click animations.",
      usage: "btn.shapesize(2.2, 5.5)\nscreen.ontimer(lambda: btn.shapesize(2.5, 6), 100)"
    },
    {
      name: "Docked Dashboard Ribbon",
      returnType: "UI Layout Pattern",
      purpose: "Anchors action controls (Play, Reset, Audio, Theme) along bottom canvas border.",
      usage: "draw_docked_toolbar(buttons)"
    },
    {
      name: "Dynamic State Toggle Buttons",
      returnType: "Reactive Control",
      purpose: "Alternates boolean states (Play ↔ Pause, Audio ON ↔ Audio OFF) updating label and color dynamically.",
      usage: "is_playing = not is_playing"
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
            Module 005_006 · Event Handling & Interaction · Topic 7
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Interactive Buttons & Clickable UI on Canvas
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Construct professional graphical user interfaces in pure Python. Master <span className="text-cyan-300 font-semibold">Bounding Box Hit-Testing</span>, <span className="text-emerald-400 font-bold">Tactile Button Click Depressions</span>, <span className="text-amber-300 font-semibold">Docked Toolbars</span>, and <span className="text-purple-400 font-semibold">Dynamic Toggle Switches</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎛️ Bounding Box Button Engine
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              💥 Tactile Click Compression Animation
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎮 In-Game Docked Dashboard Ribbon
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE UI DASHBOARD & TOOLBAR STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎛️</span> Interactive In-Game Dashboard & UI Ribbon
              </h3>
              <p className="text-xs text-slate-400">
                Click the docked toolbar buttons to trigger tactile animations, toggle audio, boost speed, and observe real-time bounding box hit-testing.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 font-bold">
                SCORE: {score} PTS
              </span>
              <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
                isPlaying
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-300 border-rose-500/40"
              }`}>
                STATUS: {isPlaying ? "RUNNING" : "STOPPED"}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Rendered Canvas Screen with Docked Toolbar */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Game Canvas & Docked Toolbar Surface
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg border border-slate-800 select-none">
                {/* Arena World */}
                <rect x="15" y="15" width="290" height="110" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />

                {/* Starfighter / Energy Sphere in Arena */}
                <g transform="translate(160, 70)">
                  <circle cx="0" cy="0" r={isPlaying ? "18" : "14"} fill={isPlaying ? "#38bdf8" : "#64748b"} stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="6" fill="#020617" />
                </g>

                {/* Bottom Docked Toolbar Ribbon Background */}
                <rect x="15" y="132" width="290" height="36" rx="4" fill="#020617" stroke="#334155" strokeWidth="1.5" />

                {/* Button 1: Play / Pause */}
                <g
                  transform="translate(25, 137)"
                  onClick={() => triggerButtonAction("play", isPlaying ? "Pause" : "Play", () => setIsPlaying(!isPlaying))}
                  className={`cursor-pointer transition-transform duration-100 ${depressedBtn === "play" ? "scale-95" : ""}`}
                >
                  <rect x="0" y="0" width="60" height="26" rx="4" fill={isPlaying ? "#f59e0b" : "#059669"} />
                  <text x="30" y="17" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                  </text>
                </g>

                {/* Button 2: Boost (+50 Score) */}
                <g
                  transform="translate(93, 137)"
                  onClick={() => triggerButtonAction("boost", "Boost +50", () => setScore((s) => s + 50))}
                  className={`cursor-pointer transition-transform duration-100 ${depressedBtn === "boost" ? "scale-95" : ""}`}
                >
                  <rect x="0" y="0" width="60" height="26" rx="4" fill="#0284c7" />
                  <text x="30" y="17" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    ⚡ BOOST
                  </text>
                </g>

                {/* Button 3: Audio Toggle */}
                <g
                  transform="translate(161, 137)"
                  onClick={() => triggerButtonAction("audio", soundOn ? "Audio Muted" : "Audio On", () => setSoundOn(!soundOn))}
                  className={`cursor-pointer transition-transform duration-100 ${depressedBtn === "audio" ? "scale-95" : ""}`}
                >
                  <rect x="0" y="0" width="65" height="26" rx="4" fill="#6366f1" />
                  <text x="32.5" y="17" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {soundOn ? "🔊 AUDIO" : "🔇 MUTED"}
                  </text>
                </g>

                {/* Button 4: Reset */}
                <g
                  transform="translate(234, 137)"
                  onClick={() => triggerButtonAction("reset", "Reset Game", () => { setIsPlaying(false); setScore(0); })}
                  className={`cursor-pointer transition-transform duration-100 ${depressedBtn === "reset" ? "scale-95" : ""}`}
                >
                  <rect x="0" y="0" width="60" height="26" rx="4" fill="#dc2626" />
                  <text x="30" y="17" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    ↺ RESET
                  </text>
                </g>
              </svg>
            </div>

            {/* View 2: Hit-Testing Telemetry & Code */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Bounding Box Hit-Testing Telemetry</span>
                <span className="font-mono text-xs text-emerald-300 font-bold">O(B) Linear Check</span>
              </div>

              {/* Status Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Last UI Dispatch Event</div>
                <div className="text-xs font-mono font-bold mt-1 text-cyan-300">
                  {lastAction}
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Bounding Box Hit-Testing Blueprint
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`def on_canvas_click(x, y):
    for b in buttons:
        if (b["x"] <= x <= b["x"] + b["w"]) and \\
           (b["y"] <= y <= b["y"] + b["h"]):
            b["action"]()
            return`}
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
            <span>⚙️</span> Interactive Canvas UI Core APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Pattern / Component</th>
                  <th className="py-3 px-4">UI Layer</th>
                  <th className="py-3 px-4">Interactive Role</th>
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
            {/* File 1: clickable_canvas_button_engine.py */}
            <PythonFileLoader
              fileModule={buttonEngineCode}
              title="clickable_canvas_button_engine.py"
              highlightLines={[19, 20, 21, 35, 46, 56, 57, 58]}
            />

            {/* File 2: tactile_animated_turtle_buttons.py */}
            <PythonFileLoader
              fileModule={tactileButtonsCode}
              title="tactile_animated_turtle_buttons.py"
              highlightLines={[25, 26, 38, 40, 42, 47, 48]}
            />

            {/* File 3: complete_interactive_game_toolbar.py */}
            <PythonFileLoader
              fileModule={toolbarDashboardCode}
              title="complete_interactive_game_toolbar.py"
              highlightLines={[26, 27, 28, 29, 36, 37, 63, 64, 65]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🎛️</span> Barrackpore Digital Soundboard Dashboard
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima built an electronic music synthesizer dashboard in Barrackpore. By anchoring an 8-button soundboard ribbon along the bottom edge, clicking buttons triggered drum samples, basslines, and synth pads with instant tactile depression animations!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🎨</span> Kolkata Graphic Design Suite Toolbar
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila in Kolkata constructed a graphic design workstation with Brush, Eraser, Fill, and Undo toolbar buttons. By implementing the Bounding Box Manager, clicking buttons switched tools effortlessly without creating dozens of separate turtle objects!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Canvas UI Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Confusing Top-Left vs Bottom-Left Coordinates</strong>
              <p className="text-slate-400">
                Turtle draws rectangles starting from the bottom-left corner <code className="text-cyan-300 font-mono">(x, y)</code> up to <code className="text-cyan-300 font-mono">(x + w, y + h)</code>. Testing <code className="text-rose-300 font-mono">y - h</code> causes clicks to be missed.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Creating 50 Turtle Objects for Buttons</strong>
              <p className="text-slate-400">
                Spawning a new <code className="text-rose-300 font-mono">turtle.Turtle()</code> for every button and text label consumes hundreds of Tkinter handles. Use 1 turtle to render all bounding box buttons.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Zero Visual Feedback on Clicks</strong>
              <p className="text-slate-400">
                Buttons that don't animate or change color feel broken to users. Always provide tactile scaling (<code className="text-cyan-300 font-mono">shapesize(0.9)</code>) or status banner updates upon click.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Hardcoding Button Coordinates Everywhere</strong>
              <p className="text-slate-400">
                Duplicating button coordinates in the draw function and click handler causes bugs when moving buttons. Always define buttons once in a data dictionary list.
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
              "I know how to test if a click coordinate falls inside a button bounding box",
              "I center button text labels using `(btn.x + btn.w/2)` and `align='center'`",
              "I implement tactile depression animations on button clicks using `shapesize()` and `ontimer()`",
              "I build docked toolbar ribbons containing Play, Pause, Reset, and Audio toggles",
              "I define buttons as structured data dictionaries to follow clean DRY principles",
              "I know how to build complete interactive graphical applications in Python Turtle"
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
              👉 <strong>Think about:</strong> How modern design systems (TailwindCSS, Material Design, Apple HIG) structure button states, padding, elevation, and tactile feedback!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How clicking the buttons in our simulator triggers instant visual compression and dispatches state updates!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add a 5th button to the toolbar that switches between Dark Mode and Light Mode color schemes!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Congratulations on completing Module 005_006! You have conquered the entire spectrum of event handling and user interaction: event loops, window focus, continuous multi-key bindings, mouse click hit-testing, freehand dragging, vehicle kinematics, finite state machines, and custom graphical UI toolbars. You now possess the full power to engineer rich, responsive, interactive desktop software!
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Interactive Canvas UI & Buttons FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: Canvas UI & Interactive Buttons Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic7_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="As we conclude Module 005_006 at Coder & AccoTax in Barrackpore and Kolkata, I want to celebrate how much you have grown. You began with simple passive drawings; now you are designing complete interactive user interfaces with clickable dashboards, real-time vehicle physics, and state machines. You have officially stepped into the world of real interactive software development!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic7;
