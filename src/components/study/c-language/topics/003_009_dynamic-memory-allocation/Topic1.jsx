import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/MallocCallocDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Heap Allocation Functions
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Dynamic Memory Allocation with malloc() and calloc()
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master uninitialized allocation with <code>malloc()</code> versus zero-initialized allocation with <code>calloc()</code>. Learn defensive NULL pointer validation and memory allocation ergonomics in standard C.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: malloc() vs calloc() Mechanics
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When writing high-performance C software, you frequently encounter arrays or buffers whose sizes cannot be known until runtime (e.g. reading from a network socket or parsing dynamic user records). <code>malloc()</code> and <code>calloc()</code> allow programs to request contiguous chunks of physical RAM from the heap allocator on demand.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-emerald-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-emerald-300">🏫 Classroom Story at Coder &amp; AccoTax (Shyamnagar):</p>
            <p>
              In our Shyamnagar computer lab, Abhronila initialized a frequency counter array using <code>malloc()</code> and noticed strange counts like 3,421,902 for values never entered. Sukanta Hui demonstrated that <code>malloc()</code> leaves leftover garbage bits from previous processes, whereas switching to <code>calloc()</code> guaranteed clean zeroes for every single integer element.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Memory Initialization States
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Malloc Side */}
            <rect x="40" y="50" width="390" height="180" rx="12" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="2" />
            <text x="60" y="80" fill="#fda4af" className="font-bold text-sm">malloc(4 * sizeof(int)) - UNINITIALIZED</text>
            <text x="60" y="102" fill="#94a3b8" className="text-xs">Raw bytes retain residual garbage data from RAM</text>

            <g transform="translate(60, 120)">
              <rect x="0" y="0" width="75" height="50" fill="#881337" stroke="#f43f5e" rx="4" />
              <text x="37" y="30" textAnchor="middle" fill="#ffe4e6" className="font-mono text-xs">-858993460</text>
              <rect x="85" y="0" width="75" height="50" fill="#881337" stroke="#f43f5e" rx="4" />
              <text x="122" y="30" textAnchor="middle" fill="#ffe4e6" className="font-mono text-xs">0x3F8000</text>
              <rect x="170" y="0" width="75" height="50" fill="#881337" stroke="#f43f5e" rx="4" />
              <text x="207" y="30" textAnchor="middle" fill="#ffe4e6" className="font-mono text-xs">14209</text>
              <rect x="255" y="0" width="75" height="50" fill="#881337" stroke="#f43f5e" rx="4" />
              <text x="292" y="30" textAnchor="middle" fill="#ffe4e6" className="font-mono text-xs">-1</text>
            </g>
            <text x="60" y="195" fill="#fb7185" className="text-xs font-mono">⚠️ Must manually initialize before reading!</text>

            {/* Calloc Side */}
            <rect x="460" y="50" width="400" height="180" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="480" y="80" fill="#6ee7b7" className="font-bold text-sm">calloc(4, sizeof(int)) - ZERO-INITIALIZED</text>
            <text x="480" y="102" fill="#94a3b8" className="text-xs">All allocated bytes are explicitly cleared to 0</text>

            <g transform="translate(480, 120)">
              <rect x="0" y="0" width="75" height="50" fill="#065f46" stroke="#10b981" rx="4" />
              <text x="37" y="30" textAnchor="middle" fill="#d1fae5" className="font-mono text-sm font-bold">0</text>
              <rect x="85" y="0" width="75" height="50" fill="#065f46" stroke="#10b981" rx="4" />
              <text x="122" y="30" textAnchor="middle" fill="#d1fae5" className="font-mono text-sm font-bold">0</text>
              <rect x="170" y="0" width="75" height="50" fill="#065f46" stroke="#10b981" rx="4" />
              <text x="207" y="30" textAnchor="middle" fill="#d1fae5" className="font-mono text-sm font-bold">0</text>
              <rect x="255" y="0" width="75" height="50" fill="#065f46" stroke="#10b981" rx="4" />
              <text x="292" y="30" textAnchor="middle" fill="#d1fae5" className="font-mono text-sm font-bold">0</text>
            </g>
            <text x="480" y="195" fill="#34d399" className="text-xs font-mono">✓ Safe for immediate accumulator / flag use!</text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Function Signatures &amp; Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">malloc() Signature</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">void *malloc(size_t size);</pre>
            <p className="text-slate-300">
              Allocates <code>size</code> contiguous bytes on the heap. Fast execution because it avoids memory clearing overhead.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">calloc() Signature</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">void *calloc(size_t num, size_t size);</pre>
            <p className="text-slate-300">
              Allocates <code>num * size</code> bytes and zeroes every byte. Protects against uninitialized memory data leaks.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: malloc() vs calloc() Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>MallocCallocDemo.c</code>) demonstrates side-by-side memory allocation, mandatory NULL pointer verification, uninitialized vs zeroed initial values, and proper deallocation.
        </p>

        <CFileLoader fileModule={cCode} title="MallocCallocDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
     CODER & ACCOTAX - MALLOC() VS CALLOC() MECHANICS   
========================================================

--- 1. ALLOCATION WITH malloc(20 bytes) ---
  malloc_arr initial values (uninitialized garbage):
  [0]: -858993460  [1]: 32767  [2]: 0  [3]: 0  [4]: 0  
  malloc_arr after assignment:
  [0]: 10  [1]: 20  [2]: 30  [3]: 40  [4]: 50  

--- 2. ALLOCATION WITH calloc(5 elements, 4 bytes) ---
  calloc_arr initial values (guaranteed zeroes):
  [0]: 0  [1]: 0  [2]: 0  [3]: 0  [4]: 0  
  calloc_arr after assignment:
  [0]: 100  [1]: 200  [2]: 300  [3]: 400  [4]: 500  

  All heap memory successfully freed and pointers reset to NULL.
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
            <h3 className="font-bold text-rose-300">Pitfall: Forgetting NULL Check</h3>
            <p className="text-slate-300">
              Assuming <code>malloc()</code> always succeeds without checking <code>if (ptr == NULL)</code> leads to instant segfaults on low-memory servers or embedded targets.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Use sizeof(*ptr)</h3>
            <p className="text-slate-300">
              Write <code>ptr = malloc(n * sizeof(*ptr));</code>. If the type of <code>ptr</code> ever changes during refactoring, the allocation size automatically stays in sync.
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
          If you are reading 50 Megabytes of binary data from a file directly into a heap buffer using <code>fread()</code>, why would using <code>calloc()</code> instead of <code>malloc()</code> waste CPU cycles?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_009 Topic 1 FAQs: malloc vs calloc" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 1 Note: malloc vs calloc"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Never assume malloc returns valid memory! Always include the mandatory null-check pattern: if (ptr == NULL) { handle_error(); }. Choose calloc when zero values are required by algorithm logic! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
