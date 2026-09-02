import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/ArrayPassingDecayDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_005 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Modular Array Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Passing Arrays to Functions &amp; Array-to-Pointer Decay Mechanics
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master how C transfers arrays into function scopes. Understand why arrays decay into base element pointers, why <code>sizeof</code> changes inside functions, and how to safely modify data in-place or safeguard with <code>const</code>.
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
                Teacher's Corner: The Envelope &amp; Key Analogy
              </h2>
              <p className="text-xs text-indigo-300/80">
                Classroom breakdown by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Insight
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            During a lab session in Barrackpore, <strong>Tuhina</strong> wrote a function <code>void calculate(int arr[])</code> and tried to calculate the number of elements inside the function using <code>sizeof(arr)/sizeof(arr[0])</code>. To her surprise, the expression always returned <strong>2</strong> instead of the 100 elements she passed!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🔑 The Warehouse vs Key Card Analogy
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Imagine you have a huge warehouse in Shyamnagar containing 10,000 crates of goods. If you ask a contractor to inspect the goods, do you physically dismantle the entire warehouse and ship 10,000 crates to the contractor's desk? <strong>Of course not!</strong> You hand the contractor an envelope with the <strong>GPS address and key card</strong> to the warehouse.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              In C, arrays are never duplicated onto the function's stack frame. C passes only the <strong>8-byte memory address of the first element</strong>. Because the key card weighs only 8 bytes, measuring <code>sizeof(arr)</code> inside the function measures the key card, not the warehouse!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Caller vs Callee Stack Frame Decay
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans">
            {/* Main Stack Frame Box */}
            <rect x="40" y="40" width="380" height="220" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="230" y="70" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              main() Stack Frame: numbers[5] (20 Bytes)
            </text>

            {/* Elements inside main */}
            <g transform="translate(60, 95)">
              <rect x="0" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#64748b" />
              <text x="30" y="30" textAnchor="middle" fill="#fff" className="font-bold text-sm">10</text>
              <text x="30" y="70" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">[0] 0x100</text>

              <rect x="70" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#64748b" />
              <text x="100" y="30" textAnchor="middle" fill="#fff" className="font-bold text-sm">25</text>
              <text x="100" y="70" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">[1] 0x104</text>

              <rect x="140" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#64748b" />
              <text x="170" y="30" textAnchor="middle" fill="#fff" className="font-bold text-sm">40</text>
              <text x="170" y="70" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">[2] 0x108</text>

              <rect x="210" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#64748b" />
              <text x="240" y="30" textAnchor="middle" fill="#fff" className="font-bold text-sm">55</text>
              <text x="240" y="70" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">[3] 0x10C</text>

              <rect x="280" y="0" width="60" height="50" rx="6" fill="#1e293b" stroke="#64748b" />
              <text x="310" y="30" textAnchor="middle" fill="#fff" className="font-bold text-sm">70</text>
              <text x="310" y="70" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">[4] 0x110</text>
            </g>

            {/* Arrow connecting to function */}
            <path d="M 430 150 L 520 150" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrow)" />
            <text x="475" y="140" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">Decays to 0x100</text>

            {/* Function Stack Frame Box */}
            <rect x="530" y="40" width="350" height="220" rx="12" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
            <text x="705" y="70" textAnchor="middle" fill="#818cf8" className="font-bold text-sm">
              printArray(int *arr, int size) Frame
            </text>

            {/* Function parameters */}
            <g transform="translate(560, 100)">
              <rect x="0" y="0" width="130" height="60" rx="8" fill="#1e293b" stroke="#818cf8" />
              <text x="65" y="25" textAnchor="middle" fill="#818cf8" className="font-bold text-xs">arr (Pointer)</text>
              <text x="65" y="48" textAnchor="middle" fill="#38bdf8" className="font-mono text-sm font-bold">0x100</text>

              <rect x="150" y="0" width="130" height="60" rx="8" fill="#1e293b" stroke="#34d399" />
              <text x="215" y="25" textAnchor="middle" fill="#34d399" className="font-bold text-xs">size (Count)</text>
              <text x="215" y="48" textAnchor="middle" fill="#fff" className="font-mono text-sm font-bold">5</text>
            </g>

            <rect x="550" y="190" width="310" height="50" rx="6" fill="#1e1e2e" stroke="#334155" />
            <text x="705" y="212" textAnchor="middle" fill="#f472b6" className="text-xs font-mono font-bold">
              sizeof(arr) = 8 Bytes (Pointer Size)
            </text>
            <text x="705" y="230" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Modifying *(arr + i) mutates main's memory!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Parameter Equivalence &amp; Const Safety
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-indigo-300 text-sm">Equivalent Parameter Signatures</h3>
            <p className="text-slate-300">The C compiler treats all four signatures identically:</p>
            <ul className="space-y-1 font-mono text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <li>1. void f(int *arr, int n);</li>
              <li>2. void f(int arr[], int n);</li>
              <li>3. void f(int arr[5], int n); // 5 is ignored!</li>
              <li>4. void f(int arr[static 5], int n); // C99 hint</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-indigo-300 text-sm">Read-Only Safety with Const</h3>
            <p className="text-slate-300">Protect callers from accidental data mutations:</p>
            <div className="font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <p className="text-sky-400">void printArray(const int *arr, int n) &#123;</p>
              <p className="text-rose-400">&nbsp;&nbsp;// arr[0] = 99; // COMPILE ERROR!</p>
              <p className="text-slate-300">&nbsp;&nbsp;printf("%d", arr[0]); // Allowed</p>
              <p className="text-sky-400">&#125;</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Passing Arrays &amp; In-Place Mutation Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ArrayPassingDecayDemo.c</code>) demonstrates passing arrays into functions, proves that <code>sizeof(arr)</code> evaluates to pointer size inside functions, and demonstrates in-place mutation and <code>const</code>-protected summation.
        </p>

        <CFileLoader fileModule={cCode} title="ArrayPassingDecayDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Passing Arrays to Functions & Array-to-Pointer Decay
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

