import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import treeDemoCode from "./topic14_files/RecursiveTreesAndUnwindingDemo.java?raw";
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
          @keyframes glowTree {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-tr {
            animation: glowTree 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 14
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Tree Recursion &amp; DFS Traversal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Visualizing Recursive Execution Trees &amp; Stack Unwinding
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the execution dynamics of multi-branch tree recursion: understanding Depth-First Search (DFS) call evaluation, visualizing the Fibonacci branching tree, identifying redundant sub-problems, and multi-tier student discount algorithms in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of Multi-Branch Tree Recursion
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            While linear recursion produces a simple straight chain of stack frames, <strong>Tree Recursion</strong> spawns multiple recursive calls per frame, generating an exponential hierarchy of sub-problems:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">1. DFS Traversal Order</h3>
              <p className="text-purple-300 mb-1">Left Branch First</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                The JVM dives completely down the leftmost child branch until hitting a base case before unwinding to explore the right branch.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-2">2. Exponential Complexity</h3>
              <p className="text-rose-300 mb-1">O(2^N) Time</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Without memoization, the tree doubles in size at each step, recomputing identical sub-problems (like <code className="text-rose-300 font-mono">fib(2)</code>) multiple times.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">3. Stack Unwinding</h3>
              <p className="text-emerald-300 mb-1">Result Bubble-Up</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Base case leaves return immediate values that bubble back up the suspended stack frames, combining left and right sub-results.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Multi-Tier Discount Tree):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> traced <code className="text-emerald-400 font-mono">calculateTieredScholarship(3, 20000.0)</code> across 3 tier levels. The execution branched into 60% academic bonus and 40% attendance bonus at each tier, aggregating leaf base case values cleanly into a final <code className="text-emerald-400 font-semibold">₹1,000.00</code> scholarship discount in Indian Rupees (₹).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Fibonacci(4) Binary Recursive Execution Tree
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the DFS execution order, redundant sub-trees, and stack unwinding:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 300"
            className="w-full h-auto"
            aria-label="Fibonacci Recursive Tree Diagram"
          >
            <defs>
              <linearGradient id="gradRootNode" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradMidNode" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradLeafBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradRedundant" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Connecting Tree Lines */}
            {/* Level 0 to Level 1 */}
            <path d="M 440 55 L 260 105" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 440 55 L 620 105" stroke="#64748b" strokeWidth="2" fill="none" />

            {/* Level 1 to Level 2 */}
            <path d="M 260 125 L 160 175" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 260 125 L 360 175" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 620 125 L 540 175" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 620 125 L 700 175" stroke="#64748b" strokeWidth="2" fill="none" />

            {/* Level 2 to Level 3 */}
            <path d="M 160 195 L 100 245" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 160 195 L 200 245" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 540 195 L 500 245" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 540 195 L 580 245" stroke="#64748b" strokeWidth="2" fill="none" />

            {/* Level 0: Root Node fib(4) */}
            <rect x="370" y="25" width="140" height="35" rx="8" fill="url(#gradRootNode)" />
            <text x="440" y="47" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(4) = 3</text>

            {/* Level 1: fib(3) and fib(2) */}
            <rect x="200" y="95" width="120" height="32" rx="6" fill="url(#gradMidNode)" />
            <text x="260" y="116" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(3) = 2</text>

            <rect x="560" y="95" width="120" height="32" rx="6" fill="url(#gradRedundant)" />
            <text x="620" y="116" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(2) = 1 [DUP]</text>

            {/* Level 2 Nodes */}
            <rect x="110" y="165" width="100" height="30" rx="6" fill="url(#gradMidNode)" />
            <text x="160" y="185" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(2) = 1</text>

            <rect x="310" y="165" width="100" height="30" rx="6" fill="url(#gradLeafBase)" />
            <text x="360" y="185" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(1) = 1 [Leaf]</text>

            <rect x="490" y="165" width="100" height="30" rx="6" fill="url(#gradRedundant)" />
            <text x="540" y="185" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(2) [DUP]</text>

            <rect x="650" y="165" width="100" height="30" rx="6" fill="url(#gradLeafBase)" />
            <text x="700" y="185" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(1) = 1 [Leaf]</text>

            {/* Level 3 Leaf Base Cases */}
            <rect x="60" y="235" width="80" height="28" rx="4" fill="url(#gradLeafBase)" />
            <text x="100" y="253" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(1) = 1</text>

            <rect x="160" y="235" width="80" height="28" rx="4" fill="url(#gradLeafBase)" />
            <text x="200" y="253" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(0) = 0</text>

            <rect x="460" y="235" width="80" height="28" rx="4" fill="url(#gradLeafBase)" />
            <text x="500" y="253" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(1) = 1</text>

            <rect x="540" y="235" width="80" height="28" rx="4" fill="url(#gradLeafBase)" />
            <text x="580" y="253" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">fib(0) = 0</text>

            {/* Bottom Caption */}
            <text x="440" y="288" fill="#94a3b8" fontSize="11" textAnchor="middle">
              Red nodes indicate redundant duplicate sub-problems. Memoization caches sub-results to prune O(2^N) trees to O(N).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Linear Recursion vs. Binary Tree Recursion
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Metric</th>
                <th className="p-3 font-semibold text-emerald-400">Linear Recursion (Factorial)</th>
                <th className="p-3 font-semibold text-rose-400">Tree Recursion (Naive Fibonacci)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Calls per Method Frame</td>
                <td className="p-3 text-emerald-300 font-sans">Exactly 1 call per frame</td>
                <td className="p-3 text-rose-400 font-sans">2 or more calls per frame</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Execution Graph Shape</td>
                <td className="p-3 text-emerald-300 font-sans">Single straight chain</td>
                <td className="p-3 text-rose-400 font-sans">Exponentially branching tree</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Time Complexity</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N)$ Linear</td>
                <td className="p-3 text-rose-400 font-bold font-sans">$O(2^N)$ Exponential</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Stack Space Complexity</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$ stack space</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$ stack space (Tree height)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Redundant Sub-problems?</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">None (zero duplication)</td>
                <td className="p-3 text-rose-400 font-sans">Severe duplication (needs Memoization)</td>
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
            RecursiveTreesAndUnwindingDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates indented DFS execution tracing for Fibonacci trees and multi-tier student scholarship branching in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={treeDemoCode}
          title="RecursiveTreesAndUnwindingDemo.java"
          highlightLines={[18, 20, 24, 29, 30, 33, 42, 49, 50, 52, 62, 68]}
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
              <span>❌</span> Pitfall 1: Un-Memoized Tree Recursion for Large Inputs
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Calling naive <code className="text-rose-300 font-mono">fib(50)</code> requires over <code className="text-rose-400 font-mono">1.12 &times; 10&#185;&#8309;</code> operations, freezing the JVM for hours! Always use memoization or dynamic programming for tree recursion.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Indented Logging for Recursive Debugging
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Pass a <code className="text-emerald-400 font-mono">depth</code> parameter and indent log messages (<code className="text-emerald-400 font-mono">&quot; &quot;.repeat(depth)</code>) to visually inspect stack winding and unwinding during development.
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
            🤔 <em>&ldquo;If a binary tree of depth $N$ has $2^N$ nodes, why does naive Fibonacci only consume $O(N)$ Call Stack memory?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> DFS Stack Height! The JVM does not evaluate all $2^N$ nodes simultaneously. It dives down one branch, pops the frames upon hitting the base case, and reuses that stack space for the next branch, meaning maximum concurrent stack frames never exceed tree height ($N$)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Recursive Trees & Unwinding FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 14: Recursive Trees & Stack Unwinding"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic14_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Execution trees give you visual mastery over recursion. Always remember: the JVM evaluates in DFS order (left branch completely before right). In Topic 15, we diagnose StackOverflowError causes and prevention! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
