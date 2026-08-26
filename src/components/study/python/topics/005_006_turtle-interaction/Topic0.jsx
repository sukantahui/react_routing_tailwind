import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";

// Import Python Source Files
import eventParadigmCode from "./topic0_files/event_driven_paradigm_intro.py?raw";
import callbacksCode from "./topic0_files/callbacks_first_class_functions.py?raw";
import trafficLightCode from "./topic0_files/interactive_traffic_light_controller.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseSignal {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); filter: drop-shadow(0 0 12px currentColor); }
}
`;

const Topic0 = () => {
  const [trafficState, setTrafficState] = useState("red"); // "red", "yellow", "green"
  const [eventLogs, setEventLogs] = useState([
    { id: 1, type: "INITIALIZE", msg: "screen.listen() engaged - Event queue active" }
  ]);
  const [stamps, setStamps] = useState([
    { x: 120, y: 70, color: "#f43f5e", shape: "circle" },
    { x: 220, y: 90, color: "#38bdf8", shape: "square" }
  ]);

  const handleTrafficAdvance = () => {
    const cycle = { red: "green", green: "yellow", yellow: "red" };
    const nextState = cycle[trafficState];
    setTrafficState(nextState);
    setEventLogs((prev) => [
      { id: Date.now(), type: "KEYPRESS ('space')", msg: `State Transition: ${trafficState.toUpperCase()} -> ${nextState.toUpperCase()}` },
      ...prev.slice(0, 4)
    ]);
  };

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const colors = ["#f43f5e", "#fbbf24", "#34d399", "#38bdf8", "#a855f7"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setStamps((prev) => [...prev.slice(-6), { x: clickX, y: clickY, color: randomColor, shape: "circle" }]);
    setEventLogs((prev) => [
      { id: Date.now(), type: "ONCLICK", msg: `Dispatched on_click(${clickX.toFixed(0)}, ${clickY.toFixed(0)}) -> Stamp Created` },
      ...prev.slice(0, 4)
    ]);
  };

  const prototypes = [
    {
      name: "screen.onclick(fun)",
      returnType: "Mouse Event Listener",
      purpose: "Binds a 2-parameter callback `fun(x, y)` to canvas mouse clicks.",
      usage: "screen.onclick(on_canvas_click)"
    },
    {
      name: "screen.onkeypress(fun, key)",
      returnType: "Keyboard Event Listener",
      purpose: "Binds a parameterless callback `fun` to a specific keyboard key string.",
      usage: "screen.onkeypress(advance_light, 'space')"
    },
    {
      name: "screen.listen()",
      returnType: "Focus Dispatcher",
      purpose: "Gives window focus to Tkinter canvas so keyboard events are actively captured.",
      usage: "screen.listen()"
    },
    {
      name: "screen.mainloop()",
      returnType: "Event Loop Dispatcher",
      purpose: "Enters the persistent event listening loop, keeping the window alive and responsive.",
      usage: "screen.mainloop()"
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
            Module 005_006 · Event Handling & Interaction · Topic 0
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Event-Driven Programming Model Concepts
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transition from linear scripts to reactive software. Master the <span className="text-cyan-300 font-semibold">Event Queue</span>, <span className="text-emerald-300 font-semibold">First-Class Callback Functions</span>, <span className="text-amber-300 font-semibold">Inversion of Control (IoC)</span>, and <span className="text-purple-400 font-semibold">Asynchronous State Machines</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚡ Asynchronous Event Listeners
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎯 First-Class Callback References
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🚦 Event-Driven State Machines
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE EVENT DISPATCHER SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>⚡</span> Interactive Event Dispatcher & State Machine
              </h3>
              <p className="text-xs text-slate-400">
                Click anywhere on the canvas to trigger asynchronous <code className="text-cyan-300 font-mono">onclick(x, y)</code> callbacks, or trigger the Traffic Light event state transition.
              </p>
            </div>

            <button
              onClick={handleTrafficAdvance}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition cursor-pointer flex items-center gap-2"
            >
              <span>🚦</span> Trigger Spacebar Event (Advance Light)
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Interactive Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Interactive Canvas (Click to trigger onclick callback)
              </span>
              <svg
                viewBox="0 0 320 190"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleCanvasClick}
                className="w-full max-w-sm h-auto bg-slate-950 rounded-lg cursor-crosshair border border-slate-800"
              >
                {/* Traffic Light Housing (Left) */}
                <rect x="25" y="25" width="55" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                {/* Red Light */}
                <circle
                  cx="52"
                  cy="50"
                  r="16"
                  fill={trafficState === "red" ? "#ef4444" : "#450a0a"}
                  className={trafficState === "red" ? "animate-[pulseSignal_2s_infinite] text-red-500" : ""}
                />
                {/* Yellow Light */}
                <circle
                  cx="52"
                  cy="95"
                  r="16"
                  fill={trafficState === "yellow" ? "#eab308" : "#422006"}
                  className={trafficState === "yellow" ? "animate-[pulseSignal_2s_infinite] text-yellow-500" : ""}
                />
                {/* Green Light */}
                <circle
                  cx="52"
                  cy="140"
                  r="16"
                  fill={trafficState === "green" ? "#22c55e" : "#052e16"}
                  className={trafficState === "green" ? "animate-[pulseSignal_2s_infinite] text-green-500" : ""}
                />

                {/* Stamped Click Shapes */}
                {stamps.map((s, idx) => (
                  <circle
                    key={idx}
                    cx={s.x}
                    cy={s.y}
                    r="12"
                    fill={s.color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                ))}

                {/* Instructions */}
                <text x="195" y="170" fill="#64748b" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
                  CLICK CANVAS TO STAMP
                </text>
              </svg>
            </div>

            {/* View 2: Real-Time Event Dispatch Log */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>OS Event Queue Telemetry</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  Event Loop: RUNNING
                </span>
              </div>

              {/* Event Logs Stream */}
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {eventLogs.map((log) => (
                  <div key={log.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] text-amber-300 font-bold shrink-0">{log.type}</span>
                    <span className="text-[11px] text-slate-300 font-mono text-right">{log.msg}</span>
                  </div>
                ))}
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Event Binding Blueprint
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`# 1. Bind Listeners (Pass reference WITHOUT ())
screen.onclick(on_canvas_click)
screen.onkeypress(advance_light, "space")
# 2. Give window focus
screen.listen()
# 3. Enter Event Dispatcher Loop
screen.mainloop()`}
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
            <span>⚙️</span> Event-Driven Architecture Core APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method / Keyword</th>
                  <th className="py-3 px-4">Event Domain</th>
                  <th className="py-3 px-4">Asynchronous Role</th>
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
            {/* File 1: event_driven_paradigm_intro.py */}
            <PythonFileLoader
              fileModule={eventParadigmCode}
              title="event_driven_paradigm_intro.py"
              highlightLines={[24, 32, 40, 41, 44, 47]}
            />

            {/* File 2: callbacks_first_class_functions.py */}
            <PythonFileLoader
              fileModule={callbacksCode}
              title="callbacks_first_class_functions.py"
              highlightLines={[12, 18, 35, 36, 37, 39, 40]}
            />

            {/* File 3: interactive_traffic_light_controller.py */}
            <PythonFileLoader
              fileModule={trafficLightCode}
              title="interactive_traffic_light_controller.py"
              highlightLines={[18, 20, 39, 40, 46, 47, 48]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🎨</span> Barrackpore Digital Sketchbook
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita built a digital drawing app in Barrackpore. When she mistakenly wrote <code className="text-rose-300 font-mono">screen.onclick(draw_circle())</code>, the circle drew immediately at startup and failed on mouse clicks. Teacher Sukanta Hui helped her remove the parentheses (<code className="text-cyan-300 font-mono">screen.onclick(draw_circle)</code>). Her sketchpad worked like magic!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🚦</span> Kolkata Smart Traffic Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila modeled a dynamic traffic signal junction in Kolkata. By binding pedestrian emergency pushbuttons to asynchronous event handlers with dictionary state transitions, her junction dynamically adjusted light cycles without freezing vehicle animation!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Event-Driven Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Calling the Function in Event Binding</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">screen.onclick(my_func())</code> executes the function immediately once and binds <code className="text-rose-300 font-mono">None</code>. Always pass the function reference <code className="text-cyan-300 font-mono">screen.onclick(my_func)</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Forgetting screen.listen()</strong>
              <p className="text-slate-400">
                Registering keyboard handlers without calling <code className="text-cyan-300 font-mono">screen.listen()</code> means the canvas never gains keyboard focus, ignoring all keystrokes.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Incorrect onclick Argument Count</strong>
              <p className="text-slate-400">
                <code className="text-cyan-300 font-mono">screen.onclick</code> always passes <code className="text-amber-300 font-mono">(x, y)</code>. Defining a 0-argument function <code className="text-rose-300 font-mono">def click():</code> raises a <code className="text-rose-300 font-mono">TypeError: takes 0 positional arguments but 2 were given</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Heavy Blocking Loops Inside Callbacks</strong>
              <p className="text-slate-400">
                Placing a 5-second computation or <code className="text-rose-300 font-mono">time.sleep(5)</code> inside an event callback freezes the GUI thread, causing the window to crash and stop responding.
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
              "I understand the difference between linear sequential scripts and event-driven architecture",
              "I know that callbacks are first-class function references passed without parentheses `()`",
              "I always call `screen.listen()` to enable keyboard event capturing",
              "I know that `screen.onclick` passes `(x, y)` coordinates to its callback function",
              "I use `lambda` or `functools.partial` to pass custom parameters to event handlers",
              "I understand that `screen.mainloop()` / `turtle.done()` keeps the event dispatcher alive"
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
              Event-driven programming transforms software from passive calculators into interactive, living user experiences. Understanding Inversion of Control, asynchronous event queues, and callback functions is one of the most empowering milestones in your journey toward becoming a professional full-stack software engineer.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Event-Driven Programming FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Event-Driven Programming Study Note"
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
            note="Welcome to Module 005_006 at Coder & AccoTax in Barrackpore and Kolkata! This is where software becomes truly interactive. Up until now, your code told the computer what to do step-by-step; today, you teach your program how to listen and respond to the user. Master callback functions and event listeners, and you will be ready to build any interactive GUI, game, or web app!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic0;
