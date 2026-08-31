import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import numericalDemoCode from "./topic16_files/NumericalPatternsDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowNumerical {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-nm {
            animation: glowNumerical 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Numerical Patterns: Floyd&apos;s Triangle, Pascal&apos;s Triangle &amp; Binary Parity
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master mathematical numerical patterns in Java: persistent counter accumulation in Floyd&apos;s Triangle, coordinate parity in binary alternating patterns (<code className="text-sky-300 font-mono">(r + c) % 2</code>), palindromic number pyramids, and $O(1)$ binomial recurrence in Pascal&apos;s Triangle at Coder &amp; AccoTax Barrackpore.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Mathematical Foundations of Numerical Patterns
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Numerical patterns combine loop geometry with discrete mathematical algorithms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-emerald-300 font-mono">Floyd&apos;s Triangle:</strong> Uses a single persistent counter outside the loops (<code className="text-emerald-300 font-mono">int count = 1; count++;</code>).
            </li>
            <li>
              <strong className="text-sky-300 font-mono">Binary Alternating:</strong> Relies on coordinate sum parity (<code className="text-sky-300 font-mono">(r + c) % 2 == 0 ? 1 : 0</code>).
            </li>
            <li>
              <strong className="text-purple-300 font-mono">Pascal&apos;s Triangle:</strong> Generates binomial combinations in $O(1)$ space using <code className="text-purple-300 font-mono">val = val * (r - c) / (c + 1)</code>.
            </li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Exam Token Allocation):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> generated sequential exam seating tokens ($1 \dots 10$) across 4 tiered lab rows using Floyd&apos;s Triangle. Meanwhile, <strong>Abhronila</strong> and <strong>Debangshu</strong> implemented Pascal&apos;s Triangle to project scholarship bracket probabilities in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 3 Major Numerical Pattern Architectures
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How numerical sequences, parity checks, and binomial coefficients operate in loops:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Numerical Patterns Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradFloyd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBinary" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradPascal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Floyd's Triangle */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradFloyd)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Floyd&apos;s Triangle</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int count = 1;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">print(count++);</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Row 1: 1 | Row 2: 2 3 | Row 3: 4 5 6</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Persistent Natural Counter
            </text>

            {/* Box 2: Binary Parity */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradBinary)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Binary Alternating</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">if ((r + c) % 2 == 0)</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;print(1); else print(0);</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Row 1: 1 | Row 2: 0 1 | Row 3: 1 0 1</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Coordinate Parity Checker
            </text>

            {/* Box 3: Pascal's Triangle */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradPascal)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Pascal&apos;s Triangle</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="10" fontFamily="monospace">val = val * (r-c)/(c+1);</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Binomial C(n, k)</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Row 3: 1 3 3 1</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Binomial Recurrence O(1)
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Numerical patterns combine loop indexing with mathematical properties (parity, natural series, binomials).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Key Numerical Pattern Algorithms
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Pattern Name</th>
                <th className="p-3 font-semibold text-emerald-400">Core Mathematical Formula</th>
                <th className="p-3 font-semibold text-purple-400">Sample Row Output ($r=3$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-400 font-bold">Floyd&apos;s Triangle</td>
                <td className="p-3 text-slate-300">count++ (persistent outer counter)</td>
                <td className="p-3 text-emerald-300">4  5  6</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-400 font-bold">Binary Alternating</td>
                <td className="p-3 text-slate-300">(r + c) % 2 == 0 ? 1 : 0</td>
                <td className="p-3 text-sky-300">1  0  1</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-400 font-bold">Palindromic Pyramid</td>
                <td className="p-3 text-slate-300">Ascending (1..r) + Descending (r-1..1)</td>
                <td className="p-3 text-amber-300">1  2  3  2  1</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-400 font-bold">Pascal&apos;s Triangle</td>
                <td className="p-3 text-slate-300">val = val * (r - c) / (c + 1)</td>
                <td className="p-3 text-purple-300">1  3  3  1</td>
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
            NumericalPatternsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program generates Floyd&apos;s Triangle, Binary Parity Triangles, Palindromic Pyramids, and Pascal&apos;s Triangle in Java.
        </p>

        <JavaFileLoader
          fileModule={numericalDemoCode}
          title="NumericalPatternsDemo.java"
          highlightLines={[21, 24, 33, 44, 46, 56, 57]}
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
              <span>❌</span> Pitfall 1: Re-declaring Floyd&apos;s Counter Inside the Outer Row Loop
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Declaring <code className="text-rose-300 font-mono">for (r..) &#123; int count = 1; ... &#125;</code> resets the counter to 1 on every row, producing <code className="text-slate-300 font-mono">1 / 1 2 / 1 2 3</code> instead of Floyd&apos;s <code className="text-emerald-400 font-mono">1 / 2 3 / 4 5 6</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use the $O(1)$ Recurrence for Pascal&apos;s Triangle
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never compute Pascal&apos;s Triangle using full factorial formulas (<code className="text-rose-300 font-mono">n! / (k!(n-k)!)</code>) because factorials overflow 64-bit <code className="text-slate-300 font-mono">long</code> at $N=21$. Always use the recurrence relation <code className="text-emerald-400 font-mono">val * (r - c) / (c + 1)</code>.
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
            🤔 <em>&ldquo;Why does row $N$ of Pascal&apos;s Triangle always sum to $2^N$?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The Binomial Expansion! By the Binomial Theorem, <code className="text-emerald-300 font-mono">(1 + 1)^N = \sum_{k=0}^N \binom{N}{k} = 2^N</code>. For Row 3 ($1, 3, 3, 1$), the sum is <code className="text-sky-300 font-mono">1 + 3 + 3 + 1 = 8 = 2^3</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Numerical Patterns FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 16: Numerical Patterns"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic16_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Numerical patterns bridge basic loops to mathematical algorithms and dynamic programming. Master Floyd's persistent counter and Pascal's binomial recurrence! In Topic 17, we tackle Classic Number Theory Loop Problems: Primes, Armstrong, Palindromes, and Fibonacci! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
