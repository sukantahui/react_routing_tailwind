import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/ArrayOfStringsDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_006 · Topic 4
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Multi-String Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Array of Strings: 2D Character Arrays vs. Array of String Pointers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master text collection architectures in C. Compare contiguous 2D character tables against ragged pointer arrays, analyze internal memory fragmentation tradeoffs, and implement high-performance alphabetical sorting.
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
                Teacher's Corner: The Heavy Cabinet vs. Index Card File
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
            In our Barrackpore lab, <strong>Swadeep</strong> and <strong>Abhronila</strong> were sorting a list of 10,000 student names alphabetically. Swadeep used a 2D array <code>char names[10000][50]</code> and called <code>strcpy()</code> on every swap, which took several seconds. Abhronila used an array of string pointers <code>char *names[10000]</code> and sorted them in milliseconds!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🗄️ Moving Heavy Furniture vs. Swapping Index Cards
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              In a 2D char array, swapping two names means physically carrying 50 bytes of furniture between rooms using <code>strcpy()</code>. In an array of pointers, the names stay exactly where they are in memory—you simply swap two lightweight <strong>8-byte business cards</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: 2D Fixed Grid vs. Jagged Pointer Array
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans">
            {/* 2D Fixed Array */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="380" height="220" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="190" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
                2D Array: char list[3][15] (Fixed Grid)
              </text>

              {/* Row 0 */}
              <rect x="20" y="55" width="220" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" />
              <text x="130" y="78" textAnchor="middle" fill="#fff" className="font-mono text-xs">"Swadeep\0"</text>
              <rect x="245" y="55" width="115" height="35" rx="4" fill="#e11d48" opacity="0.4" />
              <text x="302" y="78" textAnchor="middle" fill="#fecdd3" className="text-[10px]">Wasted Padding</text>

              {/* Row 1 */}
              <rect x="20" y="100" width="220" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" />
              <text x="130" y="123" textAnchor="middle" fill="#fff" className="font-mono text-xs">"Tuhina\0"</text>
              <rect x="245" y="100" width="115" height="35" rx="4" fill="#e11d48" opacity="0.4" />
              <text x="302" y="123" textAnchor="middle" fill="#fecdd3" className="text-[10px]">Wasted Padding</text>

              {/* Row 2 */}
              <rect x="20" y="145" width="220" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" />
              <text x="130" y="168" textAnchor="middle" fill="#fff" className="font-mono text-xs">"Roy\0"</text>
              <rect x="245" y="145" width="115" height="35" rx="4" fill="#e11d48" opacity="0.4" />
              <text x="302" y="168" textAnchor="middle" fill="#fecdd3" className="text-[10px]">Wasted Padding</text>
            </g>

            {/* Pointer Array */}
            <g transform="translate(500, 40)">
              <rect x="0" y="0" width="380" height="220" rx="10" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
              <text x="190" y="30" textAnchor="middle" fill="#818cf8" className="font-bold text-sm">
                Pointer Array: char *list[3] (Ragged / Zero Waste)
              </text>

              {/* Pointers */}
              <rect x="20" y="55" width="120" height="35" rx="4" fill="#1e293b" stroke="#818cf8" />
              <text x="80" y="78" textAnchor="middle" fill="#818cf8" className="font-mono text-xs font-bold">ptr[0] (0x100)</text>
              <path d="M 140 72 L 200 72" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="200" y="55" width="160" height="35" rx="4" fill="#1e293b" stroke="#34d399" />
              <text x="280" y="78" textAnchor="middle" fill="#34d399" className="font-mono text-xs">"Swadeep\0"</text>

              <rect x="20" y="100" width="120" height="35" rx="4" fill="#1e293b" stroke="#818cf8" />
              <text x="80" y="123" textAnchor="middle" fill="#818cf8" className="font-mono text-xs font-bold">ptr[1] (0x200)</text>
              <path d="M 140 117 L 200 117" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="200" y="100" width="160" height="35" rx="4" fill="#1e293b" stroke="#34d399" />
              <text x="280" y="123" textAnchor="middle" fill="#34d399" className="font-mono text-xs">"Tuhina\0"</text>

              <rect x="20" y="145" width="120" height="35" rx="4" fill="#1e293b" stroke="#818cf8" />
              <text x="80" y="168" textAnchor="middle" fill="#818cf8" className="font-mono text-xs font-bold">ptr[2] (0x300)</text>
              <path d="M 140 162 L 200 162" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="200" y="145" width="160" height="35" rx="4" fill="#1e293b" stroke="#34d399" />
              <text x="280" y="168" textAnchor="middle" fill="#34d399" className="font-mono text-xs">"Roy\0"</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Tradeoff Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-sky-300 text-sm">2D Character Array (`char a[M][N]`)</h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Memory:</strong> Fixed $M \times N$ contiguous bytes.</li>
              <li>• <strong>Mutating Text:</strong> ✅ Allowed (in-place stack mutable).</li>
              <li>• <strong>Sorting Cost:</strong> $O(N)$ memory copying per swap using <code>strcpy</code>.</li>
              <li>• <strong>Ideal For:</strong> Fixed-length fields (e.g. phone numbers, codes).</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-indigo-300 text-sm">Array of Pointers (`char *a[M]`)</h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>• <strong>Memory:</strong> Exact character bytes + $M \times 8$ bytes for pointers.</li>
              <li>• <strong>Mutating Text:</strong> ❌ Read-only if pointing to string literals.</li>
              <li>• <strong>Sorting Cost:</strong> $O(1)$ instantaneous pointer address swap.</li>
              <li>• <strong>Ideal For:</strong> Dictionaries, CLI arguments (<code>argv</code>), menus.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Array of Strings &amp; Sorting Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ArrayOfStringsDemo.c</code>) demonstrates both 2D character arrays and arrays of character pointers, and compares buffer copying versus instantaneous pointer swapping during alphabetical sorting.
        </p>

        <CFileLoader fileModule={cCode} title="ArrayOfStringsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Array of Strings: 2D Char Arrays vs Pointer Arrays
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Unsorted 2D Character Array:
   [0] Swadeep Mukherjee    (Address: 0000007FE9DFF780, Stride: 30 B)
   [1] Tuhina Paul          (Address: 0000007FE9DFF79E, Stride: 30 B)
   [2] Abhronila Das        (Address: 0000007FE9DFF7BC, Stride: 30 B)
   [3] Debangshu Roy        (Address: 0000007FE9DFF7DA, Stride: 30 B)
   [4] Arindam Hui          (Address: 0000007FE9DFF7F8, Stride: 30 B)

