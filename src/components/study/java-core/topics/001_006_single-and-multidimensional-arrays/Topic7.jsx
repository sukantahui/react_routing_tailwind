import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prevDemoCode from "./topic7_files/ArrayIndexOutOfBoundsPreventionDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowError {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-er {
            animation: glowError 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 7
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Defensive Debugging
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>: Root Causes &amp; Defensive Prevention
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master boundary protection in Java (JLS §10.4): diagnosing off-by-one loop errors (<code className="text-rose-300 font-mono">&lt;=</code> vs <code className="text-emerald-400 font-mono">&lt;</code>), negative indexing traps, adjacent element comparison overflow (<code className="text-amber-300 font-mono">arr[i + 1]</code>), defensive boundary guards, and student transaction verification in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Understanding the Boundary Exception
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code> is an unchecked runtime exception thrown whenever an index is accessed that violates the strict memory boundary:
          </p>
          <p className="font-mono text-rose-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            // ❌ Off-by-one trap: i reaches &apos;length&apos;!
            <br />
            for ( int i = 0 ; i &lt;= studentFees.length ; i++ ) &#123; ... &#125;
            <br />
            <br />
            // ✓ Defensive Guard:
            <br />
            <span className="text-emerald-400">if ( requestedIndex &gt;= 0 &amp;&amp; requestedIndex &lt; studentFees.length ) &#123; ... &#125;</span>
          </p>
          <p>
            <strong>Fail-Fast Architecture:</strong> Java throws this exception immediately rather than returning garbage memory or zero, protecting financial calculations from silent data corruption!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Barrackpore Roll Number Lookup Safety):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> requested seat slot 5 in a 4-student batch array in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹18,000</code>). By wrapping queries in defensive bounds guards (<code className="text-emerald-400 font-mono">if (slot &gt;= 0 &amp;&amp; slot &lt; len)</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> safely rejected out-of-bounds queries without crashing the ledger across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Boundary Traps vs. Defensive Guard Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How off-by-one errors and negative indices trigger exceptions and how defensive guards filter them:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Index Out Of Bounds Diagram"
          >
            <defs>
              <linearGradient id="gradTrap1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradTrap2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradSafeGuard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Off-by-One Trap (i <= length) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradTrap1)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Off-by-One Loop Trap</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">i &lt;= arr.length // BUG!</text>
            <text x="55" y="122" fill="#fecdd3" fontSize="10">When i = 4 (length = 4)</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">→ Index 4 out of bounds!</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ❌ Fatal Runtime Exception
            </text>

            {/* Box 2: Negative Index Trap (i = -1) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradTrap2)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Negative Index Trap</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="335" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">arr[-1] // No Python index!</text>
            <text x="335" y="122" fill="#fef3c7" fontSize="10">Java requires 0 &lt;= index</text>
            <text x="335" y="142" fill="#fef3c7" fontSize="10">→ Index -1 out of bounds!</text>
            <text x="440" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              ❌ Unsupported in Java
            </text>

            {/* Box 3: Defensive Guard */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradSafeGuard)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Defensive Boundary Guard</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (idx &gt;= 0 &amp;&amp; idx &lt; len)</text>
            <text x="615" y="122" fill="#a7f3d0" fontSize="10">Validates bounds before access</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Safe rejection of invalid inputs</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ 100% Robust Protection
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.4: Prevent ArrayIndexOutOfBoundsException using strict &apos;&lt; arr.length&apos; and defensive boundary guards.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Root Causes &amp; Production Prevention Techniques
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Vulnerable Scenario</th>
                <th className="p-3 font-semibold text-rose-400">Buggy Code Pattern (Fails)</th>
                <th className="p-3 font-semibold text-emerald-400">Defensive Solution (Passes)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Standard Forward Loop</td>
                <td className="p-3 font-mono text-xs text-rose-400">`for (int i=0; i&lt;=arr.length; i++)`</td>
                <td className="p-3 font-mono text-xs text-emerald-400 font-bold">`for (int i=0; i&lt;arr.length; i++)`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Reverse Backward Loop</td>
                <td className="p-3 font-mono text-xs text-rose-400">`for (int i=arr.length; i&gt;=0; i--)`</td>
                <td className="p-3 font-mono text-xs text-emerald-400 font-bold">`for (int i=arr.length-1; i&gt;=0; i--)`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Adjacent Element Compare</td>
                <td className="p-3 font-mono text-xs text-rose-400">`if (arr[i] == arr[i+1])` (loop to length)</td>
                <td className="p-3 font-mono text-xs text-emerald-400 font-bold">`for (int i=0; i&lt;arr.length-1; i++)`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Dynamic User Index Query</td>
                <td className="p-3 font-mono text-xs text-rose-400">`return arr[userIndex];`</td>
                <td className="p-3 font-mono text-xs text-emerald-400 font-bold">`if (idx&gt;=0 &amp;&amp; idx&lt;arr.length) ...`</td>
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
            ArrayIndexOutOfBoundsPreventionDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates off-by-one exceptions, negative index traps, defensive guard checks, and safe for-each iterations in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={prevDemoCode}
          title="ArrayIndexOutOfBoundsPreventionDemo.java"
          highlightLines={[22, 23, 33, 42, 43, 51]}
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
              <span>❌</span> Pitfall 1: Checking Adjacent Elements Without Adjusting Loop Bound
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In adjacent element comparisons (<code className="text-rose-300 font-mono">arr[i] &gt; arr[i + 1]</code>), running the loop up to <code className="text-rose-400 font-mono">i &lt; arr.length</code> throws an exception on the last step because <code className="text-slate-300 font-mono">i + 1</code> equals <code className="text-slate-300 font-mono">arr.length</code>! Terminate at <code className="text-emerald-400 font-mono">i &lt; arr.length - 1</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `Objects.checkIndex()` in Java 9+
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In modern Java libraries, use <code className="text-emerald-400 font-mono">Objects.checkIndex(index, length)</code> for high-performance intrinsic boundary validation.
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
            🤔 <em>&ldquo;Why should you never catch `ArrayIndexOutOfBoundsException` as standard control flow?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Exception Performance Overhead! Instantiating exception stack traces is thousands of times slower than a simple <code className="text-emerald-400 font-bold">if (idx &gt;= 0 &amp;&amp; idx &lt; arr.length)</code> condition. Exceptions should signal unexpected defects, not normal boundary iteration logic!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="ArrayIndexOutOfBoundsException FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 7: ArrayIndexOutOfBoundsException Prevention"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic7_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Never allow off-by-one bugs in your code! Always use strict 'i < arr.length' for forward loops, and 'i = arr.length - 1' for reverse loops. In Topic 8, we master Forward and Reverse Array Traversals! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
