import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import divisionDemoCode from "./topic2_files/DivisionTruncationVsFloatDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseDiv {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-div {
            animation: pulseDiv 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Integer Division Truncation vs. Floating-Point Division
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand how the JVM executes division: integer truncation towards zero (<code className="text-sky-300 font-mono">idiv</code>), floating-point precision (<code className="text-emerald-300 font-mono">ddiv</code>), avoiding the infamous <code className="text-rose-400 font-mono">double d = 7 / 2;</code> trap, Java 8 <code className="text-amber-300 font-mono">Math.floorDiv()</code>, and calculating student exam averages in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of Division in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, the division operator (<code className="text-sky-300 font-mono">/</code>) is polymorphic based on operand data types. When both operands are integer types (<code className="text-sky-300 font-mono">int</code>, <code className="text-sky-300 font-mono">long</code>, <code className="text-sky-300 font-mono">byte</code>, <code className="text-sky-300 font-mono">short</code>), Java executes <strong>integer division</strong>, discarding the fractional remainder.
          </p>
          <p>
            The most common beginner mistake is writing <code className="text-rose-400 font-mono">double avg = (m1 + m2 + m3) / 3;</code>. Because <code className="text-sky-300 font-mono">/ 3</code> is an integer literal, integer truncation occurs <em>before</em> the value is assigned to the double variable, permanently losing decimal accuracy.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Academic Scoring):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> calculated course percentages across three subjects for students in Naihati and Shyamnagar. By switching from <code className="text-rose-300 font-mono">/ 3</code> to <code className="text-emerald-300 font-mono">/ 3.0</code>, <strong>Abhronila</strong> and <strong>Debangshu</strong> preserved decimal percentages (e.g. <code className="text-emerald-400 font-semibold">85.67%</code> instead of <code className="text-amber-400 font-semibold">85.00%</code>) and computed hourly tuition fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) with total accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Integer Truncation vs. Floating-Point Precision Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How operand types determine whether the JVM truncates towards zero or computes exact decimal quotients:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Integer Division Truncation vs Float Division Diagram"
          >
            <defs>
              <linearGradient id="gradIntDiv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradFloatDiv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradFloorDiv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>

            {/* Box 1: Integer Division (idiv) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradIntDiv)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Integer Division (idiv)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="105" fill="#fca5a5" fontSize="12" fontFamily="monospace">int a = 7 / 2; // → 3</text>
            <text x="55" y="125" fill="#fca5a5" fontSize="12" fontFamily="monospace">double d = 7 / 2; // → 3.0</text>
            <text x="55" y="145" fill="#fecdd3" fontSize="10">0.5 is truncated towards 0</text>
            <text x="160" y="195" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Truncation happens BEFORE assignment!
            </text>

            {/* Box 2: Floating Division (ddiv) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradFloatDiv)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Float Division (ddiv)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="105" fill="#a7f3d0" fontSize="12" fontFamily="monospace">7.0 / 2 → 3.5</text>
            <text x="335" y="125" fill="#a7f3d0" fontSize="12" fontFamily="monospace">(double) 7 / 2 → 3.5</text>
            <text x="335" y="145" fill="#d1fae5" fontSize="10">Binary promotion preserves decimals</text>
            <text x="440" y="195" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Accurate Decimal Fraction
            </text>

            {/* Box 3: Floor Division (Math.floorDiv) */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradFloorDiv)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Math.floorDiv()</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#1e1b4b" />
            <text x="615" y="105" fill="#c7d2fe" fontSize="12" fontFamily="monospace">-7 / 2 → -3 (Truncation)</text>
            <text x="615" y="125" fill="#fde68a" fontSize="12" fontFamily="monospace">floorDiv(-7, 2) → -4</text>
            <text x="615" y="145" fill="#e0e7ff" fontSize="10">Floors toward negative infinity</text>
            <text x="720" y="195" fill="#e0e7ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Java 8+ Algebraic Floor Math
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Golden Rule: Cast BEFORE division `(double) a / b` &mdash; NOT after `(double)(a / b)`!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Truncation vs. Floor vs. Ceil vs. Round Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operation / Method</th>
                <th className="p-3 font-semibold text-emerald-400">Positive (+3.75)</th>
                <th className="p-3 font-semibold text-rose-400">Negative (-3.75)</th>
                <th className="p-3 font-semibold text-amber-400">Return Type</th>
                <th className="p-3 font-semibold text-slate-400">Rounding Direction / Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Integer Division / (int)</td>
                <td className="p-3 font-mono text-emerald-400">3</td>
                <td className="p-3 font-mono text-rose-400">-3</td>
                <td className="p-3 font-mono">int / long</td>
                <td className="p-3 text-xs">Truncates fractional part towards zero</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Math.floor()</td>
                <td className="p-3 font-mono text-emerald-400">3.0</td>
                <td className="p-3 font-mono text-rose-400">-4.0</td>
                <td className="p-3 font-mono">double</td>
                <td className="p-3 text-xs">Rounds down towards negative infinity</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Math.ceil()</td>
                <td className="p-3 font-mono text-emerald-400">4.0</td>
                <td className="p-3 font-mono text-rose-400">-3.0</td>
                <td className="p-3 font-mono">double</td>
                <td className="p-3 text-xs">Rounds up towards positive infinity</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Math.round()</td>
                <td className="p-3 font-mono text-emerald-400">4</td>
                <td className="p-3 font-mono text-rose-400">-4</td>
                <td className="p-3 font-mono">long (or int)</td>
                <td className="p-3 text-xs">Standard mathematical half-up rounding to nearest integer</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Math.floorDiv(a, b)</td>
                <td className="p-3 font-mono text-emerald-400">3</td>
                <td className="p-3 font-mono text-rose-400">-4</td>
                <td className="p-3 font-mono">int / long</td>
                <td className="p-3 text-xs">Algebraic floor division for calendar and clock algorithms</td>
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
            DivisionTruncationVsFloatDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates integer division truncation, casting strategies for floating-point accuracy, negative number division with <code className="text-amber-300 font-mono">Math.floorDiv()</code>, and student examination percentage calculations in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={divisionDemoCode}
          title="DivisionTruncationVsFloatDemo.java"
          highlightLines={[20, 21, 22, 23, 24, 33, 35, 42, 43, 58, 61, 64]}
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
              <span>❌</span> Pitfall 1: Casting After Integer Division (double)(a / b)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">double res = (double)(7 / 2);</code> first evaluates <code className="text-amber-300 font-mono">7 / 2</code> as integer division (<code className="text-amber-300 font-mono">3</code>) and then casts <code className="text-amber-300 font-mono">3</code> to <code className="text-rose-300 font-mono">3.0</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Cast before division: <code className="bg-slate-900 px-1 py-0.5 rounded">double res = (double) 7 / 2;</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">7.0 / 2</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use BigDecimal for Financial Division
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When calculating installment splits or tax apportionments in Indian Rupees (₹), standard floating-point division can produce floating-point precision artifacts.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Enterprise Idiom:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded">fee.divide(months, 2, RoundingMode.HALF_UP)</code>.
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
            🤔 <em>&ldquo;Why does `1 / 3 * 3` evaluate to 0, but `1.0 / 3 * 3` evaluates to 1.0?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Left-to-Right evaluation! In the first case, <code className="text-rose-300 font-mono">1 / 3</code> executes first as integer division, truncating to <code className="text-amber-300 font-mono">0</code>. Then <code className="text-sky-300 font-mono">0 * 3</code> is <code className="text-emerald-400 font-mono">0</code>. In the second case, <code className="text-emerald-300 font-mono">1.0 / 3</code> preserves the decimal fraction (<code className="text-emerald-300 font-mono">0.33333...</code>), which multiplied by <code className="text-sky-300 font-mono">3</code> restores <code className="text-emerald-400 font-mono">1.0</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Division Truncation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 2: Division Truncation vs Float Division"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Never let integer division truncate your decimal percentages. Whenever you calculate averages or financial ratios, make sure at least one operand is a floating-point literal (like `3.0`). In Topic 3, we explore the Modulus operator with positive, negative, and floating-point numbers! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