2. Alphabetically Sorted 2D Student Array:
   [1] Abhronila Das
   [2] Arindam Hui
   [3] Debangshu Roy
   [4] Swadeep Mukherjee
   [5] Tuhina Paul

3. Array of String Pointers (Before Sort):
   [0] Shyamnagar      (Points to: 00007FF619A02010 in .rodata)
   [1] Barrackpore     (Points to: 00007FF619A02020 in .rodata)
   [2] Naihati         (Points to: 00007FF619A02030 in .rodata)
   [3] Ichapur         (Points to: 00007FF619A02040 in .rodata)
   [4] Kolkata         (Points to: 00007FF619A02050 in .rodata)

4. Alphabetically Sorted String Pointers (Lightning Fast O(1) Swaps):
   [1] Barrackpore
   [2] Ichapur
   [3] Kolkata
   [4] Naihati
   [5] Shyamnagar`}
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
            <strong>Confusing 2D Array with Double Pointer:</strong> Passing <code>char names[5][30]</code> to a function expecting <code>char **names</code> causes a compiler warning and runtime crash! A contiguous 2D grid is not an array of pointers.
          </li>
          <li>
            <strong>Attempting to Modify String Literals in Pointer Arrays:</strong> Writing <code>cities[0][0] = 'K'</code> on an array of string literals crashes with Segmentation Fault.
          </li>
          <li>
            <strong>Forgetting Null-Terminator in 2D Column Limits:</strong> Ensure column width is at least 1 byte larger than the longest expected word to prevent missing <code>\0</code>.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why are terminal command-line arguments in C declared as <code>char *argv[]</code> (array of pointers) instead of <code>char argv[50][100]</code>? 
          <em>(Hint: Consider arbitrary user argument lengths and zero memory copying!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_006 Topic 4 FAQs: Array of Strings" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_006 Topic 4 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="module_002_006_topic4_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Whenever you need to sort, filter, or reorder thousands of strings in C, always use an array of pointers! Swapping pointer addresses takes only 8 bytes and delivers instantaneous O(1) performance. — Sukanta Hui" />
      </section>
    </div>
  );
}
