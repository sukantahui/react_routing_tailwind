import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import shiftDemoCode from "./topic12_files/ShiftOperatorsDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowShift {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-shift {
            animation: glowShift 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Shift Operators: Left Shift (<code className="text-sky-400">&lt;&lt;</code>), Signed Right (<code className="text-sky-400">&gt;&gt;</code>), Unsigned Right (<code className="text-sky-400">&gt;&gt;&gt;</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master bitwise position shifting: left shift multiplication (<code className="text-emerald-300 font-mono">a &lt;&lt; s = a * 2^s</code>), signed right shift sign extension (<code className="text-sky-300 font-mono">&gt;&gt;</code>), unsigned right shift zero extension (<code className="text-purple-300 font-mono">&gt;&gt;&gt;</code>), JLS §15.19 shift distance masking, 32-bit ARGB color packing, and packet encryption in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Silicon-Level Bit Shifting in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java provides three dedicated binary shift operators that move bits left or right across 32-bit <code className="text-sky-300 font-mono">int</code> and 64-bit <code className="text-sky-300 font-mono">long</code> storage units:
          </p>
          <p>
            <strong>1. Left Shift (<code className="text-sky-300 font-mono">&lt;&lt;</code>):</strong> Shifts bits left, filling vacated right bits with zeroes (<code className="text-emerald-300 font-mono">0</code>). Multiplies the operand by $2^s$.
            <br />
            <strong>2. Signed Right Shift (<code className="text-amber-300 font-mono">&gt;&gt;</code>):</strong> Shifts bits right, replicating the original sign bit (Sign Extension) so positive numbers remain positive and negative numbers remain negative.
            <br />
            <strong>3. Unsigned Right Shift (<code className="text-purple-300 font-mono">&gt;&gt;&gt;</code>):</strong> Shifts bits right, always filling vacated positions on the left with zeroes (<code className="text-emerald-300 font-mono">0</code>), converting negative numbers into large positive integers.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Network Packet Compressor):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a high-speed network packet compressor for student tuition receipts in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By packing a 16-bit student roll number into the upper half (<code className="text-sky-300 font-mono">roll &lt;&lt; 16</code>) and a 16-bit fee voucher into the lower half (<code className="text-purple-300 font-mono">fee &amp; 0xFFFF</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> transmitted enrollment records across Naihati and Shyamnagar in a single 32-bit integer payload.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Shift Operators &amp; ARGB Color Packing Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How Left Shift, Signed Right Shift, and Unsigned Right Shift manipulate binary bits and pack color channels:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Shift Operators and ARGB Packing Diagram"
          >
            <defs>
              <linearGradient id="gradLeftShift" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradSignedShift" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradUnsignedShift" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
            </defs>

            {/* Box 1: Left Shift (<<) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradLeftShift)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Left Shift (&lt;&lt;)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">5 &lt;&lt; 2 &rarr; 20</text>
            <text x="55" y="122" fill="#e0f2fe" fontSize="10">Formula: a * 2^s (5 * 4 = 20)</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">Fills vacated right with 0s</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Multiplication by 2^s
            </text>

            {/* Box 2: Signed Right (>>) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradSignedShift)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Signed Right (&gt;&gt;)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="335" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">-40 &gt;&gt; 2 &rarr; -10</text>
            <text x="335" y="122" fill="#fef3c7" fontSize="10">Sign Extension: Fills with MSB</text>
            <text x="335" y="142" fill="#fef3c7" fontSize="10">Negative numbers stay negative</text>
            <text x="440" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Floor Division by 2^s
            </text>

            {/* Box 3: Unsigned Right (>>>) */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradUnsignedShift)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Unsigned Right (&gt;&gt;&gt;)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#3b0764" />
            <text x="615" y="102" fill="#e9d5ff" fontSize="11" fontFamily="monospace">-1 &gt;&gt;&gt; 1 &rarr; 2147483647</text>
            <text x="615" y="122" fill="#f3e8ff" fontSize="10">Zero Extension: Always fills 0s</text>
            <text x="615" y="142" fill="#f3e8ff" fontSize="10">Yields positive Integer.MAX_VALUE</text>
            <text x="720" y="190" fill="#faf5ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Overflow-Safe Binary Search
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §15.19 Masking: 32-bit shift distance is masked with `0x1F` (so `8 &lt;&lt; 32` is `8 &lt;&lt; 0` = `8`).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Shift Operator Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operator</th>
                <th className="p-3 font-semibold text-emerald-400">Name</th>
                <th className="p-3 font-semibold text-amber-400">Vacated Bits Filled With</th>
                <th className="p-3 font-semibold text-purple-400">Sample Expression</th>
                <th className="p-3 font-semibold text-slate-400">Evaluated Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&lt;&lt;</td>
                <td className="p-3">Signed Left Shift</td>
                <td className="p-3 text-xs">Always `0` on the right</td>
                <td className="p-3 font-mono text-emerald-400">5 &lt;&lt; 2</td>
                <td className="p-3 font-mono text-emerald-400">20</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&gt;&gt;</td>
                <td className="p-3">Signed Right Shift</td>
                <td className="p-3 text-xs">Sign bit (`0` if positive, `1` if negative)</td>
                <td className="p-3 font-mono text-emerald-400">-40 &gt;&gt; 2</td>
                <td className="p-3 font-mono text-rose-400">-10</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">&gt;&gt;&gt;</td>
                <td className="p-3">Unsigned Right Shift</td>
                <td className="p-3 text-xs">Always `0` on the left (Zero extension)</td>
                <td className="p-3 font-mono text-emerald-400">-1 &gt;&gt;&gt; 1</td>
                <td className="p-3 font-mono text-purple-300">2147483647 (Integer.MAX_VALUE)</td>
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
            ShiftOperatorsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates left shift multiplication, signed vs unsigned right shift, shift distance masking (JLS §15.19), 32-bit ARGB color packing, and security packet encoding in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={shiftDemoCode}
          title="ShiftOperatorsDemo.java"
          highlightLines={[20, 21, 22, 33, 34, 43, 44, 53, 54, 65, 70, 71, 88, 89]}
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
              <span>❌</span> Pitfall 1: Expecting x &lt;&lt; 32 to Clear the Integer to 0
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In Java (JLS §15.19), 32-bit integer shift distances are masked with <code className="text-amber-300 font-mono">0x1F</code> (<code className="text-amber-300 font-mono">distance % 32</code>). Therefore, <code className="text-rose-300 font-mono">8 &lt;&lt; 32</code> calculates <code className="text-sky-300 font-mono">8 &lt;&lt; 0</code>, leaving the number <code className="text-emerald-400 font-bold">8</code> unchanged!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use (low + high) &gt;&gt;&gt; 1 for Binary Search
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Standard <code className="text-rose-300 font-mono">(low + high) / 2</code> overflows into negative numbers when array indices exceed 1 billion. Using <code className="text-emerald-400 font-mono">(low + high) &gt;&gt;&gt; 1</code> is 100% immune to 32-bit overflow bugs.
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
            🤔 <em>&ldquo;Why does `-1 &gt;&gt;&gt; 1` evaluate to 2147483647 (Integer.MAX_VALUE) while `-1 &gt;&gt; 1` remains -1?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Sign Extension vs Zero Extension! In 32-bit binary, <code className="text-rose-300 font-mono">-1</code> is 32 ones (<code className="text-amber-300 font-mono">0xFFFFFFFF</code>). Signed shift <code className="text-sky-300 font-mono">&gt;&gt;</code> replicates the sign bit (1), keeping 32 ones (<code className="text-rose-400 font-mono">-1</code>). Unsigned shift <code className="text-purple-300 font-mono">&gt;&gt;&gt;</code> inserts a <code className="text-emerald-400 font-bold">0</code> into the 31st sign bit, converting the pattern to <code className="text-emerald-300 font-mono">0x7FFFFFFF</code> which is <code className="text-emerald-400 font-bold">2,147,483,647</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Shift Operators FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 12: Shift Operators (<<, >>, >>>)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Shift operators allow you to perform fast power-of-two arithmetic and binary packet packing. Always remember the distinction between signed right shift (>>) which preserves negative signs, and unsigned right shift (>>>) which fills with zeroes. In Topic 13, we explore Compound Assignment Operators (+=, -=, *=, <<=)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
