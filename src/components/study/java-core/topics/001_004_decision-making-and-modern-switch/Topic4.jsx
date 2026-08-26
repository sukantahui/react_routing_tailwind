import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import elseIfDemoCode from "./topic4_files/ElseIfLadderDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowLadder {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ladder {
            animation: glowLadder 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-sky-400">&apos;else-if&apos;</code> Ladder for Multi-Branch Evaluations
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master sequential multi-tier decision routing in Java: evaluation cascade mechanics, the critical condition ordering rule (avoiding branch shadowing), academic grade classification (A+, A, B, C, F), and Indian Income Tax Slab calculations (New Tax Regime in Indian Rupees ₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Sequential Cascade of the &apos;else-if&apos; Ladder
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An <strong><code className="text-sky-400 font-mono">else-if</code> ladder</strong> is used when an application must evaluate a series of mutually exclusive conditions in sequential order:
          </p>
          <p className="font-mono text-sky-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            if ( condition1 ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Block 1 runs if condition1 is true
            <br />
            &#125; else if ( condition2 ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Block 2 runs if condition1 is false AND condition2 is true
            <br />
            &#125; else &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Default fallback if all preceding conditions are false
            <br />
            &#125;
          </p>
          <p>
            <strong>Critical Ordering Rule:</strong> Because evaluation proceeds top-to-bottom and stops immediately at the first <code className="text-emerald-400 font-mono">true</code> condition, conditions must always be ordered from <strong>most specific (highest threshold)</strong> down to least specific.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Income Tax &amp; Grading Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an Income Tax calculator implementing the Indian New Tax Regime in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By ordering tax brackets progressively (₹3L, ₹6L, ₹9L, ₹12L, ₹15L), <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated branch shadowing bugs, computing exact net take-home salaries for software engineers across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Sequential Evaluation Cascade &amp; Shadowing Trap
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the ladder halts on the first true match and how poor ordering creates dead code branches:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Else-If Ladder Cascade and Shadowing Diagram"
          >
            <defs>
              <linearGradient id="gradLadderFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradShadowTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradTaxSlab" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Proper Descending Cascade */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradLadderFlow)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Descending Cascade</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">if (score &gt;= 90) &rarr; A+</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">else if (score &gt;= 80) &rarr; A</text>
            <text x="55" y="142" fill="#a7f3d0" fontSize="10">Stops at FIRST true condition</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Correct Ordering
            </text>

            {/* Box 2: Branch Shadowing Bug */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradShadowTrap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Branch Shadowing Bug</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">if (score &gt;= 40) pass();</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">else if (score &gt;= 90) honors();</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">95 matches &gt;= 40; Honors dead!</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Inverted Order Trap
            </text>

            {/* Box 3: Progressive Tax Slabs */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradTaxSlab)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Progressive Tax (₹)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&lt;= 3L &rarr; 0% | &lt;= 6L &rarr; 5%</text>
            <text x="615" y="122" fill="#d1fae5" fontSize="10">&lt;= 9L &rarr; 10% | &lt;= 12L &rarr; 15%</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Clean progressive brackets</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Financial Integrity
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.9: Sequential evaluation stops at first true condition; always order from highest to lowest.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Indian Income Tax Slabs (New Regime FY 2024-25)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Income Slab (₹ in Rupees)</th>
                <th className="p-3 font-semibold text-emerald-400">Tax Rate</th>
                <th className="p-3 font-semibold text-amber-400">Ladder Condition</th>
                <th className="p-3 font-semibold text-purple-400">Cumulative Base Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">₹0 – ₹3,00,000</td>
                <td className="p-3 font-semibold text-emerald-400">Nil (0%)</td>
                <td className="p-3 font-mono text-sky-300">if (income &lt;= 300000)</td>
                <td className="p-3 font-mono">₹0</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">₹3,00,001 – ₹6,00,000</td>
                <td className="p-3 font-semibold text-sky-400">5%</td>
                <td className="p-3 font-mono text-sky-300">else if (income &lt;= 600000)</td>
                <td className="p-3 font-mono">₹0 + 5% above 3L</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">₹6,00,001 – ₹9,00,000</td>
                <td className="p-3 font-semibold text-amber-300">10%</td>
                <td className="p-3 font-mono text-sky-300">else if (income &lt;= 900000)</td>
                <td className="p-3 font-mono">₹15,000 + 10% above 6L</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">₹9,00,001 – ₹12,00,000</td>
                <td className="p-3 font-semibold text-purple-300">15%</td>
                <td className="p-3 font-mono text-sky-300">else if (income &lt;= 1200000)</td>
                <td className="p-3 font-mono">₹45,000 + 15% above 9L</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">₹12,00,001 – ₹15,00,000</td>
                <td className="p-3 font-semibold text-rose-300">20%</td>
                <td className="p-3 font-mono text-sky-300">else if (income &lt;= 1500000)</td>
                <td className="p-3 font-mono">₹90,000 + 20% above 12L</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">Above ₹15,00,000</td>
                <td className="p-3 font-semibold text-rose-400">30%</td>
                <td className="p-3 font-mono text-sky-300">else</td>
                <td className="p-3 font-mono">₹1,50,000 + 30% above 15L</td>
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
            ElseIfLadderDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates student academic grade classification, the condition ordering shadowing trap, and the Indian Income Tax Slab calculator in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={elseIfDemoCode}
          title="ElseIfLadderDemo.java"
          highlightLines={[22, 28, 30, 48, 51, 54, 57, 60, 68, 70, 72, 74, 76, 78]}
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
              <span>❌</span> Pitfall 1: Incorrect Ascending Order in Greater-Than Checks
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (marks &gt;= 40) ... else if (marks &gt;= 90) ...</code> matches a mark of 95 in the first check, completely starving the honors grade branch!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always order greater-than checks in descending order (highest value first).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Always Include a Catch-All &apos;else&apos; Fallback
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Provide a trailing <code className="text-emerald-400 font-mono">else</code> block to handle unforeseen boundary anomalies or invalid input values.
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
            🤔 <em>&ldquo;Why does an &lsquo;else-if&rsquo; ladder evaluate in O(N) time while a compiled &lsquo;switch&rsquo; statement can evaluate in O(1) time?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Branch Invariants &amp; Jump Tables! An <code className="text-sky-300 font-mono">else-if</code> ladder can contain completely dynamic, unrelated boolean formulas, requiring the CPU to test each condition sequentially until a true match is found ($O(N)$ comparisons). A <code className="text-indigo-300 font-mono">switch</code> statement matches a single key against compile-time integer constants, allowing the compiler to generate a direct indexed <code className="text-emerald-400 font-bold">tableswitch</code> jump table in bytecode ($O(1)$ direct jump)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="'else-if' Ladder FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 4: 'else-if' Ladder Multi-Branch Evaluations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic4_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The else-if ladder is an indispensable tool for grading rubrics and financial tax brackets. Always remember to order your conditions from highest threshold to lowest, and keep an else fallback ready. In Topic 5, we explore Combining Complex Boolean Conditions using &&, ||, and ! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
