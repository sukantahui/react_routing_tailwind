import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ternaryDemoCode from "./topic15_files/TernaryOperatorDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowTernary {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(129, 140, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(129, 140, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ternary {
            animation: glowTernary 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 15
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Ternary / Conditional Operator (<code className="text-indigo-400">? :</code>) &amp; Nested Expressions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master inline conditional decision making: ternary syntax (<code className="text-sky-300 font-mono">cond ? trueExpr : falseExpr</code>), short-circuit branch safety, type unification &amp; Binary Numeric Promotion (JLS §15.25), wrapper unboxing <code className="text-rose-400 font-mono">NullPointerException</code> traps, multi-tier nested ternary grading, and fee discounts in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of the Ternary Operator in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <strong>Ternary Operator</strong> (<code className="text-indigo-400 font-mono">? :</code>) is Java&apos;s only 3-operand operator. It evaluates a boolean condition and yields one of two expressions:
          </p>
          <p>
            <code className="text-emerald-300 font-mono">variable = (condition) ? expressionIfTrue : expressionIfFalse;</code>
          </p>
          <p>
            <strong>Short-Circuit Guarantee:</strong> Only the selected branch is evaluated at runtime; the unselected branch is completely bypassed.
            <br />
            <strong>Type Unification:</strong> The type of the ternary expression is resolved at compile-time. If one branch is <code className="text-sky-300 font-mono">int</code> and the other is <code className="text-emerald-300 font-mono">double</code>, the entire expression promotes to <code className="text-emerald-300 font-mono">double</code> (e.g. <code className="text-amber-300 font-mono">true ? 10 : 20.5</code> yields <code className="text-emerald-300 font-mono">10.0</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300 space-y-2">
            <p className="font-medium text-indigo-300">Classroom Case Study (Barrackpore Merit Rebate Tree):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a student tuition rebate pipeline in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By nesting ternary expressions with clean multi-line indentation, <strong>Abhronila</strong> and <strong>Debangshu</strong> calculated tiered scholarships (25% for full scholarship, 15% for scores &gt;= 80%, 0% standard) across Naihati and Shyamnagar with zero boilerplate <code className="text-sky-300 font-mono">if-else</code> code.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Ternary Decision Flow &amp; Type Promotion Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How ternary operators branch conditionally, promote numeric types, and evaluate nested expressions:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Ternary Operator and Branch Evaluation Diagram"
          >
            <defs>
              <linearGradient id="gradTernaryFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="gradPromoteTern" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradNestedTern" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Syntax & Short-Circuit */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradTernaryFlow)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Syntax &amp; Short-Circuit</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#1e1b4b" />
            <text x="55" y="102" fill="#c7d2fe" fontSize="11" fontFamily="monospace">cond ? expr1 : expr2;</text>
            <text x="55" y="122" fill="#e0e7ff" fontSize="10">If TRUE  &rarr; Evaluates expr1</text>
            <text x="55" y="142" fill="#e0e7ff" fontSize="10">If FALSE &rarr; Evaluates expr2</text>
            <text x="160" y="190" fill="#e0e7ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Unselected Branch Skipped
            </text>

            {/* Box 2: Numeric Type Promotion */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradPromoteTern)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Type Promotion (JLS §15.25)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">true ? 10 : 20.5</text>
            <text x="335" y="122" fill="#e0f2fe" fontSize="10">int (10) vs double (20.5)</text>
            <text x="335" y="142" fill="#e0f2fe" fontSize="10">&rarr; Promotes to DOUBLE: 10.0</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Binary Numeric Promotion
            </text>

            {/* Box 3: Clean Nested Ternary */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradNestedTern)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Clean Multi-Line Nesting</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">(m &gt;= 90) ? &quot;A+&quot;</text>
            <text x="615" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">: (m &gt;= 75) ? &quot;A&quot;</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="11" fontFamily="monospace">: &quot;F&quot;;</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Readable Decision Ladder
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Right-to-Left Associativity: `a ? b : c ? d : e` evaluates as `a ? b : (c ? d : e)`.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Ternary Type Resolution Rules Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Branch 1 Type</th>
                <th className="p-3 font-semibold text-sky-400">Branch 2 Type</th>
                <th className="p-3 font-semibold text-emerald-400">Resulting Expression Type</th>
                <th className="p-3 font-semibold text-slate-400">JLS Type Unification Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">int (e.g. 10)</td>
                <td className="p-3 font-mono text-emerald-400">int (e.g. 20)</td>
                <td className="p-3 font-mono text-emerald-400">int</td>
                <td className="p-3 text-xs">Identical primitive types preserve type</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">int (e.g. 10)</td>
                <td className="p-3 font-mono text-emerald-400">double (e.g. 20.5)</td>
                <td className="p-3 font-mono text-amber-300">double (10.0)</td>
                <td className="p-3 text-xs">Binary numeric promotion widens int to double</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">byte (e.g. 5)</td>
                <td className="p-3 font-mono text-emerald-400">byte (e.g. 10)</td>
                <td className="p-3 font-mono text-emerald-400">byte</td>
                <td className="p-3 text-xs">Identical narrow types preserve byte</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">String (&quot;Active&quot;)</td>
                <td className="p-3 font-mono text-emerald-400">null</td>
                <td className="p-3 font-mono text-indigo-300">String</td>
                <td className="p-3 text-xs">null adopts the reference type of the other branch</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">Integer (100)</td>
                <td className="p-3 font-mono text-emerald-400">Double (null)</td>
                <td className="p-3 font-mono text-rose-400">double (Throws NPE if null!)</td>
                <td className="p-3 text-xs">Mixed wrapper types force primitive unboxing</td>
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
            TernaryOperatorDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates ternary syntax, short-circuit branch safety, type promotion (<code className="text-amber-300 font-mono">int</code> vs <code className="text-emerald-300 font-mono">double</code>), wrapper unboxing <code className="text-rose-400 font-mono">NullPointerException</code> traps, and tiered tuition discount trees in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={ternaryDemoCode}
          title="TernaryOperatorDemo.java"
          highlightLines={[21, 29, 36, 40, 48, 58, 59, 64, 76, 77, 78, 86, 87]}
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
              <span>❌</span> Pitfall 1: Mixing Primitive and Null Wrapper Objects in Branches
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">double val = flag ? 1.0 : (Double) null;</code> causes the JVM to unbox the <code className="text-rose-300 font-mono">Double</code> to primitive <code className="text-rose-300 font-mono">double</code>, crashing with <code className="text-rose-400 font-mono">NullPointerException</code> when <code className="text-rose-300 font-mono">flag</code> is false!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Multi-Line Formatting for Nested Ternaries
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never cram 3 nested ternaries on a single line. Align colons vertically on separate lines for crystal-clear readability:
              <br />
              <code className="text-emerald-300 font-mono block bg-slate-900/80 p-2 rounded mt-1">
                String tier = (score &gt;= 90) ? &quot;A+&quot;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: (score &gt;= 75) ? &quot;A&quot;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &quot;B&quot;;
              </code>
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
            🤔 <em>&ldquo;Why does `Number n = true ? 10 : 20.5;` evaluate to 10.0 (a Double object) rather than an Integer?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Binary Numeric Promotion! Under JLS §15.25, the compiler determines the static type of the entire conditional expression before runtime. Because one branch is <code className="text-sky-300 font-mono">int</code> and the other is <code className="text-emerald-300 font-mono">double</code>, the compiler promotes the expression to primitive <code className="text-emerald-300 font-mono">double</code>. The integer <code className="text-sky-300 font-mono">10</code> is converted to <code className="text-emerald-300 font-mono">10.0</code>, which is autoboxed into a <code className="text-emerald-400 font-bold">Double</code> object!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Ternary Operator FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 15: Ternary / Conditional Operator (? :)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic15_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The ternary operator is perfect for concise variable initialization, defensive defaults, and inline return statements. Remember to keep nested ternaries formatted across multiple lines and watch out for numeric type promotion widening integers to doubles! In Topic 16, we explore the Master Operator Precedence & Associativity Table! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
