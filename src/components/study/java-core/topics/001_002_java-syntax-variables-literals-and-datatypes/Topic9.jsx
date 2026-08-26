import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import floatDemoCode from "./topic9_files/FloatingPointPrecisionDemo.java?raw";
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
          @keyframes pulseGlow {
            0%, 100% { filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-glow {
            animation: pulseGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Floating-Point Literals: float (F suffix) vs double &amp; IEEE 754 Precision
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand how Java stores real numbers in memory: single-precision 32-bit float literals, 64-bit double defaults, the IEEE 754 standard, binary rounding traps (why 0.1 + 0.2 ≠ 0.3), and why banking calculations in Indian Rupees (₹) require BigDecimal.
        </p>
      </header>

      {/* Section 1: Conceptual Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of Floating-Point in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, any numeric literal containing a decimal point (such as <code className="text-amber-300">3.14</code>, <code className="text-amber-300">0.05</code>, or <code className="text-amber-300">12500.50</code>) is classified by default as a <strong>64-bit double literal</strong>.
          </p>
          <p>
            Because Java enforces strict type safety, assigning an 8-byte <code className="text-sky-300">double</code> literal to a 4-byte <code className="text-sky-300">float</code> variable results in a compile-time error: <span className="text-rose-400 font-mono text-xs md:text-sm">Type mismatch: cannot convert from double to float</span>. To declare a single-precision float literal, you must explicitly append an <code className="text-emerald-400 font-bold">f</code> or <code className="text-emerald-400 font-bold">F</code> suffix.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Scenario (Barrackpore Lab):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> created a student fee register storing monthly installments of <code className="text-amber-300">₹12,500.10</code> and <code className="text-amber-300">₹8,750.20</code> using <code className="text-sky-300">double</code> variables. When <strong>Tuhina</strong> and <strong>Abhronila</strong> audited the total, the result was <code className="text-rose-400 font-mono">₹21250.300000000003</code>! <strong>Debangshu</strong> immediately recognized the classic IEEE 754 binary fraction representation error and demonstrated how professional financial systems use <code className="text-emerald-400 font-mono">BigDecimal</code> to guarantee exact Indian Rupee precision.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram (IEEE 754 Layout) */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> IEEE 754 Bit Layout: Float (32-bit) vs Double (64-bit)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Both float and double divide their binary bit width into three fundamental segments: the <strong>Sign Bit</strong> (positive/negative), the <strong>Biased Exponent</strong> (scale/magnitude), and the <strong>Fraction / Mantissa</strong> (precision digits).
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 340"
            className="w-full h-auto"
            aria-label="IEEE 754 Floating Point Memory Layout Diagram"
          >
            <defs>
              <linearGradient id="gradSign" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradExp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradMantissa" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Title Single Precision */}
            <text x="40" y="35" fill="#e2e8f0" fontSize="16" fontWeight="bold">
              32-bit Single Precision (float) — ~6 to 7 decimal digits of precision
            </text>

            {/* Float Box: 32 bits */}
            {/* Sign: 1 bit */}
            <rect x="40" y="50" width="50" height="60" rx="8" fill="url(#gradSign)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="65" y="77" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1 bit</text>
            <text x="65" y="97" fill="#ffe4e6" fontSize="10" textAnchor="middle">Sign</text>

            {/* Exponent: 8 bits */}
            <rect x="100" y="50" width="220" height="60" rx="8" fill="url(#gradExp)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="210" y="77" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">8 bits (Bias = 127)</text>
            <text x="210" y="97" fill="#e0f2fe" fontSize="10" textAnchor="middle">Biased Exponent</text>

            {/* Mantissa: 23 bits */}
            <rect x="330" y="50" width="510" height="60" rx="8" fill="url(#gradMantissa)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="585" y="77" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">23 bits (24 effective bits with normalized implicit 1)</text>
            <text x="585" y="97" fill="#d1fae5" fontSize="10" textAnchor="middle">Fraction / Significand / Mantissa</text>

            {/* Title Double Precision */}
            <text x="40" y="185" fill="#e2e8f0" fontSize="16" fontWeight="bold">
              64-bit Double Precision (double) — ~15 to 17 decimal digits of precision
            </text>

            {/* Double Box: 64 bits */}
            {/* Sign: 1 bit */}
            <rect x="40" y="200" width="50" height="60" rx="8" fill="url(#gradSign)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="65" y="227" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1 bit</text>
            <text x="65" y="247" fill="#ffe4e6" fontSize="10" textAnchor="middle">Sign</text>

            {/* Exponent: 11 bits */}
            <rect x="100" y="200" width="250" height="60" rx="8" fill="url(#gradExp)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="225" y="227" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">11 bits (Bias = 1023)</text>
            <text x="225" y="247" fill="#e0f2fe" fontSize="10" textAnchor="middle">Biased Exponent</text>

            {/* Mantissa: 52 bits */}
            <rect x="360" y="200" width="480" height="60" rx="8" fill="url(#gradMantissa)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="600" y="227" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">52 bits (53 effective bits with normalized implicit 1)</text>
            <text x="600" y="247" fill="#d1fae5" fontSize="10" textAnchor="middle">Fraction / Significand / Mantissa</text>

            {/* Formula footnote */}
            <text x="440" y="305" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Mathematical Value Formula: Value = (-1)^Sign × (1 + Fraction) × 2^(Exponent - Bias)
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comparative Architecture Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-sky-400">float (Single Precision)</th>
                <th className="p-3 font-semibold text-sky-400">double (Double Precision)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Size</td>
                <td className="p-3">32 bits (4 bytes)</td>
                <td className="p-3 font-semibold text-emerald-400">64 bits (8 bytes)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">IEEE 754 Standard</td>
                <td className="p-3">Single-precision</td>
                <td className="p-3">Double-precision</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Literal Suffix Requirement</td>
                <td className="p-3 font-mono text-amber-300">Mandatory ('f' or 'F')</td>
                <td className="p-3 font-mono text-slate-400">Optional ('d', 'D', or none)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Significant Decimal Digits</td>
                <td className="p-3">~6 to 7 digits</td>
                <td className="p-3 text-emerald-400 font-semibold">~15 to 17 digits</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Smallest Positive Non-Zero (Subnormal)</td>
                <td className="p-3 font-mono">1.4E-45</td>
                <td className="p-3 font-mono">4.9E-324</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Largest Positive Finite Value</td>
                <td className="p-3 font-mono">3.4028235E+38</td>
                <td className="p-3 font-mono">1.7976931348623157E+308</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Ideal Use Cases</td>
                <td className="p-3">Mobile 3D Graphics, Audio DSP, Tensor caches</td>
                <td className="p-3">Scientific simulations, Physics engines, Engineering</td>
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
            FloatingPointPrecisionDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program demonstrates float vs double literal suffixes, exponential scientific notation, the binary fraction pitfall, special values (Infinity, NaN), and BigDecimal financial settlements in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={floatDemoCode}
          title="FloatingPointPrecisionDemo.java"
          highlightLines={[22, 23, 24, 40, 41, 42, 54, 55, 56, 64, 65, 66]}
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
              <span>❌</span> Pitfall 1: Using Float or Double for Currency &amp; Accounting
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Because 0.1, 0.2, and 0.05 cannot be represented exactly in binary powers of 2, subtracting and adding cents or paise accumulates rounding errors. In a banking ledger with 100,000 transactions, accounts will suffer discrepancy errors.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use <code className="bg-slate-900 px-1 py-0.5 rounded">java.math.BigDecimal</code> with String constructors (<code className="bg-slate-900 px-1 py-0.5 rounded">new BigDecimal(&quot;12500.50&quot;)</code>) or store whole currency in subunits (e.g. integer paise / cents).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Testing Exact Equality with (a == b)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Testing <code className="text-rose-300 font-mono">(0.1 + 0.2 == 0.3)</code> evaluates to <code className="text-rose-400 font-bold">false</code> because the sum is <code className="text-amber-300 font-mono">0.30000000000000004</code>. Direct equality checks produce erratic bugs in loops and conditionals.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use an epsilon threshold: <code className="bg-slate-900 px-1 py-0.5 rounded">Math.abs(a - b) &lt; 1e-9</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 3: Checking for NaN using (x == Double.NaN)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              According to the IEEE 754 specification, <code className="text-amber-300">NaN</code> is not equal to any value, including another <code className="text-amber-300">NaN</code>. Writing <code className="text-rose-300 font-mono">if (val == Double.NaN)</code> will NEVER evaluate to true.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use the static helper method <code className="bg-slate-900 px-1 py-0.5 rounded">Double.isNaN(val)</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">Float.isNaN(val)</code>.
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
            🤔 <em>&ldquo;If a 64-bit <code className="text-sky-300">long</code> and a 64-bit <code className="text-sky-300">double</code> both occupy exactly 8 bytes of RAM, why can a double store astronomical values up to 10^308 while a long stops at ~9 × 10^18?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about the trade-off between <strong>fixed precision</strong> and <strong>dynamic scale</strong>! A <code className="text-sky-300">long</code> allocates all 63 bits to exact discrete integer steps, while a <code className="text-sky-300">double</code> dedicates 11 bits to an exponential power-of-two multiplier, floating the decimal point across cosmic magnitudes at the expense of discrete precision!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Floating-Point Literals & IEEE 754 FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 9: Floating-Point Literals & Precision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic9_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To my students Swadeep, Tuhina, Abhronila, and Debangshu: Floating-point numbers are one of the most deceptively subtle concepts in computer science. Always remember the Golden Rule: use float/double for graphics, games, and physics; but NEVER use float or double for money, invoices, or accounting in Indian Rupees (₹). For currency, always reach for java.math.BigDecimal! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
