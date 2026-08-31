import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";

// Import Python Source Files
import doubleBufferCode from "./topic1_files/double_buffer_tracer_deep_dive.py?raw";
import particleFountainCode from "./topic1_files/tracer_batching_particle_fountain.py?raw";
import synchronizerCode from "./topic1_files/interactive_frame_synchronizer.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes bufferSwapGlow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.7)); }
}
`;

const Topic1 = () => {
  const [bufferState, setBufferState] = useState("buffered"); // "drawing", "buffered", "flushed"

  const prototypes = [
    {
      name: "screen.tracer(0)",
      returnType: "Display Double-Buffering",
      purpose: "Disables automatic canvas redraws; buffers all drawing in memory for instant rendering.",
      usage: "screen.tracer(0)"
    },
    {
      name: "screen.update()",
      returnType: "GPU Buffer Swap",
      purpose: "Forces an immediate atomic memory-to-screen swap, presenting the completed frame instantly.",
      usage: "screen.update()"
    },
    {
      name: "screen.tracer(50)",
      returnType: "Batching Mode",
      purpose: "Refreshes canvas once every 50 draw calls; ideal for progressive generative art without lag.",
      usage: "screen.tracer(50)"
    },
    {
      name: "screen.delay(0)",
      returnType: "Timer Suppression",
      purpose: "Sets global animation timer interval to 0 milliseconds for maximum throughput.",
      usage: "screen.delay(0)"
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
            Module 005_005 · Animation & Motion Logic · Topic 1
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Controlling Redraw: tracer(0) & update() for Instant Rendering
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate canvas repainting bottlenecks. Master the architecture of <span className="text-cyan-300 font-semibold">Software Double-Buffering</span>, <span className="text-emerald-300 font-semibold">Back-Buffer RAM drawing</span>, and atomic <code className="text-amber-300 font-mono">screen.update()</code> presentation.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              ⚡ screen.tracer(0) Back-Buffer Mode
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🖥️ Atomic Front-Buffer Swaps
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌊 Batched Particle Stream Flow
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE DOUBLE-BUFFER ARCHITECTURE VISUALIZER
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🔄</span> Interactive Double-Buffer Architecture Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Observe how drawing commands accumulate in the invisible Back Buffer (RAM) and flush atomically to the Front Buffer (Monitor).
              </p>
            </div>

            {/* State Trigger Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBufferState("drawing")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  bufferState === "drawing"
                    ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                1. Draw in RAM
              </button>

              <button
                onClick={() => setBufferState("buffered")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  bufferState === "buffered"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                2. Frame Ready in RAM
              </button>

              <button
                onClick={() => setBufferState("flushed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  bufferState === "flushed"
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                3. screen.update() [Swap]
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Vector Architecture Diagram */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Double-Buffer Memory Layout Diagram
              </span>
              <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Back Buffer Box (Invisible RAM) */}
                <g transform="translate(15, 20)">
                  <rect x="0" y="0" width="130" height="110" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="65" y="20" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">BACK BUFFER (RAM)</text>
                  <text x="65" y="32" fill="#64748b" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">(Invisible to User)</text>

                  {/* Shapes inside Back Buffer */}
                  {bufferState !== "flushed" && (
                    <polygon points="65,45 85,85 45,85" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                  )}
                  {bufferState === "drawing" && (
                    <circle cx="95" cy="65" r="8" fill="#f43f5e" />
                  )}
                </g>

                {/* Swap Arrow */}
                <g transform="translate(150, 60)">
                  <line x1="0" y1="15" x2="20" y2="15" stroke={bufferState === "flushed" ? "#34d399" : "#64748b"} strokeWidth="3" />
                  <polygon points="20,10 28,15 20,20" fill={bufferState === "flushed" ? "#34d399" : "#64748b"} />
                  <text x="14" y="32" fill={bufferState === "flushed" ? "#34d399" : "#94a3b8"} fontSize="8" textAnchor="middle" fontFamily="monospace">
                    {bufferState === "flushed" ? "SWAP!" : "wait"}
                  </text>
                </g>

                {/* Front Buffer Box (Visible Screen) */}
                <g transform="translate(175, 20)">
                  <rect x="0" y="0" width="130" height="110" rx="6" fill="#020617" stroke="#34d399" strokeWidth="2" />
                  <text x="65" y="20" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">FRONT BUFFER</text>
                  <text x="65" y="32" fill="#64748b" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">(Visible Onscreen)</text>

                  {/* Shapes inside Front Buffer */}
                  {bufferState === "flushed" ? (
                    <polygon points="65,45 85,85 45,85" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
                  ) : (
                    <text x="65" y="70" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="monospace">Previous Frame</text>
                  )}
                </g>

                {/* Status Footer */}
                <text x="160" y="165" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  Status: {bufferState === "flushed" ? "Atomic screen.update() Complete!" : "Rendering in Back-Buffer RAM"}
                </text>
              </svg>
            </div>

            {/* View 2: Performance Metrics & Code */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Double-Buffering Telemetry</span>
                <span className="font-mono text-xs text-emerald-300">screen.tracer(0)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Execution Speedup</div>
                  <div className="text-base font-mono font-bold text-sky-400">2,000x to 4,000x</div>
                  <div className="text-[10px] text-slate-500">Over default tracer(1)</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Swap Latency</div>
                  <div className="text-base font-mono font-bold text-emerald-400">&lt; 0.05 ms</div>
                  <div className="text-[10px] text-slate-500">Atomic memory pointer</div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Double-Buffered Pattern
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`screen.tracer(0)      # Disable canvas redraws
draw_complex_scene()  # 10,000 draw ops in RAM
screen.update()       # Instantaneous GPU flush!`}
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
            <span>⚙️</span> Double-Buffering & Redraw APIs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Method Signature</th>
                  <th className="py-3 px-4">Subsystem</th>
                  <th className="py-3 px-4">Buffer Management Role</th>
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
            {/* File 1: double_buffer_tracer_deep_dive.py */}
            <PythonFileLoader
              fileModule={doubleBufferCode}
              title="double_buffer_tracer_deep_dive.py"
              highlightLines={[19, 26, 42, 43]}
            />

            {/* File 2: tracer_batching_particle_fountain.py */}
            <PythonFileLoader
              fileModule={particleFountainCode}
              title="tracer_batching_particle_fountain.py"
              highlightLines={[18, 25, 40, 42]}
            />

            {/* File 3: interactive_frame_synchronizer.py */}
            <PythonFileLoader
              fileModule={synchronizerCode}
              title="interactive_frame_synchronizer.py"
              highlightLines={[15, 27, 29]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>🎆</span> Barrackpore Fireworks Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima was simulating Diwali fireworks in Barrackpore. When she launched 500 particle sparks, the default Turtle canvas froze completely. By configuring <code className="text-cyan-300 font-mono">screen.tracer(50)</code>, she batched the 500 particle updates into smooth progressive bursts, transforming the frozen simulation into a stunning fluid display.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-indigo-400 text-lg flex items-center gap-2">
              <span>🏎️</span> Kolkata Racing Game Engine
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu in Kolkata built an arcade racing game. Calling <code className="text-emerald-300 font-mono">screen.tracer(0)</code> and syncing buffer swaps with <code className="text-amber-300 font-mono">screen.update()</code> allowed his engine to draw the road, opponent cars, scoreboards, and minimaps in less than 2 milliseconds per frame!
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 Tracer & Double-Buffering Traps to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Forgetting screen.update()</strong>
              <p className="text-slate-400">
                Calling <code className="text-rose-300 font-mono">screen.tracer(0)</code> without <code className="text-cyan-300 font-mono">screen.update()</code> leaves the canvas blank because buffered RAM drawing is never presented to the user.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Calling screen.update() Inside Helper Functions</strong>
              <p className="text-slate-400">
                Flushing the buffer inside every small shape helper forces multiple mid-frame repaints, re-introducing lag and screen tearing. Call <code className="text-emerald-300 font-mono">update()</code> once per frame.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Assuming speed(0) Replaces tracer(0)</strong>
              <p className="text-slate-400">
                <code className="text-amber-300 font-mono">speed(0)</code> only removes timer delays; it still repaints every single step. True instantaneous rendering requires <code className="text-cyan-300 font-mono">screen.tracer(0)</code>.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Leaving Turtle Visible</strong>
              <p className="text-slate-400">
                Forgetting <code className="text-cyan-300 font-mono">t.hideturtle()</code> wastes CPU cycles computing cursor sprite rotations and translations on every coordinate motion.
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
              "I understand the difference between Back-Buffer (invisible RAM) and Front-Buffer (screen)",
              "I know why `screen.tracer(0)` accelerates complex drawings by up to 4,000x",
              "I always remember to call `screen.update()` to flush completed frames",
              "I understand how `screen.tracer(50)` batches updates for progressive particle animations",
              "I always pair `screen.tracer(0)` with `t.hideturtle()` for maximum throughput",
              "I call `screen.update()` exactly once per animation frame tick"
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
              👉 <strong>Think about:</strong> How modern GPU graphics APIs like DirectX, Vulkan, and WebGL use swap chains to flip front and back buffers during 144 FPS gaming!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How 10,000 algorithmic particles render in milliseconds with <code className="text-cyan-300 font-mono">tracer(0)</code> versus taking minutes with default settings!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Experiment with <code className="text-amber-300 font-mono">screen.tracer(25)</code> to watch a complex fractal grow in rhythmic, progressive pulses!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Software double-buffering is one of the most fundamental concepts in computer graphics. Understanding the separation between memory computation and physical display presentation gives you the insight needed to build high-performance user interfaces, fluid simulations, and professional game engines.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="Tracer(0) & Screen.update() FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: Tracer & Double-Buffering Study Note"
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
            note="When we teach double-buffering at Coder & AccoTax in Barrackpore and Kolkata, I explain that tracer(0) is like an artist painting behind a closed curtain, while screen.update() is pulling the curtain back to reveal the finished masterpiece in a single instant. Master this curtain, and your animations will never flicker or lag again!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic1;
