import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import perfDemoCode from "./topic18_files/LoopPerformanceOptimizationDemo.java?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions";

export default function Topic18() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPerf {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pf {
            animation: glowPerf 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 18 (Module Milestone!)
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Advanced Optimization
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Loop Performance Best Practices: Invariant Hoisting &amp; Condition Optimization
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master enterprise loop performance engineering in Java: Loop Invariant Code Motion (Hoisting), eliminating expensive method calls in loop conditions (<code className="text-emerald-300 font-mono">for (int i=0, len=size; i&lt;len; i++)</code>), HotSpot JIT Loop Unrolling, Bounds Check Elimination (BCE), and 100,000-transaction batch reconciliation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Loop Invariant Code Motion (Hoisting)
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java loops, the termination condition is evaluated <strong>on every single iteration</strong>. Placing method calls or calculations whose return values never change inside the condition forces redundant, wasteful execution:
          </p>
          <p className="font-mono text-rose-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            // ❌ Unoptimized: list.size() invoked 100,000 times!
            <br />
            for ( int i = 0 ; i &lt; transactionBatch.size() ; i++ ) &#123; ... &#125;
            <br />
            <br />
            // ✓ Optimized: size evaluated ONCE and cached in &apos;len&apos;!
            <br />
            <span className="text-emerald-400">for ( int i = 0 , len = transactionBatch.size() ; i &lt; len ; i++ ) &#123; ... &#125;</span>
          </p>
          <p>
            <strong>HotSpot JIT Optimizations:</strong> When loops follow clean idioms, the HotSpot C2 compiler applies <em>Bounds Check Elimination (BCE)</em>, removing CPU boundary check instructions, and <em>Loop Unrolling</em>, processing multiple data elements per clock cycle!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore 100,000-Transaction Fee Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> benchmarked 100,000 student tuition entries in Indian Rupees (<code className="text-emerald-400 font-semibold">₹50,000,000 batch volume</code>). By hoisting <code className="text-emerald-300 font-mono">len = size()</code> and utilizing primitive arrays, they reduced execution time by 80% with zero Garbage Collection churn across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Invariant Hoisting &amp; HotSpot JIT Optimization Engine
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How loop hoisting, bounds check elimination, and JIT unrolling accelerate execution:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Loop Performance Optimization Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradUnopt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradHoisted" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradJIT" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Unoptimized Repeated Calls */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradUnopt)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Unoptimized Condition</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">i &lt; list.size()</text>
            <text x="55" y="122" fill="#fecdd3" fontSize="10">Invokes size() on EVERY step</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">100,000 method calls!</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ❌ Wasted CPU Overhead
            </text>

            {/* Box 2: Hoisted Header Caching */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradHoisted)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Hoisted Header Cache</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int i=0, len=list.size()</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">i &lt; len</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Evaluates size() ONCE!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ 100% Invariant Hoisting
            </text>

            {/* Box 3: HotSpot JIT Superword */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradJIT)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. HotSpot C2 JIT Power</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="10" fontFamily="monospace">&bull; Bounds Check Elimination</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10" fontFamily="monospace">&bull; Loop Unrolling (4x / 8x)</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">&bull; SIMD AVX Vectorization</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Hardware-Accelerated Speed
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Performance Best Practice: Cache collection sizes in the loop header to let HotSpot JIT unroll and vectorize.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Enterprise Loop Optimization Rules &amp; Antipatterns
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Optimization Dimension</th>
                <th className="p-3 font-semibold text-rose-400">Performance Antipattern (Bad)</th>
                <th className="p-3 font-semibold text-emerald-400">Production Best Practice (Good)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Condition Size Calls</td>
                <td className="p-3 font-mono text-xs text-rose-400">`for (int i=0; i&lt;list.size(); i++)`</td>
                <td className="p-3 font-mono text-xs text-emerald-400 font-bold">`for (int i=0, len=list.size(); i&lt;len; i++)`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Data Type Selection</td>
                <td className="p-3 text-xs text-rose-400">`List&lt;Double&gt;` (Autoboxing + heap dereferencing)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">`double[]` primitive array (Contiguous CPU cache)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Heavy Math Calculations</td>
                <td className="p-3 font-mono text-xs text-rose-400">`i &lt; Math.sqrt(n)` or `i &lt; heavyFunc()`</td>
                <td className="p-3 font-mono text-xs text-emerald-400 font-bold">`i * i &lt;= n` or `int max = heavyFunc();` outside</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Memory Allocation</td>
                <td className="p-3 text-xs text-rose-400">`new StringBuilder()` inside 100k loop</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">Reuse pre-allocated buffer with `setLength(0)`</td>
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
            LoopPerformanceOptimizationDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program benchmarks unoptimized size evaluations against hoisted header caches and primitive array traversals in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={perfDemoCode}
          title="LoopPerformanceOptimizationDemo.java"
          highlightLines={[29, 30, 41, 42, 53, 54]}
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
              <span>❌</span> Pitfall 1: Placing I/O or Database Calls in Termination Conditions
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int i = 0; i &lt; db.getStudentCount(); i++)</code> executes a database network round-trip on every iteration, causing catastrophic system slowdowns!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Cache Invariant Expressions in the `for` Header
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use the multi-variable initialization clause <code className="text-emerald-400 font-mono">for (int i = 0, len = collection.size(); i &lt; len; i++)</code> to evaluate collection bounds exactly once with zero extra lines of code.
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
            🤔 <em>&ldquo;Why can the C2 JIT compiler eliminate array bounds checks in standard loops?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Loop Bounds Induction Proof! In <code className="text-emerald-300 font-mono">for (int i = 0; i &lt; arr.length; i++)</code>, the C2 compiler mathematically proves that <code className="text-sky-300 font-mono">0 &lt;= i &lt; arr.length</code> is strictly true on all iterations. Because out-of-bounds access is mathematically impossible, the JIT removes all bounds checking instructions from machine code (Bounds Check Elimination)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Loop Performance Optimization FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 18: Loop Performance Best Practices"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic18_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="CONGRATULATIONS Swadeep, Tuhina, Abhronila, and Debangshu! We have 100% COMPLETED Module 001_005 (Loops, Iteration Statements & Jump Controls) across all 19 topics! You now possess complete mastery of for, while, do-while, for-each, nested grids, trace tables, break/continue jump statements, 2D visual star patterns, numerical patterns, number theory algorithms, and enterprise performance hoisting! In Module 001_006, we conquer Arrays and Varargs! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
