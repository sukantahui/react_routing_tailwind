import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";

// Import Python Source Files
import sleepVsOntimerCode from "./topic3_files/blocking_sleep_vs_ontimer.py?raw";
import eventMultitaskerCode from "./topic3_files/event_driven_multitasker_ontimer.py?raw";
import deltaTimeCode from "./topic3_files/delta_time_framerate_independent_physics.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseTimer {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.04); opacity: 1; filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.6)); }
}
`;

const Topic3 = () => {
  const [timingMode, setTimingMode] = useState("ontimer"); // "sleep" vs "ontimer"
  const [playerX, setPlayerX] = useState(160);
  const [obstacleX, setObstacleX] = useState(40);
  const [timerCount, setTimerCount] = useState(0);

  // Obstacle Animation (16ms loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacleX((prev) => (prev >= 280 ? 40 : prev + 3));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // 1-second clock counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeySteer = (dir) => {
    if (timingMode === "sleep") {
      // Simulate input lag / freezing in blocking sleep mode
      return;
    }
    setPlayerX((prev) => (dir === "left" ? Math.max(30, prev - 25) : Math.min(290, prev + 25)));
  };

  const prototypes = [
    {
      name: "screen.ontimer(callback, delay_ms)",
      returnType: "Asynchronous Scheduling",
      purpose: "Schedules a non-blocking function execution after delay_ms inside Tkinter's event loop.",
      usage: "screen.ontimer(game_tick, 16)"
    },
    {
      name: "time.sleep(seconds)",
      returnType: "Synchronous Thread Block",
      purpose: "Pauses the entire Python OS execution thread for a fixed duration (simple but blocks UI events).",
      usage: "time.sleep(0.0166)"
    },
    {
      name: "dt = now - last_time",
      returnType: "Delta-Time Calculation",
      purpose: "Measures exact elapsed frame duration for framerate-independent physics: `x += speed * dt`.",
      usage: "x += speed_per_sec * dt"
    },
    {
      name: "screen.mainloop()",
      returnType: "Event Loop Dispatcher",
      purpose: "Enters Tkinter's persistent event listener, firing scheduled timers and user inputs.",
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
            Module 005_005 · Animation & Motion Logic · Topic 3
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Timing & Loop Delays: time.sleep() vs ontimer()
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master the transition from synchronous thread blocking to asynchronous event-driven game loops. Explore <span className="text-cyan-300 font-semibold">screen.ontimer() multitasking</span>, <span className="text-emerald-300 font-semibold">zero-input-lag keyboard controls</span>, and <span className="text-amber-300 font-semibold">Delta-Time (dt) physics</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚡ screen.ontimer() Event Architecture
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎮 Non-Blocking Keyboard Responsiveness
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⏱️ Framerate-Independent Delta-Time
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE EVENT-LOOP TIMING SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>⚡</span> Interactive Timing Paradigm Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Switch between Synchronous `time.sleep()` (Thread Blocking) and Asynchronous `ontimer()` (Cooperative Multitasking).
              </p>
            </div>

            {/* Timing Mode Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTimingMode("sleep")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  timingMode === "sleep"
                    ? "bg-rose-500 text-white font-bold shadow-md shadow-rose-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                ⏸️ Synchronous time.sleep() (Blocks Input)
              </button>

              <button
                onClick={() => setTimingMode("ontimer")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  timingMode === "ontimer"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                🚀 Asynchronous ontimer() (Instant Input)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Interactive Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Interactive Arcade Simulation ({timingMode.toUpperCase()})
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* HUD Banner */}
                <rect x="10" y="10" width="300" height="24" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="20" y="26" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  SURVIVED: {timerCount}s | MODE: {timingMode === "ontimer" ? "ASYNC ONTIMER" : "BLOCKED SLEEP"}
                </text>

                {/* Patrol Obstacle (Moving automatically) */}
                <circle cx={obstacleX} cy="70" r="14" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                <text x={obstacleX} y="74" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">ENEMY</text>

                {/* Player Ship */}
                <g transform={`translate(${playerX}, 130)`}>
                  <polygon points="0,-18 -15,10 15,10" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="-2" r="3" fill="#020617" />
                </g>

                {/* Status alert */}
                {timingMode === "sleep" && (
                  <text x="160" y="110" fill="#f43f5e" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                    ⚠️ THREAD BLOCKED - INPUT FROZEN!
                  </text>
                )}
              </svg>

              {/* Interactive Steering Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => handleKeySteer("left")}
                  disabled={timingMode === "sleep"}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                    timingMode === "sleep"
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-800"
                      : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/25"
                  }`}
                >
                  ◀ Steer Left
                </button>

                <button
                  onClick={() => handleKeySteer("right")}
                  disabled={timingMode === "sleep"}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                    timingMode === "sleep"
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-800"
                      : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/25"
                  }`}
                >
                  Steer Right ▶
                </button>
              </div>
            </div>

            {/* View 2: Architecture Comparison & Metrics */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Architecture Diagnostics</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  timingMode === "ontimer"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                }`}>
                  {timingMode === "ontimer" ? "Event-Driven Asynchronous" : "Synchronous Thread Halt"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Keyboard Input Latency</div>
                  <div className={`text-base font-mono font-bold ${
                    timingMode === "ontimer" ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {timingMode === "ontimer" ? "0 ms (Instant)" : "1,000+ ms (Stalled)"}
                  </div>
                  <div className="text-[10px] text-slate-500">Event Queue Responsiveness</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Concurrent Timers</div>
                  <div className="text-base font-mono font-bold text-sky-400">
                    {timingMode === "ontimer" ? "Multi-Timer (60FPS + 1s HUD)" : "Single Thread Only"}
                  </div>
                  <div className="text-[10px] text-slate-500">Cooperative Task Slicing</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # {timingMode === "ontimer" ? "Non-Blocking Event-Driven Pattern" : "Blocking Linear Sleep Pattern"}
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{timingMode === "ontimer"
  ? `def game_tick():
    update_physics()
    screen.update()
    screen.ontimer(game_tick, 16)  # 60 FPS non-blocking!`
  : `while running:
    update_physics()
    screen.update()
    time.sleep(0.0166)  # Blocks OS thread!`}
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
            <span>⚙️</span> Timing & Loop Scheduling APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method / Timing Pattern</th>
                  <th className="py-3 px-4">Paradigm</th>
                  <th className="py-3 px-4">Execution & Event Role</th>
                  <th className="py-3 px-4">Standard Call</th>
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
            {/* File 1: blocking_sleep_vs_ontimer.py */}
            <PythonFileLoader
              fileModule={sleepVsOntimerCode}
              title="blocking_sleep_vs_ontimer.py"
              highlightLines={[25, 30, 48, 51, 54, 57]}
            />

            {/* File 2: event_driven_multitasker_ontimer.py */}
            <PythonFileLoader
              fileModule={eventMultitaskerCode}
              title="event_driven_multitasker_ontimer.py"
              highlightLines={[22, 23, 26, 27, 47, 59, 62, 63, 65]}
            />

            {/* File 3: delta_time_framerate_independent_physics.py */}
            <PythonFileLoader
              fileModule={deltaTimeCode}
              title="delta_time_framerate_independent_physics.py"
              highlightLines={[21, 26, 27, 33, 44]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🏎️</span> Barrackpore Racing Game: Lag Elimination
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata created an arcade car racer in Barrackpore. When she added a 1-second countdown delay using <code className="text-rose-300 font-mono">time.sleep(1)</code>, player arrow key inputs were completely ignored. Teacher Sukanta Hui guided her to refactor to <code className="text-cyan-300 font-mono">screen.ontimer(game_tick, 16)</code> and <code className="text-emerald-300 font-mono">screen.ontimer(countdown_tick, 1000)</code>. Controls became instantaneous and lightning responsive!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-indigo-400 text-lg flex items-center gap-2">
              <span>✈️</span> Kolkata Delta-Time Flight Physics
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu in Kolkata tested his flight simulator across a high-end 144Hz desktop and an older 30Hz laptop. Because he multiplied velocity by <code className="text-emerald-300 font-mono">dt = time.perf_counter() - last_time</code>, airplanes traveled across the screen in exactly 4.0 seconds on both computers without speed distortion!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Timing Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Calling ontimer with Seconds</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">ontimer(tick, 0.016)</code> rounds down to 0 milliseconds, overloading the CPU. <code className="text-cyan-300 font-mono">ontimer()</code> expects integer milliseconds (e.g. <code className="text-emerald-300 font-mono">16</code>).
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Invoking the Function in ontimer</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">ontimer(tick(), 16)</code> with parentheses executes <code className="text-rose-300 font-mono">tick()</code> immediately once instead of passing the function reference. Pass <code className="text-cyan-300 font-mono">ontimer(tick, 16)</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Mixing while True and mainloop()</strong>
              <p className="text-slate-400">
                Putting a <code className="text-rose-300 font-mono">while True:</code> loop before <code className="text-amber-300 font-mono">screen.mainloop()</code> prevents <code className="text-amber-300 font-mono">mainloop()</code> from ever executing, breaking all event listeners.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Unclamped Delta-Time Explosion</strong>
              <p className="text-slate-400">
                When dragging the window, <code className="text-rose-300 font-mono">dt</code> jumps to 2.0+ seconds, launching physics objects into outer space. Always clamp with <code className="text-cyan-300 font-mono">dt = min(dt, 0.05)</code>.
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
              "I understand why `screen.ontimer()` is non-blocking and preserves keyboard responsiveness",
              "I know that `screen.ontimer()` accepts milliseconds (16 ms for ~60 FPS)",
              "I pass function references (`ontimer(tick, 16)`) without executing parentheses `()`",
              "I know how to run multiple concurrent timers (e.g. physics tick + countdown HUD)",
              "I can calculate delta-time (`dt = now - last_time`) for framerate-independent physics",
              "I always clamp maximum delta time (`min(dt, 0.05)`) to protect against physics explosions"
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
              👉 <strong>Think about:</strong> How modern JavaScript engines (V8 in Chrome, Node.js) and React event loops use non-blocking asynchronous timers to keep web apps snappy!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How clicking the steering buttons responds instantly in `ontimer()` mode, while `time.sleep()` freezes input!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Add smooth slow-motion bullet time by scaling <code className="text-amber-300 font-mono">dt *= 0.3</code> during evasive player dodges!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transitioning from synchronous blocking code to asynchronous event-driven architecture is one of the biggest mental leaps in a software engineer's growth. Once you understand cooperative multitasking and delta-time pacing, you possess the core mental model used across web servers, mobile apps, and game engines worldwide.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Timing & Loop Delays FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Timing & Loop Delays Study Note"
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
            note="At Coder & AccoTax in Barrackpore and Kolkata, I often see students struggle when their games freeze because of time.sleep(). When we introduce ontimer(), it's like a lightbulb turns on! Learning to let the event loop drive the animation while processing user input in parallel is the true foundation of interactive software development."
          />
        </div>

      </div>
    </div>
  );
};

export default Topic3;
