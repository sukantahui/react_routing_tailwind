import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import statDemoCode from "./topic13_files/ArrayMinMaxSecondHighestAverageDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowStats {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-st {
            animation: glowStats 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Aggregation &amp; Analytics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Finding Min, Max, 2nd Highest &amp; Average in a Single <code className="text-emerald-400 font-mono">O(N)</code> Pass
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master single-pass array statistical aggregation in Java: tracking minimum, maximum, and distinct second highest in $O(N)$ time with $O(1)$ space, preventing accumulator overflows, handling duplicate/empty edge cases, and student tuition ledger analytics in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Single-Pass Statistical Invariants
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Rather than making multiple passes or sorting the array (which wastes $O(N \log N)$ time), all statistical metrics can be computed simultaneously in a <strong>single $O(N)$ loop</strong>:
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 font-mono text-xs text-slate-300 space-y-1">
            <p className="text-emerald-400 font-bold">// Invariant update logic for distinct second highest:</p>
            <p>if (val &gt; max1) &#123;</p>
            <p>&nbsp;&nbsp;max2 = max1; // Old top becomes second top</p>
            <p>&nbsp;&nbsp;max1 = val;&nbsp;&nbsp;// New highest recorded</p>
            <p>&#125; else if (val &gt; max2 &amp;&amp; val != max1) &#123;</p>
            <p>&nbsp;&nbsp;max2 = val;&nbsp;&nbsp;// Distinct value between max1 and max2</p>
            <p>&#125;</p>
          </div>

          <p>
            <strong>Edge Case Defense:</strong> If all elements are equal (e.g. <code className="text-sky-300 font-mono">[15000, 15000, 15000]</code>), <code className="text-amber-300 font-mono">max2</code> remains <code className="text-purple-300 font-mono">Double.NEGATIVE_INFINITY</code>, correctly signaling that no distinct second highest value exists!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Batch Fee Analytics):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> analyzed student fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹25,000</code>). In a single $O(N)$ pass, the engine identified the top scholarship (₹25,000), distinct 2nd highest (₹18,000), minimum base fee (₹12,000), and class average (₹18,166.67) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Single-Pass Statistical Aggregation Engine
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How data streams through the single-pass invariant tracker in memory:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Single Pass Array Aggregations Diagram"
          >
            <defs>
              <linearGradient id="gradExtrema" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradSecondMax" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradAccumulator" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Minimum & Maximum */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradExtrema)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Extrema (Min &amp; Max)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (val &lt; min) min = val</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (val &gt; max) max = val</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Min: ₹12,000 | Max: ₹25,000</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Bound Tracking
            </text>

            {/* Box 2: Distinct 2nd Highest */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradSecondMax)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Distinct 2nd Highest</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="10" fontFamily="monospace">val &gt; max1 → max2 = max1</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="10" fontFamily="monospace">val &gt; max2 &amp;&amp; val != max1</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">2nd Highest: ₹18,000</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Rank Cascading Invariant
            </text>

            {/* Box 3: Sum & Average */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradAccumulator)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Sum &amp; Average</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">sum += val;</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">avg = sum / arr.length;</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Total: ₹109,000 | Avg: ₹18.16k</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Arithmetic Aggregation
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              All statistical metrics (Min, Max, 2nd Max, Sum, Avg) are computed in ONE O(N) pass with O(1) space.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Edge Cases &amp; Defensive Programming Checklist
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Edge Case Scenario</th>
                <th className="p-3 font-semibold text-rose-400">Vulnerable Pattern</th>
                <th className="p-3 font-semibold text-emerald-400">Defensive Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">All-Negative Numbers</td>
                <td className="p-3 text-xs text-rose-400">`int max = 0;` (Fails! returns 0)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">`int max = arr[0];` or `Integer.MIN_VALUE`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Duplicate Maximums</td>
                <td className="p-3 text-xs text-rose-400">`val &gt;= max2` (Sets max2 = max1!)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">`val &gt; max2 &amp;&amp; val != max1`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Empty Array (`len == 0`)</td>
                <td className="p-3 text-xs text-rose-400">`sum / 0` (Divide-by-zero / NaN)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">`if (arr.length == 0) throw ...`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Integer Sum Overflow</td>
                <td className="p-3 text-xs text-rose-400">`int sum = 0;` (Wraps negative!)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">`long sum = 0L;`</td>
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
            ArrayMinMaxSecondHighestAverageDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates single-pass statistical calculation of min, max, distinct second max, sum, and average with duplicate handling in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={statDemoCode}
          title="ArrayMinMaxSecondHighestAverageDemo.java"
          highlightLines={[42, 43, 44, 45, 52, 53, 54, 55, 63]}
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
              <span>❌</span> Pitfall 1: Integer Division Truncation in Average Calculations
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">double avg = sum / arr.length;</code> with integer variables truncates decimal points before assignment (<code className="text-slate-300 font-mono">15 / 2 = 7.0</code> instead of <code className="text-emerald-400 font-mono">7.5</code>). Cast with <code className="text-emerald-400 font-mono">(double) sum / arr.length</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `IntStream.summaryStatistics()` for Rapid Prototyping
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In Java 8+, use <code className="text-emerald-400 font-mono">IntStream.of(arr).summaryStatistics()</code> to obtain min, max, count, sum, and average in a single high-performance pipeline.
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
            🤔 <em>&ldquo;Why is initializing `max = 0` one of the most dangerous rookie bugs in Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> All-Negative Datasets! If an array contains only negative numbers (e.g. <code className="text-sky-300 font-mono">[-10, -25, -5]</code>), initializing <code className="text-rose-300 font-mono">max = 0</code> causes the loop to never update, falsely reporting <code className="text-rose-400 font-bold">0</code> as the maximum! Initializing with <code className="text-emerald-400 font-bold">arr[0]</code> or <code className="text-emerald-400 font-bold">Integer.MIN_VALUE</code> prevents this bug completely!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Aggregations & Analytics FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 13: Array Aggregations (Min, Max, 2nd Max & Avg)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic13_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Single-pass O(N) aggregation is standard industry practice. Always guard against negative number traps, integer sum overflows, and duplicate maximums! In Topic 14, we step into the 2D world: Two-Dimensional Arrays and Matrix Visualizations! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
