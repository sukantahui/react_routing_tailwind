import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import comparisonDemoCode from "./topic9_files/SwitchVsElseIfComparisonDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowComp {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-comp {
            animation: glowComp 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comparing <code className="text-purple-400">&apos;switch&apos;</code> vs <code className="text-sky-300">&apos;else-if&apos;</code> Ladder: Readability, Jump Tables &amp; Performance
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master architectural decision routing in Java: evaluating cognitive readability, JVM bytecode internals (<code className="text-purple-300 font-mono">tableswitch</code> $O(1)$ vs <code className="text-amber-300 font-mono">lookupswitch</code> $O(\log N)$ vs <code className="text-sky-300 font-mono">else-if</code> $O(N)$), range queries, micro-benchmark simulation, and course fee routing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Trade-Off Matrix: Which Control Structure to Choose?
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When designing multi-branch software architectures, engineers choose between <code className="text-purple-400 font-mono">switch</code> and <code className="text-sky-300 font-mono">else-if</code> ladders based on two primary dimensions:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-sm">
            <li><strong className="text-purple-300">Choose &apos;switch&apos;:</strong> When matching a single variable against 4+ discrete compile-time constants (integers, strings, enums). Compiles into fast $O(1)$ jump tables.</li>
            <li><strong className="text-sky-300">Choose &apos;else-if&apos;:</strong> When evaluating range inequalities (<code className="text-emerald-400">score &gt;= 90</code>), floating-point variables (<code className="text-emerald-400">double</code>), or complex composite boolean logic (<code className="text-amber-300">A &amp;&amp; B || C</code>).</li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Benchmark Simulation):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> benchmarked a high-frequency course admission router in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). Testing 1,000,000 iterations across 4 tracks, <strong>Abhronila</strong> and <strong>Debangshu</strong> observed that <code className="text-purple-300 font-mono">tableswitch</code> executed in constant $O(1)$ time with zero branch prediction penalty across servers in Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Bytecode Architecture: O(1) tableswitch vs O(N) Cascade
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the JVM executes tableswitch, lookupswitch, and sequential conditional jump cascades:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="tableswitch vs lookupswitch vs else-if Diagram"
          >
            <defs>
              <linearGradient id="gradTable" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradLookup" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradCascade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: tableswitch O(1) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradTable)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. tableswitch [O(1)]</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">table[key - lowOffset]</text>
            <text x="55" y="122" fill="#d1fae5" fontSize="10">Used for dense integer keys</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Direct array address jump</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Sub-Nanosecond Dispatch
            </text>

            {/* Box 2: lookupswitch O(log N) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradLookup)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. lookupswitch [O(log N)]</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="335" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">Binary search over keys</text>
            <text x="335" y="122" fill="#ede9fe" fontSize="10">Used for sparse keys (1, 100, 50k)</text>
            <text x="335" y="142" fill="#ede9fe" fontSize="10">Logarithmic lookup time</text>
            <text x="440" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Sparse Key Optimization
            </text>

            {/* Box 3: else-if Cascade O(N) */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradCascade)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. else-if Cascade [O(N)]</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">ifeq L1 → ifeq L2 → ...</text>
            <text x="615" y="122" fill="#e0f2fe" fontSize="10">Sequential conditional tests</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">Mandatory for ranges/floats</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              General Expression Power
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Use switch for O(1) discrete constant matching; use else-if for range intervals and complex formulas.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Detailed Architecture Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Dimension</th>
                <th className="p-3 font-semibold text-purple-400">&apos;switch&apos; Statement / Expression</th>
                <th className="p-3 font-semibold text-emerald-400">&apos;else-if&apos; Ladder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Time Complexity</td>
                <td className="p-3 font-semibold text-emerald-400">$O(1)$ [tableswitch] / $O(\log N)$</td>
                <td className="p-3 text-rose-400">$O(N)$ Linear Search</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Data Type Support</td>
                <td className="p-3 text-xs">byte, short, int, char, String, enum</td>
                <td className="p-3 text-xs text-emerald-400">ALL types (long, double, float, boolean, objects)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Range Inequalities</td>
                <td className="p-3 text-xs text-rose-400">Not supported (Discrete constants only)</td>
                <td className="p-3 text-xs text-emerald-400">Fully Supported (score &gt;= 90, income &lt;= 3L)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Multiple Variables</td>
                <td className="p-3 text-xs text-rose-400">Evaluates ONE variable only</td>
                <td className="p-3 text-xs text-emerald-400">Can evaluate different variables in each branch</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Cognitive Readability</td>
                <td className="p-3 text-xs text-purple-300 font-semibold">High (Tabular, no variable repetition)</td>
                <td className="p-3 text-xs">Verbose when checking 4+ discrete values</td>
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
            SwitchVsElseIfComparisonDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates discrete value matching (<code className="text-purple-300 font-mono">switch</code> vs <code className="text-sky-300 font-mono">else-if</code>), range evaluations, and a 1,000,000 iteration micro-benchmark in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={comparisonDemoCode}
          title="SwitchVsElseIfComparisonDemo.java"
          highlightLines={[23, 24, 31, 33, 44, 45, 54, 61, 74, 84]}
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
              <span>❌</span> Pitfall 1: Writing Massive 20+ Branch else-if Ladders on Strings
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Using long <code className="text-rose-300 font-mono">if (s.equals(&quot;A&quot;)) ... else if (s.equals(&quot;B&quot;))</code> chains calls <code className="text-sky-300 font-mono">.equals()</code> sequentially $O(N)$ times.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use Java 7+ String <code className="bg-slate-900 px-1 py-0.5 rounded">switch</code> or a <code className="bg-slate-900 px-1 py-0.5 rounded">Map&lt;String, Command&gt;</code> for $O(1)$ dispatch.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Modern Arrow Switch Expressions for Value Mapping
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In Java 14+, prefer <code className="text-emerald-400 font-mono">final String name = switch (id) &#123; case 1 -&gt; &quot;A&quot;; default -&gt; &quot;B&quot;; &#125;;</code> for direct immutable assignments.
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
            🤔 <em>&ldquo;When does `else-if` outperform `switch` in real-world applications?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Skewed Branch Distributions! If 95% of your incoming transactions match a single condition (e.g. standard payment), placing that condition as the very first <code className="text-emerald-400 font-mono">if (isStandardPayment)</code> takes advantage of CPU branch prediction and exits on the 1st test with near zero overhead, whereas a sparse <code className="text-purple-300 font-mono">lookupswitch</code> might execute a binary search on every iteration!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Switch vs Else-If FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 9: Comparing 'switch' vs 'else-if' Ladder"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic9_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Choosing the right control structure is a mark of professional software engineering maturity. Use switch for O(1) discrete constant matching, and else-if for ranges and complex formulas. In Topic 10, we explore Switch with Strings and Internal HashCode Matching! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
