import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";

// Import Python Source Files
import saveRestoreBasicsCode from "./topic2_files/turtle_state_save_restore_basics.py?raw";
import contextManagerCode from "./topic2_files/turtle_state_context_manager.py?raw";
import stateStackCode from "./topic2_files/fractal_branch_state_stack.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseRing {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.6)); }
  100% { transform: scale(0.95); opacity: 0.8; }
}
`;

const Topic2 = () => {
  const [stateMode, setStateMode] = useState("preserved"); // "leaked" vs "preserved"
  const [branchDepth, setBranchDepth] = useState(3);

  const prototypes = [
    {
      name: "t.position() / t.heading()",
      returnType: "(float, float) / float",
      purpose: "Queries the turtle's active 2D world coordinates and current steering orientation angle.",
      usage: "saved_pos = t.pos(); saved_head = t.heading()"
    },
    {
      name: "with preserve_turtle(t):",
      returnType: "Context Manager",
      purpose: "Encapsulates sub-drawing inside an isolated scope that auto-restores state upon block exit.",
      usage: "with preserve_turtle(t):\n    t.left(45); t.forward(30)"
    },
    {
      name: "push_state(t, stack) / pop_state(t, stack)",
      returnType: "Stack Operations",
      purpose: "LIFO state snapshot management for arbitrary-depth recursive fractal trees and L-systems.",
      usage: "push_state(t, stack); ...; pop_state(t, stack)"
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
            Module 005_004 · Modular Graphics with Functions · Topic 2
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Preserving Turtle Position, Heading & State Restores
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate state pollution and angle drift. Master <span className="text-cyan-300 font-semibold">state encapsulation</span>, Pythonic <code className="text-emerald-300 font-mono">@contextmanager</code> blocks, and <span className="text-purple-300 font-semibold">LIFO State Stacks</span> for recursive fractal branching.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🛡️ Zero State Pollution
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🐍 Pythonic Context Managers
            </span>
            <span className="px-4 py-2 bg-gray-800 border border-slate-700/60 rounded-full text-xs font-medium text-slate-200">
              🌲 LIFO Stack Fractal Branching
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE STATE MACHINE VISUALIZER
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>🔬</span> State Mutation & Restoration Comparator
              </h3>
              <p className="text-xs text-slate-400">
                Compare unrestored state pollution (causing cumulative skew and drift) against strict state preservation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStateMode("leaked")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  stateMode === "leaked"
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                ❌ Unrestored State (Leaked Drift)
              </button>

              <button
                onClick={() => setStateMode("preserved")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  stateMode === "preserved"
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold"
                    : "bg-gray-800 text-slate-400 hover:bg-gray-700 border border-slate-700"
                }`}
              >
                ✅ Preserved State (Perfect Snowflake)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* View 1: Real-Time Vector Canvas */}
            <div className="flex flex-col items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-cyan-400 mb-2">
                Geometric Result: {stateMode === "preserved" ? "Hexagonal Radial Symmetry" : "Drifting Broken Geometry"}
              </span>
              <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto bg-slate-950 rounded-lg">
                {/* Center Hub Marker */}
                <circle cx="160" cy="110" r="5" fill="#38bdf8" />

                {stateMode === "preserved" ? (
                  /* Perfect Symmetric Snowflake */
                  <g stroke="#38bdf8" strokeWidth="2" strokeLinecap="round">
                    {[0, 60, 120, 180, 240, 300].map((deg) => {
                      const rad = (deg * Math.PI) / 180;
                      const x2 = 160 + 75 * Math.cos(rad);
                      const y2 = 110 + 75 * Math.sin(rad);

                      const midX = 160 + 45 * Math.cos(rad);
                      const midY = 110 + 45 * Math.sin(rad);

                      const leftRad = ((deg - 45) * Math.PI) / 180;
                      const rightRad = ((deg + 45) * Math.PI) / 180;

                      return (
                        <g key={deg}>
                          {/* Main Spine Arm */}
                          <line x1="160" y1="110" x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="2.5" />
                          {/* End Needles */}
                          <line x1={x2} y1={y2} x2={x2 + 18 * Math.cos(leftRad)} y2={y2 + 18 * Math.sin(leftRad)} stroke="#34d399" />
                          <line x1={x2} y1={y2} x2={x2 + 18 * Math.cos(rightRad)} y2={y2 + 18 * Math.sin(rightRad)} stroke="#34d399" />
                          {/* Mid Needles */}
                          <line x1={midX} y1={midY} x2={midX + 14 * Math.cos(leftRad)} y2={midY + 14 * Math.sin(leftRad)} stroke="#fbbf24" />
                          <line x1={midX} y1={midY} x2={midX + 14 * Math.cos(rightRad)} y2={midY + 14 * Math.sin(rightRad)} stroke="#fbbf24" />
                        </g>
                      );
                    })}
                  </g>
                ) : (
                  /* Broken Leaked Skewed Path */
                  <g stroke="#f43f5e" strokeWidth="2" strokeLinecap="round">
                    <path
                      d="M 160,110 L 230,110 L 250,90 M 230,110 L 245,135 L 210,180 L 190,195 M 210,180 L 225,200 L 150,210 L 130,225 L 90,180 L 70,170"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2"
                    />
                    <circle cx="70" cy="170" r="4" fill="#fbbf24" />
                    <text x="75" y="165" fill="#f43f5e" fontSize="10" fontFamily="monospace">Turtle Lost!</text>
                  </g>
                )}
              </svg>
            </div>

            {/* View 2: State Snapshot Breakdown */}
            <div className="space-y-4 bg-gray-900 p-5 rounded-xl border border-slate-800 text-xs">
              <div className="text-sm font-bold text-cyan-400 flex justify-between items-center">
                <span>Turtle State Hygiene Analysis</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  stateMode === "preserved"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                }`}>
                  {stateMode === "preserved" ? "Invariant Maintained" : "State Leaked"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Positional Anchor</div>
                  <div className="text-sm font-mono font-bold text-sky-400">
                    {stateMode === "preserved" ? "(0.0, 0.0) [Exact]" : "(142.6, -88.4) [Drifted]"}
                  </div>
                  <div className="text-[10px] text-slate-500">t.position()</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Heading Orientation</div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    {stateMode === "preserved" ? "60° [Consistent]" : "173.4° [Skewed]"}
                  </div>
                  <div className="text-[10px] text-slate-500">t.heading()</div>
                </div>
              </div>

              {/* Recursion Depth Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-slate-300">
                  <span>Fractal Stack Depth:</span>
                  <span className="font-mono text-purple-300">{branchDepth} Levels</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={branchDepth}
                  onChange={(e) => setBranchDepth(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              {/* Code Snippet */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                  # Recommended Pythonic Pattern
                </span>
                <pre className="font-mono text-emerald-300 text-xs overflow-x-auto">
{`with preserve_turtle(t):
    t.left(45)
    t.forward(30)
