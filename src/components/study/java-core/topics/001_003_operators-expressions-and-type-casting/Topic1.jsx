import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import arithmeticDemoCode from "./topic1_files/ArithmeticOperatorsDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMath {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-math {
            animation: glowMath 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Arithmetic Operators: <code className="text-emerald-400">+</code>, <code className="text-emerald-400">-</code>, <code className="text-emerald-400">*</code>, <code className="text-emerald-400">/</code>, <code className="text-emerald-400">%</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the mathematical foundation of Java: integer division truncation, floating-point arithmetic, the modulus (<code className="text-emerald-300 font-mono">%</code>) dividend sign rule, division by zero behaviors (<code className="text-rose-400 font-mono">ArithmeticException</code> vs <code className="text-sky-300 font-mono">Infinity</code>), and Indian Rupee (₹) cash denomination algorithms.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Mathematical Computation in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java provides five standard binary arithmetic operators: <strong>Addition</strong> (<code className="text-emerald-300 font-mono">+</code>), <strong>Subtraction</strong> (<code className="text-emerald-300 font-mono">-</code>), <strong>Multiplication</strong> (<code className="text-emerald-300 font-mono">*</code>), <strong>Division</strong> (<code className="text-emerald-300 font-mono">/</code>), and <strong>Modulus/Remainder</strong> (<code className="text-emerald-300 font-mono">%</code>).
          </p>
          <p>
            Key behaviors distinguish Java arithmetic: integer division (<code className="text-amber-300 font-mono">5 / 2</code>) truncates decimals to produce <code className="text-amber-300 font-mono">2</code>, the remainder of <code className="text-emerald-300 font-mono">a % b</code> strictly retains the sign of dividend <code className="text-emerald-300 font-mono">a</code>, and floating-point division by zero yields <code className="text-sky-300 font-mono">Double.POSITIVE_INFINITY</code> without crashing the application.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Cash Counter):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore center, <strong>Swadeep</strong> and <strong>Tuhina</strong> engineered an automated cash denomination counter for tuition fee collections in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By pairing integer division (<code className="text-sky-300 font-mono">count = remaining / noteValue;</code>) with modulus arithmetic (<code className="text-purple-300 font-mono">remaining = remaining % noteValue;</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> disbursed currency notes with zero calculation discrepancies.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Modulus Dividend Sign Rule &amp; Division by Zero Mechanics
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the dividend determines remainder signs and how the JVM handles zero division:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Arithmetic Operators and Modulus Rules Diagram"
          >
            <defs>
              <linearGradient id="gradMod" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="gradDiv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Left Box: Modulus Sign Rules */}
            <rect x="30" y="40" width="395" height="180" rx="10" fill="url(#gradMod)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="227" y="65" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              1. Modulus Sign Rule (a % b)
            </text>
            <rect x="50" y="80" width="355" height="90" rx="6" fill="#1e1b4b" />
            <text x="60" y="105" fill="#c7d2fe" fontSize="12" fontFamily="monospace">
              +10 %  3  =  +1  (Dividend +10 &rarr; Positive)
            </text>
            <text x="60" y="125" fill="#fca5a5" fontSize="12" fontFamily="monospace">
              -10 %  3  =  -1  (Dividend -10 &rarr; Negative)
            </text>
            <text x="60" y="145" fill="#c7d2fe" fontSize="12" fontFamily="monospace">
              +10 % -3  =  +1  (Divisor sign ignored!)
            </text>
            <text x="227" y="195" fill="#e0e7ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Rule: Result sign ALWAYS matches left operand &apos;a&apos;!
            </text>

            {/* Right Box: Division by Zero */}
            <rect x="455" y="40" width="395" height="180" rx="10" fill="url(#gradDiv)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="652" y="65" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              2. Division by Zero Semantics
            </text>
            <rect x="475" y="80" width="355" height="90" rx="6" fill="#451a03" />
            <text x="485" y="105" fill="#fca5a5" fontSize="11" fontFamily="monospace">
              10 / 0    &rarr; ArithmeticException: / by zero
            </text>
            <text x="485" y="125" fill="#a7f3d0" fontSize="11" fontFamily="monospace">
              10.0 / 0.0 &rarr; Double.POSITIVE_INFINITY
            </text>
            <text x="485" y="145" fill="#fde68a" fontSize="11" fontFamily="monospace">
              0.0 / 0.0  &rarr; Double.NaN (Not-a-Number)
            </text>
            <text x="652" y="195" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Integer = Exception | Floating = IEEE 754 Infinity/NaN
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Formula: a % b = a - (a / b) * b | Native float/double modulus: 7.5 % 2.0 = 1.5
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Arithmetic Operator Behavior Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operator</th>
                <th className="p-3 font-semibold text-emerald-400">Name</th>
                <th className="p-3 font-semibold text-amber-400">Integer Example</th>
                <th className="p-3 font-semibold text-purple-400">Floating Example</th>
                <th className="p-3 font-semibold text-slate-400">Key Architectural Nuance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">+</td>
                <td className="p-3">Addition</td>
                <td className="p-3 font-mono text-emerald-400">10 + 5 &rarr; 15</td>
                <td className="p-3 font-mono text-purple-300">10.5 + 2.5 &rarr; 13.0</td>
                <td className="p-3 text-xs">Overloaded for String concatenation when either operand is String</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">-</td>
                <td className="p-3">Subtraction</td>
                <td className="p-3 font-mono text-emerald-400">20 - 7 &rarr; 13</td>
                <td className="p-3 font-mono text-purple-300">15.0 - 4.5 &rarr; 10.5</td>
                <td className="p-3 text-xs">Also serves as unary negation operator <code className="text-amber-300">-x</code></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">*</td>
                <td className="p-3">Multiplication</td>
                <td className="p-3 font-mono text-emerald-400">6 * 7 &rarr; 42</td>
                <td className="p-3 font-mono text-purple-300">2.5 * 4.0 &rarr; 10.0</td>
                <td className="p-3 text-xs">Check overflow using <code className="text-emerald-400">Math.multiplyExact()</code></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">/</td>
                <td className="p-3">Division</td>
                <td className="p-3 font-mono text-emerald-400">7 / 2 &rarr; 3</td>
                <td className="p-3 font-mono text-purple-300">7.0 / 2.0 &rarr; 3.5</td>
                <td className="p-3 text-xs">Integer division truncates decimals; floating division yields exact fraction</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">%</td>
                <td className="p-3">Modulus</td>
                <td className="p-3 font-mono text-emerald-400">14 % 4 &rarr; 2</td>
                <td className="p-3 font-mono text-purple-300">7.5 % 2.0 &rarr; 1.5</td>
                <td className="p-3 text-xs">Sign follows dividend; native floating-point support</td>
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
            ArithmeticOperatorsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates all 5 arithmetic operators, modulus sign rules, floating-point remainder computations, division by zero exception handling, and an Indian Rupee (₹) cash denomination algorithm.
        </p>

        <JavaFileLoader
          fileModule={arithmeticDemoCode}
          title="ArithmeticOperatorsDemo.java"
          highlightLines={[21, 22, 23, 24, 25, 30, 31, 32, 33, 40, 41, 48, 54, 55, 56, 68, 69]}
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
              <span>❌</span> Pitfall 1: Unintended Integer Division Truncation
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">double ratio = 1 / 2;</code> assigns <code className="text-amber-300 font-mono">0.0</code> instead of <code className="text-emerald-400 font-mono">0.5</code> because the integer division <code className="text-rose-300 font-mono">1 / 2</code> executes first as integer arithmetic.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Make at least one operand floating point: <code className="bg-slate-900 px-1 py-0.5 rounded">double ratio = 1.0 / 2;</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">(double) a / b</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Checking Odd Numbers with (n % 2 == 1) Trap
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              For negative odd integers (e.g. <code className="text-rose-300 font-mono">-5</code>), <code className="text-rose-300 font-mono">-5 % 2</code> evaluates to <code className="text-rose-400 font-mono">-1</code> (not <code className="text-emerald-300 font-mono">1</code>), causing <code className="text-rose-300 font-mono">n % 2 == 1</code> to incorrectly return <code className="text-rose-400 font-mono">false</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always check for non-zero remainder: <code className="bg-slate-900 px-1 py-0.5 rounded">boolean isOdd = (n % 2 != 0);</code>.
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
            🤔 <em>&ldquo;Why does `10 / 0` crash with an ArithmeticException, but `10.0 / 0.0` smoothly returns `Infinity` without any exception?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Hardware IEEE 754 standard! Floating-point arithmetic is designed for scientific computing where special values (<code className="text-sky-300 font-mono">Infinity</code>, <code className="text-amber-300 font-mono">NaN</code>) allow long simulation loops to continue without abrupt crashes, whereas integer CPU units have no bit representation for integer infinity!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Arithmetic Operators FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 1: Arithmetic Operators"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Arithmetic operators are fundamental to everyday software engineering. Always remember the Dividend Sign Rule in modulus (`a % b`) and write odd checks as `n % 2 != 0` so negative numbers are handled gracefully. In Topic 2, we will explore integer division truncation and precision casting! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
