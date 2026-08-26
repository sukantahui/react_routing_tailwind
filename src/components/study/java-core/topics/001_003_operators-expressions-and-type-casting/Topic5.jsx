import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import unaryDemoCode from "./topic5_files/UnaryOperatorsDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowUnary {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-unary {
            animation: glowUnary 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Unary Operators: <code className="text-rose-400">+</code>, <code className="text-rose-400">-</code>, <code className="text-rose-400">!</code>, <code className="text-rose-400">~</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master single-operand transformations in Java: unary plus (<code className="text-sky-300 font-mono">+x</code>), numeric negation (<code className="text-rose-300 font-mono">-x</code>), logical NOT (<code className="text-emerald-300 font-mono">!flag</code>), bitwise NOT inversion (<code className="text-amber-300 font-mono">~mask = -(x + 1)</code>), unary type promotion, and financial debt auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of Unary Operations in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Unary Operators</strong> act on a single operand to produce a modified or evaluated result. In Java, unary operators occupy the highest precedence tier among arithmetic constructs and associate <strong>Right-to-Left</strong>.
          </p>
          <p>
            Applying <code className="text-sky-300 font-mono">+</code> or <code className="text-rose-300 font-mono">-</code> to narrow types (<code className="text-purple-300 font-mono">byte</code>, <code className="text-purple-300 font-mono">short</code>, <code className="text-purple-300 font-mono">char</code>) triggers <strong>Unary Numeric Promotion</strong>, automatically widening them to a 32-bit <code className="text-sky-300 font-mono">int</code>. Meanwhile, bitwise NOT (<code className="text-amber-300 font-mono">~x</code>) flips every bit in two&apos;s complement representation, adhering strictly to the formula <code className="text-amber-400 font-mono">~x = -(x + 1)</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Barrackpore Ledger Auditor):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated student dues auditor. By applying unary minus (<code className="text-rose-300 font-mono">dues = -studentBalance;</code>) to negative balances, <strong>Abhronila</strong> and <strong>Debangshu</strong> displayed clean positive outstanding fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) and used logical NOT (<code className="text-emerald-300 font-mono">!hasDues</code>) to control lab gate access for students across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Unary Operators &amp; Bitwise Inversion (~x = -(x+1)) Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How unary operators evaluate, promote narrow types, and flip binary bits:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Unary Operators and Bitwise NOT Diagram"
          >
            <defs>
              <linearGradient id="gradUnaryMinus" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradUnaryNot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBitwiseNot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Unary Plus & Minus */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradUnaryMinus)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Unary (+ / -)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="105" fill="#fca5a5" fontSize="12" fontFamily="monospace">int neg = -5000;</text>
            <text x="55" y="125" fill="#fca5a5" fontSize="12" fontFamily="monospace">int pos = -neg; // +5000</text>
            <text x="55" y="145" fill="#fecdd3" fontSize="10">byte b=5; -b promotes to int!</text>
            <text x="160" y="195" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Negates Value (0 - x)
            </text>

            {/* Box 2: Logical NOT (!) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradUnaryNot)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Logical NOT (!)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="105" fill="#a7f3d0" fontSize="12" fontFamily="monospace">!true  &rarr; false</text>
            <text x="335" y="125" fill="#a7f3d0" fontSize="12" fontFamily="monospace">!false &rarr; true</text>
            <text x="335" y="145" fill="#d1fae5" fontSize="10">!!flag &rarr; restores original</text>
            <text x="440" y="195" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Booleans Only (No !0 in Java)
            </text>

            {/* Box 3: Bitwise NOT (~) */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradBitwiseNot)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Bitwise NOT (~)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="105" fill="#fde68a" fontSize="12" fontFamily="monospace">~0  &rarr; -1</text>
            <text x="615" y="125" fill="#fde68a" fontSize="12" fontFamily="monospace">~5  &rarr; -6</text>
            <text x="615" y="145" fill="#fef3c7" fontSize="10">Formula: ~x = -(x + 1)</text>
            <text x="720" y="195" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Flips All 32 Binary Bits
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Right-to-Left Associativity: `- - -10` evaluates as `-(-(-(10)))` &rarr; `-10`.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Unary Operator Behavioral Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operator</th>
                <th className="p-3 font-semibold text-emerald-400">Name</th>
                <th className="p-3 font-semibold text-amber-400">Allowed Types</th>
                <th className="p-3 font-semibold text-purple-400">Sample Operation</th>
                <th className="p-3 font-semibold text-slate-400">Key Rule / Invariant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">+</td>
                <td className="p-3">Unary Plus</td>
                <td className="p-3">Numeric (byte..double)</td>
                <td className="p-3 font-mono text-emerald-400">+5 &rarr; 5</td>
                <td className="p-3 text-xs">Performs unary numeric promotion on byte, short, char to int</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">-</td>
                <td className="p-3">Unary Minus</td>
                <td className="p-3">Numeric (byte..double)</td>
                <td className="p-3 font-mono text-emerald-400">-5000 &rarr; -5000</td>
                <td className="p-3 text-xs">Negates arithmetic value; negating Integer.MIN_VALUE overflows back</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">!</td>
                <td className="p-3">Logical NOT</td>
                <td className="p-3">boolean, Boolean</td>
                <td className="p-3 font-mono text-emerald-400">!true &rarr; false</td>
                <td className="p-3 text-xs">Strictly for booleans; cannot be applied to integers in Java</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">~</td>
                <td className="p-3">Bitwise NOT</td>
                <td className="p-3">Integral (byte..long)</td>
                <td className="p-3 font-mono text-emerald-400">~5 &rarr; -6</td>
                <td className="p-3 text-xs">Inverts all bits in two&apos;s complement; formula ~x = -(x + 1)</td>
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
            UnaryOperatorsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates unary plus and minus, unary promotion of narrow types, logical NOT, bitwise NOT (<code className="text-amber-300 font-mono">~x = -(x + 1)</code>), Right-to-Left associativity, and debt balance auditing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={unaryDemoCode}
          title="UnaryOperatorsDemo.java"
          highlightLines={[21, 22, 23, 31, 32, 38, 39, 40, 48, 59, 60, 71, 72]}
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
              <span>❌</span> Pitfall 1: Attempting to Use ! on Integers (C/C++ Habit)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In C/C++, <code className="text-rose-300 font-mono">!0</code> evaluates to <code className="text-emerald-300 font-mono">1</code>. In Java, <code className="text-rose-300 font-mono">!0</code> causes a compile error because <code className="text-rose-300 font-mono">!</code> is strictly reserved for booleans.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Java Idiom:</strong> Use explicit relational checks: <code className="bg-slate-900 px-1 py-0.5 rounded">num == 0</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">num != 0</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use ~MASK to Clear Bitmask Flags
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When working with permissions or hardware flags, clear individual bits cleanly using bitwise AND combined with bitwise NOT: <code className="text-emerald-400 font-mono">flags = flags &amp; ~PERMISSION_MASK;</code>.
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
            🤔 <em>&ldquo;Why does `~0` evaluate to `-1` instead of `0` in Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Two&apos;s Complement Binary Arithmetic! In 32-bit binary, <code className="text-sky-300 font-mono">0</code> is 32 zeroes. Inverting all bits gives 32 ones (<code className="text-amber-300 font-mono">0xFFFFFFFF</code>). In two&apos;s complement, a bit pattern of all ones represents <code className="text-emerald-400 font-mono">-1</code>! (Adhering to <code className="text-amber-400 font-mono">~0 = -(0 + 1) = -1</code>).
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Unary Operators FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 5: Unary Operators (+, -, !, ~)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic5_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Unary operators are essential building blocks of Java logic. Remember that unary minus promotes narrow types to int, logical NOT is strictly for booleans, and bitwise NOT follows the invariant ~x = -(x + 1). In Topic 6, we explore the Prefix vs Postfix Increment and Decrement operators (++x vs x++)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
