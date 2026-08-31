import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import precedenceDemoCode from "./topic16_files/OperatorPrecedenceAssociativityDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPrecedence {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-prec {
            animation: glowPrecedence 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Complete Java Operator Precedence &amp; Associativity Master Table
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete 15-tier operator precedence hierarchy: Left-to-Right vs Right-to-Left associativity rules, precedence vs JLS §15.7 evaluation order, common precedence traps (<code className="text-amber-300 font-mono">+</code> vs <code className="text-sky-300 font-mono">&lt;&lt;</code>, <code className="text-rose-400 font-mono">!=</code> vs <code className="text-emerald-300 font-mono">&amp;</code>, <code className="text-sky-300 font-mono">&amp;&amp;</code> vs <code className="text-indigo-400 font-mono">||</code>), and payroll calculations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Operator Precedence vs. Associativity vs. Evaluation Order
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When an expression contains multiple operators, Java applies three fundamental principles:
            <br />
            <strong>1. Precedence:</strong> Determines the binding strength of operators (e.g. <code className="text-emerald-300 font-mono">*</code> binds tighter than <code className="text-sky-300 font-mono">+</code>).
            <br />
            <strong>2. Associativity:</strong> Resolves ties between operators on the same precedence level (most are Left-to-Right; Unary, Ternary, and Assignment are Right-to-Left).
            <br />
            <strong>3. Order of Evaluation (JLS §15.7):</strong> Operands are <em>always evaluated Left-to-Right</em> regardless of operator precedence!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Payroll &amp; Tax Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> debugged a tax calculation formula where writing <code className="text-rose-300 font-mono">basicSalary + allowances * taxRate</code> applied the tax rate exclusively to allowances because multiplication has higher precedence than addition! <strong>Abhronila</strong> and <strong>Debangshu</strong> corrected the expression with explicit parentheses <code className="text-emerald-300 font-mono">(basicSalary + allowances) * taxRate</code>, ensuring accurate payroll deductions in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 15-Tier Precedence Hierarchy &amp; Associativity Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How operators bind from highest to lowest precedence and their associativity directions:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Operator Precedence Hierarchy Diagram"
          >
            <defs>
              <linearGradient id="gradTierHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradTierMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradTierLow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: High Precedence */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradTierHigh)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. High Precedence</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">Postfix: expr++, expr--</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">Unary  : ++, --, +, -, !, ~</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">Multiplicative: *, /, %</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Binds First to Operands
            </text>

            {/* Box 2: Mid Precedence */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradTierMid)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Mid Precedence</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Additive: +, -</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Shift   : &lt;&lt;, &gt;&gt;, &gt;&gt;&gt;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Relational: &lt;, &gt;, ==, !=</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Left-to-Right Associative
            </text>

            {/* Box 3: Low Precedence */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradTierLow)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Low Precedence</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">Bitwise: &amp;, ^, |</text>
            <text x="615" y="122" fill="#fde68a" fontSize="11" fontFamily="monospace">Logical: &amp;&amp;, ||</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Ternary (? :), Assign (=)</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Ternary &amp; Assign: R-to-L
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Memory Rule: Only Unary, Ternary (? :), and Assignment operators associate Right-to-Left!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Master Operator Precedence Table (Level 15 to Level 1)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Level</th>
                <th className="p-3 font-semibold text-emerald-400">Category</th>
                <th className="p-3 font-semibold text-amber-400">Operators</th>
                <th className="p-3 font-semibold text-purple-400">Associativity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">15</td>
                <td className="p-3">Postfix</td>
                <td className="p-3 font-mono text-emerald-400">expr++ expr--</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">14</td>
                <td className="p-3">Primary / Access</td>
                <td className="p-3 font-mono text-emerald-400">( ) [ ] .</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">13</td>
                <td className="p-3">Unary / Prefix</td>
                <td className="p-3 font-mono text-amber-300">++expr --expr + - ! ~ (type)</td>
                <td className="p-3 text-xs text-amber-400 font-bold">Right-to-Left</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">12</td>
                <td className="p-3">Multiplicative</td>
                <td className="p-3 font-mono text-emerald-400">* / %</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">11</td>
                <td className="p-3">Additive</td>
                <td className="p-3 font-mono text-emerald-400">+ -</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">10</td>
                <td className="p-3">Shift</td>
                <td className="p-3 font-mono text-emerald-400">&lt;&lt; &gt;&gt; &gt;&gt;&gt;</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">9</td>
                <td className="p-3">Relational</td>
                <td className="p-3 font-mono text-emerald-400">&lt; &gt; &lt;= &gt;= instanceof</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">8</td>
                <td className="p-3">Equality</td>
                <td className="p-3 font-mono text-emerald-400">== !=</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">7</td>
                <td className="p-3">Bitwise AND</td>
                <td className="p-3 font-mono text-emerald-400">&amp;</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">6</td>
                <td className="p-3">Bitwise XOR</td>
                <td className="p-3 font-mono text-emerald-400">^</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">5</td>
                <td className="p-3">Bitwise OR</td>
                <td className="p-3 font-mono text-emerald-400">|</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">4</td>
                <td className="p-3">Logical AND</td>
                <td className="p-3 font-mono text-emerald-400">&amp;&amp;</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">3</td>
                <td className="p-3">Logical OR</td>
                <td className="p-3 font-mono text-emerald-400">||</td>
                <td className="p-3 text-xs">Left-to-Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">2</td>
                <td className="p-3">Ternary / Cond</td>
                <td className="p-3 font-mono text-amber-300">? :</td>
                <td className="p-3 text-xs text-amber-400 font-bold">Right-to-Left</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">1</td>
                <td className="p-3">Assignment</td>
                <td className="p-3 font-mono text-amber-300">= += -= *= /= %= &amp;= |= ^= &lt;&lt;= &gt;&gt;= &gt;&gt;&gt;=</td>
                <td className="p-3 text-xs text-amber-400 font-bold">Right-to-Left</td>
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
            OperatorPrecedenceAssociativityDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates the additive vs shift precedence trap (<code className="text-amber-300 font-mono">1 + 2 &lt;&lt; 2</code>), relational vs bitwise precedence (<code className="text-emerald-300 font-mono">(flags &amp; MASK) != 0</code>), Right-to-Left associativity, and composite payroll calculations in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={precedenceDemoCode}
          title="OperatorPrecedenceAssociativityDemo.java"
          highlightLines={[22, 23, 34, 41, 48, 54, 58, 70, 71, 72]}
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
              <span>❌</span> Pitfall 1: Assuming Bitwise Operators Bind Tighter Than Comparison
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (flags &amp; MASK != 0)</code> fails compilation because comparison (<code className="text-sky-300 font-mono">!=</code>) has higher precedence than bitwise AND (<code className="text-emerald-300 font-mono">&amp;</code>)!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use parentheses: <code className="bg-slate-900 px-1 py-0.5 rounded">if ((flags &amp; MASK) != 0)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Parentheses Freely for Code Clarity
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Even if you know the exact precedence table, code is written for human engineers. Explicit parentheses eliminate ambiguity and prevent defects during future code maintenance.
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
            🤔 <em>&ldquo;Why does `1 + 2 &lt;&lt; 2` evaluate to 12 rather than 9?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Operator Precedence! In Java&apos;s precedence hierarchy, the Additive operator <code className="text-amber-300 font-mono">+</code> (Level 11) has higher precedence than the Shift operator <code className="text-sky-300 font-mono">&lt;&lt;</code> (Level 10). Therefore, Java groups the expression as <code className="text-emerald-300 font-mono">(1 + 2) &lt;&lt; 2</code>, calculating <code className="text-emerald-300 font-mono">3 &lt;&lt; 2 = 3 * 4 = 12</code>! If you intended <code className="text-rose-400 font-mono">1 + (2 &lt;&lt; 2)</code>, you must use parentheses explicitly!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Operator Precedence FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 16: Operator Precedence & Associativity Table"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic16_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Memorizing the 15 precedence tiers is great for technical interviews, but in professional enterprise software, always use explicit parentheses! It documents mathematical intent and prevents subtle precedence bugs. In Topic 17, we explore Parentheses for Controlling Evaluation Order! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
