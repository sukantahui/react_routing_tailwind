import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";

// Import Python Source Files
import frameLoopCode from "./topic0_files/frame_animation_fundamentals.py?raw";
import fpsPacingCode from "./topic0_files/fps_benchmark_pacing.py?raw";
import radarSweepCode from "./topic0_files/spinning_radar_sweep_animator.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseRadar {
  0% { opacity: 0.3; }
  50% { opacity: 0.8; filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.7)); }
  100% { opacity: 0.3; }
}
`;

const Topic0 = () => {
  const [selectedFps, setSelectedFps] = useState(60); // 15, 30, 60
  const [ballX, setBallX] = useState(20);
  const [frameCount, setFrameCount] = useState(0);

  // Animate ball in React based on selected FPS
  useEffect(() => {
    const intervalMs = 1000 / selectedFps;
    const step = 280 / (selectedFps * 2.5); // 2.5 seconds to cross

    const interval = setInterval(() => {
      setBallX((prev) => (prev >= 290 ? 20 : prev + step));
      setFrameCount((c) => c + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [selectedFps]);

  const fpsMetrics = {
    15: { label: "15 FPS (Choppy / Low Power)", dt: "66.6 ms", status: "Noticeable Strobe Stutter", color: "#f43f5e" },
    30: { label: "30 FPS (Standard Video)", dt: "33.3 ms", status: "Playable Standard Motion", color: "#fbbf24" },
    60: { label: "60 FPS (Fluid Game Standard)", dt: "16.6 ms", status: "Silky Smooth Pro Animation", color: "#34d399" }
  };

  const currentMetric = fpsMetrics[selectedFps] || fpsMetrics[60];

  const prototypes = [
    {
      name: "screen.tracer(0)",
      returnType: "Display Double-Buffering",
      purpose: "Disables automatic canvas redraws; buffers all drawing in memory for single-tick frame rendering.",
      usage: "screen.tracer(0)"
    },
    {
      name: "t.clear()",
      returnType: "Frame Buffer Erase",
      purpose: "Wipes previous frame geometry without resetting pen colors, positions, or configurations.",
      usage: "t.clear()"
    },
    {
      name: "screen.update()",
      returnType: "GPU Buffer Swap",
      purpose: "Atomically flushes the completed back-buffer frame to the display monitor.",
      usage: "screen.update()"
    },
    {
      name: "time.sleep(1/60)",
      returnType: "Frame Delta Pacing",
      purpose: "Paces loop timing to guarantee stable 60 FPS frame rate budgets (16.6 ms per frame).",
      usage: "time.sleep(max(0, 1/60 - elapsed))"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_005 · Animation & Motion Logic · Topic 0
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Frame-Based Animation & Frames Per Second (FPS)
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unravel the core physics and graphics engine loop. Master the 4-stage <span className="text-emerald-400 font-bold">Clear &rarr; Update &rarr; Render &rarr; Flush</span> pipeline, <span className="text-cyan-300 font-semibold">60 FPS pacing budgets (16.6 ms)</span>, and smooth delta-time calculations.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🔄 4-Stage Animation Loop
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⏱️ 60 FPS Frame Delta Budget (16.6 ms)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚡ Double-Buffered screen.update()
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE REAL-TIME FPS ANIMATION SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🎮</span> Real-Time FPS Smoothness Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Switch frame rates to experience visual motion smoothness differences between 15 FPS, 30 FPS, and 60 FPS in real time.
              </p>
            </div>

            {/* FPS Selector Buttons */}
            <div className="flex items-center gap-2">
              {[15, 30, 60].map((fps) => (
                <button
                  key={fps}
                  onClick={() => setSelectedFps(fps)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                    selectedFps === fps
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  {fps} FPS
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Vector Animation Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-emerald-400 mb-2">
                Live Frame Simulation ({selectedFps} FPS Refresh)
              </span>
              <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Trackline */}
                <line x1="20" y1="90" x2="300" y2="90" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="20" y1="80" x2="20" y2="100" stroke="#64748b" strokeWidth="2" />
                <line x1="300" y1="80" x2="300" y2="100" stroke="#64748b" strokeWidth="2" />

                {/* Animated Ball */}
                <circle
                  cx={ballX}
                  cy="90"
                  r="16"
                  fill={currentMetric.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-none"
                />

                {/* HUD Overlay */}
                <text x="25" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  Frame: {String(frameCount).padStart(5, "0")} | Pacing: {currentMetric.dt}
                </text>
                <text x="25" y="155" fill={currentMetric.color} fontSize="11" fontWeight="bold" fontFamily="monospace">
                  {currentMetric.status}
                </text>
              </svg>
            </div>

            {/* View 2: Frame Budget Metrics */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-emerald-400 flex justify-between items-center">
                <span>Frame Timing Analysis</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  {currentMetric.dt} Budget
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Frame Duration Budget</div>
                  <div className="text-base font-mono font-bold text-sky-400">{currentMetric.dt}</div>
                  <div className="text-[10px] text-slate-500">1.0 / {selectedFps} sec</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Motion Smoothness</div>
                  <div className="text-base font-mono font-bold text-emerald-400">{selectedFps} FPS</div>
                  <div className="text-[10px] text-slate-500">{currentMetric.status}</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Core 4-Stage Animation Loop
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`while running:
    t.clear()         # 1. Erase previous frame
    x += vx           # 2. Update physics state
    draw_ball(t, x)   # 3. Render frame geometry
    screen.update()   # 4. Flush back-buffer
    time.sleep(${1/selectedFps >= 0.01 ? (1/selectedFps).toFixed(4) : "0.0166"})  # Delta sleep`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Core Animation Loop APIs & Pacing
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Loop Method / API</th>
                  <th className="py-3 px-4">Loop Stage</th>
                  <th className="py-3 px-4">Mechanics & Performance Role</th>
                  <th className="py-3 px-4">Standard Call</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-emerald-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400 text-xs">{proto.returnType}</td>
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
            <span>💻</span> Professional Python Animation Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: frame_animation_fundamentals.py */}
            <PythonFileLoader
              fileModule={frameLoopCode}
              title="frame_animation_fundamentals.py"
              highlightLines={[19, 30, 33, 40, 48, 51, 52]}
            />

            {/* File 2: fps_benchmark_pacing.py */}
            <PythonFileLoader
              fileModule={fpsPacingCode}
              title="fps_benchmark_pacing.py"
              highlightLines={[18, 38, 40, 41, 52, 54]}
            />

            {/* File 3: spinning_radar_sweep_animator.py */}
            <PythonFileLoader
              fileModule={radarSweepCode}
              title="spinning_radar_sweep_animator.py"
              highlightLines={[15, 23, 34, 38, 47, 48]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🏓</span> Barrackpore Arcade: The 60 FPS Pong Fix
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima was coding a classic retro Pong game in Barrackpore. When the ball moved, it left an ugly smeared streak across the paddle. Teacher Sukanta Hui guided her to implement the 4-stage game loop: clearing the previous frame with <code className="text-emerald-300 font-mono">t.clear()</code>, updating ball coordinates, and pacing with a 16.6 ms delta sleep. The game became buttery smooth at 60 FPS!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>📡</span> Jadavpur Simulation: 360° Radar Sweep
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu built an air traffic control radar in Jadavpur. By executing a 60 FPS animation loop with rotational angle increments and persistent green phosphor blips, he simulated a glowing military aviation radar display completely within standard Python Turtle.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Frame Animation Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting t.clear() in Loop</strong>
              <p className="text-slate-400">
                Failing to erase the previous frame leaves a permanent solid smear trail across the canvas behind moving objects.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Confusing t.reset() with t.clear()</strong>
              <p className="text-slate-400">
                <code className="text-rose-300 font-mono">t.reset()</code> wipes pen color, thickness, and speed settings back to default on every frame, causing massive slowdown and color reset bugs.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Hardcoding Sleep Without Delta Time</strong>
              <p className="text-slate-400">
                Calling <code className="text-amber-300 font-mono">time.sleep(0.0166)</code> without subtracting the render calculation time causes frame times to exceed 25ms, dropping the animation to 40 FPS.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Instantiating Turtles Inside Loops</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">t = turtle.Turtle()</code> inside a 60 FPS loop creates 3,600 objects per minute, causing immediate memory leaks and browser/Python freezes.
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
              "I understand the universal 4-stage Game/Animation Loop (Clear -> Update -> Draw -> Flush)",
              "I know why 60 FPS requires completing each frame within a 16.6 millisecond budget",
              "I always use `t.clear()` instead of `t.reset()` to erase previous frame geometry",
              "I know how to pace frame timing using delta-time subtraction and `time.sleep()`",
              "I understand how `screen.tracer(0)` and `screen.update()` prevent screen tearing",
              "I can calculate frame-by-frame velocity displacement `dx = distance / total_frames`"
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
          <div className="bg-emerald-900/20 rounded-2xl p-5 border border-emerald-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-emerald-300">💡 Hints to Explore</h3>
            <p className="text-xs text-slate-300">
              👉 <strong>Think about:</strong> How video game consoles like PlayStation 5 and Nintendo Switch lock their rendering pipelines to 60 FPS or 120 FPS!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How switching the simulator to 15 FPS makes the ball stutter like a 1920s silent film, while 60 FPS glides effortlessly!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Animate a pulsing beating heart using a sine wave function <code className="text-emerald-300 font-mono">radius = 30 + 10 * sin(frame * 0.1)</code>!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every video game and interactive application in existence—from simple 2D retro arcade games to massive AAA 3D open-world engines—is fundamentally built on the exact same loop you learned today: clear the frame, update the math, draw the world, and swap the buffer. Master this loop, and you hold the key to all real-time interactive computer software.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Frame Animation & FPS Concepts FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Frame Animation & FPS Study Note"
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
            note="Welcome to Module 005_005 at Coder & AccoTax in Barrackpore and Kolkata! This is where static drawings spring to life. When students see their code transition from drawing motionless shapes to generating 60 FPS real-time animated physics, a whole new world of game development and simulation opens up before their eyes. Remember the golden loop: clear, update, draw, and flush!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic0;
