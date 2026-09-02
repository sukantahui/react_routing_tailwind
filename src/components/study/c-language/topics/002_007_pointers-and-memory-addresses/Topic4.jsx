import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/DoublePointersDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 4
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Multi-Level Indirection
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Pointers to Pointers: Double Pointers (**ptr) &amp; Pointer Mutation
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Unlock multi-level memory indirection. Discover why modifying caller pointer variables requires double pointers (<code>**ptr</code>), build dynamic 2D matrices on the heap, and master command-line argument arrays (<code>char **argv</code>).
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
                Teacher's Corner: The Treasure Map to Another Treasure Map
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
            In our lab, <strong>Abhronila</strong> tried writing a helper function <code>void allocate(int *p) &#123; p = malloc(100); &#125;</code> to initialize a dynamic buffer in <code>main()</code>. But when she checked <code>main()</code>, her pointer was still <code>NULL</code> and the memory was leaked!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🗺️ The Two-Level Treasure Map
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              A single pointer is a map with an 'X' marking where treasure is buried in the sand. A <strong>Double Pointer (<code>**pp</code>)</strong> is a map that leads to a safety deposit locker containing the treasure map itself!
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              Just like modifying an integer requires passing <code>int*</code>, modifying a caller's pointer address (like giving them a newly allocated heap address from <code>malloc</code>) requires passing <code>int**</code>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Two-Level Pointer Indirection Chain
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Double Pointer Chain: int val = 42; int *pVal = &amp;val; int **ppVal = &amp;pVal;
            </text>

            {/* ppVal box */}
            <g transform="translate(60, 60)">
              <rect x="0" y="0" width="200" height="120" rx="8" fill="#1e293b" stroke="#f472b6" strokeWidth="2" />
              <text x="100" y="25" textAnchor="middle" fill="#f472b6" className="font-bold text-xs">Double Pointer: ppVal</text>
              <rect x="20" y="35" width="160" height="50" rx="4" fill="#0f172a" stroke="#f472b6" />
              <text x="100" y="68" textAnchor="middle" fill="#34d399" className="font-bold text-lg font-mono">0x2000</text>
              <text x="100" y="105" textAnchor="middle" fill="#f59e0b" className="text-[11px] font-mono">
                Address: 0x3000 (8 Bytes)
              </text>
            </g>

            {/* Link ppVal -> pVal */}
            <path d="M 260 120 L 340 120" stroke="#f472b6" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* pVal box */}
            <g transform="translate(360, 60)">
              <rect x="0" y="0" width="200" height="120" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="100" y="25" textAnchor="middle" fill="#818cf8" className="font-bold text-xs">Single Pointer: pVal</text>
              <rect x="20" y="35" width="160" height="50" rx="4" fill="#0f172a" stroke="#818cf8" />
              <text x="100" y="68" textAnchor="middle" fill="#34d399" className="font-bold text-lg font-mono">0x1000</text>
              <text x="100" y="105" textAnchor="middle" fill="#f59e0b" className="text-[11px] font-mono">
                Address: 0x2000 (8 Bytes)
              </text>
            </g>

            {/* Link pVal -> val */}
            <path d="M 560 120 L 640 120" stroke="#818cf8" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* val box */}
            <g transform="translate(660, 60)">
              <rect x="0" y="0" width="200" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="100" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">Target Variable: val</text>
              <rect x="20" y="35" width="160" height="50" rx="4" fill="#0f172a" stroke="#38bdf8" />
              <text x="100" y="70" textAnchor="middle" fill="#fff" className="font-bold text-2xl font-mono">42</text>
              <text x="100" y="105" textAnchor="middle" fill="#f59e0b" className="text-[11px] font-mono">
                Address: 0x1000 (4 Bytes)
              </text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="200" width="800" height="55" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="460" y="225" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
              • ppVal holds &amp;pVal (0x2000) | *ppVal yields pVal (0x1000) | **ppVal retrieves value (42)
            </text>
            <text x="460" y="243" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Assigning **ppVal = 99 directly mutates the integer cell at address 0x1000!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Dynamic 2D Jagged Matrices on Heap
        </h2>
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3 text-xs">
          <p className="text-slate-300 leading-relaxed">
            Double pointers allow allocating 2D grids where each row is an independent heap buffer. This allows each row to have custom variable lengths (Jagged Array)!
          </p>
          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 overflow-x-auto">
{`// 1. Allocate Array of Row Pointers
int **matrix = (int**)malloc(ROWS * sizeof(int*));

// 2. Allocate Column Buffers for each Row
for (int i = 0; i < ROWS; i++) {
    matrix[i] = (int*)malloc(COLS * sizeof(int));
}

// 3. Deallocate in reverse order (Inner rows first!)
for (int i = 0; i < ROWS; i++) free(matrix[i]);
free(matrix);`}
          </pre>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Double Pointer &amp; Heap Allocation Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>DoublePointersDemo.c</code>) demonstrates two-level memory indirection, mutating data via <code>**ppVal</code>, and allocating a dynamic array buffer inside a function using a double pointer argument.
        </p>

        <CFileLoader fileModule={cCode} title="DoublePointersDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Double Pointers (Pointers to Pointers: **ptr)
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Two-Level Indirection Chain:
   • val   = 42 | Address (&val)   = 00000072049FF734
   • pVal  = 00000072049FF734 | Address (&pVal)  = 00000072049FF740
   • ppVal = 00000072049FF740 | Address (&ppVal) = 00000072049FF748

2. Dereferencing Levels:
   • ppVal   (holds &pVal)  = 00000072049FF740
   • *ppVal  (holds &val)   = 00000072049FF734
   • **ppVal (retrieves 42) = 42

   • After **ppVal = 99: val = 99 (Mutated via 2 indirection levels!)

3. Dynamic Array Allocated via Double Pointer Argument:
   [ 10 20 30 40 ]`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Memory Safety Rules
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Leaking Row Buffers During Deallocation:</strong> Freeing <code>free(matrix);</code> before freeing each row <code>free(matrix[i]);</code> causes irreversible heap memory leaks.
          </li>
          <li>
            <strong>Passing Single Pointer to Buffer Allocators:</strong> Calling <code>allocate(ptr)</code> instead of <code>allocate(&amp;ptr)</code> cannot update the caller's pointer address.
          </li>
          <li>
            <strong>Assuming Dynamic 2D Arrays are Contiguous:</strong> Dynamic <code>int **</code> rows reside in scattered heap blocks, unlike flat <code>int[3][4]</code> stack arrays.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does inserting a new node at the head of a linked list in C require a double pointer <code>void insertHead(Node **head, int val);</code>?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_007 Topic 4 FAQs: Double Pointers" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 4 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="module_002_007_topic4_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Double pointers are essential for all dynamic data structures! Whenever you need to build dynamic matrices, trees, or modify caller pointers, double pointers are your weapon of choice. — Sukanta Hui" />
      </section>
    </div>
  );
}
