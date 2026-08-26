import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import shortCircuitDemoCode from "./topic10_files/ShortCircuitEvaluationDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowShortCircuit {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-sc {
            animation: glowShortCircuit 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Short-Circuit Evaluation in <code className="text-sky-400">&amp;&amp;</code> and <code className="text-sky-400">||</code> Operators &amp; Side-Effects
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the defensive power and hidden hazards of short-circuiting: null-guard patterns (<code className="text-emerald-300 font-mono">obj != null &amp;&amp; obj.isValid()</code>), avoiding <code className="text-rose-400 font-mono">NullPointerException</code>, short-circuit (<code className="text-sky-300 font-mono">&amp;&amp;</code>, <code className="text-sky-300 font-mono">||</code>) vs eager (<code className="text-amber-300 font-mono">&amp;</code>, <code className="text-amber-300 font-mono">|</code>) evaluation, skipped side-effects (<code className="text-rose-400 font-mono">++counter</code>), and payment verification in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> How Short-Circuit Evaluation Works
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Short-Circuit Evaluation</strong> is an optimization where the JVM stops evaluating an expression as soon as the final outcome is mathematically guaranteed:
          </p>
          <p>
            <strong>In <code className="text-sky-300 font-mono">&amp;&amp;</code> (AND):</strong> If the left operand is <code className="text-rose-400 font-mono">false</code>, the entire expression must be false, so the right operand is <strong>never evaluated</strong>.
            <br />
            <strong>In <code className="text-indigo-300 font-mono">||</code> (OR):</strong> If the left operand is <code className="text-emerald-400 font-mono">true</code>, the entire expression must be true, so the right operand is <strong>never evaluated</strong>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Fee Transaction Guard):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> discovered a critical bug where writing <code className="text-rose-300 font-mono">if (isScholarship || processFeePayment(15000))</code> skipped processing student payments in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) whenever the scholarship flag was true! <strong>Abhronila</strong> and <strong>Debangshu</strong> refactored the logic to execute transactions separately, ensuring 100% accurate financial auditing across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Short-Circuit Guard vs. Eager Evaluation Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How short-circuiting protects against crashes and how eager evaluation forces dual execution:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Short Circuit vs Eager Evaluation Diagram"
          >
            <defs>
              <linearGradient id="gradSafeSC" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradEagerNPE" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradSideEffect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Short-Circuit && (Null Guard) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradSafeSC)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Safe Guard (&amp;&amp;)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">s != null &amp;&amp; s.isPaid()</text>
            <text x="55" y="122" fill="#d1fae5" fontSize="10">s is null &rarr; Left is FALSE</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Right side is SKIPPED!</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ 100% NPE Immune
            </text>

            {/* Box 2: Eager & (NPE Trap!) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradEagerNPE)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Eager Operator (&amp;)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">s != null &amp; s.isPaid()</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">Evaluates BOTH sides!</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">Calls isPaid() on NULL!</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✗ Crashes with NPE!
            </text>

            {/* Box 3: Skipped Side-Effects */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradSideEffect)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Skipped Side-Effects</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">false &amp;&amp; (++x &gt; 0)</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">&rarr; ++x is NEVER executed!</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">&rarr; x remains unchanged!</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Avoid Side-Effects in Logic
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Bytecode Implementation: `ifeq` branches past right operand on false; `ifne` branches on true.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Short-Circuit vs. Eager Operator Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operator</th>
                <th className="p-3 font-semibold text-emerald-400">Name</th>
                <th className="p-3 font-semibold text-amber-400">Short-Circuit Behavior</th>
                <th className="p-3 font-semibold text-slate-400">Primary Industry Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&amp;&amp;</td>
                <td className="p-3">Conditional AND</td>
                <td className="p-3 text-emerald-400 font-mono">Skips right operand if left is FALSE</td>
                <td className="p-3 text-xs">Defensive null checks, array bounds guards, division checks</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">||</td>
                <td className="p-3">Conditional OR</td>
                <td className="p-3 text-emerald-400 font-mono">Skips right operand if left is TRUE</td>
                <td className="p-3 text-xs">Cache-first checks, fallback permissions, default value guards</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-amber-300">&amp;</td>
                <td className="p-3">Logical / Bitwise AND</td>
                <td className="p-3 text-rose-400 font-mono">ALWAYS evaluates both operands</td>
                <td className="p-3 text-xs">Bitmasking on integers; multi-validator sweeps where all rules run</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-amber-300">|</td>
                <td className="p-3">Logical / Bitwise OR</td>
                <td className="p-3 text-rose-400 font-mono">ALWAYS evaluates both operands</td>
                <td className="p-3 text-xs">Bitmasking on integers; comprehensive flag aggregation</td>
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
            ShortCircuitEvaluationDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates defensive null guards with <code className="text-sky-300 font-mono">&amp;&amp;</code>, division-by-zero guards, side-effect traps where increments and payments are bypassed, and enterprise payment transaction decoupling in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={shortCircuitDemoCode}
          title="ShortCircuitEvaluationDemo.java"
          highlightLines={[22, 23, 29, 38, 45, 50, 56, 61, 72, 73, 80, 81]}
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
              <span>❌</span> Pitfall 1: Accidental Use of Single &amp; in Null-Guards
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (user != null &amp; user.isAdmin())</code> compiles cleanly but crashes in production with <code className="text-rose-400 font-mono">NullPointerException</code> because the single <code className="text-amber-300 font-mono">&amp;</code> eagerly invokes <code className="text-rose-300 font-mono">isAdmin()</code> on a null reference!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use double <code className="bg-slate-900 px-1 py-0.5 rounded">&amp;&amp;</code> for null and range guards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Separate State Modification from Conditions
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never invoke database writes or payment processing inside <code className="text-sky-300 font-mono">if</code> conditions. Execute the action explicitly beforehand: <code className="text-emerald-400 font-mono">boolean success = processPayment(); if (isVIP || success)</code>.
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
            🤔 <em>&ldquo;Why does `false &amp;&amp; (++x &gt; 0)` leave x at 0, while `false &amp; (++x &gt; 0)` increments x to 1?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Short-Circuit vs Eager Evaluation! With <code className="text-sky-300 font-mono">&amp;&amp;</code>, the left operand <code className="text-rose-400 font-mono">false</code> guarantees the whole expression is false, so the JVM uses an <code className="text-amber-300 font-mono">ifeq</code> instruction to jump completely past the right operand code, skipping <code className="text-rose-300 font-mono">++x</code>. The single <code className="text-amber-300 font-mono">&amp;</code> is an eager operator that evaluates both expressions unconditionally!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Short-Circuit Evaluation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 10: Short-Circuit Evaluation & Side-Effects"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Short-circuiting is your primary defense against NullPointerExceptions and division-by-zero crashes. Remember to always place cheap, defensive checks on the left, and never put methods with side-effects inside if conditions! In Topic 11, we explore Bitwise Operators (&, |, ^, ~)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
