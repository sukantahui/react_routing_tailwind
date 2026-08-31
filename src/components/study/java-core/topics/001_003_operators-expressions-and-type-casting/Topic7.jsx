import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import relationalDemoCode from "./topic7_files/RelationalOperatorsDemo.java?raw";
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
          @keyframes glowRelational {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-relational {
            animation: glowRelational 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Relational / Comparison Operators: <code className="text-sky-400">==</code>, <code className="text-sky-400">!=</code>, <code className="text-sky-400">&gt;</code>, <code className="text-sky-400">&lt;</code>, <code className="text-sky-400">&gt;=</code>, <code className="text-sky-400">&lt;=</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master comparison logic in Java: primitive equality (<code className="text-sky-300 font-mono">==</code>, <code className="text-sky-300 font-mono">!=</code>), ordering comparisons (<code className="text-emerald-300 font-mono">&gt;</code>, <code className="text-emerald-300 font-mono">&lt;</code>, <code className="text-emerald-300 font-mono">&gt;=</code>, <code className="text-emerald-300 font-mono">&lt;=</code>), floating-point epsilon comparisons (<code className="text-amber-300 font-mono">Math.abs(a - b) &lt; 1e-9</code>), IEEE 754 <code className="text-rose-400 font-mono">NaN</code> invariants, and scholarship eligibility in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Relational Logic &amp; Decision Making in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Relational Operators</strong> compare two values and always evaluate to a primitive <code className="text-emerald-300 font-mono">boolean</code> (<code className="text-emerald-400 font-mono">true</code> or <code className="text-rose-400 font-mono">false</code>). They form the backbone of conditional execution (<code className="text-sky-300 font-mono">if</code>, <code className="text-sky-300 font-mono">while</code>, <code className="text-sky-300 font-mono">for</code>).
          </p>
          <p>
            Key rules govern relational operations: floating-point calculations should never be checked with naive <code className="text-rose-300 font-mono">==</code> due to binary precision limitations, <code className="text-amber-300 font-mono">Double.NaN == Double.NaN</code> is always <code className="text-rose-400 font-mono">false</code> by IEEE 754 standards, and booleans only support equality checks (<code className="text-sky-300 font-mono">==</code>, <code className="text-sky-300 font-mono">!=</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Merit Assessment):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated student merit and scholarship evaluator. By testing scores against qualification thresholds (<code className="text-emerald-300 font-mono">boolean eligible = score &gt;= 90;</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> awarded 15% tuition fee rebates in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) to top-performing students across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Relational Comparison Taxonomy &amp; Epsilon Precision Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How relational operators evaluate primitives, handle floating-point epsilon tolerances, and treat IEEE 754 NaN:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Relational Operators and Epsilon Precision Diagram"
          >
            <defs>
              <linearGradient id="gradEquality" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradOrdering" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradEpsilon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Equality Operators */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradEquality)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Equality (==, !=)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">10 == 10.0 → true</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">10 != 5    → true</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">Binary promotion widens int to double</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Level 8 Precedence
            </text>

            {/* Box 2: Ordering Operators */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradOrdering)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Ordering (&gt;, &lt;, &gt;=, &lt;=)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">score &gt;= 90 → true</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&apos;A&apos; &lt; &apos;B&apos;    → true (65 &lt; 66)</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Cannot be used on booleans</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Level 9 Precedence (&gt; ==)
            </text>

            {/* Box 3: Floating Epsilon & NaN */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradEpsilon)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Epsilon &amp; NaN</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">0.1 + 0.2 == 0.3 → false!</text>
            <text x="615" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Math.abs(diff) &lt; 1e-9 → true</text>
            <text x="615" y="142" fill="#fca5a5" fontSize="10">NaN == NaN is ALWAYS false!</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              IEEE 754 Floating Nuances
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Golden Rule: Always check floating-point equality with epsilon threshold `Math.abs(a - b) &lt; 1e-9`!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Relational Operator Summary Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operator</th>
                <th className="p-3 font-semibold text-emerald-400">Name</th>
                <th className="p-3 font-semibold text-amber-400">Allowed Types</th>
                <th className="p-3 font-semibold text-purple-400">Sample Operation</th>
                <th className="p-3 font-semibold text-slate-400">Evaluation Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">==</td>
                <td className="p-3">Equal to</td>
                <td className="p-3">Primitives, References, Enums</td>
                <td className="p-3 font-mono text-emerald-400">10 == 10</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">!=</td>
                <td className="p-3">Not equal to</td>
                <td className="p-3">Primitives, References, Enums</td>
                <td className="p-3 font-mono text-emerald-400">10 != 5</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&gt;</td>
                <td className="p-3">Greater than</td>
                <td className="p-3">Numeric, char</td>
                <td className="p-3 font-mono text-emerald-400">92 &gt; 90</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&lt;</td>
                <td className="p-3">Less than</td>
                <td className="p-3">Numeric, char</td>
                <td className="p-3 font-mono text-emerald-400">&apos;A&apos; &lt; &apos;B&apos;</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">true (65 &lt; 66)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&gt;=</td>
                <td className="p-3">Greater than or equal to</td>
                <td className="p-3">Numeric, char</td>
                <td className="p-3 font-mono text-emerald-400">40 &gt;= 40</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&lt;=</td>
                <td className="p-3">Less than or equal to</td>
                <td className="p-3">Numeric, char</td>
                <td className="p-3 font-mono text-emerald-400">85 &lt;= 100</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">true</td>
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
            RelationalOperatorsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates relational operators across integers, characters, and floating-point numbers, demonstrating epsilon comparisons, IEEE 754 NaN invariants, and scholarship evaluation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={relationalDemoCode}
          title="RelationalOperatorsDemo.java"
          highlightLines={[22, 23, 24, 25, 26, 27, 36, 43, 44, 46, 55, 56, 64, 76, 77]}
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
              <span>❌</span> Pitfall 1: Comparing Floating-Point Calculations with ==
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (0.1 + 0.2 == 0.3)</code> will fail and skip critical business branches because binary IEEE 754 floats contain minor precision discrepancies (<code className="text-amber-300 font-mono">0.30000000000000004</code>).
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use epsilon tolerance: <code className="bg-slate-900 px-1 py-0.5 rounded">Math.abs((0.1 + 0.2) - 0.3) &lt; 1e-9</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Write Idiomatic Boolean Checks
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never write <code className="text-rose-300 font-mono">if (isEligible == true)</code>, which risks accidental assignment if mistyped as <code className="text-rose-400 font-mono">=</code>. Write clean idiomatic Java: <code className="text-emerald-400 font-mono">if (isEligible)</code> or <code className="text-emerald-400 font-mono">if (!isEligible)</code>.
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
            🤔 <em>&ldquo;Why does `Double.NaN == Double.NaN` evaluate to false in Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The IEEE 754 Floating-Point Standard! <code className="text-amber-300 font-mono">NaN</code> represents an undefined or unrepresentable mathematical quantity (e.g. <code className="text-sky-300 font-mono">0.0 / 0.0</code> or <code className="text-sky-300 font-mono">Math.sqrt(-1)</code>). Two indeterminate quantities cannot be assumed to be equal to each other! Therefore, <code className="text-amber-300 font-mono">NaN</code> is defined as not equal to anything, including itself. Always use <code className="text-emerald-400 font-mono">Double.isNaN(val)</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Relational Operators FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 7: Relational / Comparison Operators"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic7_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Relational operators drive every branch and decision in your algorithms. Always remember to use epsilon comparisons for floating-point calculations and never compare to boolean literals. In Topic 8, we explore the crucial distinction between Primitive Value Equality (==) and Object Reference Comparison (.equals())! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
