import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sortDemoCode from "./topic12_files/BasicSortingAlgorithmsDemo.java?raw";
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
          @keyframes glowSort {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-so {
            animation: glowSort 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Algorithm Fundamentals
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Basic Array Sorting: Bubble Sort, Selection Sort &amp; Insertion Sort
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master foundational $O(N^2)$ sorting algorithms in Java: optimized Bubble Sort with early-exit flag, Selection Sort with $O(N)$ minimum swaps, adaptive Insertion Sort prefix shifting, algorithm stability analysis, and student merit rank ordering in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Triad of Elementary Sorting Algorithms
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Sorting rearranges elements into ascending or descending numerical order:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Bubble Sort (Stable)</h3>
              <p className="text-emerald-300 mb-2">if (a[j] &gt; a[j+1]) swap();</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                Swaps adjacent out-of-order pairs. Largest values bubble up to the end. <code className="text-emerald-400 font-mono">O(N)</code> best case with early-exit flag.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Selection Sort (Unstable)</h3>
              <p className="text-sky-300 mb-2">min = findMin(suffix); swap();</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                Selects the minimum element from the unsorted suffix and swaps it to the front. Minimizes write operations to exactly <code className="text-sky-300 font-mono">O(N)</code> swaps.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Insertion Sort (Stable)</h3>
              <p className="text-purple-300 mb-2">shift(a[j] &gt; key); insert();</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                Shifts larger elements in the sorted prefix to insert the key into its correct relative slot. Adaptive <code className="text-purple-300 font-mono">O(N)</code> for nearly-sorted data.
              </p>
            </div>
          </div>

          <p>
            <strong>JDK Hybrid Implementations:</strong> Modern Java uses <em>Dual-Pivot Quicksort</em> for primitives and <em>TimSort</em> for objects, both utilizing Insertion Sort as their low-overhead base case for small arrays!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Merit Rank &amp; Fee Sorting):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> sorted unorganized tuition records in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹25,000</code>). Selection sort performed the fewest write swaps, while insertion sort ordered partially organized student records with near-instantaneous linear speed across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Sorting Architectures: Adjacent, Selection &amp; Insertion
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How data moves inside the 3 classical sorting algorithms:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Basic Sorting Algorithms Diagram"
          >
            <defs>
              <linearGradient id="gradBubble" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradSelection" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradInsertion" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Bubble Sort */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradBubble)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Bubble Sort (Stable)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Compare (a[j], a[j+1])</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="10">Max bubbles to end &rarr;</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Early exit if swapped == false</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Adjacent Pair Swapping
            </text>

            {/* Box 2: Selection Sort */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradSelection)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Selection Sort (Unstable)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="10" fontFamily="monospace">Scan suffix for MIN index</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="10">Single swap with front i</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Minimum writes: O(N) swaps</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Minimum Index Selection
            </text>

            {/* Box 3: Insertion Sort */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradInsertion)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Insertion Sort (Stable)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Pick key = a[i]</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="10">Shift larger left elements</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Adaptive O(N) for nearly sorted</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Sorted Prefix Insertion
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Bubble: Adjacent swaps | Selection: Minimum O(N) swaps | Insertion: Adaptive O(N) on sorted prefixes.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Algorithm Complexity &amp; Stability Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Algorithm</th>
                <th className="p-3 font-semibold text-emerald-400">Best-Case Time</th>
                <th className="p-3 font-semibold text-purple-400">Average / Worst Time</th>
                <th className="p-3 font-semibold text-amber-400">Total Swaps</th>
                <th className="p-3 font-semibold text-sky-300">Stability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-400 font-bold">Bubble Sort</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N)$ (with flag)</td>
                <td className="p-3 text-rose-400">$O(N^2)$</td>
                <td className="p-3 text-rose-400">$O(N^2)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Stable</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-400 font-bold">Selection Sort</td>
                <td className="p-3 text-rose-400">$O(N^2)$</td>
                <td className="p-3 text-rose-400">$O(N^2)$</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N)$ (Min writes)</td>
                <td className="p-3 text-rose-400 font-sans">❌ Unstable</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-400 font-bold">Insertion Sort</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N)$ (Adaptive)</td>
                <td className="p-3 text-rose-400">$O(N^2)$</td>
                <td className="p-3 text-rose-400">$O(N^2)$ (Shifts)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Stable</td>
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
            BasicSortingAlgorithmsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program benchmarks optimized bubble sort, selection sort, and insertion sort on cloned student fee arrays in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={sortDemoCode}
          title="BasicSortingAlgorithmsDemo.java"
          highlightLines={[21, 23, 31, 41, 49, 63, 67]}
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
              <span>❌</span> Pitfall 1: Forgetting the Early-Exit Flag in Bubble Sort
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Without the <code className="text-rose-300 font-mono">swapped</code> flag, Bubble Sort takes $O(N^2)$ time even on already-sorted arrays. Adding <code className="text-emerald-400 font-mono">if (!swapped) break;</code> enables $O(N)$ linear best-case execution!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Insertion Sort for Nearly-Sorted Slices
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Insertion Sort is the most cache-friendly algorithm for nearly-sorted data or small array partitions ($N \le 47$), which is why it is embedded directly inside the JDK&apos;s <code className="text-emerald-400 font-mono">Arrays.sort()</code> engine.
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
            🤔 <em>&ldquo;Why is Selection Sort unstable while Insertion Sort is stable?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Long-Range vs Adjacent Swaps! Selection Sort performs a long-range jump across multiple elements (e.g. swapping the minimum <code className="text-sky-300 font-mono">2</code> in <code className="text-slate-300 font-mono">[4A, 4B, 2]</code> with <code className="text-rose-400 font-mono">4A</code> jumps past <code className="text-purple-300 font-mono">4B</code>, producing <code className="text-rose-400 font-mono">[2, 4B, 4A]</code>). Insertion sort strictly shifts adjacent elements, preserving duplicate order!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Basic Sorting Algorithms FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 12: Basic Sorting Algorithms"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: These three sorting algorithms form the conceptual foundation of computational complexity and algorithm stability. Master Bubble's early exit, Selection's O(N) minimum swaps, and Insertion's adaptive prefix shifts! In Topic 13, we master Finding Min, Max, 2nd Max, and Average in a single pass! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
