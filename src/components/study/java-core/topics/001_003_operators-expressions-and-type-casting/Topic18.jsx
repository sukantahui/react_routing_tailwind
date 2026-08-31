import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import typePromotionDemoCode from "./topic18_files/AutomaticTypePromotionDemo.java?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions";

export default function Topic18() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPromotion {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-promo {
            animation: glowPromotion 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 18
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Automatic Type Promotion Rules in Expressions (<code className="text-sky-400">byte/short/char → int</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master JVM numeric type widening in arithmetic: Unary Numeric Promotion (JLS §5.6.1), Binary Numeric Promotion hierarchy (<code className="text-emerald-400 font-mono">double</code> &gt; <code className="text-sky-300 font-mono">float</code> &gt; <code className="text-purple-300 font-mono">long</code> &gt; <code className="text-amber-300 font-mono">int</code>), the classic <code className="text-rose-400 font-mono">byte + byte</code> compilation trap, character arithmetic, and exam percentage auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> How Automatic Type Promotion Works in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, all arithmetic operations on narrow types (<code className="text-sky-300 font-mono">byte</code>, <code className="text-sky-300 font-mono">short</code>, <code className="text-sky-300 font-mono">char</code>) are <strong>automatically promoted to 32-bit <code className="text-amber-300 font-mono">int</code></strong> before computation.
          </p>
          <p>
            <strong>Binary Numeric Promotion Hierarchy (JLS §5.6.2):</strong>
            <br />
            1. If any operand is <code className="text-emerald-400 font-mono">double</code> → the whole expression promotes to <code className="text-emerald-400 font-mono">double</code>.
            <br />
            2. Else if any operand is <code className="text-sky-300 font-mono">float</code> → promotes to <code className="text-sky-300 font-mono">float</code>.
            <br />
            3. Else if any operand is <code className="text-purple-300 font-mono">long</code> → promotes to <code className="text-purple-300 font-mono">long</code>.
            <br />
            4. Otherwise → BOTH operands promote to <code className="text-amber-300 font-mono">int</code>!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Marks &amp; GST Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> investigated why adding three student marks stored as <code className="text-sky-300 font-mono">byte</code> caused a compilation error when assigned to another <code className="text-sky-300 font-mono">byte</code>! <strong>Abhronila</strong> and <strong>Debangshu</strong> explained that <code className="text-amber-300 font-mono">m1 + m2 + m3</code> promotes to <code className="text-amber-300 font-mono">int</code>, and dividing by <code className="text-emerald-400 font-mono">3.0</code> produces accurate floating-point percentage averages in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Type Promotion Hierarchy &amp; Compilation Trap
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How smaller types are widened to int and how mixed-type arithmetic resolves:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Automatic Type Promotion Rules Diagram"
          >
            <defs>
              <linearGradient id="gradNarrowToInt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradHierarch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradByteTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Box 1: Narrow to Int Promotion */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradNarrowToInt)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Narrow to Int Promotion</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">byte, short, char</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">→ Promoted to 32-bit INT</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">&apos;A&apos; + &apos;B&apos; → 65 + 66 = 131 (int)</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              JVM Stack Arithmetic (iadd)
            </text>

            {/* Box 2: Binary Promotion Hierarchy */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradHierarch)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Promotion Hierarchy</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">double &gt; float &gt; long &gt; int</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">long (500L) + float (2.5f) → float</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">int (10) + double (5.5) → double</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Widest Type Unification
            </text>

            {/* Box 3: The byte + byte Trap */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradByteTrap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. The byte + byte Trap</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="615" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">byte b3 = b1 + b2; // ERROR!</text>
            <text x="615" y="122" fill="#fecdd3" fontSize="10">Evaluates to 32-bit int!</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">Fix: byte b3 = (byte)(b1 + b2);</text>
            <text x="720" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Requires Explicit (byte) Cast
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §5.6.2: All arithmetic operations automatically promote operands to at least 32-bit `int`.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Type Promotion Resolution Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operand 1 Type</th>
                <th className="p-3 font-semibold text-sky-400">Operand 2 Type</th>
                <th className="p-3 font-semibold text-emerald-400">Promoted Operation Type</th>
                <th className="p-3 font-semibold text-slate-400">JLS Promotion Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">byte</td>
                <td className="p-3 font-mono text-emerald-400">byte</td>
                <td className="p-3 font-mono text-amber-300 font-bold">int</td>
                <td className="p-3 text-xs">Narrow types promote to 32-bit int</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">short</td>
                <td className="p-3 font-mono text-emerald-400">short</td>
                <td className="p-3 font-mono text-amber-300 font-bold">int</td>
                <td className="p-3 text-xs">Narrow types promote to 32-bit int</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">char</td>
                <td className="p-3 font-mono text-emerald-400">char</td>
                <td className="p-3 font-mono text-amber-300 font-bold">int</td>
                <td className="p-3 text-xs">Unicode code points promoted to int</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">int</td>
                <td className="p-3 font-mono text-emerald-400">long</td>
                <td className="p-3 font-mono text-purple-300 font-bold">long</td>
                <td className="p-3 text-xs">int promoted to 64-bit long</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">long</td>
                <td className="p-3 font-mono text-emerald-400">float</td>
                <td className="p-3 font-mono text-sky-300 font-bold">float</td>
                <td className="p-3 text-xs">float dynamic scale exceeds long</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">float</td>
                <td className="p-3 font-mono text-emerald-400">double</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">double</td>
                <td className="p-3 text-xs">float promoted to 64-bit double</td>
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
            AutomaticTypePromotionDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates the <code className="text-amber-300 font-mono">byte + byte</code> compilation trap, character arithmetic promotion, the <code className="text-emerald-400 font-mono">double &gt; float &gt; long &gt; int</code> promotion hierarchy, and student examination percentage auditing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={typePromotionDemoCode}
          title="AutomaticTypePromotionDemo.java"
          highlightLines={[22, 23, 31, 41, 45, 49, 63, 73, 76]}
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
              <span>❌</span> Pitfall 1: Expecting byte Arithmetic to Produce a byte
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">byte b3 = b1 + b2;</code> causes a compile-time error because Java promotes both bytes to <code className="text-amber-300 font-mono">int</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use <code className="bg-slate-900 px-1 py-0.5 rounded">int</code> for general numeric variables, or write <code className="bg-slate-900 px-1 py-0.5 rounded">(byte)(b1 + b2)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Divide with Double Literals (e.g. / 3.0) for Averages
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When computing averages, dividing by <code className="text-emerald-400 font-mono">3.0</code> promotes the entire expression to <code className="text-emerald-400 font-mono">double</code>, preventing integer division truncation.
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
            🤔 <em>&ldquo;Why does `float` (32-bit) take promotion precedence over `long` (64-bit) in `long + float`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Dynamic Range! A 64-bit <code className="text-purple-300 font-mono">long</code> represents integers up to $\approx 9.22 \times 10^{18}$, but a 32-bit IEEE 754 <code className="text-sky-300 font-mono">float</code> has a dynamic floating-point range up to $\approx 3.4 \times 10^{38}$. Under JLS §5.6.2, floating-point types subsume integral types, widening <code className="text-purple-300 font-mono">long</code> to <code className="text-sky-300 font-mono">float</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Automatic Type Promotion FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 18: Automatic Type Promotion Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic18_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Automatic Type Promotion ensures calculations run with high CPU efficiency on the operand stack. Always remember the hierarchy: double > float > long > int, and that byte/short/char arithmetic always yields at least an int! In Topic 19, we explore Widening / Implicit Casting! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
