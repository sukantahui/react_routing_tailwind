import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";

// Import Python Files
import speedBenchmarkCode from "./topic5_files/speed_settings_benchmark.py?raw";
import tracerBenchmarkCode from "./topic5_files/tracer_vs_speed_zero_performance.py?raw";
import dynamicSpeedCode from "./topic5_files/interactive_speed_demonstrator.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes speedPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;

const Topic5 = () => {
  const [selectedSpeedTier, setSelectedSpeedTier] = useState("speed0");

  const prototypes = [
    {
      name: "turtle.speed(speed=None)",
      returnType: "int / None",
      purpose: "Sets or queries turtle animation speed: 1 (slowest) to 10 (fast), with 0 (fastest/no delay).",
      usage: "t.speed(0) # Fastest standard mode"
    },
    {
      name: "screen.tracer(n=None, delay=None)",
      returnType: "int / None",
      purpose: "Turns screen animation on/off and sets delay. tracer(0) disables canvas refresh completely.",
      usage: "screen.tracer(0)"
    },
    {
      name: "screen.update()",
      returnType: "None",
      purpose: "Manually flushes and refreshes the canvas buffer after using tracer(0).",
      usage: "screen.update()"
    },
    {
      name: "screen.delay(delay=None)",
      returnType: "int / None",
      purpose: "Sets or queries global millisecond drawing delay across all turtles (default is 10ms).",
      usage: "screen.delay(0)"
    }
  ];

  const speedTiers = [
    { key: "speed1", label: "speed(1) / 'slowest'", delay: "100ms delay", useCase: "Teaching, classroom step-by-step observation", color: "#f43f5e" },
    { key: "speed6", label: "speed(6) / 'normal'", delay: "10ms delay", useCase: "Default balanced animation pace", color: "#38bdf8" },
    { key: "speed10", label: "speed(10) / 'fast'", delay: "2ms delay", useCase: "Quick rendering with visible motion", color: "#fbbf24" },
    { key: "speed0", label: "speed(0) / 'fastest'", delay: "0ms delay", useCase: "Fast rendering without sleep timers", color: "#34d399" },
    { key: "tracer0", label: "screen.tracer(0)", delay: "Instant buffer (0s)", useCase: "1,000+ line fractals, mandalas, 60 FPS games", color: "#a78bfa" }
  ];

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <style>{keyframes}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================================
            HERO SECTION
        ========================================================================= */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
            Module 005_002 · Turtle Design & Aesthetic Customization · Topic 5
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Speed vs Rendering Performance: <span className="font-mono">speed()</span> & <span className="font-mono">tracer()</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understand why <code className="text-emerald-300 font-mono">speed(0)</code> is faster than <code className="text-amber-300 font-mono">speed(10)</code>, master the difference between animation delays and canvas redrawing, and harness <code className="text-purple-300 font-mono">screen.tracer(0)</code> for instantaneous complex fractal generation.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚡ speed(0) vs speed(1-10)
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🚀 tracer(0) Instant Render
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🎮 Double Buffering & 60 FPS
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE SPEED RACE & TIER STUDIO
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🏎️</span> Speed Hierarchy & Performance Tier Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Compare animation pacing, delay mechanics, and the ultimate performance leap with tracer(0).
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {speedTiers.map((tier) => (
                <button
                  key={tier.key}
                  onClick={() => setSelectedSpeedTier(tier.key)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition cursor-pointer ${
                    selectedSpeedTier === tier.key
                      ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25"
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                  }`}
                >
                  {tier.label.split(" / ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl h-auto">
              <rect x="10" y="10" width="680" height="180" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />

              {/* Race Track Lines */}
              <line x1="180" y1="50" x2="630" y2="50" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="180" y1="90" x2="630" y2="90" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="180" y1="130" x2="630" y2="130" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="180" y1="165" x2="630" y2="165" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />

              {/* Finish Line Flag */}
              <line x1="630" y1="35" x2="630" y2="175" stroke="#f59e0b" strokeWidth="3" />
              <text x="630" y="30" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">FINISH</text>

              {/* Competitor 1: speed(1) */}
              <text x="30" y="54" fill="#f43f5e" fontSize="11" fontWeight="bold">speed(1) Slowest</text>
              <circle cx="240" cy="50" r="8" fill="#f43f5e" />

              {/* Competitor 2: speed(6) */}
              <text x="30" y="94" fill="#38bdf8" fontSize="11" fontWeight="bold">speed(6) Normal</text>
              <circle cx="360" cy="90" r="8" fill="#38bdf8" />

              {/* Competitor 3: speed(0) */}
              <text x="30" y="134" fill="#34d399" fontSize="11" fontWeight="bold">speed(0) Fastest</text>
              <circle cx="580" cy="130" r="8" fill="#34d399" />

              {/* Competitor 4: tracer(0) */}
              <text x="30" y="169" fill="#a78bfa" fontSize="11" fontWeight="bold">tracer(0) Instant</text>
              <circle cx="630" cy="165" r="9" fill="#a78bfa" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="p-4 bg-gray-900 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-4 text-xs">
            <div>
              <span className="text-slate-400">Active Tier: </span>
              <strong className="text-teal-300 font-mono">
                {speedTiers.find((t) => t.key === selectedSpeedTier)?.label}
              </strong>
            </div>
            <div>
              <span className="text-slate-400">Delay: </span>
              <strong className="text-amber-300 font-mono">
                {speedTiers.find((t) => t.key === selectedSpeedTier)?.delay}
              </strong>
            </div>
            <div>
              <span className="text-slate-400">Primary Application: </span>
              <strong className="text-slate-200">
                {speedTiers.find((t) => t.key === selectedSpeedTier)?.useCase}
              </strong>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PROTOTYPES SPECIFICATION TABLE
        ========================================================================= */}
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-slate-800 animate-[fadeInUp_0.6s_ease-out_0.2s]">
          <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
            <span>⚙️</span> Speed & Performance Method Prototypes
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Name</th>
                  <th className="py-3 px-4">Return Type</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Code Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {prototypes.map((proto, index) => (
                  <tr key={index} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-mono text-teal-300 font-bold text-xs">{proto.name}</td>
                    <td className="py-3.5 px-4 font-mono text-sky-400 text-xs">{proto.returnType}</td>
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
            <span>💻</span> Professional Python Speed Benchmark Scripts
          </h2>

          <div className="space-y-6">
            {/* File 1: speed_settings_benchmark.py */}
            <PythonFileLoader
              fileModule={speedBenchmarkCode}
              title="speed_settings_benchmark.py"
              highlightLines={[18, 30, 31, 38]}
            />

            {/* File 2: tracer_vs_speed_zero_performance.py */}
            <PythonFileLoader
              fileModule={tracerBenchmarkCode}
              title="tracer_vs_speed_zero_performance.py"
              highlightLines={[14, 27, 29, 31]}
            />

            {/* File 3: interactive_speed_demonstrator.py */}
            <PythonFileLoader
              fileModule={dynamicSpeedCode}
              title="interactive_speed_demonstrator.py"
              highlightLines={[18, 25, 33]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-teal-400 text-lg flex items-center gap-2">
              <span>❄️</span> Jadavpur Mathematics Dept: Koch Snowflake Generator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata and Mahima generate a Level-5 recursive Koch Snowflake with over 3,000 vector segments. Using default <code className="text-sky-300 font-mono">speed(6)</code>, the script took nearly 2 minutes to finish; by switching to <code className="text-purple-300 font-mono">screen.tracer(0)</code> and <code className="text-emerald-300 font-mono">screen.update()</code>, the fractal renders in just 0.04 seconds!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-400 text-lg flex items-center gap-2">
              <span>🎓</span> Barrackpore Classroom: Live Step-by-Step Geometry
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Teacher Sukanta Hui sets <code className="text-sky-300 font-mono">t.speed(1)</code> when demonstrating polygon interior angles on the projector. The slow crawl allows every student in the classroom to observe the exact moment the turtle pivots 72 degrees at each vertex.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Speed & Performance Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Assuming speed(10) is Fastest</strong>
              <p className="text-slate-400">
                <code className="text-amber-300">speed(10)</code> still contains a small animation delay. <code className="text-emerald-300">speed(0)</code> is the true fastest setting with zero delay.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Forgetting screen.update() with tracer(0)</strong>
              <p className="text-slate-400">
                When using <code className="text-purple-300">screen.tracer(0)</code>, drawings happen in RAM buffer. Forgetting <code className="text-emerald-300">screen.update()</code> leaves the window blank!
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Leaving Turtle Visible in Heavy Fractals</strong>
              <p className="text-slate-400">
                Keeping the cursor visible forces Tkinter to repaint the turtle shape icon on every segment. Always call <code className="text-sky-300">t.hideturtle()</code> for fractals.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Expecting speed() to Fix Slow Python Logic</strong>
              <p className="text-slate-400">
                <code className="text-amber-300">speed()</code> only optimizes GUI animation delays; slow CPU loops (O(n²) algorithms) must be optimized mathematically.
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
              "I know the 5 standard speed tiers: 1 (slowest), 3, 6 (normal), 10, and 0 (fastest)",
              "I understand why speed(0) represents zero animation delay timers",
              "I can use screen.tracer(0) and screen.update() for instant fractal rendering",
              "I know that t.hideturtle() speeds up drawing by avoiding cursor icon repaints",
              "I can benchmark drawing duration accurately using time.perf_counter()",
              "I know how to switch speeds dynamically between different phases of an illustration"
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
              👉 <strong>Think about:</strong> Why game developers use double buffering (drawing in RAM before showing the frame) to eliminate screen tearing and flickering.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How benchmark times drop from 20+ seconds down to 0.03 seconds when combining <code className="text-sky-300">screen.tracer(0)</code> with <code className="text-sky-300">t.hideturtle()</code>.
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Use <code className="text-amber-300">screen.tracer(10, 20)</code> to update the screen once every 10 steps, creating a high-speed timelapse effect!
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In production graphics engines (Unreal, Unity, Vulkan, Metal), separating the <strong>Render Loop (painting to the screen)</strong> from the <strong>Simulation Loop (updating entity coordinates)</strong> is the foundational rule of high-performance computing. In Turtle, <code className="text-purple-300 font-mono">tracer(0)</code> and <code className="text-purple-300 font-mono">update()</code> introduce you to the same double-buffering architecture used by AAA game engines worldwide.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Speed & Rendering Performance FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Speed & Performance Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic5_note.txt"
          />
        </div>

        {/* =========================================================================
            TEACHER'S NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_1s]">
          <Teacher
            note="When students start coding complex geometric mandalas at Coder & AccoTax in Barrackpore and Kolkata, they often stare at the screen for 3 minutes waiting for the turtle to finish walking. Teaching them the magic of 'screen.tracer(0)' and 'screen.update()' is like handing them a superpower! Suddenly, complex 5,000-line fractals appear in the blink of an eye, empowering students to iterate, experiment, and push their creative limits."
          />
        </div>

      </div>
    </div>
  );
};

export default Topic5;
