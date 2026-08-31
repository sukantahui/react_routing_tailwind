import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import recurseDemoCode from "./topic12_files/RecursiveMethodsFoundationsDemo.java?raw";
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
          @keyframes glowRecursion {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-rc {
            animation: glowRecursion 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Inductive Algorithms &amp; Recursion
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Recursive Methods: Base Cases &amp; Recursive Steps
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundational mechanics of recursion in Java: self-referential methods, the mandatory Base Case termination guard, monotonic progression in recursive steps, winding versus unwinding, and compound tuition fee calculations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Two Indispensable Pillars of Recursion
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong>Recursive Method</strong> solves a problem by dividing it into smaller sub-problem instances of itself. Every valid recursive method must possess two distinct parts:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. The Base Case (Termination Guard)</h3>
              <p className="text-emerald-300 mb-1">if (n &lt;= 1) return 1;</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The atomic stopping condition that returns an immediate non-recursive result. Without it, the method calls itself infinitely until the JVM throws a <code className="text-rose-400 font-mono">StackOverflowError</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. The Recursive Step (Inductive Step)</h3>
              <p className="text-sky-300 mb-1">return n * calculateFactorial(n - 1);</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Breaks down the problem and invokes itself with arguments that strictly progress <strong>closer to the base case</strong> (e.g. <code className="text-sky-300 font-mono">n - 1</code>).
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Compound Tuition Growth):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> calculated 4-year tuition fee growth for a base ₹20,000 fee at 8% annual inflation. Calling the recursive method <code className="text-emerald-400 font-mono">calculateCompoundFee(20000.0, 0.08, 4)</code> accumulated annual increments recursively, yielding <code className="text-emerald-400 font-semibold">₹27,209.78</code> in Indian Rupees (₹) when the base case (<code className="text-sky-300 font-mono">years &lt;= 0</code>) terminated.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Recursive Call Winding &amp; Stack Unwinding Flow
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Tracing <code className="text-emerald-400 font-mono">calculateFactorial(4)</code> through stack expansion and return bubble-up:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Recursion Winding and Unwinding Diagram"
          >
            <defs>
              <linearGradient id="gradWind" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradUnwind" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Panel 1: Winding Phase (Calls down) */}
            <rect x="30" y="30" width="260" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="160" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. WINDING (Stack Growing)</text>

            <rect x="45" y="70" width="230" height="35" rx="4" fill="#082f49" />
            <text x="55" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">fact(4) → 4 * fact(3)</text>

            <rect x="45" y="110" width="230" height="35" rx="4" fill="#082f49" />
            <text x="55" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">fact(3) → 3 * fact(2)</text>

            <rect x="45" y="150" width="230" height="35" rx="4" fill="#082f49" />
            <text x="55" y="172" fill="#bae6fd" fontSize="10" fontFamily="monospace">fact(2) → 2 * fact(1)</text>

            <text x="160" y="215" fill="#7dd3fc" fontSize="9" textAnchor="middle">&darr; Pushing frames onto Call Stack</text>

            {/* Panel 2: Base Case Hit */}
            <rect x="310" y="30" width="260" height="215" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="440" y="55" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">2. BASE CASE HIT</text>

            <rect x="325" y="80" width="230" height="75" rx="8" fill="url(#gradBase)" />
            <text x="440" y="105" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">fact(1) Base Case!</text>
            <text x="440" y="125" fill="#fef3c7" fontSize="11" fontFamily="monospace" textAnchor="middle">if (n &lt;= 1) return 1;</text>
            <text x="440" y="145" fill="#ffffff" fontSize="10" textAnchor="middle">Returns 1 immediately!</text>

            <text x="440" y="195" fill="#fde68a" fontSize="10" textAnchor="middle">Recursion halts!</text>
            <text x="440" y="215" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Unwinding phase begins →</text>

            {/* Panel 3: Unwinding Phase (Returns bubble up) */}
            <rect x="590" y="30" width="260" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="720" y="55" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">3. UNWINDING (Bubble Up)</text>

            <rect x="605" y="70" width="230" height="35" rx="4" fill="#022c22" />
            <text x="615" y="92" fill="#a7f3d0" fontSize="10" fontFamily="monospace">fact(2) = 2 * 1 = 2</text>

            <rect x="605" y="110" width="230" height="35" rx="4" fill="#022c22" />
            <text x="615" y="132" fill="#a7f3d0" fontSize="10" fontFamily="monospace">fact(3) = 3 * 2 = 6</text>

            <rect x="605" y="150" width="230" height="35" rx="4" fill="#022c22" />
            <text x="615" y="172" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">fact(4) = 4 * 6 = 24</text>

            <text x="720" y="215" fill="#6ee7b7" fontSize="9" textAnchor="middle">&uarr; Popping frames and returning result</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Every recursive call pushes a stack frame during Winding; reaching the Base Case triggers Unwinding and pops frames.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Anatomy of Classic Recursive Algorithms
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Algorithm</th>
                <th className="p-3 font-semibold text-amber-400">Base Case</th>
                <th className="p-3 font-semibold text-emerald-400">Recursive Step</th>
                <th className="p-3 font-semibold text-purple-400">Time / Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Factorial ($n!$)</td>
                <td className="p-3 text-amber-300">`n &le; 1` → return 1</td>
                <td className="p-3 text-emerald-300">`n * fact(n - 1)`</td>
                <td className="p-3 text-purple-300">$O(N)$ Time / $O(N)$ Stack Space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Natural Sum ($\sum_{1}^n$)</td>
                <td className="p-3 text-amber-300">`n &le; 1` → return n</td>
                <td className="p-3 text-emerald-300">`n + sum(n - 1)`</td>
                <td className="p-3 text-purple-300">$O(N)$ Time / $O(N)$ Stack Space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Compound Fee Growth</td>
                <td className="p-3 text-amber-300">`years &le; 0` → return principal</td>
                <td className="p-3 text-emerald-300">`calc(principal * (1 + rate), rate, years - 1)`</td>
                <td className="p-3 text-purple-300">$O(Y)$ Time / $O(Y)$ Stack Space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Countdown Print</td>
                <td className="p-3 text-amber-300">`n &lt; 0` → return</td>
                <td className="p-3 text-emerald-300">`print(n); countdown(n - 1)`</td>
                <td className="p-3 text-purple-300">$O(N)$ Time / $O(N)$ Stack Space</td>
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
            RecursiveMethodsFoundationsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates recursive factorial, natural series summation, and compound tuition calculations in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={recurseDemoCode}
          title="RecursiveMethodsFoundationsDemo.java"
          highlightLines={[19, 21, 25, 32, 34, 38, 47, 49, 54]}
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
              <span>❌</span> Pitfall 1: Non-Defensive Base Case with Negative Numbers
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (n == 1) return 1;</code> will crash with <code className="text-rose-400 font-mono">StackOverflowError</code> if passed <code className="text-rose-300 font-mono">-5</code> because <code className="text-slate-300 font-mono">n - 1</code> becomes <code className="text-slate-300 font-mono">-6, -7, ...</code> skipping <code className="text-slate-300 font-mono">1</code>. Always write <code className="text-emerald-400 font-mono">if (n &lt;= 1) return 1;</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Ensure Monotonic Progression Towards Base Case
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always verify that every recursive call strictly reduces problem size (<code className="text-emerald-400 font-mono">n - 1</code>, <code className="text-emerald-400 font-mono">n / 2</code>, <code className="text-emerald-400 font-mono">node.next</code>) to guarantee finite execution.
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
            🤔 <em>&ldquo;Why does calculating <code className="text-emerald-400 font-mono">calculateFactorial(25)</code> return a negative number when using <code className="text-rose-300 font-mono">long</code>?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> 64-Bit Integer Overflow! <code className="text-emerald-400 font-mono">20!</code> is approximately <code className="text-slate-300 font-mono">2.43 &times; 10&#185;&#8312;</code>, which fits inside Java&apos;s 64-bit signed <code className="text-emerald-400 font-mono">long</code> ($9.22 &times; 10^{18}$). For $N &gt; 20$, values wrap around into negative numbers; use <code className="text-emerald-400 font-mono">java.math.BigInteger</code> for arbitrary factorial sizes!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Recursive Methods Foundations FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 12: Recursive Methods Foundations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Recursion is pure mathematical poetry. Always construct your Base Case first to guard against infinite loops, then formulate your Recursive Step. In Topic 13, we look inside the JVM Call Stack and Stack Frames during method execution! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
