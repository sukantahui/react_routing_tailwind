import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import wideningDemoCode from "./topic19_files/WideningImplicitCastingDemo.java?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions";

export default function Topic19() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowWidening {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-wide {
            animation: glowWidening 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 19
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Widening / Implicit Casting (Smaller Type → Larger Type)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master seamless numeric conversions in Java: the 19 widening conversion paths (JLS §5.1.2), zero syntax overhead, sign extension vs zero extension, the critical precision loss exception (<code className="text-amber-300 font-mono">int/long → float/double</code> mantissa limits), and financial ledger widening in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Seamless Widening Conversion Ladder
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Widening / Implicit Casting</strong> occurs automatically whenever a value of a smaller primitive type is assigned to a variable of a wider primitive type:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            byte → short → int → long → float → double &nbsp;&nbsp;(and char → int)
          </p>
          <p>
            Because the destination data type has a larger capacity or dynamic range, widening conversions are completely safe from magnitude overflow and <strong>never throw a runtime exception</strong>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Tuition Ledger Widening):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an institutional fee ledger. By storing student base fees as <code className="text-sky-300 font-mono">short</code> (e.g. ₹15,000) and letting Java implicitly widen them to <code className="text-emerald-400 font-mono">double</code> during GST tax calculations, <strong>Abhronila</strong> and <strong>Debangshu</strong> preserved exact financial values with zero explicit casting boilerplate in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Widening Continuum &amp; Precision Loss Nuance
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How widening transitions between types and where mantissa rounding occurs:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Widening Conversion Continuum and Precision Loss Diagram"
          >
            <defs>
              <linearGradient id="gradWideLadder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradSignExt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradMantissaLoss" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: The Widening Ladder */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradWideLadder)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Automatic Widening</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">byte → short → int → long</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">→ float → double</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">No (type) cast syntax needed!</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              100% Overflow Safe
            </text>

            {/* Box 2: Sign vs Zero Extension */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradSignExt)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Sign vs Zero Extension</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">short -1 → int -1 (Sign Ext)</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">char &apos;A&apos; → int 65 (Zero Ext)</text>
            <text x="335" y="142" fill="#e0f2fe" fontSize="10">char 0xFFFF → int 65535</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Bit Pattern Preservation
            </text>

            {/* Box 3: Precision Loss Nuance */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradMantissaLoss)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Float Mantissa Loss</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">int 123456789 → float</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">→ 123456792.0 (Mantissa loss!)</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Float has only 23-bit mantissa</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              JLS §5.1.2 Exception
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §5.1.2: 19 specific widening pathways; never throws runtime exceptions.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> The 19 Widening Conversions Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">From (Source Type)</th>
                <th className="p-3 font-semibold text-emerald-400">Allowed Implicit Widening Targets</th>
                <th className="p-3 font-semibold text-amber-400">Precision Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">byte (8-bit)</td>
                <td className="p-3 font-mono text-emerald-400">short, int, long, float, double</td>
                <td className="p-3 text-xs text-emerald-400">100% exact numerical value</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">short (16-bit)</td>
                <td className="p-3 font-mono text-emerald-400">int, long, float, double</td>
                <td className="p-3 text-xs text-emerald-400">100% exact numerical value</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">char (16-bit unsigned)</td>
                <td className="p-3 font-mono text-emerald-400">int, long, float, double</td>
                <td className="p-3 text-xs text-emerald-400">100% exact code point</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">int (32-bit)</td>
                <td className="p-3 font-mono text-emerald-400">long, float, double</td>
                <td className="p-3 text-xs text-amber-300">Exact for long/double; least bits may round for float</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">long (64-bit)</td>
                <td className="p-3 font-mono text-emerald-400">float, double</td>
                <td className="p-3 text-xs text-rose-400">May lose precision for values exceeding $2^{53}$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">float (32-bit IEEE)</td>
                <td className="p-3 font-mono text-emerald-400">double</td>
                <td className="p-3 text-xs text-emerald-400">100% exact conversion</td>
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
            WideningImplicitCastingDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates the complete widening ladder, character code point widening, the precision loss nuance (<code className="text-amber-300 font-mono">int → float</code>), and student fee ledger widening in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={wideningDemoCode}
          title="WideningImplicitCastingDemo.java"
          highlightLines={[20, 21, 22, 23, 24, 34, 35, 36, 44, 45, 52, 53, 67, 68]}
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
              <span>❌</span> Pitfall 1: Assuming byte/short Automatically Widens to char
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">char c = byteVal;</code> fails compilation because <code className="text-sky-300 font-mono">byte</code> is signed while <code className="text-emerald-300 font-mono">char</code> is unsigned. An explicit cast <code className="text-emerald-400 font-mono">(char) byteVal</code> is required!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use double Over float for High-Precision Integers
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When widening 32-bit integers to floating-point numbers, use <code className="text-emerald-400 font-mono">double</code> (52-bit mantissa) rather than <code className="text-rose-400 font-mono">float</code> (23-bit mantissa) to avoid rounding artifacts in large values.
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
            🤔 <em>&ldquo;Why does widening an integer `123456789` to float change the value to `123456792.0`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Mantissa Bit Capacity! In IEEE 754, a 32-bit <code className="text-sky-300 font-mono">float</code> allocates only <code className="text-amber-300 font-mono">23 bits</code> for its significand (mantissa), representing at most $\approx 7$ significant decimal digits. The integer <code className="text-sky-300 font-mono">123,456,789</code> has 9 significant digits, so the least significant 2 digits are rounded off during widening! To preserve full 32-bit integer precision, always widen to <code className="text-emerald-400 font-bold">double</code> (52-bit mantissa)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Widening Casting FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 19: Widening / Implicit Casting"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic19_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Widening casting is your frictionless path to type promotion. Remember that widening between integer types is 100% exact, but watch out for float mantissa rounding when converting large ints or longs. In Topic 20, we explore Narrowing / Explicit Casting and data truncation! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
