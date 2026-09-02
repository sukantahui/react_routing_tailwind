import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/PointerArrayEquivalenceDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 3
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Language Duality
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Pointer &amp; Array Equivalence: arr[i] vs. *(arr + i) and Array Decay
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Demystify the deep architectural equivalence between arrays and pointers in C. Learn why <code>arr[i]</code> is pure syntactic sugar for <code>*(arr + i)</code>, explore compiler array decay mechanics, and master the critical difference between <code>arr</code> and <code>&amp;arr</code>.
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
                Teacher's Corner: The Magic of 2[arr]
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
            During a systems architecture session, <strong>Sukanta Hui</strong> wrote <code>printf("%d", 2[arr]);</code> on the whiteboard. <strong>Debangshu</strong> immediately said: <em>"Sir, that will give a syntax error! The number 2 cannot have brackets!"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🧙‍♂️ The Subscript Syntactic Sugar
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              The C compiler has NO concept of array index lookup instructions! Whenever the compiler encounters <code>arr[2]</code>, it converts it directly into <code>*(arr + 2)</code>.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              Because addition is commutative ($A + B = B + A$), <code>*(arr + 2)</code> is mathematically identical to <code>*(2 + arr)</code>, which can also be written in reverse subscript syntax as <code>2[arr]</code>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: arr vs. &amp;arr Pointer Type Stride
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Critical Difference: arr (int*) vs &amp;arr (int(*)[5]) on int arr[5] (Base = 0x1000)
            </text>

            {/* Memory Cells */}
            <g transform="translate(60, 60)">
              {[0, 1, 2, 3, 4].map((idx) => (
                <g key={idx} transform={`translate(${idx * 160}, 0)`}>
                  <rect x="0" y="0" width="140" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="70" y="32" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">arr[{idx}]</text>
                  <text x="70" y="55" textAnchor="middle" fill="#f59e0b" className="text-[10px] font-mono">
                    0x{1000 + idx * 4}
                  </text>
                </g>
              ))}
            </g>

            {/* arr + 1 jump (+4 Bytes) */}
            <g transform="translate(60, 150)">
              <path d="M 70 0 C 110 -20, 190 -20, 230 0" stroke="#34d399" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
              <text x="150" y="-15" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
                arr + 1 (+4 Bytes → arr[1] at 0x1004)
              </text>
            </g>

            {/* &arr + 1 jump (+20 Bytes) */}
            <g transform="translate(60, 180)">
              <path d="M 70 0 C 350 -40, 550 -40, 870 0" stroke="#f43f5e" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
              <text x="470" y="-25" textAnchor="middle" fill="#f43f5e" className="text-xs font-mono font-bold">
                &amp;arr + 1 (+20 Bytes → past entire array to 0x1014!)
              </text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="210" width="800" height="50" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="460" y="240" textAnchor="middle" fill="#94a3b8" className="text-xs">
              arr points to the 1st integer element; &amp;arr points to the ENTIRE 5-integer array block in RAM!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: The 4 Equivalent Access Expressions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-750 text-center space-y-1">
            <span className="font-mono text-emerald-400 font-bold text-sm">arr[i]</span>
            <p className="text-slate-400">Standard Subscript notation</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-750 text-center space-y-1">
            <span className="font-mono text-emerald-400 font-bold text-sm">*(arr + i)</span>
            <p className="text-slate-400">Pointer offset dereference</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-750 text-center space-y-1">
            <span className="font-mono text-emerald-400 font-bold text-sm">*(i + arr)</span>
            <p className="text-slate-400">Commutative addition</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-750 text-center space-y-1">
            <span className="font-mono text-emerald-400 font-bold text-sm">i[arr]</span>
            <p className="text-slate-400">Inverted subscript notation</p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Equivalence &amp; Decay Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>PointerArrayEquivalenceDemo.c</code>) demonstrates all 4 access equivalents, proves array decay inside functions, and analyzes the type and stride difference between <code>arr</code> and <code>&amp;arr</code>.
        </p>

        <CFileLoader fileModule={cCode} title="PointerArrayEquivalenceDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Pointer & Array Equivalence: arr[i] vs *(arr + i)
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Four Equivalent Ways to Access Index 2 (Value = 30):
   • arr[2]     = 30 (Standard Subscript)
   • *(arr + 2) = 30 (Pointer Arithmetic Offset)
   • *(2 + arr) = 30 (Commutative Addition)
   • 2[arr]     = 30 (Commutative Subscript - Completely Legal in C!)

2. Array Name Decay to Pointer:
   • Array Base Address (arr)      = 0000008518FFF970
   • Address of First Element (&arr[0]) = 0000008518FFF970
   • sizeof(arr) in main()          = 20 Bytes (Entire Array!)

3. Array Passing to Function (Array Decays into Pointer):
   Inside function (sizeof(p) = 8 B - Pointer!): [ 10 20 30 40 50 ]

4. Crucial Distinction: arr vs &arr:
   • arr       = 0000008518FFF970 (Type: int* | Points to 1st element)
   • arr + 1   = 0000008518FFF974 (Diff: +4 Bytes - Advances by 1 int)
   • &arr      = 0000008518FFF970 (Type: int(*)[5] | Points to ENTIRE array)
   • &arr + 1  = 0000008518FFF984 (Diff: +20 Bytes - Advances by ENTIRE 20-byte array!)`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Decay Gotchas
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Reassigning Array Names:</strong> You cannot write <code>arr = ptr;</code> or <code>arr++;</code> because an array identifier is a non-modifiable lvalue fixed at compile time.
          </li>
          <li>
            <strong>Using <code>sizeof(arr)</code> Inside Functions:</strong> In a function declared as <code>void f(int arr[])</code>, <code>sizeof(arr)</code> returns 8 bytes (pointer size), NOT the total array capacity!
          </li>
          <li>
            <strong>Confusing <code>int *a[5]</code> with <code>int (*a)[5]</code>:</strong> <code>*a[5]</code> is an array of 5 pointers; <code>(*a)[5]</code> is a single pointer to a 5-element array.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>"Sukanta"[3]</code> print the character <code>'a'</code> in C? 
          <em>(Hint: String literals are character arrays, and subscripting applies to any pointer expression!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_007 Topic 3 FAQs: Pointer & Array Equivalence" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 3 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note"
          downloadFileName="module_002_007_topic3_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Arrays and pointers are twin brothers in C! Whenever you use brackets arr[i], remember that the CPU is executing pointer arithmetic *(arr + i) underneath. — Sukanta Hui" />
      </section>
    </div>
  );
}
