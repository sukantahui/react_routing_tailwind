import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/SearchingAlgorithmsDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_005 · Topic 2
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Algorithmic Search Foundations
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Searching Algorithms: Linear Search vs. Binary Search &amp; Complexity Analysis
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Compare sequential linear scanning against logarithmic divide-and-conquer binary search. Master step-by-step trace mechanics, calculate best/average/worst case bounds, and understand integer overflow safeguards.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
                Teacher's Corner: The Dictionary Lookup &amp; Guessing Game
              </h2>
              <p className="text-xs text-indigo-300/80">
                Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Insight
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Abhronila</strong> and <strong>Swadeep</strong> were challenged to find a contact number in a telephone directory of 1,000,000 citizens in Barrackpore and Naihati.
          </p>
          <p>
            Abhronila proposed starting from page 1 and reading every single name line-by-line (<strong>Linear Search</strong>). If the desired person was on page 999,999, it would take hours!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              📖 The Power of Logarithmic Halving (Binary Search)
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Because a telephone directory is already sorted alphabetically, Swadeep opened the directory exactly in the middle. Seeing that the target name starts with 'S', he instantly discarded the first 500,000 names! With each split, the remaining space halves: 1,000,000 → 500,000 → 250,000... In just <strong>20 flips</strong> ($2^{20} = 1,048,576$), he found the exact entry! That is the difference between $O(n)$ and $O(\log n)$.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Binary Search Divide-and-Conquer Trace
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans">
            <text x="460" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Binary Search on Target = 175 | Step-by-Step Halving Trace
            </text>

            {/* Step 1 */}
            <g transform="translate(40, 60)">
              <text x="0" y="20" fill="#f59e0b" className="font-bold text-xs">Step 1: low=0, high=11, mid=5 [142 &lt; 175] → Search Right Half (low = 6)</text>
              <rect x="0" y="30" width="840" height="35" rx="6" fill="#1e293b" stroke="#475569" />
              {/* Highlight mid */}
              <rect x="350" y="30" width="70" height="35" rx="6" fill="#e11d48" opacity="0.6" />
              <text x="385" y="53" textAnchor="middle" fill="#fff" className="font-mono text-xs font-bold">142 (mid)</text>
            </g>

            {/* Step 2 */}
            <g transform="translate(40, 140)">
              <text x="0" y="20" fill="#f59e0b" className="font-bold text-xs">Step 2: low=6, high=11, mid=8 [175 == 175] → MATCH FOUND! Index = 8</text>
              <rect x="0" y="30" width="420" height="35" rx="6" fill="#0f172a" stroke="#334155" opacity="0.4" />
              <text x="210" y="53" textAnchor="middle" fill="#64748b" className="text-xs">Discarded Left Half (0..5)</text>

              <rect x="420" y="30" width="420" height="35" rx="6" fill="#1e293b" stroke="#38bdf8" />
              {/* Highlight found */}
              <rect x="560" y="30" width="70" height="35" rx="6" fill="#10b981" />
              <text x="595" y="53" textAnchor="middle" fill="#fff" className="font-mono text-xs font-bold">175 (Found!)</text>
            </g>

            {/* Bottom summary badge */}
            <rect x="40" y="240" width="840" height="40" rx="8" fill="#1e1e2e" stroke="#334155" />
            <text x="460" y="265" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
              ✓ Linear Search took 9 comparisons | Binary Search took only 2 comparisons!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Algorithm Complexity Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3 border-b border-slate-700">Algorithm</th>
                <th className="p-3 border-b border-slate-700">Array Requirement</th>
                <th className="p-3 border-b border-slate-700">Best Case</th>
                <th className="p-3 border-b border-slate-700">Average Case</th>
                <th className="p-3 border-b border-slate-700">Worst Case</th>
                <th className="p-3 border-b border-slate-700">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-amber-300">Linear Search</td>
                <td className="p-3">Unsorted or Sorted</td>
                <td className="p-3 text-emerald-400 font-mono">O(1)</td>
                <td className="p-3 text-amber-400 font-mono">O(n)</td>
                <td className="p-3 text-rose-400 font-mono">O(n)</td>
                <td className="p-3 font-mono">O(1)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-400">Binary Search (Iterative)</td>
                <td className="p-3 font-semibold text-rose-300">Must Be Sorted!</td>
                <td className="p-3 text-emerald-400 font-mono">O(1)</td>
                <td className="p-3 text-emerald-400 font-mono">O(log n)</td>
                <td className="p-3 text-emerald-400 font-mono">O(log n)</td>
                <td className="p-3 font-mono">O(1)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-indigo-400">Binary Search (Recursive)</td>
                <td className="p-3 font-semibold text-rose-300">Must Be Sorted!</td>
                <td className="p-3 text-emerald-400 font-mono">O(1)</td>
                <td className="p-3 text-emerald-400 font-mono">O(log n)</td>
                <td className="p-3 text-emerald-400 font-mono">O(log n)</td>
                <td className="p-3 text-amber-400 font-mono">O(log n) Stack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Search Algorithms Benchmark Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>SearchingAlgorithmsDemo.c</code>) demonstrates both Linear and Binary search side-by-side with step comparisons counters on identical datasets.
        </p>

        <CFileLoader fileModule={cCode} title="SearchingAlgorithmsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Searching Algorithms: Linear Search vs Binary Search
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

Dataset: [ 102 108 115 120 134 142 150 168 175 190 205 220 ] (Size: 12)

🔍 1. Running Linear Search for Roll #175...
   ✓ Found at index [8] in 9 comparisons (Time: O(n))

⚡ 2. Running Binary Search for Roll #175...
   ✓ Found at index [8] in 2 comparisons (Time: O(log n))

🔎 3. Worst-Case Search (Missing Element #999):
   • Linear Search required: 12 comparisons (Full array scan)
   • Binary Search required: 4 comparisons (Logarithmic tree halving)`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Applying Binary Search on Unsorted Data:</strong> Binary search will fail silently or return false negatives if the dataset is not strictly ordered.
          </li>
          <li>
            <strong>Integer Overflow in Midpoint Calculation:</strong> Never write <code>(low + high) / 2</code>. When indices are large, their sum can exceed <code>INT_MAX</code>. Always use <code>low + (high - low) / 2</code>.
          </li>
          <li>
            <strong>Infinite Loop in Binary Search:</strong> Ensure loop updates adjust boundaries strictly: <code>low = mid + 1</code> or <code>high = mid - 1</code>. Omitting the <code>+1</code> or <code>-1</code> causes an infinite loop when <code>low == high</code>.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          If you have an unsorted array of 1,000,000 elements and you only need to perform a <strong>single search</strong>, is it faster to sort the array first (taking $O(n \log n)$) and then do Binary Search, or just do a single Linear Search ($O(n)$)? 
          <em>(Hint: $O(n) &lt; O(n \log n)$!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_005 Topic 2 FAQs: Searching Algorithms" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_005 Topic 2 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note"
          downloadFileName="module_002_005_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always test your Binary Search with boundary conditions: searching for the first element, last element, and an element smaller than all or greater than all elements in the array! — Sukanta Hui" />
      </section>
    </div>
  );
}
