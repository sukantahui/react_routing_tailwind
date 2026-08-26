import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";

// Import Python Source Files
import flickerCureCode from "./topic2_files/flicker_cause_and_cure_comparison.py?raw";
import dualTurtleCode from "./topic2_files/dual_turtle_layer_isolation.py?raw";
import spaceInvaderCode from "./topic2_files/flicker_free_space_invader.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes strobeFlash {
  0%, 48% { opacity: 1; }
  50%, 55% { opacity: 0.1; background-color: #ffffff; }
  56%, 100% { opacity: 1; }
}
`;

const Topic2 = () => {
  const [renderMode, setRenderMode] = useState("double_buffered"); // "unbuffered", "double_buffered", "layer_isolated"
  const [alienX, setAlienX] = useState(60);

  // Animate alien across canvas
  useEffect(() => {
    const interval = setInterval(() => {
      setAlienX((prev) => (prev >= 240 ? 60 : prev + 3));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const prototypes = [
    {
      name: "screen.tracer(0)",
      returnType: "Flicker Prevention Pillar 1",
      purpose: "Suppresses canvas paint events so intermediate clear() and draw() steps remain in invisible RAM.",
      usage: "screen.tracer(0)"
    },
    {
      name: "screen.update()",
      returnType: "Flicker Prevention Pillar 2",
      purpose: "Swaps the fully completed back-buffer frame to the display monitor atomically in < 0.1 ms.",
      usage: "screen.update()"
    },
    {
      name: "bg_turtle vs sprite_turtle",
      returnType: "Flicker Prevention Pillar 3",
      purpose: "Isolates static scenery from dynamic actors; sprite_turtle.clear() wipes ONLY moving sprites.",
      usage: "bg_t.draw_scenery()\nsprite_t.clear()"
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
            Module 005_005 · Animation & Motion Logic · Topic 2
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
            Eliminating Flickering in Turtle Animations
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Diagnose and conquer the root causes of screen flashing. Master the 3-pillar flicker elimination strategy: <span className="text-emerald-400 font-bold">Double-Buffering</span>, <span className="text-cyan-300 font-semibold">Atomic Screen Updates</span>, and <span className="text-amber-300 font-semibold">Multi-Turtle Layer Isolation</span>.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🚫 Zero Strobe Flashing
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🛡️ Multi-Turtle Layer Isolation
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎮 Production-Grade Retro Arcade Polish
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE FLICKER COMPARISON SIMULATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🔬</span> Live Flicker vs Rock-Solid Rendering Comparator
              </h3>
              <p className="text-xs text-slate-400">
                Compare unbuffered screen flashing against double-buffered and multi-turtle layer isolated architectures.
              </p>
            </div>

            {/* Mode Selector Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: "unbuffered", label: "⚠️ Unbuffered (Flashing Strobe)", color: "rose" },
                { id: "double_buffered", label: "✨ Double-Buffered (Smooth)", color: "cyan" },
                { id: "layer_isolated", label: "🚀 Multi-Turtle Layers (Pro)", color: "emerald" }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setRenderMode(mode.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    renderMode === mode.id
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Rendered Scene SVG */}
            <div className={`flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800 ${
              renderMode === "unbuffered" ? "animate-[strobeFlash_0.8s_infinite]" : ""
            }`}>
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Simulated Canvas Viewport ({renderMode.toUpperCase()})
              </span>
              <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* 1. Static Starfield Background (Persistent in Layer Isolation) */}
                <g>
                  {[
                    [30, 30], [80, 50], [150, 25], [220, 45], [290, 35],
                    [50, 110], [110, 140], [200, 120], [270, 130]
                  ].map(([sx, sy], i) => (
                    <circle key={i} cx={sx} cy={sy} r="1.8" fill="#fef08a" />
                  ))}
                </g>

                {/* 2. Moving Space Invader Alien */}
                <g transform={`translate(${alienX}, 65)`}>
                  {/* Alien Body */}
                  <rect x="0" y="0" width="36" height="24" rx="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                  {/* Eyes */}
                  <circle cx="10" cy="8" r="3" fill="#ffffff" />
                  <circle cx="26" cy="8" r="3" fill="#ffffff" />
                  <circle cx="10" cy="8" r="1.5" fill="#020617" />
                  <circle cx="26" cy="8" r="1.5" fill="#020617" />
                  {/* Antennae */}
                  <line x1="8" y1="0" x2="4" y2="-8" stroke="#f43f5e" strokeWidth="2" />
                  <circle cx="4" cy="-8" r="2" fill="#fbbf24" />
                  <line x1="28" y1="0" x2="32" y2="-8" stroke="#f43f5e" strokeWidth="2" />
                  <circle cx="32" cy="-8" r="2" fill="#fbbf24" />
                </g>

                {/* 3. Player Cannon (Bottom) */}
                <g transform="translate(140, 150)">
                  <rect x="0" y="10" width="40" height="18" rx="2" fill="#059669" stroke="#ffffff" strokeWidth="1" />
                  <rect x="16" y="0" width="8" height="12" fill="#34d399" />
                </g>

                {/* Laser Bolt */}
                <line x1="160" y1="145" x2="160" y2="105" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="6 4" />
              </svg>
            </div>

            {/* View 2: Telemetry & Architecture Diagnostics */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Flicker Elimination Telemetry</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  renderMode === "unbuffered"
                    ? "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                    : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold"
                }`}>
                  {renderMode === "unbuffered" ? "Severe Strobe Flicker!" : "100% Rock-Solid Stable"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Visible Erase Flashes</div>
                  <div className={`text-base font-mono font-bold ${
                    renderMode === "unbuffered" ? "text-rose-400" : "text-emerald-400"
                  }`}>
                    {renderMode === "unbuffered" ? "60 Flashes / Sec" : "0 Flashes (Zero)"}
                  </div>
                  <div className="text-[10px] text-slate-500">Physical Monitor Exposure</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Redraw Workload</div>
                  <div className="text-base font-mono font-bold text-cyan-400">
                    {renderMode === "layer_isolated" ? "10% (Sprites Only)" : "100% (Full Scene)"}
                  </div>
                  <div className="text-[10px] text-slate-500">CPU Conservation</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # {renderMode === "layer_isolated" ? "Multi-Turtle Layer Pattern" : "Double-Buffered Frame Loop"}
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{renderMode === "layer_isolated"
  ? `bg_turtle.draw_starfield()  # Rendered ONCE
while running:
    sprite_turtle.clear()     # Wipes only sprite
    sprite_turtle.draw_alien(x)
    screen.update()`
  : `screen.tracer(0)
while running:
    t.clear()
    draw_full_scene(t)
    screen.update()`}
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
            <span>⚙️</span> Flicker Elimination Core Standards
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Architecture Component</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Flicker Prevention Role</th>
                  <th className="py-3 px-4">Implementation Syntax</th>
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
            {/* File 1: flicker_cause_and_cure_comparison.py */}
            <PythonFileLoader
              fileModule={flickerCureCode}
              title="flicker_cause_and_cure_comparison.py"
              highlightLines={[19, 29, 35, 46, 47]}
            />

            {/* File 2: dual_turtle_layer_isolation.py */}
            <PythonFileLoader
              fileModule={dualTurtleCode}
              title="dual_turtle_layer_isolation.py"
              highlightLines={[19, 22, 25, 32, 37, 39, 47]}
            />

            {/* File 3: flicker_free_space_invader.py */}
            <PythonFileLoader
              fileModule={spaceInvaderCode}
              title="flicker_free_space_invader.py"
              highlightLines={[18, 20, 27, 34, 43, 50, 56, 58]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-rose-400 text-lg flex items-center gap-2">
              <span>👾</span> Barrackpore Space Invaders: Strobe Elimination
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita built a Space Invaders game in Barrackpore. Every time her alien moved, the screen flashed aggressively, causing visual strain. Teacher Sukanta Hui showed her how to separate the starry galaxy into <code className="text-cyan-300 font-mono">star_t</code> and animate the invaders on <code className="text-rose-300 font-mono">game_t</code> with <code className="text-emerald-300 font-mono">tracer(0)</code>. The flashing vanished instantly!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>✈️</span> Ichapur Radar Flight Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila created an air flight tracking map in Ichapur. By caching the geographic coastline on a dedicated background turtle and updating 20 moving airplane blips on a sprite turtle, she achieved buttery smooth 60 FPS performance with zero frame stutter or flicker.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Flicker Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Using screen.clearscreen()</strong>
              <p className="text-slate-400">
                <code className="text-rose-300 font-mono">clearscreen()</code> deletes all turtle objects, resets the window, and triggers violent white flashes. Use <code className="text-emerald-300 font-mono">sprite_t.clear()</code> instead.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Redrawing Static Backgrounds in Loops</strong>
              <p className="text-slate-400">
                Redrawing thousands of mountain or star vectors on every single frame causes massive CPU overload and dropped frames. Draw background once on a dedicated turtle.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Multiple screen.update() Calls per Frame</strong>
              <p className="text-slate-400">
                Calling <code className="text-amber-300 font-mono">update()</code> after drawing each actor pushes partial drawings to the monitor, re-introducing tearing and micro-flicker.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Leaving Visible Turtle Cursors</strong>
              <p className="text-slate-400">
                Leaving the turtle cursor visible causes the cursor sprite to flash and jitter on top of moving objects during frame clears. Always call <code className="text-cyan-300 font-mono">t.hideturtle()</code>.
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
              "I understand that screen flicker is caused by visible unbuffered canvas erases",
              "I know how `screen.tracer(0)` hides frame erases and draws inside invisible RAM",
              "I use Multi-Turtle Layer Isolation (e.g. `bg_turtle` vs `sprite_turtle`)",
              "I clear ONLY the moving sprite turtle per frame, preserving static scenery",
              "I call `screen.update()` exactly once per frame cycle after all layers finish",
              "I always hide cursor sprites with `t.hideturtle()` to eliminate cursor jitter"
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
              👉 <strong>Think about:</strong> How classic 16-bit arcade cabinets (Capcom CPS-2, Neo Geo) used dedicated hardware sprite and background tile layers to render flicker-free games!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How Multi-Turtle Layer Isolation cuts CPU rendering time by 90% by never re-rendering static background scenery!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Build a 3-layer arcade game with static background, moving player/enemies, and a dedicated top-layer HUD scoreboard!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Eliminating flicker is the bridge that separates amateur hobby scripts from commercial-grade interactive software. By mastering double-buffering and layer isolation, you ensure your applications are not only visually breathtaking, but also comfortable, accessible, and fatigue-free for users to enjoy for hours.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Flicker Elimination FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Flicker Elimination Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic2_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="Nothing ruins a great game or simulation faster than screen flicker. At Coder & AccoTax in Barrackpore and Kolkata, we teach students that professional graphics are rock-solid, calm, and seamless. By separating your canvas into background and sprite turtles and managing double-buffered swaps, your Python creations will look every bit as polished as commercial arcade classics!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic2;
