import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";

// Import Python Files
import benchmarkCode from "./topic6_files/pattern_optimization_benchmark.py?raw";
import tracerBatchCode from "./topic6_files/tracer_batching_10k_elements.py?raw";
import gcProfilerCode from "./topic6_files/turtle_gc_memory_profiler.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes speedPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.6)); }
}
`;

const Topic6 = () => {
  const [optMode, setOptMode] = useState("optimized"); // default, batched, optimized

  const benchmarkData = {
    default: { mode: "Unoptimized Default", time: "185,000 ms (~3.1 min)", fps: "< 1 FPS", ram: "~14 MB", status: "Severe Lag & Freezing", color: "#f43f5e" },
    batched: { mode: "Batched tracer(50)", time: "1,200 ms (1.2 sec)", fps: "~45 FPS", ram: "~4 MB", status: "Smooth Live Animation", color: "#fbbf24" },
    optimized: { mode: "Full tracer(0) + hideturtle()", time: "42 ms (0.04 sec)", fps: "60+ FPS Ready", ram: "~1.5 MB", status: "Instantaneous GPU Render", color: "#34d399" }
  };

  const current = benchmarkData[optMode] || benchmarkData["optimized"];

  const prototypes = [
    {
      name: "screen.tracer(0)",
      returnType: "Screen Configuration",
      purpose: "Disables automatic canvas redraws; buffers all drawing in memory at raw CPU speed.",
      usage: "screen.tracer(0)"
    },
    {
      name: "screen.update()",
      returnType: "Buffer Flush",
      purpose: "Forces an immediate single-frame buffer swap to render completed geometry on screen.",
      usage: "screen.update()"
    },
    {
      name: "t.hideturtle()",
      returnType: "Sprite Suppression",
      purpose: "Eliminates cursor transformation, rotation, and sprite repaint calculations.",
      usage: "t.hideturtle()"
    },
    {
      name: "Object Pool / t.clear()",
      returnType: "Memory Management",
      purpose: "Reuses a single pooled Turtle object and clears geometry between animation frames.",
      usage: "t.clear()  # Erases drawing, preserves state"
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
            Module 005_003 · Turtle Patterns & Geometric Mathematics · Topic 6
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Pattern Optimization & Computational Efficiency
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate canvas lag and UI freezes. Accelerate rendering by up to <span className="text-emerald-400 font-bold">4,000x</span> with double-buffered <code className="text-emerald-300 font-mono">tracer(0)</code>, suppress sprite overhead with <code className="text-cyan-300 font-mono">hideturtle()</code>, and prevent memory leaks.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚡ screen.tracer(0) Double-Buffering
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🐢 t.hideturtle() Sprite Elimination
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ♻️ t.clear() Memory Object Pooling
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE BENCHMARK & PERFORMANCE COMPARATOR
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>⚡</span> 5,000-Segment Rendering Benchmark Comparator
              </h3>
              <p className="text-xs text-slate-400">
                Compare execution speed, FPS capability, and memory efficiency across the 3 rendering strategies.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {Object.keys(benchmarkData).map((key) => (
                <button
                  key={key}
                  onClick={() => setOptMode(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer capitalize ${
                    optMode === key
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Visual Speed Gauge SVG */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-emerald-400 mb-2">
                Benchmark Strategy: {current.mode}
              </span>
              <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                {/* Speed Meter Arc */}
                <path d="M 30,130 A 90,90 0 0,1 210,130" fill="none" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" />

                {/* Active Indicator Arc */}
                <path
                  d="M 30,130 A 90,90 0 0,1 210,130"
                  fill="none"
                  stroke={current.color}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={optMode === "default" ? "240" : optMode === "batched" ? "140" : "0"}
                  className="transition-all duration-500"
                />

                <circle cx="120" cy="130" r="8" fill="#ffffff" />
                <text x="120" y="110" fill={current.color} fontSize="14" fontWeight="bold" textAnchor="middle">
                  {current.fps}
                </text>
                <text x="120" y="148" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  {current.status}
                </text>
              </svg>
            </div>

            {/* View 2: Performance Metrics Breakdown */}
            <div className="space-y-3 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-emerald-400 flex items-center justify-between">
                <span>Performance Metrics (5,000 Draws)</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  {current.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Execution Latency</div>
                  <div className="text-lg font-mono font-bold text-sky-400">{current.time}</div>
                  <div className="text-[10px] text-slate-500">time.perf_counter()</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Frame Rate Potential</div>
                  <div className="text-lg font-mono font-bold text-emerald-400">{current.fps}</div>
                  <div className="text-[10px] text-slate-500">Real-time animation</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Memory Footprint:</span>
                <span className="font-mono font-bold text-purple-300">{current.ram} RAM</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Core Performance Optimization APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Optimization API</th>
                  <th className="py-3 px-4">Mechanism</th>
                  <th className="py-3 px-4">Performance Impact</th>
                  <th className="py-3 px-4">Python Usage</th>
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
            PYTHON CODE IMPLEMENTATION FILES
        ========================================================================= */}
        <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>💻</span> Professional Python Optimization Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: pattern_optimization_benchmark.py */}
            <PythonFileLoader
              fileModule={benchmarkCode}
              title="pattern_optimization_benchmark.py"
              highlightLines={[18, 21, 29, 30]}
            />

            {/* File 2: tracer_batching_10k_elements.py */}
            <PythonFileLoader
              fileModule={tracerBatchCode}
              title="tracer_batching_10k_elements.py"
              highlightLines={[18, 21, 28, 30]}
            />

            {/* File 3: turtle_gc_memory_profiler.py */}
            <PythonFileLoader
              fileModule={gcProfilerCode}
              title="turtle_gc_memory_profiler.py"
              highlightLines={[18, 23, 25, 33]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-lg flex items-center gap-2">
              <span>🏛️</span> Barrackpore Tech Competition: The 10,000-Particle Fix
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              During a live coding demonstration, Mahima's 10,000-particle vortex simulation froze the presentation computer for 3 minutes. Teacher Sukanta Hui guided her to add <code className="text-emerald-300 font-mono">screen.tracer(0)</code> and <code className="text-emerald-300 font-mono">t.hideturtle()</code>. The entire 10,000-particle simulation executed in just <strong>42 milliseconds</strong>, earning a standing ovation from the judges.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🎮</span> Jadavpur Game Studio: Object Pooling for 60 FPS
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu noticed his retro arcade game dropped frames every 5 seconds due to Python garbage collection pauses. By replacing instantiations of <code className="text-rose-300 font-mono">turtle.Turtle()</code> inside the game loop with a single recycled instance using <code className="text-cyan-300 font-mono">t.clear()</code>, he achieved a rock-solid, stutter-free 60 FPS.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Performance Optimization Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting screen.update() with tracer(0)</strong>
              <p className="text-slate-400">
                Calling <code className="text-amber-300 font-mono">screen.tracer(0)</code> without <code className="text-emerald-300 font-mono">screen.update()</code> leaves the canvas completely blank, creating the false impression that code failed to run.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Creating Turtle Objects in Animation Loops</strong>
              <p className="text-slate-400">
                Writing <code className="text-rose-300 font-mono">t = turtle.Turtle()</code> inside a loop creates thousands of heavy Tkinter canvas wrappers, causing severe memory exhaustion.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Blocking Terminal Print Statements</strong>
              <p className="text-slate-400">
                Executing <code className="text-rose-300 font-mono">{'print(f"Step {i}")'}</code> inside a 10,000-iteration loop blocks the CPU pipeline with slow terminal I/O, degrading speed by over 10x.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Confusing speed(0) with tracer(0)</strong>
              <p className="text-slate-400">
                <code className="text-amber-300 font-mono">speed(0)</code> only eliminates animation timer delays but still repaints every single step. True instantaneous rendering requires <code className="text-emerald-300 font-mono">screen.tracer(0)</code>.
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
              "I understand why screen.tracer(0) double-buffering accelerates rendering by 1,000x+",
              "I always remember to call screen.update() after completing buffered drawing operations",
              "I know why t.hideturtle() eliminates cursor sprite calculation overhead",
              "I understand how screen.tracer(50) batches draw calls for smooth progressive art",
              "I know why t.clear() is superior to creating new Turtle() objects inside animation loops",
              "I can accurately benchmark graphical execution latency with time.perf_counter()"
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
              👉 <strong>Think about:</strong> Why modern video game engines like Unreal Engine and Unity use double-buffering (Front Buffer / Back Buffer) to prevent tearing during 144 FPS gaming!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How setting <code className="text-sky-300 font-mono">screen.tracer(100)</code> lets you watch complex fractals grow in smooth, beautiful animated bursts!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Precompute your color palette into a Python list before the loop to eliminate all runtime HSV-to-RGB conversion overhead!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In production computer graphics, performance engineering is not an afterthought—it is the core discipline. Understanding how to minimize draw calls, prevent CPU-GPU context switches, eliminate dynamic object allocations, and batch buffer updates separates amateur script writers from world-class graphics and game engine developers.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Pattern Optimization & Performance FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Pattern Optimization Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic6_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When we conclude Module 005_003 at Coder & AccoTax in Barrackpore and Kolkata, optimization is the crowning achievement. When students witness a 5,000-line pattern transform from a 3-minute crawl into an instantaneous 40-millisecond flash of vector beauty, they realize the true power of algorithmic efficiency. Remember the golden quartet: tracer(0), hideturtle(), cached math, and update()!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic6;