Inside main(): sizeof(numbers) = 20 bytes (Full array: 5 x 4B)

1. Initial Array State:
Inside printArray(): sizeof(arr) = 8 bytes (Decayed to pointer!)
Elements: [ 10 25 40 55 70 ]

2. Doubling All Array Elements In-Place...

3. Modified Array State (Mutated via Base Pointer):
Inside printArray(): sizeof(arr) = 8 bytes (Decayed to pointer!)
Elements: [ 20 50 80 110 140 ]

📊 Calculated Average: 80.00`}
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
            <strong>Never Compute Array Length Inside a Function:</strong> Writing <code>int len = sizeof(arr)/sizeof(arr[0])</code> inside a function always divides 8 by 4, giving 2! Always pass <code>size</code> explicitly.
          </li>
          <li>
            <strong>Never Return a Local Stack Array:</strong> A function returning <code>int*</code> pointing to a local array returns a deallocated stack address, creating a catastrophic dangling pointer.
          </li>
          <li>
            <strong>Qualify Read-Only Array Functions with <code>const</code>:</strong> Always write <code>const int arr[]</code> if the function only reads data.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How can you pass only the second half of an array (from index <code>n/2</code> to <code>n-1</code>) to a printing function without creating a new copy? 
          <em>(Hint: Pass <code>&amp;arr[n/2]</code> as the base pointer and <code>n - (n/2)</code> as the length!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_005 Topic 1 FAQs: Passing Arrays & Decay" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_005 Topic 1 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note"
          downloadFileName="module_002_005_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Array decay is one of C's greatest performance optimizations because it turns high-cost multi-kilobyte data copies into an instantaneous single pointer passing operation. Embrace pointers and always pass sizes! — Sukanta Hui" />
      </section>
    </div>
  );
}
