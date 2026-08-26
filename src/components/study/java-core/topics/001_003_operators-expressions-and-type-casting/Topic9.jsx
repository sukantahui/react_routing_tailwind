import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import logicalDemoCode from "./topic9_files/LogicalOperatorsDemo.java?raw";
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
          @keyframes glowLogic {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(129, 140, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(129, 140, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-logic {
            animation: glowLogic 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Logical Operators: Logical AND (<code className="text-indigo-400">&amp;&amp;</code>), Logical OR (<code className="text-indigo-400">||</code>), Logical NOT (<code className="text-indigo-400">!</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master boolean algebraic decision logic in Java: truth tables, operator precedence hierarchy (<code className="text-rose-400 font-mono">!</code> &gt; <code className="text-sky-300 font-mono">&amp;&amp;</code> &gt; <code className="text-indigo-400 font-mono">||</code>), refactoring condition trees with De Morgan&apos;s Laws, and student scholarship qualification filters in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Boolean Propositional Logic in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java provides three core logical operators to build composite decision trees:
            <br />
            <strong>Logical AND (<code className="text-sky-300 font-mono">&amp;&amp;</code>):</strong> Evaluates to <code className="text-emerald-400 font-mono">true</code> only when <em>both</em> conditions are true.
            <br />
            <strong>Logical OR (<code className="text-indigo-300 font-mono">||</code>):</strong> Evaluates to <code className="text-emerald-400 font-mono">true</code> when <em>at least one</em> condition is true.
            <br />
            <strong>Logical NOT (<code className="text-rose-300 font-mono">!</code>):</strong> Inverts the boolean truth state.
          </p>
          <p>
            In operator precedence, <code className="text-rose-400 font-mono">!</code> binds with the highest priority, followed by <code className="text-sky-300 font-mono">&amp;&amp;</code>, and finally <code className="text-indigo-300 font-mono">||</code>. Thus, <code className="text-amber-300 font-mono">a || b &amp;&amp; c</code> is strictly evaluated as <code className="text-amber-300 font-mono">a || (b &amp;&amp; c)</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300 space-y-2">
            <p className="font-medium text-indigo-300">Classroom Case Study (Barrackpore Admission Decision Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> created an automated course admission engine. A student qualifies if they have high academic scores AND entrance marks (<code className="text-sky-300 font-mono">academic &gt;= 85 &amp;&amp; entrance &gt;= 90</code>) OR registered under early-bird eligibility (<code className="text-indigo-300 font-mono">earlyBird &amp;&amp; entrance &gt;= 75</code>), allowing <strong>Abhronila</strong> and <strong>Debangshu</strong> to disburse merit scholarships in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Logical Precedence Hierarchy &amp; De Morgan&apos;s Laws Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How precedence determines operator binding and how De Morgan&apos;s laws simplify complex logic:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Logical Operators and Precedence Hierarchy Diagram"
          >
            <defs>
              <linearGradient id="gradAnd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradOr" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="gradDeMorgan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Precedence Hierarchy */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradAnd)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Precedence: ! &gt; &amp;&amp; &gt; ||</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">a || b &amp;&amp; c</text>
            <text x="55" y="122" fill="#e0f2fe" fontSize="10">&rarr; Grouped as: a || (b &amp;&amp; c)</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">&amp;&amp; binds tighter than ||</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Always use ( ) for clarity!
            </text>

            {/* Box 2: Truth Conditions */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradOr)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Truth Evaluation</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#1e1b4b" />
            <text x="335" y="102" fill="#c7d2fe" fontSize="11" fontFamily="monospace">T &amp;&amp; T &rarr; true</text>
            <text x="335" y="122" fill="#c7d2fe" fontSize="11" fontFamily="monospace">F &amp;&amp; T &rarr; false</text>
            <text x="335" y="142" fill="#c7d2fe" fontSize="11" fontFamily="monospace">F || T &rarr; true</text>
            <text x="440" y="190" fill="#e0e7ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Conjunction vs Disjunction
            </text>

            {/* Box 3: De Morgan's Laws */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradDeMorgan)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. De Morgan&apos;s Laws</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">!(A &amp;&amp; B) == (!A || !B)</text>
            <text x="615" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">!(A || B) == (!A &amp;&amp; !B)</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Simplifies negative condition trees</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Mathematical Refactoring
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Strict Type Safety: Operands of `&amp;&amp;`, `||`, and `!` MUST be booleans (no C-style `1 &amp;&amp; 0`).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Complete Truth Table Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operand A</th>
                <th className="p-3 font-semibold text-sky-400">Operand B</th>
                <th className="p-3 font-semibold text-emerald-400">Logical AND (A &amp;&amp; B)</th>
                <th className="p-3 font-semibold text-indigo-400">Logical OR (A || B)</th>
                <th className="p-3 font-semibold text-rose-400">Logical NOT (!A)</th>
                <th className="p-3 font-semibold text-amber-400">Boolean XOR (A ^ B)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-indigo-300 font-bold">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-amber-400">false</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400 font-bold">false</td>
                <td className="p-3 font-mono text-indigo-300 font-bold">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-amber-400">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-rose-400 font-bold">false</td>
                <td className="p-3 font-mono text-indigo-300 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-amber-400">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400 font-bold">false</td>
                <td className="p-3 font-mono text-rose-400 font-bold">false</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-amber-400">false</td>
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
            LogicalOperatorsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates truth table evaluations, operator precedence (<code className="text-rose-400 font-mono">!</code> &gt; <code className="text-sky-300 font-mono">&amp;&amp;</code> &gt; <code className="text-indigo-300 font-mono">||</code>), verification of De Morgan&apos;s Laws, and student scholarship qualification in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={logicalDemoCode}
          title="LogicalOperatorsDemo.java"
          highlightLines={[21, 22, 28, 29, 39, 40, 48, 49, 51, 52, 64, 65, 66]}
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
              <span>❌</span> Pitfall 1: Assuming || and &amp;&amp; Have Equal Precedence
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">isVIP || hasTicket &amp;&amp; isMember</code> assumes left-to-right evaluation, but Java will evaluate <code className="text-sky-300 font-mono">hasTicket &amp;&amp; isMember</code> first because <code className="text-sky-300 font-mono">&amp;&amp;</code> has higher precedence than <code className="text-indigo-300 font-mono">||</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use explicit parentheses: <code className="bg-slate-900 px-1 py-0.5 rounded">(isVIP || hasTicket) &amp;&amp; isMember</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use De Morgan&apos;s Laws to Improve Readability
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Instead of writing confusing nested negative conditions like <code className="text-rose-300 font-mono">!(!isValid || !isApproved)</code>, refactor it into clean, positive logic: <code className="text-emerald-400 font-mono">isValid &amp;&amp; isApproved</code>.
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
            🤔 <em>&ldquo;Why does `true || false &amp;&amp; false` evaluate to true, but `(true || false) &amp;&amp; false` evaluates to false?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Operator Precedence! In Java, <code className="text-sky-300 font-mono">&amp;&amp;</code> (Logical AND) has higher precedence than <code className="text-indigo-300 font-mono">||</code> (Logical OR). Therefore, <code className="text-sky-300 font-mono">false &amp;&amp; false</code> evaluates first to <code className="text-rose-400 font-mono">false</code>, and then <code className="text-emerald-400 font-mono">true || false</code> yields <code className="text-emerald-400 font-mono">true</code>! In the second case, parentheses override the default precedence.
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Logical Operators FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 9: Logical Operators (&&, ||, !)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic9_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Logical operators form the logic pathways of every application. Always remember the precedence hierarchy (! > && > ||) and use parentheses freely to make your business rules unambiguous. In Topic 10, we will explore Short-Circuit Evaluation and its side-effects! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
