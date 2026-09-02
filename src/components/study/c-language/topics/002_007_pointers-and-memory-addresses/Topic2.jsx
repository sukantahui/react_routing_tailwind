import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/PointerArithmeticDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 2
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Memory Navigation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Pointer Arithmetic: Automatic Scaling, Increments, and ptrdiff_t
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Uncover the exact mathematics of pointer arithmetic in C. Understand how pointer additions automatically scale by <code>sizeof(T)</code>, navigate arrays with <code>ptr++</code> and <code>--ptr</code>, compute element distances via <code>ptrdiff_t</code>, and master unary operator precedence.
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
                Teacher's Corner: The Giant Steps of Different Sized Shoes
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
            In our lab, <strong>Tuhina</strong> declared <code>int *pInt = (int*)0x1000;</code> and expected <code>pInt + 1</code> to equal <code>0x1001</code>. When the console printed <code>0x1004</code>, she was astonished!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              👟 Walking with Different Shoe Sizes
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Pointer addition is not simple integer addition! In C, adding <code>+1</code> to a pointer means <em>"Take ONE step forward to the NEXT object of that type"</em>:
            </p>
            <ul className="list-disc pl-5 text-xs md:text-sm text-slate-300 space-y-1">
              <li>A <code>char*</code> wears baby shoes: 1 step = <strong>1 byte</strong>.</li>
              <li>An <code>int*</code> wears running shoes: 1 step = <strong>4 bytes</strong>.</li>
              <li>A <code>double*</code> wears giant boots: 1 step = <strong>8 bytes</strong>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Pointer Arithmetic Scaling in RAM
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              RAM Memory Stride: int arr[4] (Each Step Advances by sizeof(int) = 4 Bytes)
            </text>

            {/* Array Cells */}
            <g transform="translate(60, 60)">
              {[
                { val: 10, addr: "0x1000", offset: "p + 0" },
                { val: 20, addr: "0x1004", offset: "p + 1" },
                { val: 30, addr: "0x1008", offset: "p + 2" },
                { val: 40, addr: "0x100C", offset: "p + 3" },
              ].map((cell, idx) => (
                <g key={idx} transform={`translate(${idx * 200}, 0)`}>
                  <rect x="0" y="0" width="180" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="90" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">{cell.offset}</text>
                  <text x="90" y="58" textAnchor="middle" fill="#fff" className="font-bold text-2xl font-mono">{cell.val}</text>
                  <text x="90" y="80" textAnchor="middle" fill="#f59e0b" className="text-[11px] font-mono">{cell.addr}</text>
                </g>
              ))}
            </g>

            {/* Jump Arrows */}
            <g transform="translate(60, 160)">
              <path d="M 90 0 C 140 -20, 240 -20, 290 0" stroke="#34d399" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
              <text x="190" y="-18" textAnchor="middle" fill="#34d399" className="text-[11px] font-mono font-bold">+4 Bytes</text>

              <path d="M 290 0 C 340 -20, 440 -20, 490 0" stroke="#34d399" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
              <text x="390" y="-18" textAnchor="middle" fill="#34d399" className="text-[11px] font-mono font-bold">+4 Bytes</text>

              <path d="M 490 0 C 540 -20, 640 -20, 690 0" stroke="#34d399" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
              <text x="590" y="-18" textAnchor="middle" fill="#34d399" className="text-[11px] font-mono font-bold">+4 Bytes</text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="200" width="780" height="55" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="450" y="225" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
              • ptrdiff_t distance = (&amp;arr[3] - &amp;arr[0]) = 3 Elements (12 Bytes / 4 Bytes per int)
            </text>
            <text x="450" y="243" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Pointer subtraction returns the element count, not the raw number of bytes!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Unary Operator Precedence Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3 border-b border-slate-700">Expression</th>
                <th className="p-3 border-b border-slate-700">Evaluation Sequence</th>
                <th className="p-3 border-b border-slate-700">Pointer Address</th>
                <th className="p-3 border-b border-slate-700">Pointed Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60 font-mono">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-400">*ptr++</td>
                <td className="p-3">Yield *ptr, then increment ptr</td>
                <td className="p-3 text-amber-300 font-bold">Advances to next cell</td>
                <td className="p-3 text-slate-400">Unchanged</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-400">*++ptr</td>
                <td className="p-3">Increment ptr first, then yield *ptr</td>
                <td className="p-3 text-amber-300 font-bold">Advances to next cell</td>
                <td className="p-3 text-slate-400">Unchanged</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-sky-300">(*ptr)++</td>
                <td className="p-3">Yield *ptr, then increment data in RAM</td>
                <td className="p-3 text-slate-400">Unchanged</td>
                <td className="p-3 text-emerald-400 font-bold">Increments data by 1</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-sky-300">++*ptr</td>
                <td className="p-3">Increment data in RAM first, then yield result</td>
                <td className="p-3 text-slate-400">Unchanged</td>
                <td className="p-3 text-emerald-400 font-bold">Increments data by 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Pointer Arithmetic &amp; Scaling Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>PointerArithmeticDemo.c</code>) proves automatic scaling across <code>char</code>, <code>int</code>, and <code>double</code>, traverses an array with pointer increments, and calculates distances via <code>ptrdiff_t</code>.
        </p>

        <CFileLoader fileModule={cCode} title="PointerArithmeticDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Pointer Arithmetic & Automatic Type Scaling
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Pointer Scaling Proof (Advancing by 1 Step):
   • pChar = 0000004AE0BFF730 | pChar + 1 = 0000004AE0BFF731 (Diff: 1 Byte - sizeof(char))
   • pInt  = 0000004AE0BFF740 | pInt + 1  = 0000004AE0BFF744 (Diff: 4 Bytes - sizeof(int))
   • pDbl  = 0000004AE0BFF750 | pDbl + 1  = 0000004AE0BFF758 (Diff: 8 Bytes - sizeof(double))

2. Array Traversal via Pointer Increment (*ptr++):
   Values: [ 10 20 30 40 50 ]

3. Pointer Subtraction & Distance (ptrdiff_t):
   • pStart = 0000004AE0BFF740 (intArr[0])
   • pEnd   = 0000004AE0BFF750 (intArr[4])
   • Element Distance (pEnd - pStart) = 4 elements apart!

4. Pointer Relational Comparisons (p1 < p2):
   ✓ pStart (< 0000004AE0BFF740) appears earlier in memory than pEnd (0000004AE0BFF750).`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Arithmetic Rules
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Adding Two Pointers (<code>p1 + p2</code>):</strong> Illegal in C! You can add an integer to a pointer, but you cannot add two pointers together.
          </li>
          <li>
            <strong>Arithmetic on <code>void*</code>:</strong> <code>void*</code> has no size; performing <code>ptr++</code> on a void pointer violates standard ISO C. Always cast to <code>(char*)</code> or <code>(uint8_t*)</code>.
          </li>
          <li>
            <strong>Subtracting Pointers from Different Arrays:</strong> Pointer subtraction <code>p2 - p1</code> is only defined if both pointers belong to the same array object.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>p[-1]</code> compile and work perfectly in C when <code>int *p = arr + 1;</code>? 
          <em>(Hint: <code>p[-1]</code> is mathematically expanded by the compiler to <code>*(p + (-1))</code>!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_007 Topic 2 FAQs: Pointer Arithmetic" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 2 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note"
          downloadFileName="module_002_007_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Pointer arithmetic is the beating heart of fast memory traversal. Always remember: when you add 1 to a pointer, you advance by the byte size of its data type! — Sukanta Hui" />
      </section>
    </div>
  );
}
