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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Implementing Recursive Binary Search in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the optimal logarithmic search algorithm: divide-and-conquer recurrence <code className="text-emerald-400 font-mono">T(N) = T(N/2) + O(1)</code>, critical 32-bit integer overflow protection with <code className="text-sky-300 font-mono">low + (high - low) / 2</code>, and first/last duplicate occurrence variations.
        </p>
      </header>

      {/* Section 1: Problem Definition & Specifications */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
            <span>🎯</span> Problem Definition &amp; Clear Algorithmic Specifications
          </h2>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded-full w-fit">
            Foundations Assessment Lab · Problem 7
          </span>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          In this algorithmic lab, you are required to implement <strong>divide-and-conquer Recursive Binary Search</strong> on sorted arrays. You must write exact recursion base cases, protect against 32-bit midpoint integer overflow, and implement duplicate boundary searches using Java Foundations constructs.
        </p>

        {/* Two Columns / Cards for Problem 7A and Problem 7B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Classic Recursive Binary Search */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-sky-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-sky-950 text-sky-400 border border-sky-800">
                  Problem 7A
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  O(log N) Time · Recursion Call Stack
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Classic Recursive Binary Search
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Given a sorted integer array <code className="text-sky-300 font-mono">arr</code> in ascending order and a target value <code className="text-sky-300 font-mono">target</code>, locate the index of target by recursively halving the search interval <code className="text-emerald-400 font-mono">[low, high]</code>.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-sky-300">int[] arr (sorted), int target, int low, int high</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">int index (0-based, or -1 if not found)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Mid Formula:</span>
                  <span className="col-span-2 text-slate-300"><code className="text-sky-300">low + (high - low) / 2</code> (prevents overflow)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Base Case:</span>
                  <span className="col-span-2 text-slate-300"><code className="text-sky-300">if (low &gt; high) return -1;</code></span>
                </div>
              </div>

              {/* Concrete Example */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Concrete Recursion Trace:</p>
                <div className="p-3 bg-slate-900/95 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-400">arr = [10, 20, 30, 40, 50, 60, 70], target = 50</div>
                  <div className="text-sky-300 text-[11px]">Frame 1: low=0, high=6 → mid=3 (arr[3]=40 &lt; 50) → search [4, 6]</div>
                  <div className="text-sky-300 text-[11px]">Frame 2: low=4, high=6 → mid=5 (arr[5]=60 &gt; 50) → search [4, 4]</div>
                  <div className="text-sky-300 text-[11px]">Frame 3: low=4, high=4 → mid=4 (arr[4]=50 == 50) → MATCH!</div>
                  <div className="text-emerald-400 font-semibold pt-1 border-t border-slate-800 text-[11px]">
                    Return Index: 4 (Found in 3 recursive steps!)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Duplicate Boundary Search */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-purple-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-400 border border-purple-800">
                  Problem 7B
                </span>
                <span className="text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/50 px-2 py-0.5 rounded">
                  O(log N) Time · Boundary Isolation
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                First &amp; Last Occurrence in Duplicates
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                When a sorted array contains duplicate occurrences of <code className="text-purple-300 font-mono">target</code>, standard binary search may land on any copy. Modify the search logic to isolate the <strong>exact first or last occurrence</strong> in O(log N) time.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-purple-300">int[] arr (with duplicates), int target</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">int firstIdx, int lastIdx</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">First Occur:</span>
                  <span className="col-span-2 text-slate-300">On match, record <code className="text-purple-300">ans = mid</code>; continue left <code className="text-purple-300">high = mid - 1</code></span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Last Occur:</span>
                  <span className="col-span-2 text-slate-300">On match, record <code className="text-purple-300">ans = mid</code>; continue right <code className="text-purple-300">low = mid + 1</code></span>
                </div>
              </div>

              {/* Concrete Example */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Concrete Boundary Walkthrough:</p>
                <div className="p-3 bg-slate-900/95 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-400">arr = [10, 20, 20, 20, 20, 30, 40], target = 20</div>
                  <div className="text-purple-300 text-[11px]">First Occurrence search: finds 20 at mid=3, continues left → Index 1</div>
                  <div className="text-purple-300 text-[11px]">Last Occurrence search: finds 20 at mid=3, continues right → Index 4</div>
                  <div className="text-emerald-400 font-semibold pt-1 border-t border-slate-800 text-[11px]">
                    Frequency Count: (4 - 1 + 1) = 4 occurrences in O(log N) time!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Conceptual Foundation */}
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
                Discards the irrelevant half, reducing problem size from N → N/2 in <code className="text-purple-300 font-mono">O(log N)</code> time.
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
            <text x="475" y="105" fill="#fecaca" fontSize="9" fontFamily="monospace">If low+high &gt; 2,147,483,647 → Neg Index Crash!</text>

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
                <td className="p-3 text-emerald-400 font-bold font-sans">O(log N)</td>
                <td className="p-3 text-slate-300 font-sans">O(log N) stack</td>
                <td className="p-3 text-slate-300 font-sans">Clean divide-and-conquer structure</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Iterative Binary Search</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(log N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) constant</td>
                <td className="p-3 text-slate-300 font-sans">Zero stack frame overhead (Production optimal)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">First Occurrence Search</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(log N)</td>
                <td className="p-3 text-slate-300 font-sans">O(log N) stack</td>
                <td className="p-3 text-slate-300 font-sans">Locates leftmost match in duplicated arrays</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Linear Search (Unsorted)</td>
                <td className="p-3 text-rose-400 font-sans">O(N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) constant</td>
                <td className="p-3 text-slate-300 font-sans">Works on unsorted arrays (much slower for large N)</td>
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
          highlightLines={[19, 23, 28, 42, 47, 62, 68, 80, 97, 107]}
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
            👉 <strong>Hint:</strong> The Power of Logarithmic Scaling! Because log₂(1,000,000,000) ≈ 30, binary search finds any element in 1 billion records in at most <strong>30 comparisons</strong>!
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
