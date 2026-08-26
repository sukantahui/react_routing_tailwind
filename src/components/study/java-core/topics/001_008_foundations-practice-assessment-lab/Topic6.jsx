import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import baseDemoCode from "./topic6_files/DecimalToBinaryHexConversionDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBase {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-bs {
            animation: glowBase 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 6 · Radix &amp; Bitwise Math
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Decimal to Binary &amp; Hexadecimal Base Conversions (from Scratch)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master foundational number radix conversions without relying on standard library methods: implementing successive modulo division, bitwise right-shift masking (<code className="text-sky-300 font-mono">&gt;&gt;&gt;</code>), 4-bit hex nibble extraction, two&apos;s complement negative handling, and Horner&apos;s method for polynomial reverse parsing.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Two Core Radix Algorithms
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Base conversions form the foundation of low-level networking, bitmasks, and memory debugging:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Decimal &rarr; Base B (Division &amp; Modulo)</h3>
              <p className="text-sky-300 mb-1">rem = n % B; n /= B;</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Repeatedly extracts the remainder modulo $B$, shrinks the number, and reverses the accumulated string. Bitwise masks (<code className="text-sky-300 font-mono">&gt;&gt;&gt;</code>) extract bits directly.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Base B &rarr; Decimal (Horner&apos;s Method)</h3>
              <p className="text-emerald-300 mb-1">result = (result * B) + digitVal</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Evaluates the positional polynomial in linear <code className="text-emerald-400 font-mono">O(N)</code> time without calculating expensive <code className="text-slate-300 font-mono">Math.pow()</code> exponents!
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Byte Encoding):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> converted decimal <code className="text-emerald-400 font-mono">29 &rarr; 11101 (binary) &rarr; 0x1D (hex)</code>, <strong>Tuhina</strong> parsed 16-bit max <code className="text-sky-300 font-mono">65535 &rarr; 0xFFFF</code>, and <strong>Abhronila</strong> recovered decimal <code className="text-purple-300 font-mono">6,719</code> from Hex <code className="text-purple-300 font-mono">0x1A3F</code> via Horner&apos;s method.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Algorithmic Visualizations: Modulo Division &amp; Horner&apos;s Method
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing forward remainder accumulation with reverse polynomial parsing:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Base Conversion Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradDivBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradHorner" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: Successive Division (Decimal 29 to Binary) */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. DECIMAL &rarr; BINARY (29 / 2)</text>

            <rect x="45" y="70" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="87" fill="#bae6fd" fontSize="10" fontFamily="monospace">29 / 2 = 14 | Remainder: 1 (LSB)</text>

            <rect x="45" y="100" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="117" fill="#bae6fd" fontSize="10" fontFamily="monospace">14 / 2 =  7 | Remainder: 0</text>

            <rect x="45" y="130" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="147" fill="#bae6fd" fontSize="10" fontFamily="monospace"> 7 / 2 =  3 | Remainder: 1</text>

            <rect x="45" y="160" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="177" fill="#bae6fd" fontSize="10" fontFamily="monospace"> 3 / 2 =  1 | Remainder: 1</text>

            <text x="225" y="215" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">Reversed Result: 11101 (Binary 29)</text>

            {/* Right Panel: Horner's Polynomial Expansion (Hex 0x1A3F to Decimal) */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. HEX &rarr; DECIMAL (0x1A3F via Horner)</text>

            <rect x="465" y="70" width="370" height="30" rx="4" fill="#022c22" />
            <text x="475" y="90" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Digit &apos;1&apos; : (0 * 16) + 1  = 1</text>

            <rect x="465" y="105" width="370" height="30" rx="4" fill="#022c22" />
            <text x="475" y="125" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Digit &apos;A&apos; : (1 * 16) + 10 = 26</text>

            <rect x="465" y="140" width="370" height="30" rx="4" fill="#022c22" />
            <text x="475" y="160" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Digit &apos;3&apos; : (26 * 16) + 3 = 419</text>

            <rect x="465" y="175" width="370" height="30" rx="4" fill="#022c22" />
            <text x="475" y="195" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">Digit &apos;F&apos; : (419 * 16) + 15 = 6,719 (Final!)</text>

            <text x="650" y="230" fill="#a7f3d0" fontSize="9" textAnchor="middle">O(N) Time | Zero Math.pow() Overhead!</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Successive modulo division accumulates remainders from LSB to MSB; Horner&apos;s method evaluates polynomials in linear time.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Radix Systems Conversion Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Base System</th>
                <th className="p-3 font-semibold text-emerald-400">Radix ($B$)</th>
                <th className="p-3 font-semibold text-purple-400">Valid Digits</th>
                <th className="p-3 font-semibold text-amber-400">Bit Grouping Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Binary</td>
                <td className="p-3 text-emerald-300">Base 2</td>
                <td className="p-3 text-slate-300">`0, 1`</td>
                <td className="p-3 text-slate-300 font-sans">1 bit per digit</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Octal</td>
                <td className="p-3 text-emerald-300">Base 8</td>
                <td className="p-3 text-slate-300">`0..7`</td>
                <td className="p-3 text-slate-300 font-sans">3 bits per digit ($2^3 = 8$)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Decimal</td>
                <td className="p-3 text-emerald-300">Base 10</td>
                <td className="p-3 text-slate-300">`0..9`</td>
                <td className="p-3 text-slate-300 font-sans">Standard human arithmetic</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Hexadecimal</td>
                <td className="p-3 text-emerald-300">Base 16</td>
                <td className="p-3 text-slate-300">`0..9, A..F`</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">4 bits per digit (1 Nibble)</td>
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
            DecimalToBinaryHexConversionDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements decimal to binary/hex conversions and Horner&apos;s reverse polynomial parsing.
        </p>

        <JavaFileLoader
          fileModule={baseDemoCode}
          title="DecimalToBinaryHexConversionDemo.java"
          highlightLines={[19, 25, 33, 37, 49, 53, 58, 68, 73, 81, 88]}
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
              <span>❌</span> Pitfall 1: Using Signed Right Shift (`&gt;&gt;`) for Negative Binary Conversion
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Signed right shift <code className="text-rose-300 font-mono">&gt;&gt;</code> preserves the negative sign bit by copying 1s from the left, causing infinite bit loops. Always use the logical unsigned right shift <code className="text-emerald-400 font-mono">&gt;&gt;&gt;</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Horner&apos;s Method to Avoid Floating-Point Pow
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never use <code className="text-slate-300 font-mono">Math.pow(16, i)</code> inside a loop to parse hex strings; Horner&apos;s method (<code className="text-emerald-400 font-mono">result = result * 16 + digit</code>) runs in fast integer CPU registers with zero floating-point rounding errors.
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
            🤔 <em>&ldquo;How does masking with <code className="text-emerald-400 font-mono">(n &amp; 0xFFFFFFFFL)</code> handle negative numbers when converting to Hex?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Sign Extension Elimination! In Java, negative ints have sign bit 1. Casting directly to <code className="text-slate-300 font-mono">long</code> sign-extends 32 ones. Masking with <code className="text-emerald-400 font-mono">0xFFFFFFFFL</code> keeps only the lower 32 bits, creating a clean positive 64-bit integer containing the exact two&apos;s complement pattern!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Base Conversions FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 6: Base Conversions (from Scratch)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic6_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Base conversions connect high-level code to hardware registers. In Topic 7, we master Algorithmic Problem 7: Implementing Recursive Binary Search! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
