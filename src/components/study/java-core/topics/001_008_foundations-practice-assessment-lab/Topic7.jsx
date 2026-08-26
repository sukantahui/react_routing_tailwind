import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import binDemoCode from "./topic7_files/RecursiveBinarySearchAlgorithmsDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBin {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-bn {
            animation: glowBin 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 7 · Divide &amp; Conquer
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Implementing Recursive Binary Search in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the optimal logarithmic search algorithm: divide-and-conquer recurrence <code className="text-emerald-400 font-mono">T(N) = T(N/2) + O(1)</code>, critical 32-bit integer overflow protection with <code className="text-sky-300 font-mono">low + (high - low) / 2</code>, and first/last duplicate occurrence variations.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> How Recursive Binary Search Halves Search Space
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Operating on a <strong>strictly sorted array</strong>, binary search eliminates half the remaining elements in each step:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Base Case: low &gt; high</h3>
              <p className="text-sky-300 mb-1">if (low &gt; high) return -1;</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Terminates the search when the range is empty (element does not exist in array).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Midpoint Overflow Guard</h3>
              <p className="text-emerald-300 mb-1">low + (high - low) / 2</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Guards against integer overflow when <code className="text-emerald-400 font-mono">low + high</code> exceeds <code className="text-slate-300 font-mono">Integer.MAX_VALUE</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Recursive Sub-Problem</h3>
              <p className="text-purple-300 mb-1">mid - 1 OR mid + 1</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Discards the irrelevant half, reducing problem size from $N \to N/2$ in <code className="text-purple-300 font-mono">O(log N)</code> time.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Student Roll Database):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> searched for roll <code className="text-emerald-400 font-mono">130</code> in sorted ledger <code className="text-sky-300 font-mono">[101, 105, 112, 118, 125, 130, 142, 150, 165, 180]</code>, finding index <code className="text-emerald-400 font-semibold">5</code> in only 3 comparisons, while <strong>Tuhina</strong> located the first occurrence of duplicated score <code className="text-purple-300 font-mono">70</code> at index <code className="text-purple-300 font-semibold">2</code>!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Algorithmic Visualizations: Execution Tree &amp; Midpoint Overflow Guard
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Tracing recursive call halving and the arithmetic overflow safety mechanism:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Binary Search Execution Diagram"
          >
            <defs>
              <linearGradient id="gradBinRec" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradOverSafe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: Recursive Halving Tree (Target: 130) */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. RECURSIVE TRACE (Searching 130)</text>

            <rect x="45" y="70" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">Step 1: low=0, high=9 | mid=4 (val=125 &lt; 130)</text>

            <rect x="45" y="110" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">Step 2: low=5, high=9 | mid=7 (val=150 &gt; 130)</text>

            <rect x="45" y="150" width="360" height="40" rx="4" fill="#022c22" />
            <text x="55" y="174" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">Step 3: low=5, high=6 | mid=5 (val=130 == 130 ✓)</text>

            <text x="225" y="220" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">Found at Index 5 in exactly 3 steps!</text>

            {/* Right Panel: Integer Overflow Protection */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. MIDPOINT INTEGER OVERFLOW GUARD</text>

            <rect x="465" y="70" width="370" height="45" rx="6" fill="#450a0a" />
            <text x="475" y="90" fill="#fca5a5" fontSize="10" fontWeight="bold">❌ BUG: (low + high) / 2</text>
            <text x="475" y="105" fill="#fecaca" fontSize="9" fontFamily="monospace">If low+high &gt; 2,147,483,647 &rarr; Neg Index Crash!</text>

            <rect x="465" y="125" width="370" height="45" rx="6" fill="#022c22" />
            <text x="475" y="145" fill="#a7f3d0" fontSize="10" fontWeight="bold">✓ SAFE: low + (high - low) / 2</text>
            <text x="475" y="160" fill="#6ee7b7" fontSize="9" fontFamily="monospace">Difference never overflows 32-bit int bounds!</text>

            <text x="650" y="215" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Standard Joshua Bloch JDK Fix</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Binary search divides sorted space by 2 on each step; safe midpoint computation protects against Integer.MAX_VALUE overflow.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Binary Search Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Variant</th>
                <th className="p-3 font-semibold text-emerald-400">Time Complexity</th>
                <th className="p-3 font-semibold text-purple-400">Space Complexity</th>
                <th className="p-3 font-semibold text-amber-400">Key Feature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Recursive Binary Search</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(\log N)$</td>
                <td className="p-3 text-slate-300 font-sans">$O(\log N)$ stack</td>
                <td className="p-3 text-slate-300 font-sans">Clean divide-and-conquer structure</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Iterative Binary Search</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(\log N)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ constant</td>
                <td className="p-3 text-slate-300 font-sans">Zero stack frame overhead (Production optimal)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">First Occurrence Search</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(\log N)$</td>
                <td className="p-3 text-slate-300 font-sans">$O(\log N)$ stack</td>
                <td className="p-3 text-slate-300 font-sans">Locates leftmost match in duplicated arrays</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Linear Search (Unsorted)</td>
                <td className="p-3 text-rose-400 font-sans">$O(N)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ constant</td>
                <td className="p-3 text-slate-300 font-sans">Works on unsorted arrays (much slower for large $N$)</td>
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
            RecursiveBinarySearchAlgorithmsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements recursive binary search, safe midpoint computation, and first occurrence search on duplicated arrays.
        </p>

        <JavaFileLoader
          fileModule={binDemoCode}
          title="RecursiveBinarySearchAlgorithmsDemo.java"
          highlightLines={[19, 21, 26, 29, 34, 43, 48, 59, 64, 78, 89]}
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
              <span>❌</span> Pitfall 1: Calling Binary Search on Unsorted Data
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Binary search assumes a sorted sequence; running it on an unsorted array produces wrong answers or returns <code className="text-rose-300 font-mono">-1</code> even when the target is present. Always ensure data is sorted first!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `low + (high - low) / 2`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always use the subtraction-based midpoint formula to prevent integer overflow in large datasets approaching 2 billion elements.
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
            🤔 <em>&ldquo;How many comparisons are needed to search through 1 billion sorted student IDs?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The Power of Logarithmic Scaling! Because $\log_2(1,000,000,000) \approx 30$, binary search finds any element in 1 billion records in at most <strong>30 comparisons</strong>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Binary Search FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 7: Recursive Binary Search"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic7_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Binary search is the cornerstone of efficient data retrieval. Always remember the midpoint overflow guard! In Topic 8, we master Algorithmic Problem 8: Armstrong Numbers in a Given Range! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
