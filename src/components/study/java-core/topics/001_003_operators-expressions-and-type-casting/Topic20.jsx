import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import narrowingDemoCode from "./topic20_files/NarrowingExplicitCastingDemo.java?raw";
import noteText from "./topic20_files/topic20_note.txt?raw";
import questions from "./topic20_files/topic20_questions";

export default function Topic20() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowNarrowing {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-narrow {
            animation: glowNarrowing 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 20
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Narrowing / Explicit Casting (Larger Type → Smaller Type)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master explicit type downcasting in Java: the 22 narrowing conversion pathways (JLS §5.1.3), high-order bit discard &amp; sign-flip wrap-arounds (<code className="text-rose-400 font-mono">(byte)130 → -126</code>), floating-point truncation towards zero (<code className="text-amber-300 font-mono">(int)99.99 → 99</code>), IEEE 754 special values (NaN &amp; Infinity), and defensive overflow auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics and Risks of Narrowing Conversions
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Narrowing / Explicit Casting</strong> is required whenever converting a larger primitive type into a narrower type:
          </p>
          <p className="font-mono text-amber-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            double → float → long → int → short → byte &nbsp;&nbsp;(and int → char)
          </p>
          <p>
            Because the target type has smaller capacity, narrowing involves two significant hazards:
            <br />
            <strong>1. High-Order Bit Truncation:</strong> When casting integers (e.g. <code className="text-sky-300 font-mono">int</code> to <code className="text-sky-300 font-mono">byte</code>), the upper 24 bits are permanently discarded, causing values exceeding 127 to wrap around into negative numbers!
            <br />
            <strong>2. Fractional Truncation:</strong> When casting floating-point numbers to integers, all decimal digits are truncated towards zero (e.g. <code className="text-amber-300 font-mono">(int) 99.99 → 99</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Barrackpore Fee Voucher Downcasting Bug):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> investigated a payment glitch where a student course voucher of ₹50,000 cast to a <code className="text-sky-300 font-mono">short</code> suddenly turned into <code className="text-rose-400 font-mono">-15,536</code>! <strong>Abhronila</strong> and <strong>Debangshu</strong> implemented defensive boundary checks (<code className="text-emerald-300 font-mono">amount &lt;= Short.MAX_VALUE</code>) before casting, preventing financial data corruption across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Bit Discard, Sign Flip &amp; Decimal Truncation Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How higher-order bits are discarded and floating-point fractions are stripped during narrowing:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Narrowing Explicit Casting Diagram"
          >
            <defs>
              <linearGradient id="gradBitDiscard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradDecTrunc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradSafeGuard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Bit Discard & Sign Flip */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradBitDiscard)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Upper 24 Bits Discarded</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">int 130 → (byte) 130</text>
            <text x="55" y="122" fill="#fecdd3" fontSize="10">Binary: 10000010</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">→ Evaluates to -126 in 8-bit!</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Sign-Flip Wrap-Around
            </text>

            {/* Box 2: Decimal Truncation */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradDecTrunc)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Decimal Truncation</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="335" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">double 99.99 → (int) 99</text>
            <text x="335" y="122" fill="#fef3c7" fontSize="10">Truncates towards zero!</text>
            <text x="335" y="142" fill="#fef3c7" fontSize="10">Use Math.round() for true rounding</text>
            <text x="440" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Fractional Precision Loss
            </text>

            {/* Box 3: Safe Defensive Casting */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradSafeGuard)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Defensive Boundary Checks</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Math.toIntExact(longVal);</text>
            <text x="615" y="122" fill="#d1fae5" fontSize="10">Throws ArithmeticException</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">if value exceeds Integer.MAX</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Crash-Proof Integrity
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §5.1.3: 22 narrowing pathways; primitive casts never throw exceptions at runtime.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Narrowing Conversion Behavior Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Original Expression</th>
                <th className="p-3 font-semibold text-rose-400">Narrowing Cast</th>
                <th className="p-3 font-semibold text-emerald-400">Evaluated Result</th>
                <th className="p-3 font-semibold text-amber-400">JVM Architectural Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">int 130</td>
                <td className="p-3 font-mono text-rose-400">(byte) 130</td>
                <td className="p-3 font-mono text-rose-400">-126</td>
                <td className="p-3 text-xs">Upper 24 bits discarded; 0x82 is -126 in signed 8-bit</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">int 257</td>
                <td className="p-3 font-mono text-rose-400">(byte) 257</td>
                <td className="p-3 font-mono text-emerald-400">1</td>
                <td className="p-3 text-xs">256 discarded, leaving lowest byte 0x01</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">double 99.99</td>
                <td className="p-3 font-mono text-rose-400">(int) 99.99</td>
                <td className="p-3 font-mono text-amber-300">99</td>
                <td className="p-3 text-xs">Fractional digits truncated towards zero</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Double.NaN</td>
                <td className="p-3 font-mono text-rose-400">(int) Double.NaN</td>
                <td className="p-3 font-mono text-emerald-400">0</td>
                <td className="p-3 text-xs">JLS rule: NaN narrows to 0</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Double.POSITIVE_INFINITY</td>
                <td className="p-3 font-mono text-rose-400">(int) Double.POSITIVE_INFINITY</td>
                <td className="p-3 font-mono text-emerald-400">2147483647</td>
                <td className="p-3 text-xs">Clamped to Integer.MAX_VALUE</td>
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
            NarrowingExplicitCastingDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates high-order bit discard (<code className="text-rose-400 font-mono">130 → -126</code>), floating-point decimal truncation, special IEEE 754 value downcasting (NaN and Infinity), and safe boundary validation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={narrowingDemoCode}
          title="NarrowingExplicitCastingDemo.java"
          highlightLines={[21, 26, 30, 34, 40, 44, 53, 54, 55, 67, 68]}
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
              <span>❌</span> Pitfall 1: Assuming (int) Rounds Floating-Point Numbers
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">(int) 9.99</code> evaluates to <code className="text-rose-400 font-mono">9</code>, NOT 10!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use <code className="bg-slate-900 px-1 py-0.5 rounded">Math.round(d)</code> for arithmetic rounding.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Math.toIntExact(long) for Safe Downcasting
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In Java 8+, use <code className="text-emerald-400 font-mono">Math.toIntExact(longVal)</code> to convert longs to ints with automatic overflow exception detection.
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
            🤔 <em>&ldquo;Why does casting `(byte) 130` produce `-126` rather than 130?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Two&apos;s Complement Bit Discard! In 32-bit binary, <code className="text-sky-300 font-mono">130</code> is <code className="text-amber-300 font-mono">0x00000082</code> (<code className="text-amber-300 font-mono">00000000 00000000 00000000 10000010</code>). When cast to <code className="text-sky-300 font-mono">byte</code>, Java permanently discards the top 24 bits, leaving <code className="text-rose-400 font-mono">10000010</code>. In signed 8-bit two&apos;s complement, the leading <code className="text-rose-400 font-bold">1</code> represents the negative sign bit (<code className="text-rose-400 font-mono">-128 + 2 = -126</code>)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Narrowing Casting FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 20: Narrowing / Explicit Casting"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic20_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Narrowing casting gives you manual control over data conversion, but remember that high-order bits are permanently thrown away. Never cast large numeric types down without boundary validation! In Topic 21, the grand finale of Module 001_003, we explore Detecting and Preventing Arithmetic Overflow & Underflow! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
