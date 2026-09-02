import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic6_files/FunctionPointersDemo.c?raw";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 6
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Functional Systems Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Function Pointers: Callbacks, Dispatch Tables &amp; qsort Comparators
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master dynamic runtime execution in C. Learn the precise syntax of function pointers, pass callbacks into higher-order functions, eliminate branching latency with $O(1)$ dispatch tables, and implement polymorphic <code>qsort()</code> comparators.
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
                Teacher's Corner: The TV Remote Speed-Dial
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
            In our Barrackpore lab, <strong>Swadeep</strong> and <strong>Debangshu</strong> were building a command parser with 20 nested <code>if-else if</code> statements. <strong>Sukanta Hui</strong> asked: <em>"Why make the CPU test 20 conditions on every command when you can jump straight to the function in 1 step?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              📺 The TV Remote Channel Buttons
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Instead of pressing 'Channel Up' 50 times in an <code>if-else</code> loop, you press button <strong>#50</strong> on your remote. The TV jumps directly to that channel!
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              An <strong>Array of Function Pointers (Dispatch Table)</strong> stores function entry addresses. Indexing <code>actions[choice]()</code> executes the target routine instantaneously in $O(1)$ time with zero branching delay!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Dispatch Table Jump Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Dispatch Table: int (*table[4])(int, int) = &#123;add, subtract, multiply, divide&#125;;
            </text>

            {/* Table Array */}
            <g transform="translate(60, 60)">
              <text x="90" y="-10" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold font-mono">Dispatch Array (RAM)</text>
              {[
                { name: "add", idx: 0, addr: "0x4010" },
                { name: "sub", idx: 1, addr: "0x4040" },
                { name: "mul", idx: 2, addr: "0x4080" },
                { name: "div", idx: 3, addr: "0x40C0" },
              ].map((item, i) => (
                <g key={i} transform={`translate(0, ${i * 45})`}>
                  <rect x="0" y="0" width="180" height="38" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="15" y="24" fill="#38bdf8" className="font-bold text-xs font-mono">[{item.idx}]</text>
                  <text x="90" y="24" textAnchor="middle" fill="#fff" className="font-mono text-xs font-bold">{item.name}</text>
                  <text x="155" y="24" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">{item.addr}</text>
                </g>
              ))}
            </g>

            {/* Jump vector */}
            <path d="M 260 170 C 360 170, 420 120, 520 120" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
            <text x="390" y="135" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
              table[2](40, 8) → Direct JUMP!
            </text>

            {/* Target Machine Code Function in .text */}
            <g transform="translate(540, 60)">
              <rect x="0" y="0" width="300" height="170" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="150" y="25" textAnchor="middle" fill="#10b981" className="font-bold text-xs">
                Executable Code in .text Segment (0x4080)
              </text>
              <rect x="20" y="40" width="260" height="110" rx="6" fill="#1e293b" stroke="#334155" />
              <text x="35" y="70" fill="#38bdf8" className="font-mono text-xs font-bold">int multiply(int a, int b) &#123;</text>
              <text x="55" y="95" fill="#a7f3d0" className="font-mono text-xs">return a * b; // 40 * 8 = 320</text>
              <text x="35" y="125" fill="#38bdf8" className="font-mono text-xs">&#125;</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Function Pointer Syntax Breakdown
        </h2>
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3 text-xs">
          <div className="font-mono text-sm bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <p className="text-sky-300">// 1. Raw Function Pointer Declaration:</p>
            <p className="text-emerald-400 font-bold">int (*funcPtr)(int, int);</p>
            <p className="text-slate-400 text-xs pl-4">
              • <code>int</code>: Return type<br />
              • <code>(*funcPtr)</code>: Mandatory parentheses indicating pointer<br />
              • <code>(int, int)</code>: Parameter argument types
            </p>
            <p className="text-sky-300 pt-2">// 2. Clean Typedef Signature:</p>
            <p className="text-emerald-400 font-bold">typedef int (*MathFunc)(int, int);</p>
            <p className="text-slate-400 text-xs pl-4">
              • Enables clean variable declarations: <code>MathFunc op = add;</code>
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Function Pointers, Callbacks &amp; qsort Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>FunctionPointersDemo.c</code>) demonstrates calling function pointers directly, higher-order callback functions, an $O(1)$ dispatch table array, and custom ascending/descending comparators for <code>qsort()</code>.
        </p>

        <CFileLoader fileModule={cCode} title="FunctionPointersDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Function Pointers, Callbacks & Dispatch Tables
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Direct Function Pointer Call:
   • pFunc (address 00007FF619A01420) called with (15, 25): 40

2. Callbacks to Higher-Order Functions:
   • Add(20, 10) = 30
   • Subtract(20, 10) = 10
   • Multiply(20, 10) = 200

3. Calculator Dispatch Table Array:
   • Op [0] 40 + 8 = 48
   • Op [1] 40 - 8 = 32
   • Op [2] 40 * 8 = 320
   • Op [3] 40 / 8 = 5

4. qsort() Sorting with Custom Function Pointer Comparators:
   • Ascending Sort : [ 42 63 77 85 99 ]
   • Descending Sort: [ 99 85 77 63 42 ]`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Calling Conventions
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Missing Parentheses in Declaration:</strong> Writing <code>int *fp(int, int);</code> declares a normal function that returns a pointer to <code>int</code>! You MUST write <code>int (*fp)(int, int);</code>.
          </li>
          <li>
            <strong>Calling NULL Function Pointers:</strong> Calling <code>fp(x, y)</code> when <code>fp == NULL</code> causes an instant fatal Segmentation Fault! Always check <code>if (fp != NULL)</code>.
          </li>
          <li>
            <strong>Type Casting Incompatible Function Signatures:</strong> Calling a function with mismatched arguments through a cast function pointer corrupts CPU register state.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How do modern operating systems and GUI engines handle button clicks, mouse moves, and timer alarms? 
          <em>(Hint: Every event listener is a registered function pointer callback!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_007 Topic 6 FAQs: Function Pointers" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 6 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Note"
          downloadFileName="module_002_007_topic6_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Function pointers turn static code into dynamic, extensible software architectures. Master dispatch tables and callbacks, and you will understand how modern operating system kernels and game engines operate. — Sukanta Hui" />
      </section>
    </div>
  );
}
