import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import parenDemoCode from "./topic17_files/ParenthesesEvaluationControlDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowParen {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-paren {
            animation: glowParen 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Parentheses <code className="text-emerald-400">( )</code> for Controlling Evaluation Order &amp; Code Readability
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the ultimate expression control tool in Java: overriding default operator precedence, avoiding String concatenation addition bugs (<code className="text-rose-400 font-mono">&quot;Total: &quot; + a + b</code> vs <code className="text-emerald-300 font-mono">&quot;Total: &quot; + (a + b)</code>), compound interest compounding in Indian Rupees (₹), quadratic root denominator protection (<code className="text-sky-300 font-mono">/ (2 * a)</code>), and defensive coding in Barrackpore.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Sovereign Role of Parentheses in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, <strong>Parentheses <code className="text-emerald-400 font-mono">( )</code></strong> occupy the highest precedence tier (Level 14/15). When sub-expressions are wrapped in parentheses, the compiler treats them as atomic primary units that must be evaluated first before parent operations execute.
          </p>
          <p>
            Crucially, parentheses introduce <strong>zero runtime performance overhead</strong> because they are resolved completely during Abstract Syntax Tree (AST) construction by the compiler.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Compound Interest Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an educational loan amortization calculator in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By enforcing parentheses in the compound interest formula <code className="text-emerald-300 font-mono">P * Math.pow((1 + r/n), (n * t))</code>, <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated subtle denominator division bugs, guaranteeing 100% mathematical accuracy across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Precedence Override &amp; Defensive Formula Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How parentheses reshape syntax trees, protect string concatenation, and enforce mathematical formulas:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Parentheses Evaluation Control and Safety Diagram"
          >
            <defs>
              <linearGradient id="gradParenMath" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradParenString" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradParenFormula" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Arithmetic Override */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradParenMath)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Arithmetic Override</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">10 + 5 * 2 → 20</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">(10 + 5) * 2 → 30</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">Forces addition before multiply</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Explicit Operator Binding
            </text>

            {/* Box 2: String Concat Protection */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradParenString)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. String Concat Fix</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">&quot;₹&quot; + 10 + 20 → &quot;₹1020&quot; (BUG)</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&quot;₹&quot; + (10 + 20) → &quot;₹30&quot;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Forces numeric addition first</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Prevents Text Glitches
            </text>

            {/* Box 3: Denominator Protection */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradParenFormula)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Denominator Guard</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">d / (2 * a)</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">Without (2*a): d / 2 * a</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Multiplies by a instead of dividing!</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Mathematical Precision
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Zero Performance Cost: The Java compiler optimizes redundant parentheses during AST parsing.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Impact of Parentheses on Expression Evaluation
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Without Parentheses</th>
                <th className="p-3 font-semibold text-rose-400">Default Result (Risk)</th>
                <th className="p-3 font-semibold text-emerald-400">With Defensive Parentheses</th>
                <th className="p-3 font-semibold text-amber-400">Corrected Result &amp; Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">10 + 5 * 2</td>
                <td className="p-3 font-mono text-rose-400">20</td>
                <td className="p-3 font-mono text-emerald-400">(10 + 5) * 2</td>
                <td className="p-3 font-mono text-emerald-400">30 (Addition forced first)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">&quot;Fee: ₹&quot; + 1000 + 500</td>
                <td className="p-3 font-mono text-rose-400">&quot;Fee: ₹1000500&quot;</td>
                <td className="p-3 font-mono text-emerald-400">&quot;Fee: ₹&quot; + (1000 + 500)</td>
                <td className="p-3 font-mono text-emerald-400">&quot;Fee: ₹1500&quot; (Numeric sum)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">100 / 10 * 2</td>
                <td className="p-3 font-mono text-rose-400">20 (Left-to-Right)</td>
                <td className="p-3 font-mono text-emerald-400">100 / (10 * 2)</td>
                <td className="p-3 font-mono text-emerald-400">5 (Denominator grouping)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">1 + 2 &lt;&lt; 2</td>
                <td className="p-3 font-mono text-rose-400">12 (Add beats shift)</td>
                <td className="p-3 font-mono text-emerald-400">1 + (2 &lt;&lt; 2)</td>
                <td className="p-3 font-mono text-emerald-400">9 (Shift forced first)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">(int) 5.5 + 2.5</td>
                <td className="p-3 font-mono text-rose-400">7.5 (Double type)</td>
                <td className="p-3 font-mono text-emerald-400">(int) (5.5 + 2.5)</td>
                <td className="p-3 font-mono text-emerald-400">8 (Cast applies to total)</td>
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
            ParenthesesEvaluationControlDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates arithmetic precedence overrides, String concatenation bug prevention, compound interest calculations, quadratic equation root solvers, and student admission filters in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={parenDemoCode}
          title="ParenthesesEvaluationControlDemo.java"
          highlightLines={[21, 22, 29, 30, 42, 43, 53, 54, 69]}
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
              <span>❌</span> Pitfall 1: Forgetting Parentheses in Division Denominators
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">double root = (-b + Math.sqrt(d)) / 2 * a;</code> divides by 2 and then multiplies the whole quotient by <code className="text-sky-300 font-mono">a</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always enclose denominators in parentheses: <code className="bg-slate-900 px-1 py-0.5 rounded">/ (2 * a)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Defensive Parenthesizing in Boolean Filters
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always wrap compound conditions: <code className="text-emerald-400 font-mono">(isStudent &amp;&amp; isRegistered) || isVIP</code>. It documents developer intent explicitly for all team members.
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
            🤔 <em>&ldquo;Why does `&quot;Result: &quot; + 10 + 20` output &quot;Result: 1020&quot; while `&quot;Result: &quot; + (10 + 20)` outputs &quot;Result: 30&quot;?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Left-to-Right String Concatenation! In the first case, <code className="text-sky-300 font-mono">&quot;Result: &quot; + 10</code> evaluates first, converting <code className="text-emerald-300 font-mono">10</code> to string <code className="text-amber-300 font-mono">&quot;Result: 10&quot;</code>. Then <code className="text-amber-300 font-mono">&quot;Result: 10&quot; + 20</code> appends <code className="text-emerald-300 font-mono">20</code>, resulting in <code className="text-rose-400 font-mono">&quot;Result: 1020&quot;</code>! Parentheses force <code className="text-emerald-300 font-mono">(10 + 20)</code> to evaluate as an integer addition <code className="text-emerald-400 font-bold">30</code> before concatenation!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Parentheses in Java FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 17: Parentheses ( ) for Evaluation Control"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic17_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Parentheses are your most powerful ally in software development. They eliminate ambiguity, prevent severe mathematical calculation defects, and cost zero runtime overhead. In Topic 18, we explore Automatic Type Promotion Rules in Expressions! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
