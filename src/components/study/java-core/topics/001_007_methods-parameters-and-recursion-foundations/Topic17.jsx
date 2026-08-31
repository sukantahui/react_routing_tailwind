import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import showdownDemoCode from "./topic17_files/RecursionVsIterationTradeOffsDemo.java?raw";
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
          @keyframes glowShowdown {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-sd {
            animation: glowShowdown 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Grand Finale: The Architectural Showdown
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Recursion vs. Iteration: Memory, Call Stack &amp; Performance Trade-Offs
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          The definitive synthesis of Module 001_007: empirical nanosecond benchmarks, memory footprint analysis (<code className="text-rose-400 font-mono">O(N) Stack Frames</code> vs <code className="text-emerald-400 font-mono">O(1) Constant Space</code>), CPU instruction overhead, when to choose recursion versus iteration, and tuition ledger processing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Core Architectural Showdown
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Both Recursion and Iteration can solve any computable problem (Church-Turing Thesis). However, their operational profiles differ drastically:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">1. The Recursive Paradigm</h3>
              <p className="text-purple-300 mb-1">Declarative &amp; Self-Referential</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Consumes <code className="text-rose-400 font-mono">O(N)</code> Call Stack memory. Ideal for hierarchical structures (Trees, Graphs, Backtracking, Divide-and-Conquer) where expressiveness outweighs stack overhead.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. The Iterative Paradigm</h3>
              <p className="text-emerald-300 mb-1">Imperative &amp; State-Mutating</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Operates within a single <code className="text-emerald-400 font-mono">O(1)</code> Stack Frame. Guarantees zero stack overflow risk and maximum speed for linear sequences, loops, and large datasets.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Benchmark Suite):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> benchmarked <code className="text-emerald-400 font-mono">fib(35)</code>. Iterative Fibonacci executed in microseconds (<code className="text-emerald-400 font-mono">O(N)</code> time, <code className="text-emerald-400 font-mono">O(1)</code> space), while Naive Recursive Fibonacci took hundreds of milliseconds due to redundant tree evaluations. Meanwhile, summing 8 campus batches totaled <code className="text-emerald-400 font-semibold">₹141,000.00</code> in Indian Rupees (₹) flawlessly across both paradigms.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Architectural Comparison: Recursion vs. Iteration
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing Call Stack frame accumulation with constant-space loop register jumps:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Recursion vs Iteration Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradRecSide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradIterSide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: Recursion */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="225" y="55" fill="#a78bfa" fontSize="13" fontWeight="bold" textAnchor="middle">RECURSION: O(N) STACK FRAMES</text>

            <rect x="45" y="70" width="360" height="30" rx="4" fill="#2e1065" />
            <text x="55" y="90" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Frame N: fact(1) [Base Case Hit]</text>

            <rect x="45" y="105" width="360" height="30" rx="4" fill="#2e1065" />
            <text x="55" y="125" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Frame 2: fact(2) [Waiting for fact(1)]</text>

            <rect x="45" y="140" width="360" height="30" rx="4" fill="#2e1065" />
            <text x="55" y="160" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Frame 1: fact(3) [Waiting for fact(2)]</text>

            <text x="225" y="195" fill="#c4b5fd" fontSize="9" textAnchor="middle">Memory: O(N) Stack Frames | Risk: StackOverflowError</text>
            <text x="225" y="215" fill="#a78bfa" fontSize="10" fontWeight="bold" textAnchor="middle">✓ Supreme Elegance for Trees &amp; Graphs</text>

            {/* Right Panel: Iteration */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">ITERATION: O(1) CONSTANT STACK SPACE</text>

            <rect x="465" y="70" width="370" height="100" rx="6" fill="#022c22" />
            <text x="475" y="95" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Single Stack Frame:</text>
            <text x="475" y="115" fill="#a7f3d0" fontSize="10" fontFamily="monospace">for (int i = 2; i &lt;= n; i++) &#123;</text>
            <text x="495" y="135" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">result *= i; // Mutates local in-place</text>
            <text x="475" y="155" fill="#a7f3d0" fontSize="10" fontFamily="monospace">&#125;</text>

            <text x="650" y="195" fill="#6ee7b7" fontSize="9" textAnchor="middle">Memory: O(1) Single Frame | Zero Stack Overflow Risk</text>
            <text x="650" y="215" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">✓ Maximum Speed for Linear Loops &amp; Sequences</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Master Rule: Use Iteration for linear sequences and high-throughput loops; use Recursion for trees, graphs, and divide-and-conquer.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> The Ultimate Decision Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Dimension</th>
                <th className="p-3 font-semibold text-purple-400">Recursion</th>
                <th className="p-3 font-semibold text-emerald-400">Iteration</th>
                <th className="p-3 font-semibold text-amber-400">Clear Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Stack Memory</td>
                <td className="p-3 text-rose-400 font-sans">$O(N)$ Frames</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ Single Frame</td>
                <td className="p-3 text-emerald-300 font-sans">Iteration wins for large $N$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Execution Speed</td>
                <td className="p-3 text-slate-300 font-sans">Method call overhead</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">Fast CPU branch jumps</td>
                <td className="p-3 text-emerald-300 font-sans">Iteration is faster</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Tree / Graph Traversal</td>
                <td className="p-3 text-purple-400 font-bold font-sans">5 lines of elegant code</td>
                <td className="p-3 text-rose-400 font-sans">40+ lines with manual stack</td>
                <td className="p-3 text-purple-300 font-sans">Recursion wins decisively</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Linear Array Summation</td>
                <td className="p-3 text-rose-400 font-sans">Vulnerable to overflow</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">Simple `for` loop</td>
                <td className="p-3 text-emerald-300 font-sans">Iteration is standard</td>
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
            RecursionVsIterationTradeOffsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program benchmarks recursive versus iterative Factorial, Fibonacci, and tuition fee ledger summation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={showdownDemoCode}
          title="RecursionVsIterationTradeOffsDemo.java"
          highlightLines={[19, 24, 34, 40, 54, 59, 71, 79, 88, 97]}
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
              <span>❌</span> Pitfall 1: Using Recursion for Simple Linear Array Processing
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing a recursive method to sum a 50,000-element array will crash with <code className="text-rose-400 font-mono">StackOverflowError</code> in production. Always use a standard <code className="text-emerald-400 font-mono">for</code> loop or Stream for flat collections.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Recursion for Hierarchical &amp; Branching Data
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When processing Binary Trees, JSON ASTs, or Directory trees, recursive functions are vastly cleaner, easier to maintain, and less error-prone than manual stack simulations.
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
            🤔 <em>&ldquo;Can every recursive algorithm in Java be converted into an iterative loop?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Yes! (Böhm-Jacopini Theorem). Any recursive algorithm can be transformed into an iterative loop by maintaining an explicit Stack (<code className="text-emerald-400 font-mono">ArrayDeque</code>) on the Heap to simulate stack frames!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Recursion vs Iteration FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 17: Recursion vs Iteration Showdown"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic17_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="Heartiest congratulations to Swadeep, Tuhina, Abhronila, and Debangshu! You have successfully completed ALL 18 topics of Module 001_007: Methods, Parameters, Return Types & Recursion Foundations! Next up in our Java Core Journey: Module 001_008 Object-Oriented Programming (OOP) Foundations! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
