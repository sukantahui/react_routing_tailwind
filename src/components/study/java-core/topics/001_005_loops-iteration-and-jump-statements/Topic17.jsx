import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import numberDemoCode from "./topic17_files/ClassicNumberLoopProblemsDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMath {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-mt {
            animation: glowMath 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Solving Number-Based Loop Problems: Primes, Armstrong, Palindromes &amp; Fibonacci
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundational suite of algorithmic number theory problems in Java: <code className="text-sky-300 font-mono">O(√N)</code> prime verification, Armstrong digit power summation (<code className="text-emerald-300 font-mono">∑ d^k == N</code>), mathematical palindrome reversal, factorial accumulation, and <code className="text-purple-300 font-mono">O(N)</code> iterative Fibonacci series at Coder &amp; AccoTax Barrackpore.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The 5 Pillars of Number Theory Algorithms
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Number-based loop algorithms form the core problem-solving benchmark in technical interviews:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-sky-300 font-mono">Prime Check (O(√N)):</strong> Tests factors up to <code className="text-sky-300 font-mono">i * i &lt;= N</code> with early exit via <code className="text-rose-400 font-mono">break</code>.
            </li>
            <li>
              <strong className="text-emerald-300 font-mono">Armstrong Check:</strong> Extracts digits (<code className="text-emerald-300 font-mono">t % 10</code>, <code className="text-emerald-300 font-mono">t /= 10</code>) and checks <code className="text-emerald-300 font-mono">∑ d^k == N</code>.
            </li>
            <li>
              <strong className="text-amber-300 font-mono">Palindrome Check:</strong> Reverses digits mathematically via <code className="text-amber-300 font-mono">rev = rev * 10 + digit</code>.
            </li>
            <li>
              <strong className="text-purple-300 font-mono">Fibonacci Series:</strong> Generates terms iteratively in <code className="text-purple-300 font-mono">O(N)</code> time and <code className="text-purple-300 font-mono">O(1)</code> space without recursion.
            </li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Student Security Token Verification):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an identity token authenticator that validates prime numbers (e.g. 29) and Armstrong codes (e.g. 153). Meanwhile, <strong>Abhronila</strong> and <strong>Debangshu</strong> generated Fibonacci payment schedules in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) with 100% precision across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Number Theory Algorithmic Engine Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How digit extraction, factor testing, and state shifting power the 5 classical algorithms:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Number Theory Loop Algorithms Diagram"
          >
            <defs>
              <linearGradient id="gradPrime" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradDigitMath" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradFibo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Prime Check O(sqrt(N)) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradPrime)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Prime Check (O(&radic;N))</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">for (i=2; i*i &lt;= N; i++)</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">if (N % i == 0) break;</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Tests up to &radic;N &rarr; Fast O(&radic;N)!</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Divisibility Gate
            </text>

            {/* Box 2: Digit Extraction (Armstrong/Palindrome) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradDigitMath)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Digit Extraction</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int d = t % 10; t /= 10;</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="10">Palin: rev = rev*10 + d;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Armstrong: sum += Math.pow(d,k);</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Arithmetic Reversal
            </text>

            {/* Box 3: Fibonacci State Shifting */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradFibo)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Fibonacci Shifting</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">long next = a + b;</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">a = b; b = next;</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">O(N) Time | O(1) Memory</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Iterative State Machine
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Mastering number theory loops combines accumulators, digit division, and Big-O optimizations.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Classical Number Theory Algorithms
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Problem</th>
                <th className="p-3 font-semibold text-emerald-400">Loop Mechanics</th>
                <th className="p-3 font-semibold text-amber-400">Time Complexity</th>
                <th className="p-3 font-semibold text-purple-400">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Prime Number Check</td>
                <td className="p-3 text-slate-300">for (int i=2; i*i &lt;= n; i++)</td>
                <td className="p-3 text-emerald-400 font-bold">$O(\sqrt{N})$</td>
                <td className="p-3 text-purple-300">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-300 font-bold">Armstrong Check</td>
                <td className="p-3 text-slate-300">while (t &gt; 0) &#123; sum += pow(t%10, k); t/=10; &#125;</td>
                <td className="p-3 text-emerald-400 font-bold">$O(\log_{10} N)$</td>
                <td className="p-3 text-purple-300">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-300 font-bold">Palindrome Number</td>
                <td className="p-3 text-slate-300">while (t &gt; 0) &#123; rev = rev*10 + t%10; t/=10; &#125;</td>
                <td className="p-3 text-emerald-400 font-bold">$O(\log_{10} N)$</td>
                <td className="p-3 text-purple-300">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">Fibonacci Series</td>
                <td className="p-3 text-slate-300">for (i..) &#123; next = a+b; a=b; b=next; &#125;</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N)$</td>
                <td className="p-3 text-purple-300">$O(1)$</td>
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
            ClassicNumberLoopProblemsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program solves optimized prime verification, Armstrong checks, palindrome reversals, factorials, and Fibonacci sequences in Java.
        </p>

        <JavaFileLoader
          fileModule={numberDemoCode}
          title="ClassicNumberLoopProblemsDemo.java"
          highlightLines={[23, 24, 38, 39, 49, 50, 60, 69, 70]}
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
              <span>❌</span> Pitfall 1: Checking Primes Up to $N$ Instead of $\sqrt{N}$
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int i = 2; i &lt; N; i++)</code> runs in $O(N)$ time. For $N = 10^9$, this performs 1 billion operations, whereas <code className="text-emerald-400 font-mono">i * i &lt;= N</code> performs only 31,622 operations ($O(\sqrt{N})$)!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Iterative Fibonacci Instead of Recursion
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never use naive recursion (<code className="text-rose-300 font-mono">fib(n-1) + fib(n-2)</code>) which explodes in $O(2^N)$ exponential time. Always use the 2-variable iterative loop (<code className="text-emerald-400 font-mono">O(N)</code> time, <code className="text-emerald-400 font-mono">O(1)</code> space).
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
            🤔 <em>&ldquo;Why is `i * i &lt;= N` preferred over `i &lt;= Math.sqrt(N)`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Floating-Point Performance &amp; Precision! Calling <code className="text-rose-300 font-mono">Math.sqrt(N)</code> on every iteration invokes an expensive native CPU floating-point operation. Writing <code className="text-emerald-400 font-bold">i * i &lt;= N</code> uses simple integer multiplication, executing 10x faster with zero floating-point rounding errors!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Number Theory Loop Problems FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 17: Classic Number Theory Loop Problems"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic17_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: These five number problems (Prime, Armstrong, Palindrome, Factorial, Fibonacci) are the bedrock of technical coding interviews. Master the O(sqrt(N)) prime condition and iterative Fibonacci state shifting! In Topic 18, our final topic, we master Loop Performance Best Practices and Hoisting! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
