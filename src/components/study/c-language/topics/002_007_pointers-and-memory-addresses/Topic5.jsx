import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic5_files/VoidPointersConstDemo.c?raw";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 5
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Polymorphism &amp; Immutability
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Void Pointers (void*), Pointer Casting &amp; const Qualifiers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master generic memory programming in C. Build polymorphic functions and memory analyzers with generic void pointers (<code>void*</code>), understand pointer typecasting, and master the 4 <code>const</code> pointer qualifier permutations.
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
                Teacher's Corner: The Universal Master Key &amp; Padlocks
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
            When <strong>Tuhina</strong> asked how <code>malloc()</code> and <code>qsort()</code> can handle integers, strings, and custom structures without separate functions for each, <strong>Sukanta Hui</strong> introduced <code>void*</code>.
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🔑 The Universal Master Key
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              A typed pointer (<code>int*</code>) is like a key designed for a specific 4-tumbler lock. A <strong>Void Pointer (<code>void*</code>)</strong> is a blank skeleton key: it can open any door in RAM, but because it has no grooves, you cannot unlock (dereference) the door until you carve the specific shape (typecast) onto it!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: The 4 Const Pointer Permutations
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              The 4 Const Pointer Combinations: Read-Only Data vs. Locked Pointer Addresses
            </text>

            {/* 1. const int *p */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="190" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="95" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">const int *p</text>
              <rect x="15" y="40" width="160" height="32" rx="4" fill="#e11d48" opacity="0.3" />
              <text x="95" y="60" textAnchor="middle" fill="#fecdd3" className="text-xs font-bold font-mono">*p = 10 (FORBIDDEN!)</text>
              <rect x="15" y="80" width="160" height="32" rx="4" fill="#10b981" opacity="0.3" />
              <text x="95" y="100" textAnchor="middle" fill="#a7f3d0" className="text-xs font-bold font-mono">p = &amp;b (ALLOWED!)</text>
            </g>

            {/* 2. int * const p */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="190" height="130" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="95" y="25" textAnchor="middle" fill="#818cf8" className="font-bold text-xs font-mono">int * const p</text>
              <rect x="15" y="40" width="160" height="32" rx="4" fill="#10b981" opacity="0.3" />
              <text x="95" y="60" textAnchor="middle" fill="#a7f3d0" className="text-xs font-bold font-mono">*p = 10 (ALLOWED!)</text>
              <rect x="15" y="80" width="160" height="32" rx="4" fill="#e11d48" opacity="0.3" />
              <text x="95" y="100" textAnchor="middle" fill="#fecdd3" className="text-xs font-bold font-mono">p = &amp;b (FORBIDDEN!)</text>
            </g>

            {/* 3. const int * const p */}
            <g transform="translate(480, 50)">
              <rect x="0" y="0" width="190" height="130" rx="8" fill="#1e293b" stroke="#f472b6" strokeWidth="1.5" />
              <text x="95" y="25" textAnchor="middle" fill="#f472b6" className="font-bold text-xs font-mono">const int * const p</text>
              <rect x="15" y="40" width="160" height="32" rx="4" fill="#e11d48" opacity="0.3" />
              <text x="95" y="60" textAnchor="middle" fill="#fecdd3" className="text-xs font-bold font-mono">*p = 10 (FORBIDDEN!)</text>
              <rect x="15" y="80" width="160" height="32" rx="4" fill="#e11d48" opacity="0.3" />
              <text x="95" y="100" textAnchor="middle" fill="#fecdd3" className="text-xs font-bold font-mono">p = &amp;b (FORBIDDEN!)</text>
            </g>

            {/* 4. int *p */}
            <g transform="translate(700, 50)">
              <rect x="0" y="0" width="180" height="130" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
              <text x="90" y="25" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">int *p (Standard)</text>
              <rect x="10" y="40" width="160" height="32" rx="4" fill="#10b981" opacity="0.3" />
              <text x="90" y="60" textAnchor="middle" fill="#a7f3d0" className="text-xs font-bold font-mono">*p = 10 (ALLOWED!)</text>
              <rect x="10" y="80" width="160" height="32" rx="4" fill="#10b981" opacity="0.3" />
              <text x="90" y="100" textAnchor="middle" fill="#a7f3d0" className="text-xs font-bold font-mono">p = &amp;b (ALLOWED!)</text>
            </g>

            {/* Explanatory footer */}
            <rect x="40" y="200" width="840" height="55" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="460" y="225" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
              • Rule: const to the left of * locks DATA; const to the right of * locks the POINTER ADDRESS!
            </text>
            <text x="460" y="243" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Use const pointers everywhere for robust, bug-free APIs and compile-time immutability verification!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Generic Memory Inspection via (unsigned char*)
        </h2>
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3 text-xs">
          <p className="text-slate-300 leading-relaxed">
            By casting any <code>void*</code> to <code>const unsigned char*</code>, you can inspect the exact raw byte layout of any data structure in physical RAM:
          </p>
          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 overflow-x-auto">
{`void dumpMemory(const void *ptr, size_t size) {
    const unsigned char *b = (const unsigned char*)ptr;
    for (size_t i = 0; i < size; i++) {
        printf("%02X ", b[i]); // Hex byte inspection!
    }
}`}
          </pre>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Void Pointers &amp; Const Qualifiers Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>VoidPointersConstDemo.c</code>) demonstrates polymorphic printing via <code>void*</code>, dumping hexadecimal memory bytes, and testing the 4 <code>const</code> pointer qualifier permutations.
        </p>

        <CFileLoader fileModule={cCode} title="VoidPointersConstDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Generic Void Pointers (void*) & Const Qualifiers
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Polymorphic Function Calls via void*:
Integer Value : 305419896
Double Value  : 3.14
Char Value    : 'S'

2. Raw Hexadecimal Memory Dump via void*:
   • Integer 0x12345678 (Little-Endian Memory Order):
     Memory Bytes (4 B): [ 78 56 34 12 ]
   • Double Pi:
     Memory Bytes (8 B): [ 6E 86 1B F0 F9 21 09 40 ]

3. Const Pointer Rules:
   • const int *ptr       : Read-only Data, Mutable Pointer Address
   • int * const ptr       : Mutable Data, Read-only Pointer Address
   • const int * const ptr : Read-only Data, Read-only Pointer Address`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Casting Rules
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Dereferencing <code>void*</code> Directly:</strong> <code>*pVoid</code> fails to compile because the size of <code>void</code> is undefined. Always cast before dereferencing: <code>*(int*)pVoid</code>.
          </li>
          <li>
            <strong>Casting Pointers to 32-bit Integers:</strong> On 64-bit systems, casting a pointer to <code>int</code> truncates 32 bits, corrupting the memory address. Always use <code>uintptr_t</code> from <code>&lt;stdint.h&gt;</code>.
          </li>
          <li>
            <strong>Arithmetic on <code>void*</code>:</strong> <code>pVoid++</code> is non-standard and rejected by strict ISO C compilers.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>const int *p</code> allow modifying the pointer address <code>p = &amp;b;</code>, while <code>int * const p</code> refuses to reassign <code>p = &amp;b;</code>?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_007 Topic 5 FAQs: Void Pointers & Const" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 5 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note"
          downloadFileName="module_002_007_topic5_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Const-correctness is the mark of a true software engineer! Use const pointers everywhere to make your intent crystal clear and prevent bugs before your code even compiles. — Sukanta Hui" />
      </section>
    </div>
  );
}
