import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/SortingAlgorithmsDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_005 · Topic 3
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Elementary Sorting Paradigms
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Sorting Algorithms in C: Bubble Sort, Selection Sort &amp; Insertion Sort
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the mechanics of fundamental $O(n^2)$ sorting routines. Trace pass-by-pass data swaps, analyze time/space complexities, explore stability, and understand early-exit optimizations.
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
                Teacher's Corner: The 3 Daily Life Sorting Paradigms
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
            When <strong>Swadeep</strong> and <strong>Tuhina</strong> were organizing lab exam report cards at our Barrackpore center, <strong>Sukanta Hui</strong> demonstrated the three natural ways humans sort objects:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-sky-500/30 space-y-2">
              <span className="text-sky-300 font-bold text-sm block">1. Bubble Sort (Water Bubble):</span>
              <p className="text-slate-300">
                You walk along the row, comparing adjacent cards. If a heavy card is ahead of a lighter card, swap them. After one pass, the heaviest card bubbles to the rightmost edge!
              </p>
            </div>
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-emerald-500/30 space-y-2">
              <span className="text-emerald-300 font-bold text-sm block">2. Selection Sort (Talent Scout):</span>
              <p className="text-slate-300">
                Scan the entire unorganized pile to spot the single smallest number. Pick it up and swap it directly into position 0. Then scan the rest for the next minimum!
              </p>
            </div>
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-purple-500/30 space-y-2">
              <span className="text-purple-300 font-bold text-sm block">3. Insertion Sort (Playing Cards):</span>
              <p className="text-slate-300">
                Hold sorted cards in your left hand. Pick a new card from the table, shift the larger cards to the right, and slide the new card into its exact slot!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Bubble Sort Pass 1 Execution
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Bubble Sort Pass 1: [64, 25, 12, 22, 11] → Largest Element 64 Bubbles to End
            </text>

            {/* Compare 64 & 25 */}
            <g transform="translate(60, 60)">
              <text x="0" y="20" fill="#f59e0b" className="text-xs font-bold">Step 1: 64 &gt; 25 → Swap!</text>
              <rect x="0" y="30" width="45" height="40" rx="6" fill="#e11d48" />
              <text x="22" y="55" textAnchor="middle" fill="#fff" className="font-bold text-xs">25</text>
              <rect x="55" y="30" width="45" height="40" rx="6" fill="#38bdf8" />
              <text x="77" y="55" textAnchor="middle" fill="#fff" className="font-bold text-xs">64</text>
              <rect x="110" y="30" width="45" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="132" y="55" textAnchor="middle" fill="#94a3b8" className="text-xs">12</text>
              <rect x="165" y="30" width="45" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="187" y="55" textAnchor="middle" fill="#94a3b8" className="text-xs">22</text>
              <rect x="220" y="30" width="45" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="242" y="55" textAnchor="middle" fill="#94a3b8" className="text-xs">11</text>
            </g>

            {/* Compare 64 & 12 */}
            <g transform="translate(360, 60)">
              <text x="0" y="20" fill="#f59e0b" className="text-xs font-bold">Step 2: 64 &gt; 12 → Swap!</text>
              <rect x="0" y="30" width="45" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="22" y="55" textAnchor="middle" fill="#94a3b8" className="text-xs">25</text>
              <rect x="55" y="30" width="45" height="40" rx="6" fill="#e11d48" />
              <text x="77" y="55" textAnchor="middle" fill="#fff" className="font-bold text-xs">12</text>
              <rect x="110" y="30" width="45" height="40" rx="6" fill="#38bdf8" />
              <text x="132" y="55" textAnchor="middle" fill="#fff" className="font-bold text-xs">64</text>
              <rect x="165" y="30" width="45" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="187" y="55" textAnchor="middle" fill="#94a3b8" className="text-xs">22</text>
              <rect x="220" y="30" width="45" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="242" y="55" textAnchor="middle" fill="#94a3b8" className="text-xs">11</text>
            </g>

            {/* End of Pass 1 result */}
            <g transform="translate(200, 160)">
              <text x="260" y="20" textAnchor="middle" fill="#10b981" className="text-xs font-bold">End of Pass 1: [25, 12, 22, 11, 64] → 64 is Locked in Final Position!</text>
              <rect x="100" y="30" width="55" height="45" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="127" y="58" textAnchor="middle" fill="#94a3b8" className="text-sm font-mono">25</text>
              <rect x="165" y="30" width="55" height="45" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="192" y="58" textAnchor="middle" fill="#94a3b8" className="text-sm font-mono">12</text>
              <rect x="230" y="30" width="55" height="45" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="257" y="58" textAnchor="middle" fill="#94a3b8" className="text-sm font-mono">22</text>
              <rect x="295" y="30" width="55" height="45" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="322" y="58" textAnchor="middle" fill="#94a3b8" className="text-sm font-mono">11</text>
              <rect x="360" y="30" width="55" height="45" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="2" />
              <text x="387" y="58" textAnchor="middle" fill="#fff" className="font-bold text-sm font-mono">64 ✓</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Comparison of Sorting Algorithms
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3 border-b border-slate-700">Algorithm</th>
                <th className="p-3 border-b border-slate-700">Best Case</th>
                <th className="p-3 border-b border-slate-700">Average Case</th>
                <th className="p-3 border-b border-slate-700">Worst Case</th>
                <th className="p-3 border-b border-slate-700">Swaps / Writes</th>
                <th className="p-3 border-b border-slate-700">Stability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-sky-300">Bubble Sort (Optimized)</td>
                <td className="p-3 text-emerald-400 font-mono">O(n)</td>
                <td className="p-3 text-rose-400 font-mono">O(n^2)</td>
                <td className="p-3 text-rose-400 font-mono">O(n^2)</td>
                <td className="p-3 font-mono">O(n^2)</td>
                <td className="p-3 text-emerald-400 font-semibold">Stable</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-amber-300">Selection Sort</td>
                <td className="p-3 text-rose-400 font-mono">O(n^2)</td>
                <td className="p-3 text-rose-400 font-mono">O(n^2)</td>
                <td className="p-3 text-rose-400 font-mono">O(n^2)</td>
                <td className="p-3 font-mono text-emerald-400">O(n) (Max n-1)</td>
                <td className="p-3 text-rose-400 font-semibold">Unstable</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-400">Insertion Sort</td>
                <td className="p-3 text-emerald-400 font-mono">O(n)</td>
                <td className="p-3 text-rose-400 font-mono">O(n^2)</td>
                <td className="p-3 text-rose-400 font-mono">O(n^2)</td>
                <td className="p-3 font-mono">O(n^2) Shifts</td>
                <td className="p-3 text-emerald-400 font-semibold">Stable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Sorting Algorithms Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The following program (<code>SortingAlgorithmsDemo.c</code>) demonstrates Bubble Sort (with early break flag), Selection Sort (min index swapping), and Insertion Sort (in-place key shifting).
        </p>

        <CFileLoader fileModule={cCode} title="SortingAlgorithmsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 C Sorting Algorithms: Bubble, Selection & Insertion
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