# Automatically restored to center anchor!`}
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
            <span>⚙️</span> State Preservation APIs & Patterns
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Pattern / API</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">State Elements Handled</th>
                  <th className="py-3 px-4">Python Syntax</th>
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
            {/* File 1: turtle_state_save_restore_basics.py */}
            <PythonFileLoader
              fileModule={saveRestoreBasicsCode}
              title="turtle_state_save_restore_basics.py"
              highlightLines={[18, 19, 20, 31, 32, 33]}
            />

            {/* File 2: turtle_state_context_manager.py */}
            <PythonFileLoader
              fileModule={contextManagerCode}
              title="turtle_state_context_manager.py"
              highlightLines={[13, 23, 26, 27, 28, 41, 45]}
            />

            {/* File 3: fractal_branch_state_stack.py */}
            <PythonFileLoader
              fileModule={stateStackCode}
              title="fractal_branch_state_stack.py"
              highlightLines={[12, 18, 41, 44, 47, 50]}
            />
          </div>
        </div>

        {/* =========================================================================
            REAL-WORLD CLASSROOM SCENARIOS
        ========================================================================= */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_0.6s_ease-out_0.4s]">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-lg flex items-center gap-2">
              <span>❄️</span> Barrackpore Snowflake Competition
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila was creating a 6-fold crystal snowflake in Barrackpore. Because her sub-needle drawing function left the turtle at a 45° angle, the 2nd through 6th arms rotated into a chaotic, tangled web. Teacher Sukanta Hui introduced her to the <code className="text-cyan-300 font-mono">with preserve_turtle(t):</code> context manager. The snowflake snapped into breathtaking, crystalline hexagonal symmetry!
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="font-bold text-purple-400 text-lg flex items-center gap-2">
              <span>🌳</span> Jadavpur Algorithmics: 8-Level Fractal Tree
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu attempted to draw an 8-level binary tree by manually calculating <code className="text-rose-300 font-mono">t.backward()</code> and <code className="text-rose-300 font-mono">t.right()</code> steps. Due to accumulated floating-point rounding errors, the trunk tilted by 18° at the base. Switching to an explicit <code className="text-purple-300 font-mono">push_state() / pop_state()</code> stack eliminated all floating-point drift.
            </p>
          </div>
        </div>

        {/* =========================================================================
            COMMON BEGINNER TRAPS & PITFALLS
        ========================================================================= */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-slate-800 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s]">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>⚠️</span> Top 4 State Management Pitfalls to Avoid
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">1. Returning with Pen Down</strong>
              <p className="text-slate-400">
                Calling <code className="text-rose-300 font-mono">t.goto(saved_pos)</code> while the pen is still down draws a stray return line right through the center of your artwork. Always call <code className="text-cyan-300 font-mono">t.penup()</code> first.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">2. Using t.home() for Restoration</strong>
              <p className="text-slate-400">
                <code className="text-rose-300 font-mono">t.home()</code> teleports the turtle to origin (0, 0) and heading 0°, wiping out wherever the caller actually was in the scene.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">3. Forgetting Pen Colors and Pensize</strong>
              <p className="text-slate-400">
                Restoring position and heading while forgetting to restore <code className="text-amber-300 font-mono">t.pencolor()</code> and <code className="text-amber-300 font-mono">t.pensize()</code> causes subsequent caller strokes to inherit unexpected colors and thicknesses.
              </p>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-slate-700/60 space-y-1">
              <strong className="text-rose-400 block text-sm">4. Unbalanced State Stack Pushes/Pops</strong>
              <p className="text-slate-400">
                Missing a <code className="text-purple-300 font-mono">pop_state()</code> inside an early return branch causes the stack to grow indefinitely, eventually crashing with an <code className="text-rose-300 font-mono">IndexError</code> or mismatched alignment.
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
              "I know how to read current position `t.position()` and heading `t.heading()`",
              "I always lift the pen with `t.penup()` before moving back to a saved anchor",
              "I understand why the Python context manager `@contextmanager` guarantees state restoration",
              "I can implement a LIFO State Stack for recursive fractal trees and branch structures",
              "I preserve stroke color, fill color, and pensize alongside position and heading",
              "I understand why `t.goto(saved_pos)` eliminates trigonometric floating-point drift"
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
              👉 <strong>Think about:</strong> How modern web browsers implement HTML5 Canvas <code className="text-cyan-300 font-mono">ctx.save()</code> and <code className="text-cyan-300 font-mono">ctx.restore()</code> to push and pop transformation matrices!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Observe:</strong> How snowflake crystals drawn with state preservation radiate outward with effortless 6-fold mathematical harmony!
            </p>
            <p className="text-xs text-slate-300">
              👉 <strong>Try changing:</strong> Build a custom function decorator <code className="text-purple-300 font-mono">@preserve_state</code> to auto-wrap any drawing function!
            </p>
          </div>

          <div className="bg-indigo-900/20 rounded-2xl p-5 border border-indigo-500/30 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-300">🚀 Expert Mindset</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In large software systems, side effects are the number one source of elusive bugs. By enforcing strict state invariants—leaving the turtle in the exact position, heading, and color state you found it—you build bulletproof, composable graphics software that seamlessly scales to thousands of visual elements.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FAQS TEMPLATE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.8s]">
          <FAQTemplate title="State Preservation & Restoration FAQs" questions={questions} />
        </div>

        {/* =========================================================================
            PLAIN TEXT PRINT & DOWNLOAD NOTE
        ========================================================================= */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.9s]">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: State Preservation Study Note"
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
            note="State preservation is the secret ingredient behind all majestic recursive graphics, from botanical fractal trees to Islamic arabesque rosettes. When my students in Barrackpore and Kolkata master the push/pop state pattern, they stop fearing complex drawings and start commanding recursive mathematical geometry with absolute confidence!"
          />
        </div>

      </div>
    </div>
  );
};

export default Topic2;
