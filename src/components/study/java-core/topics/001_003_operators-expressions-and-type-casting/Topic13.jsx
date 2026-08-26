import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compoundDemoCode from "./topic13_files/CompoundAssignmentOperatorsDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowCompound {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-compound {
            animation: glowCompound 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Compound Assignment Operators: <code className="text-emerald-400">+=</code>, <code className="text-emerald-400">-=</code>, <code className="text-emerald-400">*=</code>, <code className="text-emerald-400">/=</code>, <code className="text-emerald-400">%=</code>, <code className="text-emerald-400">&amp;=</code>, <code className="text-emerald-400">|=</code>, <code className="text-emerald-400">^=</code>, <code className="text-emerald-400">&lt;&lt;=</code>, <code className="text-emerald-400">&gt;&gt;=</code>, <code className="text-emerald-400">&gt;&gt;&gt;=</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master Java&apos;s 11 compound assignment operators: JLS §15.26.2 equivalence rules (<code className="text-sky-300 font-mono">E1 = (T)(E1 op E2)</code>), the single-evaluation guarantee of the left-hand variable, Right-to-Left associativity, and fee installment accumulation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of Compound Assignments in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java provides 11 <strong>Compound Assignment Operators</strong> that combine an operation with variable reassignment. Under the Java Language Specification (JLS §15.26.2), an expression <code className="text-emerald-300 font-mono">E1 op= E2</code> is equivalent to <code className="text-emerald-300 font-mono">E1 = (T)((E1) op (E2))</code>.
          </p>
          <p>
            Crucially, the JVM provides a <strong>Single-Evaluation Guarantee</strong>: the left-hand target expression <code className="text-sky-300 font-mono">E1</code> is evaluated exactly once, preventing duplicate method executions and corrupted array indices. Furthermore, the entire right-hand expression <code className="text-amber-300 font-mono">E2</code> is evaluated before the compound operation is applied.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Fee Accumulator):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated tuition installment ledger for student accounts in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By accumulating payments with compound assignment (<code className="text-emerald-300 font-mono">totalPaid += installment;</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> tracked partial fee payments across Naihati and Shyamnagar with zero arithmetic side-effects.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 11 Compound Assignment Operators &amp; Single-Evaluation Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How compound assignments evaluate target expressions once and isolate right-hand operations:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Compound Assignment Operators and Evaluation Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradArithComp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradBitComp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradEvalComp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Arithmetic Compound (5) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradArithComp)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Arithmetic (5 Operators)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">+=, -=, *=, /=, %=</text>
            <text x="55" y="122" fill="#e0f2fe" fontSize="10">balance += 5000; // deposit</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">x *= 2 + 3; &rarr; x = x * (2+3)</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Right Side Fully Grouped
            </text>

            {/* Box 2: Bitwise & Shift Compound (6) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradBitComp)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Bitwise &amp; Shift (6)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&amp;=, |=, ^=, &lt;&lt;=, &gt;&gt;=, &gt;&gt;&gt;=</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">flags |= MASK; // set flag</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">flags ^= MASK; // toggle flag</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              In-Place Bit Operations
            </text>

            {/* Box 3: Single-Evaluation Guarantee */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradEvalComp)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Single Evaluation</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">arr[getIndex()] += 500;</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">getIndex() runs EXACTLY ONCE!</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Prevents corrupted indices</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              JLS §15.26.2 Guarantee
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Right-to-Left Associativity: `x += y += z += 5` evaluates as `x += (y += (z += 5))`.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> The 11 Compound Operators Complete Taxonomy
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operator</th>
                <th className="p-3 font-semibold text-emerald-400">Example Expression</th>
                <th className="p-3 font-semibold text-amber-400">Equivalent Expansion</th>
                <th className="p-3 font-semibold text-slate-400">Category &amp; Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">+=</td>
                <td className="p-3 font-mono text-emerald-400">a += b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a + b)</td>
                <td className="p-3 text-xs">Addition / String concatenation accumulator</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">-=</td>
                <td className="p-3 font-mono text-emerald-400">a -= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a - b)</td>
                <td className="p-3 text-xs">Subtraction / Balance reduction</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">*=</td>
                <td className="p-3 font-mono text-emerald-400">a *= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a * b)</td>
                <td className="p-3 text-xs">Multiplication / Scaling factor</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">/=</td>
                <td className="p-3 font-mono text-emerald-400">a /= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a / b)</td>
                <td className="p-3 text-xs">Division / Split apportionment</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">%=</td>
                <td className="p-3 font-mono text-emerald-400">a %= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a % b)</td>
                <td className="p-3 text-xs">Modulus remainder assignment</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&amp;=</td>
                <td className="p-3 font-mono text-emerald-400">a &amp;= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a &amp; b)</td>
                <td className="p-3 text-xs">Bitwise mask filtering / Eager boolean AND</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">|=</td>
                <td className="p-3 font-mono text-emerald-400">a |= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a | b)</td>
                <td className="p-3 text-xs">Bitwise flag setting / Eager boolean OR</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">^=</td>
                <td className="p-3 font-mono text-emerald-400">a ^= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a ^ b)</td>
                <td className="p-3 text-xs">Bitwise flag toggle / XOR in-place swap</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&lt;&lt;=</td>
                <td className="p-3 font-mono text-emerald-400">a &lt;&lt;= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a &lt;&lt; b)</td>
                <td className="p-3 text-xs">Left shift multiplication reassignment</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&gt;&gt;=</td>
                <td className="p-3 font-mono text-emerald-400">a &gt;&gt;= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a &gt;&gt; b)</td>
                <td className="p-3 text-xs">Signed right shift floor division</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&gt;&gt;&gt;=</td>
                <td className="p-3 font-mono text-emerald-400">a &gt;&gt;&gt;= b</td>
                <td className="p-3 font-mono text-amber-300">a = (T)(a &gt;&gt;&gt; b)</td>
                <td className="p-3 text-xs">Unsigned right shift zero extension</td>
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
            CompoundAssignmentOperatorsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates all 11 compound assignment operators, the single-evaluation guarantee of array and method indices, Right-to-Left associativity, and installment ledger accumulation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={compoundDemoCode}
          title="CompoundAssignmentOperatorsDemo.java"
          highlightLines={[21, 24, 27, 30, 33, 40, 43, 46, 49, 52, 60, 65, 74, 88]}
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
              <span>❌</span> Pitfall 1: Expecting x *= 2 + 3 to Evaluate as x * 2 + 3
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In Java, the entire right-hand expression is treated as enclosed in parentheses: <code className="text-rose-300 font-mono">x *= 2 + 3</code> evaluates as <code className="text-emerald-300 font-mono">x = x * (2 + 3)</code>, multiplying <code className="text-sky-300 font-mono">x</code> by <code className="text-amber-300 font-mono">5</code> (NOT <code className="text-rose-400 font-mono">x * 2 + 3</code>!).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use += for Array and Map Element Updates
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-emerald-400 font-mono">arr[calculateIndex()] += 10</code> evaluates the index expression only once, whereas <code className="text-rose-300 font-mono">arr[calc()] = arr[calc()] + 10</code> evaluates <code className="text-rose-300 font-mono">calc()</code> twice, introducing performance overhead and potential bugs.
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
            🤔 <em>&ldquo;Why does `x += y += z += 5` set z first, then y, then x?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Right-to-Left Associativity! Assignment and compound assignment operators group from right to left: <code className="text-sky-300 font-mono">x += (y += (z += 5))</code>. First <code className="text-emerald-300 font-mono">z += 5</code> updates <code className="text-emerald-300 font-mono">z</code> and yields the new <code className="text-emerald-300 font-mono">z</code>, which is then added to <code className="text-amber-300 font-mono">y</code>, and that result is added to <code className="text-purple-300 font-mono">x</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Compound Assignment FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 13: Compound Assignment Operators"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic13_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Compound assignment operators make your code clean, concise, and efficient. Remember that the target expression on the left is evaluated only once, and the right-hand side is fully calculated before assignment. In Topic 14, we explore Implicit Type Casting in Compound Assignments! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