Initial Unsorted Array : [ 64 25 12 22 11 90 45 ]

   ↳ Bubble Sort finished in 6 passes (10 swaps)
Bubble Sorted        : [ 11 12 22 25 45 64 90 ]

   ↳ Selection Sort finished with 5 swaps (Min-index selection)
Selection Sorted     : [ 11 12 22 25 45 64 90 ]

   ↳ Insertion Sort finished with 10 shifts (Card-hand insertion)
Insertion Sorted     : [ 11 12 22 25 45 64 90 ]`}
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
            <strong>Missing Inner Loop Range Offset in Bubble Sort:</strong> In Bubble Sort, running the inner loop up to <code>n - 1</code> instead of <code>n - 1 - i</code> causes redundant comparisons against already sorted elements at the tail.
          </li>
          <li>
            <strong>Forgetting Early-Exit Flag in Bubble Sort:</strong> Without the <code>swapped</code> check, Bubble Sort runs in $O(n^2)$ time even when given a completely sorted array.
          </li>
          <li>
            <strong>Off-By-One Index in Insertion Sort:</strong> The inner <code>while</code> loop must guard with <code>j &gt;= 0</code> before checking <code>arr[j] &gt; key</code> to prevent negative array indexing out-of-bounds!
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does Selection Sort perform significantly fewer memory write operations (at most $n-1$ swaps) compared to Bubble Sort (up to $n^2$ swaps)? Why is this critical in microcontroller EEPROM/Flash memory systems?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_005 Topic 3 FAQs: Sorting Algorithms" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_005 Topic 3 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note"
          downloadFileName="module_002_005_topic3_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="When asked in technical interviews why Insertion Sort is taught despite its O(n^2) worst case, always highlight that it runs in O(n) on nearly-sorted data and forms the bedrock of production hybrid algorithms like Timsort and Introsort! — Sukanta Hui" />
      </section>
    </div>
  );
}
