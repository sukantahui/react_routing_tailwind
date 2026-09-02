import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/PointerBasicsDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 0
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Memory Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Pointer Fundamentals: Addresses, Declaration, &amp;, *, and NULL Pointers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Unlock the true core superpower of C. Understand how virtual RAM is structured, discover how variables hold memory addresses, master the address-of (<code>&amp;</code>) and dereference (<code>*</code>) operators, and learn defensive <code>NULL</code> pointer practices.
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
                Teacher's Corner: The House vs. House Address Analogy
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
            At our Barrackpore center, many beginners ask: <em>"Sir, why do we need pointers when we already have standard variables?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🏠 The House vs. GPS Postal Address
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Suppose <strong>Tuhina</strong> lives in a house in Shyamnagar. If <strong>Swadeep</strong> wants to invite her to study, he does not physically duplicate or move her entire house! Instead, he writes her <strong>GPS Postal Address</strong> on a tiny piece of paper.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              In C, a standard variable is the house (holding the actual integer or double data). A <strong>Pointer</strong> is the small piece of paper containing the <strong>Memory Address</strong> (e.g. <code>0x7ffd9820</code>). By following that address (<strong>Dereferencing <code>*</code></strong>), you can inspect or modify the house from anywhere in your entire program!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Pointer Variable &amp; Target Memory Cell
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Pointer Relationship: int age = 22; int *pAge = &amp;age;
            </text>

            {/* Target variable age */}
            <g transform="translate(100, 60)">
              <rect x="0" y="0" width="220" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="110" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">Target Variable: int age</text>
              <rect x="20" y="35" width="180" height="50" rx="6" fill="#0f172a" stroke="#64748b" />
              <text x="110" y="68" textAnchor="middle" fill="#fff" className="font-bold text-2xl font-mono">22</text>
              <text x="110" y="105" textAnchor="middle" fill="#f59e0b" className="text-[11px] font-mono">
                Address &amp;age = 0x1000 (4 Bytes)
              </text>
            </g>

            {/* Pointer arrow */}
            <g transform="translate(320, 115)">
              <line x1="220" y1="0" x2="10" y2="0" stroke="#34d399" strokeWidth="3" markerEnd="url(#pointerArrow)" strokeDasharray="6,4" />
              <text x="115" y="-12" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
                Dereference (*pAge)
              </text>
            </g>

            {/* Pointer variable pAge */}
            <g transform="translate(560, 60)">
              <rect x="0" y="0" width="240" height="120" rx="10" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="120" y="25" textAnchor="middle" fill="#818cf8" className="font-bold text-xs">Pointer Variable: int *pAge</text>
              <rect x="20" y="35" width="200" height="50" rx="6" fill="#0f172a" stroke="#818cf8" />
              <text x="120" y="68" textAnchor="middle" fill="#34d399" className="font-bold text-lg font-mono">0x1000</text>
              <text x="120" y="105" textAnchor="middle" fill="#f59e0b" className="text-[11px] font-mono">
                Address &amp;pAge = 0x2000 (8 Bytes)
              </text>
            </g>

            {/* Explanatory footer */}
            <rect x="100" y="200" width="700" height="55" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="450" y="225" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
              • Value of age = 22 | &amp;age = 0x1000 | pAge = 0x1000 | *pAge = 22 | &amp;pAge = 0x2000
            </text>
            <text x="450" y="243" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Modifying *pAge = 99 directly mutates the integer in address 0x1000!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Core Operators &amp; Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">1. Address-Of Operator (&amp;)</h3>
            <p className="font-mono text-emerald-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
              int *ptr = &amp;x;
            </p>
            <p className="text-slate-400 leading-relaxed">
              Extracts the physical/virtual hexadecimal memory address of variable <code>x</code>.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">2. Dereference Operator (*)</h3>
            <p className="font-mono text-emerald-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
              *ptr = 100; // Mutates x!
            </p>
            <p className="text-slate-400 leading-relaxed">
              Follows the pointer address to read or write the underlying memory cell.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-rose-300 text-sm">3. NULL Pointer Guard</h3>
            <p className="font-mono text-rose-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
              int *p = NULL; // Address 0x0
            </p>
            <p className="text-slate-400 leading-relaxed">
              Points to no valid address. Always test <code>if (p != NULL)</code> before dereferencing!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Pointer Operations &amp; Memory Sizing Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>PointerBasicsDemo.c</code>) demonstrates variable memory addresses, pointer 8-byte sizing on 64-bit systems, mutating data via dereferencing, and <code>NULL</code> pointer guard checks.
        </p>

        <CFileLoader fileModule={cCode} title="PointerBasicsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Pointer Fundamentals & Physical Memory Addresses
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Variable Values & Their Memory Addresses in RAM:
   • int age       = 22 | Address (&age)     = 0000009623DFF6AC (Size: 4 B)
   • double salary = 45000.50 | Address (&salary)  = 0000009623DFF6B0 (Size: 8 B)
   • char grade    = 'A' | Address (&grade)   = 0000009623DFF6B8 (Size: 1 B)

2. Pointer Variables (Storing Addresses):
   • pAge    stores 0000009623DFF6AC | sizeof(pAge)    = 8 Bytes
   • pSalary stores 0000009623DFF6B0 | sizeof(pSalary) = 8 Bytes
   • pGrade  stores 0000009623DFF6B8 | sizeof(pGrade)  = 8 Bytes

3. Dereferencing Operator (*) - Reading & Writing Value via Pointer:
   • Value via *pAge    = 22
   • Modifying value through pointer: *pAge = 25;
   • New value of 'age' = 25 (Directly mutated in RAM!)

4. NULL Pointer Guard Validation:
   ✓ pNull is NULL (Points to address 0x0 / (nil)). Safely guarded against crash!`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Pointer Safety Rules
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Dereferencing Uninitialized (Wild) Pointers:</strong> Declaring <code>int *p; *p = 10;</code> writes to a random garbage address, causing memory corruption or immediate crash! Always initialize with <code>&amp;var</code> or <code>NULL</code>.
          </li>
          <li>
            <strong>Dereferencing <code>NULL</code>:</strong> Writing <code>*pNull = 5;</code> triggers an instant OS Segmentation Fault because address 0x0 is write-protected.
          </li>
          <li>
            <strong>Multi-Pointer Declaration Trap:</strong> Writing <code>int* p1, p2;</code> creates one pointer (<code>p1</code>) and one standard integer (<code>p2</code>). Write <code>int *p1, *p2;</code> instead.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why are <code>sizeof(char*)</code>, <code>sizeof(int*)</code>, and <code>sizeof(double*)</code> all exactly 8 bytes on a 64-bit CPU, even though <code>sizeof(char)</code> is 1 byte and <code>sizeof(double)</code> is 8 bytes?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_007 Topic 0 FAQs: Pointer Fundamentals" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 0 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note"
          downloadFileName="module_002_007_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Pointers are not scary—they are simply variables that hold numbers, and those numbers happen to be memory addresses in RAM! Master the difference between the pointer itself and the data it points to, and you will master C. — Sukanta Hui" />
      </section>
    </div>
  );
}
