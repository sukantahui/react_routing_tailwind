import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import comparisonDemoCode from "./topic6_files/LoopComparisonDecisionMatrixDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMatrix {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-mx {
            animation: glowMatrix 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Key Differences: <code className="text-sky-400">&apos;for&apos;</code> vs. <code className="text-emerald-400">&apos;while&apos;</code> vs. <code className="text-amber-400">&apos;do-while&apos;</code> &amp; Selection Decision Matrix
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the architectural decision matrix for Java loops: pre-test entry control vs post-test exit control, minimum execution guarantees (0 vs 1), scoping trade-offs, and practical selection criteria across tuition installment processing and scholarship audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Loop Selection Framework
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            While all three loop constructs in Java are computationally Turing-equivalent, each signals a distinct architectural intent:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-sky-300 font-mono">for loop:</strong> Use when <em>iteration counts or index bounds are known</em> in advance (<code className="text-sky-300 font-mono">1 to N</code>, array indexing).
            </li>
            <li>
              <strong className="text-emerald-300 font-mono">while loop:</strong> Use when <em>iteration is indefinite, condition-driven, or event-based</em> (<code className="text-emerald-300 font-mono">0 or more executions</code>).
            </li>
            <li>
              <strong className="text-amber-300 font-mono">do-while loop:</strong> Use when the payload <em>must execute at least once</em> (interactive menus, PIN retries, <code className="text-amber-300 font-mono">1 or more executions</code>).
            </li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore 3-Way Scenario Benchmarking):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> implemented three business workflows in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>): (1) 3-month fixed installment billing via <code className="text-sky-300 font-mono">for</code>, (2) dynamic scholarship fund depletion (₹15,000 budget) via <code className="text-emerald-300 font-mono">while</code>, and (3) student portal menu navigation via <code className="text-amber-300 font-mono">do-while</code> across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 3-Way Loop Decision Matrix Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How to evaluate problem characteristics to pick the exact right loop construct:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Loop Decision Matrix Diagram"
          >
            <defs>
              <linearGradient id="gradForMatrix" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradWhileMatrix" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradDoWhileMatrix" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: 'for' Loop */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradForMatrix)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. &apos;for&apos; Loop (Definite)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">Known bounds: 1 to N</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="10">Pre-test (0+ runs)</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">Header-scoped counter</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Known Iteration Count
            </text>

            {/* Box 2: 'while' Loop */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradWhileMatrix)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. &apos;while&apos; Loop (Indefinite)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">State / Event-driven</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="10">Pre-test (0+ runs)</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Digit extraction / Polling</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              State-Driven Condition
            </text>

            {/* Box 3: 'do-while' Loop */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradDoWhileMatrix)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. &apos;do-while&apos; (Post-test)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">Guaranteed &ge; 1 execution</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">Post-test (1+ runs)</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Menus &amp; Validation retries</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Must Run &ge; 1 Time
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Selection Heuristic: Count known &rarr; for | State/stream &rarr; while | Run at least once &rarr; do-while.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comprehensive Master Comparison Table
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-sky-300">`for` Loop</th>
                <th className="p-3 font-semibold text-emerald-400">`while` Loop</th>
                <th className="p-3 font-semibold text-amber-400">`do-while` Loop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Control Classification</td>
                <td className="p-3 text-xs">Entry-controlled (Pre-test)</td>
                <td className="p-3 text-xs">Entry-controlled (Pre-test)</td>
                <td className="p-3 text-xs text-amber-300 font-bold">Exit-controlled (Post-test)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Minimum Executions</td>
                <td className="p-3 text-xs text-rose-400 font-mono">0 times</td>
                <td className="p-3 text-xs text-rose-400 font-mono">0 times</td>
                <td className="p-3 text-xs text-emerald-400 font-mono font-bold">1 time (Guaranteed)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Counter Variable Scope</td>
                <td className="p-3 text-xs text-emerald-400">Scoped strictly to header/body</td>
                <td className="p-3 text-xs text-rose-400">Leaks to enclosing method</td>
                <td className="p-3 text-xs text-rose-400">Leaks to enclosing method</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Trailing Semicolon</td>
                <td className="p-3 text-xs text-rose-400">Bug if typed after header</td>
                <td className="p-3 text-xs text-rose-400">Bug if typed after header</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">Mandatory syntax</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Best Real-World Fit</td>
                <td className="p-3 text-xs">Array indexing, $1 \dots N$ counting</td>
                <td className="p-3 text-xs">Digit math, file stream reading</td>
                <td className="p-3 text-xs">Menu display, password retries</td>
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
            LoopComparisonDecisionMatrixDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates side-by-side implementations of the three loop constructs across installment billing, scholarship fund depletion, and menu displays in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={comparisonDemoCode}
          title="LoopComparisonDecisionMatrixDemo.java"
          highlightLines={[22, 23, 33, 34, 43, 46]}
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
              <span>❌</span> Pitfall 1: Using `do-while` on Collections That Might Be Empty
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Using <code className="text-rose-300 font-mono">do &#123; list.get(0); &#125; while (!list.isEmpty());</code> will crash with <code className="text-rose-400 font-mono">IndexOutOfBoundsException</code> on empty lists because the body runs before the size check!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Match Loop Construct to Problem Domain
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always select the loop type that expresses the problem most naturally: fixed bounds $\to$ <code className="text-sky-300 font-mono">for</code>, state stream $\to$ <code className="text-emerald-300 font-mono">while</code>, prompt-first $\to$ <code className="text-amber-300 font-mono">do-while</code>.
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
            🤔 <em>&ldquo;Why is `for` preferred over `while` when using a loop counter variable?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Scope Bounding &amp; Copy-Paste Bug Prevention! Declaring the counter in the <code className="text-sky-300 font-mono">for</code> header bounds its scope strictly to that loop. If you copy-paste a <code className="text-emerald-300 font-mono">while</code> loop, reusing an outer variable <code className="text-rose-300 font-mono">i</code> can cause silent failure because <code className="text-rose-300 font-mono">i</code> is already at its max value!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Loop Comparison & Selection FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 6: Loop Comparison & Selection Matrix"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic6_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Choosing the right loop signals your design intention with crystal clarity. Count-driven -> for; State-driven -> while; Run-at-least-once -> do-while. In Topic 7, we explore the Enhanced 'for-each' loop for iterating sequences and arrays! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
