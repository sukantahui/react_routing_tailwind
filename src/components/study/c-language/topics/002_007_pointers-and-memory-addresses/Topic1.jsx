import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/PassByReferenceDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Caller-Callee Interactivity
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Dereferencing &amp; Pass-by-Reference Simulation: Modifying Caller Memory
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master how C functions communicate across stack frame boundaries. Dissect why standard pass-by-value fails to modify caller variables, simulate true pass-by-reference using pointers, and implement out-parameters for multiple return values.
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
                Teacher's Corner: The Photocopy vs. Master Document Analogy
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
            In our Barrackpore center, <strong>Swadeep</strong> wrote a classic function <code>void swap(int a, int b)</code> to swap two numbers. In <code>main()</code>, <code>x</code> was 10 and <code>y</code> was 20. But after calling <code>swap(x, y)</code>, <code>x</code> remained 10 and <code>y</code> remained 20!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              📄 Photocopying an Income Tax Form
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              When you call <code>swap(x, y)</code> by value, C makes a <strong>photocopy</strong> of your tax document and hands it to the function. The function scribbles, swaps, and changes numbers on the photocopy. When the function ends, that photocopy is thrown in the dustbin—the original master document locked in your drawer in <code>main()</code> remains completely untouched!
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              When you pass <code>swap(&amp;x, &amp;y)</code>, you hand the function the <strong>Key to your Drawer (Memory Address)</strong>. The function reaches directly into your drawer via <code>*pA</code> and <code>*pB</code>, physically swapping the master original documents!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Caller Stack Frame Mutation via Pointers
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans">
            {/* main() Stack Frame */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="380" height="220" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="190" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
                Caller Stack Frame: main()
              </text>

              <rect x="30" y="55" width="320" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" />
              <text x="50" y="85" fill="#38bdf8" className="font-bold text-xs font-mono">int x = 10</text>
              <text x="50" y="103" fill="#94a3b8" className="text-[10px] font-mono">Address: 0x1000</text>
              <text x="260" y="90" fill="#34d399" className="font-bold text-base font-mono">20 (Swapped!)</text>

              <rect x="30" y="130" width="320" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" />
              <text x="50" y="160" fill="#38bdf8" className="font-bold text-xs font-mono">int y = 20</text>
              <text x="50" y="178" fill="#94a3b8" className="text-[10px] font-mono">Address: 0x1004</text>
              <text x="260" y="165" fill="#34d399" className="font-bold text-base font-mono">10 (Swapped!)</text>
            </g>

            {/* Pointer Link Lines */}
            <path d="M 540 100 C 470 100, 440 90, 370 90" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
            <path d="M 540 180 C 470 180, 440 160, 370 160" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />

            {/* swap() Stack Frame */}
            <g transform="translate(500, 40)">
              <rect x="0" y="0" width="380" height="220" rx="10" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
              <text x="190" y="30" textAnchor="middle" fill="#818cf8" className="font-bold text-sm">
                Callee Stack Frame: swap(int *pA, int *pB)
              </text>

              <rect x="30" y="55" width="320" height="60" rx="6" fill="#1e293b" stroke="#818cf8" />
              <text x="50" y="85" fill="#818cf8" className="font-bold text-xs font-mono">int *pA = 0x1000</text>
              <text x="50" y="103" fill="#f59e0b" className="text-[10px] font-mono">Points to main::x</text>

              <rect x="30" y="130" width="320" height="60" rx="6" fill="#1e293b" stroke="#818cf8" />
              <text x="50" y="160" fill="#818cf8" className="font-bold text-xs font-mono">int *pB = 0x1004</text>
              <text x="50" y="178" fill="#f59e0b" className="text-[10px] font-mono">Points to main::y</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Pass-by-Value vs. Pass-by-Reference Simulation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-rose-300 text-sm">1. Pass-by-Value (Caller Unchanged)</h3>
            <p className="font-mono text-rose-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              void swap(int a, int b) &#123;<br />
              &nbsp;&nbsp;int temp = a; a = b; b = temp;<br />
              &#125;
            </p>
            <p className="text-slate-400 leading-relaxed">
              Creates isolated local variables on callee's stack frame. Modifications vanish when function returns.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-emerald-300 text-sm">2. Pass-by-Reference Simulation (Caller Mutated)</h3>
            <p className="font-mono text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              void swap(int *a, int *b) &#123;<br />
              &nbsp;&nbsp;int temp = *a; *a = *b; *b = temp;<br />
              &#125;
            </p>
            <p className="text-slate-400 leading-relaxed">
              Passes memory addresses (<code>&amp;x, &amp;y</code>). Dereferencing (<code>*a</code>) writes directly into caller's stack frame!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Pass-by-Reference &amp; Out-Parameters Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>PassByReferenceDemo.c</code>) demonstrates the failure of pass-by-value, the success of simulated pass-by-reference swap, and calculating multiple output metrics (min, max, average) using out-parameter pointers.
        </p>

        <CFileLoader fileModule={cCode} title="PassByReferenceDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Pass-by-Reference Simulation Using Pointers in C
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

Initial values : x = 10, y = 20

After swapByValue(x, y)      : x = 10, y = 20 (UNMODIFIED!)
After swapByReference(&x, &y): x = 20, y = 10 (SWAPPED SUCCESSFULLY!)

Student Scores Analysis (Multiple Return Parameters):
 • Minimum Score : 64
 • Maximum Score : 99
 • Class Average : 84.33`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Operator Precedence Traps
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong><code>(*p)++</code> vs <code>*p++</code> Precedence Trap:</strong> Writing <code>*p++</code> increments the pointer memory address itself! To increment the integer value pointed to, you MUST use parentheses: <code>(*p)++</code>.
          </li>
          <li>
            <strong>Returning Pointer to Local Stack Variable:</strong> Never write <code>int* f() &#123; int temp = 10; return &amp;temp; &#125;</code>. The stack frame is destroyed upon return, leaving a dangerous dangling pointer!
          </li>
          <li>
            <strong>Missing NULL Check on Out-Parameters:</strong> Always verify <code>if (outPtr != NULL) *outPtr = value;</code> before dereferencing output pointers.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does passing a 1-megabyte <code>struct BigData</code> by pointer (<code>const BigData *p</code>) execute in under a microsecond, while passing it by value takes thousands of CPU clock cycles?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_007 Topic 1 FAQs: Pass-by-Reference & Dereferencing" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 1 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note"
          downloadFileName="module_002_007_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Pointers enable true collaboration between caller and callee! Whenever you want a function to produce multiple answers, or modify caller variables in place, pass memory addresses. — Sukanta Hui" />
      </section>
    </div>
  );
}
