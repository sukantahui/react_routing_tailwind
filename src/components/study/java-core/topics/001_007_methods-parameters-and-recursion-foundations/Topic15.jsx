import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import overflowDemoCode from "./topic15_files/StackOverflowErrorPreventionDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowOverflow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-of {
            animation: glowOverflow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 15
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            JVM Error Diagnosis &amp; Resilience
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          StackOverflowError: Causes, Infinite Recursion &amp; Prevention
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnose and eliminate runtime Call Stack exhaustion (JLS §11.1.1): understanding why missing base cases crash threads, defensive boundary guards (<code className="text-emerald-400 font-mono">n &lt;= 0</code>), depth circuit-breakers, iterative refactoring in <code className="text-emerald-400 font-mono">O(1)</code> memory, and student fee schedule calculations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Understanding the Root Causes of StackOverflowError
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <code className="text-rose-400 font-mono">StackOverflowError</code> is a fatal JVM Error thrown when the Call Stack reaches its configured memory limit (<code className="text-slate-300 font-mono">-Xss</code>):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-2">1. Faulty Base Cases</h3>
              <p className="text-rose-300 mb-1">if (n == 0) return 0;</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Exact equality fails if passed negative inputs (<code className="text-rose-300 font-mono">n = -1</code>), causing infinite negative descent.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-2">2. Depth Circuit Breakers</h3>
              <p className="text-amber-300 mb-1">if (depth &gt; maxLimit) return 0;</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Pass a recursion counter to abort gracefully before exhausting stack limits.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">3. Iterative Refactoring</h3>
              <p className="text-emerald-300 mb-1">for (int i = 1; i &lt;= n; i++)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Replaces <code className="text-rose-400 font-mono">O(N)</code> stack frames with a single <code className="text-emerald-400 font-mono">O(1)</code> stack frame, supporting millions of iterations safely.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Resilient Calculation Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> tested negative values (<code className="text-emerald-400 font-mono">-5</code>) against our defensive base case (<code className="text-emerald-400 font-mono">n &lt;= 0</code>) which returned 0 safely without crashing. Meanwhile, <strong>Tuhina</strong> tested <code className="text-emerald-400 font-mono">iterativeSafeSum(100_000)</code> which executed 100,000 steps in <code className="text-emerald-400 font-mono">O(1)</code> stack space, computing <code className="text-emerald-400 font-semibold">5,000,050,000</code> in Indian Rupees (₹) flawlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Infinite Stack Exhaustion vs. Defensive Iterative Prevention
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the fatal call stack overflow pathway versus bulletproof defensive programming:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Stack Overflow vs Prevention Diagram"
          >
            <defs>
              <linearGradient id="gradCrash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradSafe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Panel 1: Fatal StackOverflowError Pathway */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="225" y="55" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">❌ THE FATAL STACKOVERFLOW PATHWAY</text>

            <rect x="45" y="70" width="360" height="30" rx="4" fill="#4c0519" />
            <text x="55" y="90" fill="#fecdd3" fontSize="10" fontFamily="monospace">Non-defensive: if (n == 0) return 0;</text>

            <rect x="45" y="105" width="360" height="30" rx="4" fill="#4c0519" />
            <text x="55" y="125" fill="#fecdd3" fontSize="10" fontFamily="monospace">Passed -1 → calls -2 → calls -3 ...</text>

            <rect x="45" y="140" width="360" height="30" rx="4" fill="#881337" />
            <text x="55" y="160" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">10,000+ Frames pushed on Call Stack</text>

            <rect x="45" y="175" width="360" height="55" rx="4" fill="url(#gradCrash)" />
            <text x="225" y="195" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">💥 java.lang.StackOverflowError</text>
            <text x="225" y="215" fill="#ffe4e6" fontSize="9" textAnchor="middle">Thread stack memory limit exceeded (-Xss exhausted!)</text>

            {/* Panel 2: Defensive & Iterative Prevention */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">✓ DEFENSIVE PREVENTION STRATEGIES</text>

            <rect x="465" y="70" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="92" fill="#a7f3d0" fontSize="10" fontFamily="monospace">1. Defensive Guard: if (n &lt;= 0) return 0;</text>

            <rect x="465" y="110" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="132" fill="#a7f3d0" fontSize="10" fontFamily="monospace">2. Depth Guard: if (depth &gt; 50) return 0;</text>

            <rect x="465" y="150" width="370" height="40" rx="4" fill="url(#gradSafe)" />
            <text x="650" y="172" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">3. Iterative Refactoring (O(1) Stack Space)</text>
            <text x="650" y="185" fill="#d1fae5" fontSize="9" fontFamily="monospace" textAnchor="middle">for (int i = 1; i &lt;= n; i++) total += i;</text>

            <text x="650" y="222" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Runs N = 1,000,000+ operations with ZERO crash risk!</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §11.1.1: StackOverflowError is an unrecoverable VirtualMachineError. Always use defensive base cases and iterative loops for large inputs.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> The 4 Prevention Strategies Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Strategy</th>
                <th className="p-3 font-semibold text-emerald-400">Implementation</th>
                <th className="p-3 font-semibold text-purple-400">Target Problem Solved</th>
                <th className="p-3 font-semibold text-amber-400">Stack Footprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">1. Defensive Base Case</td>
                <td className="p-3 text-slate-300">`if (n &le; 0) return 0;`</td>
                <td className="p-3 text-slate-300 font-sans">Negative numbers and skip steps</td>
                <td className="p-3 text-emerald-300 font-sans">$O(N)$ stack space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">2. Depth Guard Counter</td>
                <td className="p-3 text-slate-300">`if (depth &gt; maxDepth) return 0;`</td>
                <td className="p-3 text-slate-300 font-sans">Runaway runaway infinite recursion</td>
                <td className="p-3 text-emerald-300 font-sans">Capped at `maxDepth` frames</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">3. Iterative Refactoring</td>
                <td className="p-3 text-slate-300">Standard `for` or `while` loop</td>
                <td className="p-3 text-slate-300 font-sans">Deep inputs ($N &gt; 10,000$)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ constant stack space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">4. JVM Stack Tuning</td>
                <td className="p-3 text-slate-300">`java -Xss4m ...`</td>
                <td className="p-3 text-slate-300 font-sans">Deep tree traversals / DFS</td>
                <td className="p-3 text-amber-300 font-sans">Expands physical stack size</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            StackOverflowErrorPreventionDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates defensive base cases, depth guards, iterative conversion, and measuring JVM stack frame capacity in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={overflowDemoCode}
          title="StackOverflowErrorPreventionDemo.java"
          highlightLines={[20, 24, 33, 39, 44, 51, 54, 60, 70, 75, 80, 85]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Catching `Error` in Production Business Logic
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">catch (StackOverflowError e)</code> in production code is dangerous; an Error indicates that the JVM thread stack was exhausted and the application state may be corrupt. Fix the algorithm instead!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Convert Deep Linear Recursions to Iteration
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Whenever a problem can be computed linearly (like summing arrays, calculating factorials, or calculating installments), use a simple iterative loop to achieve <code className="text-emerald-400 font-mono">O(1)</code> stack memory.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Can circular references inside a JavaBean <code className="text-emerald-400 font-mono">toString()</code> method cause a StackOverflowError?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Bidirectional Object Recursion! If <code className="text-slate-300 font-mono">Student</code> contains <code className="text-slate-300 font-mono">Course</code> and <code className="text-slate-300 font-mono">Course</code> contains <code className="text-slate-300 font-mono">Student</code>, calling <code className="text-emerald-400 font-mono">student.toString()</code> calls <code className="text-slate-300 font-mono">course.toString()</code> which calls <code className="text-emerald-400 font-mono">student.toString()</code> in an infinite loop! Always exclude bidirectional references from generated <code className="text-emerald-400 font-mono">toString()</code> and <code className="text-emerald-400 font-mono">hashCode()</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="StackOverflowError Prevention FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 15: StackOverflowError Prevention"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic15_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: StackOverflowError is the primary danger of recursion. Always write defensive base cases, use depth guards, and refactor linear algorithms to iterative loops. In Topic 16, we implement the 5 Classic Recursive Algorithms! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
