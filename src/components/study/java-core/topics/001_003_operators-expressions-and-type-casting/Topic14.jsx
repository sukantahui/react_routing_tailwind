import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import implicitCastDemoCode from "./topic14_files/ImplicitCastingCompoundAssignmentDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowImplicitCast {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(245, 158, 11, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-cast {
            animation: glowImplicitCast 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Implicit Type Casting in Compound Assignments (<code className="text-amber-400">byte b = 5; b += 2;</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the hidden mechanics of compound assignments: why <code className="text-rose-400 font-mono">b = b + 2</code> fails while <code className="text-emerald-300 font-mono">b += 2</code> compiles cleanly, the automatic <code className="text-amber-300 font-mono">(T)</code> narrowing cast injected by the compiler (JLS §15.26.2), silent wrap-around hazards (<code className="text-rose-400 font-mono">127 += 1 → -128</code>), floating-point truncation (<code className="text-rose-400 font-mono">int += double</code>), and student attendance validation in Barrackpore.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Compilation Paradox: Standard vs. Compound Assignment
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When adding a numeric literal to a <code className="text-sky-300 font-mono">byte</code> or <code className="text-sky-300 font-mono">short</code>, standard assignment fails while compound assignment succeeds:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50">
              <p className="text-rose-400 font-bold mb-1">Standard Assignment (Compile Error):</p>
              <code className="text-slate-300">byte b = 5;</code><br />
              <code className="text-rose-300">b = b + 2; // ERROR: int cannot convert to byte!</code>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50">
              <p className="text-emerald-400 font-bold mb-1">Compound Assignment (Compiles!):</p>
              <code className="text-slate-300">byte b = 5;</code><br />
              <code className="text-emerald-300">b += 2; // Compiles as: b = (byte)(b + 2);</code>
            </div>
          </div>
          <p>
            Under Section 15.26.2 of the Java Language Specification (JLS), <code className="text-emerald-300 font-mono">E1 op= E2</code> is formally defined as <code className="text-emerald-300 font-mono">E1 = (T)((E1) op (E2))</code>. The compiler automatically inserts an explicit cast <code className="text-amber-300 font-mono">(T)</code> to the type of <code className="text-sky-300 font-mono">E1</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Classroom Case Study (Barrackpore Attendance Bug):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> investigated a curious bug where student laboratory attendance stored in a <code className="text-sky-300 font-mono">byte</code> counter suddenly became <code className="text-rose-400 font-mono">-128</code> after 127 sessions! <strong>Abhronila</strong> and <strong>Debangshu</strong> discovered that <code className="text-amber-300 font-mono">attendance += 1</code> was secretly casting <code className="text-rose-400 font-mono">(byte)(128)</code>, silently wrapping into negative numbers without any compiler warning!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Implicit Narrowing Cast &amp; Silent Overflow Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the compiler inserts the narrowing cast and where silent truncation occurs:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Implicit Casting in Compound Assignments Diagram"
          >
            <defs>
              <linearGradient id="gradDesugar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradWrapHazard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradFloatTrunc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Compiler Desugaring */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradDesugar)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Compiler Desugaring</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">b += 2;</text>
            <text x="55" y="122" fill="#e0f2fe" fontSize="10">→ Transformed into:</text>
            <text x="55" y="142" fill="#a7f3d0" fontSize="11" fontFamily="monospace">b = (byte)(b + 2);</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Automatic (T) Injection
            </text>

            {/* Box 2: Silent Wrap-Around */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradWrapHazard)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Silent Wrap-Around</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">byte b = 127; b += 1;</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">→ (byte)(128) wraps to -128!</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">Zero compiler warnings!</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              High-Bit Truncation
            </text>

            {/* Box 3: Float Truncation */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradFloatTrunc)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Decimal Loss (int += double)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">int fee = 1000;</text>
            <text x="615" y="122" fill="#fde68a" fontSize="11" fontFamily="monospace">fee += 50.75; → 1050</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">0.75 paise silently dropped!</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Financial Precision Loss
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Bytecode: JVM executes `iadd` followed by `i2b` instruction to truncate to 8 bits.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Implicit Narrowing Examples &amp; Truncation Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Variable Declaration &amp; Operation</th>
                <th className="p-3 font-semibold text-amber-400">Synthesized Compiler Cast</th>
                <th className="p-3 font-semibold text-emerald-400">Evaluated Result</th>
                <th className="p-3 font-semibold text-rose-400">Data Loss / Hazard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">byte b = 5; b += 2;</td>
                <td className="p-3 font-mono text-amber-300">b = (byte)(b + 2)</td>
                <td className="p-3 font-mono text-emerald-400">7</td>
                <td className="p-3 text-xs text-slate-400">None (within byte range)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">byte b = 127; b += 1;</td>
                <td className="p-3 font-mono text-amber-300">b = (byte)(127 + 1)</td>
                <td className="p-3 font-mono text-rose-400">-128</td>
                <td className="p-3 text-xs text-rose-400">Silent Overflow / Sign bit flip</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">short s = 32767; s += 1;</td>
                <td className="p-3 font-mono text-amber-300">s = (short)(32767 + 1)</td>
                <td className="p-3 font-mono text-rose-400">-32768</td>
                <td className="p-3 text-xs text-rose-400">Silent Short Wrap-around</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">int x = 10; x += 4.85;</td>
                <td className="p-3 font-mono text-amber-300">x = (int)(10 + 4.85)</td>
                <td className="p-3 font-mono text-amber-300">14</td>
                <td className="p-3 text-xs text-rose-400">Fractional decimal (0.85) dropped</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">char c = &apos;A&apos;; c += 3;</td>
                <td className="p-3 font-mono text-amber-300">c = (char)(&apos;A&apos; + 3)</td>
                <td className="p-3 font-mono text-emerald-400">&apos;D&apos; (Unicode 68)</td>
                <td className="p-3 text-xs text-slate-400">None (Valid character step)</td>
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
            ImplicitCastingCompoundAssignmentDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates the compilation paradox, silent byte wrap-around (<code className="text-rose-400 font-mono">127 += 1 → -128</code>), floating-point decimal truncation (<code className="text-amber-300 font-mono">int += double</code>), and student attendance boundary auditing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={implicitCastDemoCode}
          title="ImplicitCastingCompoundAssignmentDemo.java"
          highlightLines={[22, 25, 33, 34, 38, 48, 55, 60, 72, 73]}
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
              <span>❌</span> Pitfall 1: Using Narrow Types (byte / short) for Unbounded Counters
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">byte counter = 0; counter += 1;</code> in loops or attendance logs silently wraps around to <code className="text-rose-400 font-mono">-128</code> once it crosses 127 without throwing any exception!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use <code className="bg-slate-900 px-1 py-0.5 rounded">int</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">long</code> for counters.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Never Mix int with double in Financial Ledgers
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Applying <code className="text-rose-300 font-mono">intFee += taxDouble</code> silently drops paise/cents. Use <code className="text-emerald-400 font-mono">BigDecimal</code> or keep the total in <code className="text-emerald-400 font-mono">double</code>.
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
            🤔 <em>&ldquo;Why does `byte b = 127; b += 1;` produce -128 without any compiler error or runtime exception?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> JLS §15.26.2! Compound assignment is desugared to <code className="text-emerald-300 font-mono">b = (byte)(b + 1)</code>. Because the compiler inserts an explicit cast <code className="text-amber-300 font-mono">(byte)</code>, it treats the narrowing as intentional programmer code, suppressing type warnings. In two&apos;s complement, <code className="text-rose-300 font-mono">127 + 1 = 128</code> (<code className="text-amber-300 font-mono">0b10000000</code>), which in 8-bit signed byte is <code className="text-rose-400 font-mono">-128</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Implicit Casting in Compound Assignments FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 14: Implicit Type Casting in Compound Assignments"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic14_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: While compound assignment operators provide tremendous syntactic convenience, remember that their hidden cast hides silent overflow and fractional truncation. Never use narrow byte/short types for counters without boundary checks! In Topic 15, we explore the Ternary Conditional Operator (? :)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
