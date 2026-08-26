import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";

// Import Python Source Files
import listenMechanicsCode from "./topic1_files/screen_listen_focus_mechanics.py?raw";
import autoRefocusCode from "./topic1_files/auto_refocus_canvas_keeper.py?raw";
import focusDashboardCode from "./topic1_files/interactive_focus_status_dashboard.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes focusRing {
  0%, 100% { border-color: rgba(56, 189, 248, 0.4); }
  50% { border-color: rgba(56, 189, 248, 0.9); filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.5)); }
}
`;

const Topic1 = () => {
  const [hasFocus, setHasFocus] = useState(true);
  const [ship, setShip] = useState({ x: 160, y: 90, angle: 0 });
  const [lastAction, setLastAction] = useState("screen.listen() active");

  const handleKeyAction = (type) => {
    if (!hasFocus) {
      setLastAction("⚠️ KEY IGNORED - Canvas has LOST FOCUS! Click canvas to re-focus.");
      return;
    }

    if (type === "left") {
      setShip((s) => ({ ...s, angle: (s.angle - 25) % 360 }));
      setLastAction("Rotated Left (25°)");
    } else if (type === "right") {
      setShip((s) => ({ ...s, angle: (s.angle + 25) % 360 }));
      setLastAction("Rotated Right (25°)");
    } else if (type === "forward") {
      const rad = (ship.angle * Math.PI) / 180;
      const nx = Math.max(25, Math.min(295, ship.x + Math.sin(rad) * 18));
      const ny = Math.max(25, Math.min(155, ship.y - Math.cos(rad) * 18));
      setShip((s) => ({ ...s, x: nx, y: ny }));
      setLastAction(`Thrust Forward -> (${nx.toFixed(0)}, ${ny.toFixed(0)})`);
    }
  };

  const handleCanvasClick = () => {
    setHasFocus(true);
    setLastAction("✨ Auto-Refocus Triggered! screen.listen() re-engaged.");
  };

  const prototypes = [
    {
      name: "screen.listen()",
      returnType: "Keyboard Focus Seizure",
      purpose: "Requests and claims active OS window focus so keyboard events are dispatched to Python callbacks.",
      usage: "screen.listen()"
    },
    {
      name: "screen.onclick(refocus_handler)",
      returnType: "Auto-Refocus Binding",
      purpose: "Re-calls `screen.listen()` upon user canvas clicks, recovering lost keyboard focus instantly.",
      usage: "screen.onclick(lambda x, y: screen.listen())"
    },
    {
      name: "canvas.focus_force()",
      returnType: "Underlying Tkinter Focus",
      purpose: "Low-level Tkinter widget method invoked by `screen.listen()` to force OS focus state.",
      usage: "screen.getcanvas().focus_force()"
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
            Module 005_006 · Event Handling & Interaction · Topic 1
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Screen Event Listening: screen.listen() & Window Focus
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understand the mechanics of operating system window focus. Master <span className="text-cyan-300 font-semibold">screen.listen()</span>, prevent <span className="text-rose-400 font-semibold">silent keyboard input failures</span>, and implement the <span className="text-emerald-400 font-bold">Auto-Refocus Architecture</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎯 OS Window Focus Mechanics
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🛡️ Auto-Refocus on Click Pattern
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🚀 Seamless Spacecraft Flight Controls
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE FOCUS & STEERING SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎮</span> Interactive Window Focus & Keyboard Capture Lab
              </h3>
              <p className="text-xs text-slate-400">
                Toggle focus state to observe how keyboard events succeed with <code className="text-cyan-300 font-mono">screen.listen()</code> and fail silently when focus is lost.
              </p>
            </div>

            {/* Focus State Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHasFocus(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  hasFocus
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                ✅ Focused (screen.listen())
              </button>

              <button
                onClick={() => {
                  setHasFocus(false);
                  setLastAction("⚠️ Window lost focus (User clicked external app)");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  !hasFocus
                    ? "bg-rose-500 text-white font-bold shadow-md shadow-rose-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                ❌ Unfocused (Lost Focus)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Canvas SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Flight Arena Viewport (Click to Re-Focus)
              </span>
              <svg
                viewBox="0 0 320 180"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleCanvasClick}
                className={`w-full max-w-sm h-auto bg-slate-950 rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                  hasFocus ? "border-cyan-500/80 animate-[focusRing_3s_infinite]" : "border-rose-500/60 opacity-70"
                }`}
              >
                {/* Arena Grid */}
                <line x1="20" y1="90" x2="300" y2="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="160" y1="20" x2="160" y2="160" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                {/* Animated Spacecraft Ship */}
                <g transform={`translate(${ship.x}, ${ship.y}) rotate(${ship.angle})`}>
                  <polygon points="0,-16 -12,12 12,12" fill={hasFocus ? "#38bdf8" : "#64748b"} stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3" fill="#020617" />
                  {/* Thruster Fire */}
                  {hasFocus && (
                    <polygon points="-5,12 0,20 5,12" fill="#fbbf24" opacity="0.8" />
                  )}
                </g>

                {/* Focus Overlay Badge */}
                <g transform="translate(15, 15)">
                  <rect x="0" y="0" width="130" height="20" rx="4" fill="#0f172a" stroke={hasFocus ? "#34d399" : "#f43f5e"} strokeWidth="1" />
                  <text x="65" y="14" fill={hasFocus ? "#34d399" : "#f43f5e"} fontSize="8.5" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                    {hasFocus ? "● FOCUS ACTIVE" : "○ LOST FOCUS"}
                  </text>
                </g>

                {!hasFocus && (
                  <text x="160" y="100" fill="#f43f5e" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                    CLICK CANVAS TO RESTORE FOCUS!
                  </text>
                )}
              </svg>

              {/* Flight Steering Controls */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => handleKeyAction("left")}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/40 transition cursor-pointer"
                >
                  ◀ Rotate Left
                </button>
                <button
                  onClick={() => handleKeyAction("forward")}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25 transition cursor-pointer"
                >
                  ▲ Thrust Forward
                </button>
                <button
                  onClick={() => handleKeyAction("right")}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/40 transition cursor-pointer"
                >
                  Rotate Right ▶
                </button>
              </div>
            </div>

            {/* View 2: Focus Telemetry & Code */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Keyboard Input Stream Status</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  hasFocus
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                }`}>
                  {hasFocus ? "Event Queue: CAPTURING" : "Event Queue: BLOCKED"}
                </span>
              </div>

              {/* Status Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Last Input Event Action</div>
                <div className={`text-xs font-mono font-bold mt-1 ${hasFocus ? "text-cyan-300" : "text-rose-400"}`}>
                  {lastAction}
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # 3-Step Keyboard Focus Blueprint
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`# 1. Bind keys
screen.onkeypress(turn_left, "Left")
# 2. Claim OS keyboard focus!
screen.listen()
# 3. Auto-Refocus on click
screen.onclick(lambda x, y: screen.listen())`}
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
            <span>⚙️</span> Focus Management Core APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method / Hook</th>
                  <th className="py-3 px-4">Subsystem</th>
                  <th className="py-3 px-4">Focus Management Role</th>
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
            {/* File 1: screen_listen_focus_mechanics.py */}
            <PythonFileLoader
              fileModule={listenMechanicsCode}
              title="screen_listen_focus_mechanics.py"
              highlightLines={[22, 33, 44, 48, 52, 54, 57]}
            />

            {/* File 2: auto_refocus_canvas_keeper.py */}
            <PythonFileLoader
              fileModule={autoRefocusCode}
              title="auto_refocus_canvas_keeper.py"
              highlightLines={[20, 27, 28, 32, 33, 35]}
            />

            {/* File 3: interactive_focus_status_dashboard.py */}
            <PythonFileLoader
              fileModule={focusDashboardCode}
              title="interactive_focus_status_dashboard.py"
              highlightLines={[18, 37, 38, 41, 42]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>✈️</span> Barrackpore Flight Simulator: Silent Failure
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima spent 2 hours debugging her airplane flight simulator in Barrackpore. The code had zero syntax errors, but pressing arrow keys did nothing. Teacher Sukanta Hui spotted the missing <code className="text-cyan-300 font-mono">screen.listen()</code> call. Adding this single line activated window focus and brought her airplane to life!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🛡️</span> Kolkata Auto-Refocus Armor
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu in Kolkata created an arcade game with popup score dialogs. After typing a player name into <code className="text-cyan-300 font-mono">textinput()</code>, keyboard controls froze. By implementing the Auto-Refocus pattern (<code className="text-emerald-300 font-mono">screen.onclick(lambda x, y: screen.listen())</code>), clicking anywhere immediately re-claimed game focus!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Screen.listen() Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Omitting screen.listen() Completely</strong>
              <p className="text-slate-400">
                The program executes without throwing errors, but keyboard event handlers are never triggered because the OS doesn't route keystrokes to an unfocused canvas.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Lost Focus After Popup Dialogs</strong>
              <p className="text-slate-400">
                Using <code className="text-rose-300 font-mono">textinput()</code> or <code className="text-rose-300 font-mono">numinput()</code> steals focus away to the modal dialog; always re-call <code className="text-cyan-300 font-mono">screen.listen()</code> after the dialog closes.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Calling listen() Inside Tight Loops</strong>
              <p className="text-slate-400">
                Calling <code className="text-amber-300 font-mono">screen.listen()</code> 60 times per second inside the animation loop is redundant and wastes CPU cycles. Call it once during initialization.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Assuming Mouse Clicks Need listen()</strong>
              <p className="text-slate-400">
                Mouse clicks carry implicit coordinate targeting, leading beginners to falsely assume keyboard inputs work without <code className="text-cyan-300 font-mono">screen.listen()</code>.
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
              "I understand that the OS directs keystrokes exclusively to the active focused window",
              "I always call `screen.listen()` to claim keyboard focus for the Turtle canvas",
              "I know that omitting `screen.listen()` causes keyboard events to fail silently",
              "I implement the Auto-Refocus pattern inside `screen.onclick()` handlers",
              "I re-call `screen.listen()` after using popup modal dialogs like `textinput()`",
              "I know that `screen.listen()` wraps Tkinter's `canvas.focus_force()` method"
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
              Window focus is a fundamental concept in human-computer interaction. By understanding how the operating system negotiates focus between applications, you ensure that your software behaves predictably, recovers gracefully from user multitasking, and delivers an intuitive, frustration-free experience.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Screen.listen() & Focus FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Screen.listen() Study Note"
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
            note="In my classroom at Coder & AccoTax in Barrackpore and Kolkata, the #1 question students ask when first writing interactive games is: 'Sir, why aren't my arrow keys working?' 99% of the time, the answer is a missing screen.listen(). Remember: binding keys tells your program what to do; screen.listen() tells the operating system to pay attention!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic1;
