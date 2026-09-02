import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/Array1DBasicsDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_005 · Topic 0
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Intermediate C · Data Sequences
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          1D Arrays, Contiguous Memory Architecture &amp; Indexing Mechanics
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Explore how the C compiler maps one-dimensional arrays directly to contiguous physical RAM cells, understand zero-based offset arithmetic, and master array lifecycle management from declaration to boundary protection.
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
                Teacher's Corner: Contiguous Memory &amp; The Zero-Index Logic
              </h2>
              <p className="text-xs text-indigo-300/80">
                A classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Insight
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Debangshu</strong> were writing a program to record physics lab test marks for 50 students. Swadeep initially declared 50 separate integer variables: <code>m1, m2, m3... m50</code>.
          </p>
          <p>
            <strong>Sukanta Hui</strong> asked the class: <em>"How would you find the highest mark or calculate the class average without writing 50 separate if-statements?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              💡 The Railway Train Analogy
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Think of individual variables as detached houses scattered across Barrackpore and Shyamnagar. Finding them requires navigating to 50 distinct addresses. An <strong>Array</strong>, however, is like a <strong>railway train</strong> connected coach-to-coach in consecutive physical order. If you know where the locomotive starts (the base address <code>&amp;arr[0]</code>), reaching coach <code>i</code> simply requires taking <code>i</code> uniform steps!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Contiguous RAM Memory Layout
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            {/* Title / Base address label */}
            <text x="460" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Integer Array: int scores[5] = &#123;85, 92, 78, 96, 88&#125; (4 Bytes Per Element)
            </text>

            {/* Element 0 */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="50" y="60" width="150" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="125" y="95" textAnchor="middle" fill="#38bdf8" className="font-bold text-lg">85</text>
              <text x="125" y="125" textAnchor="middle" fill="#94a3b8" className="text-xs">scores[0]</text>
              <text x="125" y="180" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono">0x7FFE00 (Base)</text>
              <text x="125" y="200" textAnchor="middle" fill="#64748b" className="text-[11px] font-mono">*(scores + 0)</text>
            </g>

            {/* Element 1 */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="210" y="60" width="150" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="285" y="95" textAnchor="middle" fill="#818cf8" className="font-bold text-lg">92</text>
              <text x="285" y="125" textAnchor="middle" fill="#94a3b8" className="text-xs">scores[1]</text>
              <text x="285" y="180" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono">0x7FFE04 (+4B)</text>
              <text x="285" y="200" textAnchor="middle" fill="#64748b" className="text-[11px] font-mono">*(scores + 1)</text>
            </g>

            {/* Element 2 */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="370" y="60" width="150" height="90" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="445" y="95" textAnchor="middle" fill="#34d399" className="font-bold text-lg">78</text>
              <text x="445" y="125" textAnchor="middle" fill="#94a3b8" className="text-xs">scores[2]</text>
              <text x="445" y="180" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono">0x7FFE08 (+8B)</text>
              <text x="445" y="200" textAnchor="middle" fill="#64748b" className="text-[11px] font-mono">*(scores + 2)</text>
            </g>

            {/* Element 3 */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="530" y="60" width="150" height="90" rx="8" fill="#1e293b" stroke="#f472b6" strokeWidth="2" />
              <text x="605" y="95" textAnchor="middle" fill="#f472b6" className="font-bold text-lg">96</text>
              <text x="605" y="125" textAnchor="middle" fill="#94a3b8" className="text-xs">scores[3]</text>
              <text x="605" y="180" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono">0x7FFE0C (+12B)</text>
              <text x="605" y="200" textAnchor="middle" fill="#64748b" className="text-[11px] font-mono">*(scores + 3)</text>
            </g>

            {/* Element 4 */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="690" y="60" width="150" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="765" y="95" textAnchor="middle" fill="#38bdf8" className="font-bold text-lg">88</text>
              <text x="765" y="125" textAnchor="middle" fill="#94a3b8" className="text-xs">scores[4]</text>
              <text x="765" y="180" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono">0x7FFE10 (+16B)</text>
              <text x="765" y="200" textAnchor="middle" fill="#64748b" className="text-[11px] font-mono">*(scores + 4)</text>
            </g>

            {/* Bottom calculation note */}
            <rect x="50" y="235" width="790" height="32" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="445" y="256" textAnchor="middle" fill="#93c5fd" className="text-xs font-mono">
              Formula: Address(&amp;scores[i]) = BaseAddress + (i * sizeof(int)) → O(1) Access Time
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Initialization &amp; Memory Allocation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300 text-sm">1. Static Stack Allocation</h3>
            <p className="text-slate-300 font-mono text-emerald-400">int arr[5];</p>
            <p className="text-slate-400 leading-relaxed">
              Allocates 20 consecutive bytes on the current function stack frame. Elements are not cleared and hold random stack garbage until written.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300 text-sm">2. Partial Initialization Rule</h3>
            <p className="text-slate-300 font-mono text-emerald-400">int arr[5] = &#123;10, 20&#125;;</p>
            <p className="text-slate-400 leading-relaxed">
              ISO C standard guarantees that any trailing unspecified slots are automatically zero-initialized (<code>arr[2]=0, arr[3]=0, arr[4]=0</code>).
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300 text-sm">3. Inferred Dimensioning</h3>
            <p className="text-slate-300 font-mono text-emerald-400">int arr[] = &#123;1, 2, 3&#125;;</p>
            <p className="text-slate-400 leading-relaxed">
              The C compiler automatically counts the initializer elements and fixes the array size at 3 (<code>sizeof(arr) = 12 bytes</code>).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: 1D Array Contiguous Memory &amp; Statistics Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The following program (<code>Array1DBasicsDemo.c</code>) demonstrates how 1D arrays allocate contiguous memory, prints physical byte addresses for each element, demonstrates both subscripting (<code>arr[i]</code>) and pointer offset notation (<code>*(arr + i)</code>), and computes statistical aggregates.
        </p>

        <CFileLoader fileModule={cCode} title="Array1DBasicsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 1D Array Contiguous Memory Layout & Traversal
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

Array Base Address (scores / &scores[0]): 000000E9E8BFF810
Element Size: 4 bytes | Total Array Size: 20 bytes

----------------------------------------------------------------------
Index   | Memory Address   | Value    | Subscript    | Pointer Offset
----------------------------------------------------------------------
[0]     | 000000E9E8BFF810   | 85       | scores[0]=85   | *(scores+0)=85  
[1]     | 000000E9E8BFF814   | 92       | scores[1]=92   | *(scores+1)=92  
[2]     | 000000E9E8BFF818   | 78       | scores[2]=78   | *(scores+2)=78  
[3]     | 000000E9E8BFF81C   | 96       | scores[3]=96   | *(scores+3)=96  
[4]     | 000000E9E8BFF820   | 88       | scores[4]=88   | *(scores+4)=88  
----------------------------------------------------------------------

📊 Array Statistical Summary:
 • Total Elements : 5
 • Sum of Scores  : 439
 • Class Average  : 87.80
 • Highest Score  : 96
 • Lowest Score   : 78`}
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
            <strong>Out-of-Bounds Indexing:</strong> C has zero runtime boundary protection. Accessing <code>scores[5]</code> on a 5-element array accesses unowned stack memory and leads to Undefined Behavior (UB) or stack corruption!
          </li>
          <li>
            <strong>Array Identifier is a Non-Modifiable Lvalue:</strong> You cannot perform <code>arr1 = arr2;</code>. To copy elements, use a <code>for</code> loop or <code>memcpy()</code> from <code>&lt;string.h&gt;</code>.
          </li>
          <li>
            <strong>Massive Arrays on Stack:</strong> Declaring <code>int arr[10000000];</code> inside a function will exhaust stack limits (~1MB to 8MB) and instantly crash with a Segmentation Fault. Use <code>static</code> or heap <code>malloc()</code> instead.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>i[arr]</code> compile and produce the exact same result as <code>arr[i]</code> in C? 
          <em>(Hint: Look at the mathematical addition under the dereference operator: <code>*(arr + i) == *(i + arr)</code>!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_005 Topic 0 FAQs: 1D Arrays & Memory Layout" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_005 Topic 0 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note"
          downloadFileName="module_002_005_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always remember: in C, arrays do not know their own length! Keep the array size in a dedicated constant or variable and pass it alongside the array pointer. — Sukanta Hui" />
      </section>
    </div>
  );
}
