import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/MemoryHazardsDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 4
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Memory Safety &amp; Diagnostics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Memory Hazards: Leaks, Double Free &amp; Diagnostic Sanitizers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Uncover the most notorious dynamic memory traps: Memory Leaks, Dangling Pointers, Wild Pointers, and Heap Overflows. Learn how to diagnose and eradicate memory corruption using GCC AddressSanitizer and Valgrind.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Systems Memory Safety &amp; Diagnostic Engineering
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Memory errors in C are notoriously difficult to track because they rarely crash immediately at the point of error. A memory leak runs silently for days until RAM is exhausted, while a use-after-free silently corrupts unrelated data structures.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-rose-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-rose-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore systems workshop, Swadeep and Abhronila spent two hours debugging a random segmentation fault that only happened once every ten runs. Sukanta Hui introduced GCC's <code>-fsanitize=address</code> flag. Within one second of compiling and running, AddressSanitizer highlighted the exact line of code where an uninitialized pointer was dereferenced!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Memory Leak &amp; Orphaned Blocks
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Stack Frame Popping */}
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="350" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="20" y="30" fill="#a5b4fc" className="font-bold text-xs">STACK (Scope Popped on Return)</text>
              <rect x="20" y="50" width="310" height="40" fill="#312e81" stroke="#818cf8" strokeDasharray="3 3" rx="4" />
              <text x="35" y="75" fill="#e0e7ff" className="font-mono text-xs">int *leak = 0x4B20 (DESTROYED)</text>
              <text x="20" y="125" fill="#c7d2fe" className="text-xs">When function returns, the pointer variable 'leak' vanishes from the stack!</text>
            </g>

            {/* Severed Connection */}
            <text x="430" y="145" fill="#ef4444" className="font-bold text-2xl">⚡❌</text>

            {/* Orphaned Heap Memory */}
            <g transform="translate(480, 50)">
              <rect x="0" y="0" width="370" height="180" rx="10" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
              <text x="20" y="30" fill="#fca5a5" className="font-bold text-xs">HEAP (Orphaned Stranded Memory)</text>
              <rect x="20" y="50" width="330" height="40" fill="#7f1d1d" stroke="#f87171" rx="4" />
              <text x="35" y="75" fill="#fee2e2" className="font-mono text-xs">0x4B20: [100 Bytes Active RAM]</text>
              <text x="20" y="125" fill="#fca5a5" className="text-xs">No pointer in the entire program holds 0x4B20 anymore. Memory is leaked until process exit!</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Diagnostic Tooling Commands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">GCC AddressSanitizer (ASan)</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
{`# Compile with AddressSanitizer:
gcc -fsanitize=address -g -O1 app.c -o app
./app
# Instant reporting of out-of-bounds,
# use-after-free, double-free, leaks!`}</pre>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-purple-300 text-sm">Valgrind Memcheck (Linux)</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-purple-300">
{`# Compile with debug symbols:
gcc -g app.c -o app
valgrind --leak-check=full ./app
# Detailed heap summary:
# definitely lost, indirectly lost`}</pre>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Memory Hazards Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>MemoryHazardsDemo.c</code>) demonstrates a simulated memory leak, proper managed cleanup lifecycle, and diagnostic compilation guidance.
        </p>

        <CFileLoader fileModule={cCode} title="MemoryHazardsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
   CODER & ACCOTAX - MEMORY HAZARDS & DIAGNOSTIC LAB    
========================================================

--- 1. SIMULATING MEMORY LEAK (Lost Stack Pointer) ---
  [Hazard 1: Leak] Allocated 100 bytes at 0x5608d4b822a0 without free().
  Function returned. Memory block is now orphaned (unreachable).

--- 2. CORRECT MANAGED LIFECYCLE (Zero Leaks) ---
  Managed buffer allocated at 0x5608d4b82310 and used safely.
  Buffer freed and nullified. Clean memory hygiene!

--- 3. INDUSTRIAL COMPILER DIAGNOSTIC FLAGS ---
  To automatically detect memory leaks and invalid accesses:
  1. GCC AddressSanitizer : gcc -fsanitize=address -g MemoryHazardsDemo.c
  2. Valgrind Memcheck    : valgrind --leak-check=full ./a.out

========================================================`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-rose-300">Pitfall: Wild Pointers</h3>
            <p className="text-slate-300">
              Declaring <code>int *ptr;</code> without initialization leaves random bits in <code>ptr</code>. Dereferencing it writes to an unpredictable physical address.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Enable AddressSanitizer on CI/CD</h3>
            <p className="text-slate-300">
              Integrate <code>-fsanitize=address -fsanitize=undefined</code> into your automated testing suite to catch buffer overflows and leaks before deploying.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Thinking & Hints Section ("Think About This...") */}
      <section className="bg-slate-800/30 border border-slate-700/60 p-5 rounded-2xl space-y-2 text-xs md:text-sm">
        <h3 className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>🤔</span> Think About This...
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Why does a memory leak in a command-line utility that terminates in 0.05 seconds rarely cause issues, while the exact same memory leak in an embedded flight controller or database server is catastrophic?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_009 Topic 4 FAQs: Memory Hazards & Sanitizers" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 4 Note: Memory Hazards"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic4_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Do not guess when debugging memory bugs in C! Modern compilers give you world-class diagnostic tools: compile with -fsanitize=address and let AddressSanitizer pinpoint the exact line of corruption! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
