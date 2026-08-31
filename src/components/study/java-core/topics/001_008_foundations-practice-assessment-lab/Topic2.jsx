import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import palinDemoCode from "./topic2_files/PalindromeVerificationAlgorithmsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPalin {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pl {
            animation: glowPalin 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 2 · Two-Pointer &amp; Math
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Palindromic Number &amp; String Verification Algorithms
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master interview-grade palindrome verification algorithms in Java: mathematical integer half-reversal to eliminate 32-bit overflow (<code className="text-emerald-400 font-mono">O(1) space</code>), two-pointer alphanumeric phrase filtering, and recursive validation.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Two Core Verification Paradigms
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Verifying palindromes requires different optimal techniques for numerical versus text data:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Integer Half-Reversal</h3>
              <p className="text-sky-300 mb-1">while (x &gt; reversedHalf)</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Reverses only the second half of the number, comparing <code className="text-sky-300 font-mono">x == reversedHalf</code> (even) or <code className="text-sky-300 font-mono">x == reversedHalf / 10</code> (odd). Completely eliminates integer overflow risk.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Two-Pointer String Scan</h3>
              <p className="text-emerald-300 mb-1">left = 0, right = len - 1</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Pointers move inward in <code className="text-emerald-400 font-mono">O(N)</code> time and <code className="text-emerald-400 font-mono">O(1)</code> space, filtering out punctuation with <code className="text-emerald-400 font-mono">Character.isLetterOrDigit()</code>.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Verification Suite):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> tested odd/even palindromes (<code className="text-emerald-400 font-mono">12321</code> and <code className="text-emerald-400 font-mono">1221</code> → true), <strong>Tuhina</strong> validated phrase palindromes (<code className="text-sky-300 font-mono">&quot;A man, a plan, a canal: Panama&quot;</code> → true), and <strong>Abhronila</strong> tested recursive Malayalam strings with 100% precision.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Algorithmic Visualizations: Half-Reversal &amp; Two-Pointer Scan
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing mathematical half-reversal with two-pointer inward character matching:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Palindrome Verification Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradIntPal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradStrPal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: Integer Half-Reversal */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. INTEGER HALF-REVERSAL (12321)</text>

            <rect x="45" y="70" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">Initial : x = 12321 | rev = 0</text>

            <rect x="45" y="110" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">Step 1  : x = 1232  | rev = 1</text>

            <rect x="45" y="150" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="172" fill="#bae6fd" fontSize="10" fontFamily="monospace">Step 2  : x = 123   | rev = 12</text>

            <rect x="45" y="190" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="212" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">Step 3  : x = 12    | rev = 123 → x == rev/10 ✓</text>

            {/* Right Panel: Two-Pointer String Convergence */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. TWO-POINTER STRING CONVERGENCE</text>

            <rect x="465" y="70" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="92" fill="#a7f3d0" fontSize="10" fontFamily="monospace">[r] a d a [r] → &apos;r&apos; == &apos;r&apos; (Pointers step inward)</text>

            <rect x="465" y="110" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="132" fill="#a7f3d0" fontSize="10" fontFamily="monospace">r [a] d [a] r → &apos;a&apos; == &apos;a&apos; (Pointers step inward)</text>

            <rect x="465" y="150" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="172" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">r a [d] a r   → left == right (Halt &amp; return TRUE!)</text>

            <text x="650" y="215" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">O(N) Time | O(1) Memory | In-Place Inward Scan</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Half-reversal avoids Integer.MAX_VALUE overflow; Two-pointer scan operates in O(1) auxiliary space without extra strings.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Strategy Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Approach</th>
                <th className="p-3 font-semibold text-emerald-400">Time Complexity</th>
                <th className="p-3 font-semibold text-purple-400">Space Complexity</th>
                <th className="p-3 font-semibold text-amber-400">Key Advantage / Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Integer Half-Reversal</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(\log_{10} N)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ constant memory</td>
                <td className="p-3 text-slate-300 font-sans">Zero overflow risk; half the loop iterations</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Two-Pointer In-Place Scan</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ constant memory</td>
                <td className="p-3 text-slate-300 font-sans">No extra heap object allocation; fast</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Recursive Substring Match</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$</td>
                <td className="p-3 text-rose-400 font-sans">$O(N)$ stack frames</td>
                <td className="p-3 text-slate-300 font-sans">Clean inductive educational demonstration</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`StringBuilder.reverse()`</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$</td>
                <td className="p-3 text-rose-400 font-sans">$O(N)$ heap allocation</td>
                <td className="p-3 text-slate-300 font-sans">Quick prototyping (inefficient for large text)</td>
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
            PalindromeVerificationAlgorithmsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements integer half-reversal, two-pointer phrase filtering, and recursive palindrome verification.
        </p>

        <JavaFileLoader
          fileModule={palinDemoCode}
          title="PalindromeVerificationAlgorithmsDemo.java"
          highlightLines={[22, 26, 32, 42, 45, 52, 65, 68, 77, 85, 96]}
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
              <span>❌</span> Pitfall 1: Full Integer Reversal Overflow
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Reversing a full 10-digit number like <code className="text-rose-300 font-mono">1,999,999,999</code> overflows Java&apos;s 32-bit signed integer (<code className="text-slate-300 font-mono">Integer.MAX_VALUE = 2,147,483,647</code>), corrupting the comparison. Always use half-reversal!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use In-Place Two-Pointers for Strings
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Do not use regex <code className="text-slate-300 font-mono">replaceAll(&quot;[^a-zA-Z0-9]&quot;, &quot;&quot;)</code> and <code className="text-slate-300 font-mono">StringBuilder.reverse()</code> in high-throughput loops; two-pointer in-place scanning consumes <code className="text-emerald-400 font-mono">O(1)</code> extra memory without garbage collection pauses.
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
            🤔 <em>&ldquo;Why must we check <code className="text-emerald-400 font-mono">x % 10 == 0 &amp;&amp; x != 0</code> before reversing half digits?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Trailing Zeros Trap! For <code className="text-rose-300 font-mono">x = 10</code>, half-reversal sets <code className="text-slate-300 font-mono">reversedHalf = 0</code> and <code className="text-slate-300 font-mono">x = 1</code>, then loop stops because <code className="text-slate-300 font-mono">x &gt; rev</code> is false, causing <code className="text-slate-300 font-mono">x == rev/10</code> to return true mistakenly for 10! The initial guard prevents this bug!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Palindromic Verification FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 2: Palindromic Verification Algorithms"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Half-reversal is the cleanest integer palindrome technique in existence. In Topic 3, we conquer Algorithmic Problem 3: Matrix Spiral Traversal & 90-Degree Clockwise Rotation! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
