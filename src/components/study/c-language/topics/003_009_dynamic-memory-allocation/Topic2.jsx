import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/ReallocResizeDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 2
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Dynamic Buffer Resizing
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Resizing Allocated Memory with realloc() Safely
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Learn how to grow and shrink heap memory blocks on the fly using <code>realloc()</code>. Master the defensive temporary pointer idiom to prevent silent memory leaks when allocation expansion fails.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: realloc() Mechanics &amp; Expansion Strategies
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When building resizable data structures like vectors, dynamically growing string buffers, or streaming network parsers, you cannot predict the exact capacity needed upfront. <code>realloc()</code> allows you to resize an existing heap allocation while preserving all previously stored data.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              While writing a dynamic student list manager, Tuhina wrote <code>ptr = realloc(ptr, new_size);</code>. Sukanta Hui pointed out a critical hidden bug: if <code>realloc()</code> ever returns NULL due to low memory, <code>ptr</code> is overwritten with NULL, permanently losing the original memory address and causing a severe memory leak. Sukanta introduced the golden rule: <em>always assign to a temporary pointer first!</em>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: In-Place Expansion vs Relocation
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* In-Place Case */}
            <rect x="40" y="50" width="390" height="180" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <text x="60" y="80" fill="#6ee7b7" className="font-bold text-sm">CASE 1: IN-PLACE EXPANSION</text>
            <text x="60" y="102" fill="#94a3b8" className="text-xs">Adjacent space is free: pointer address stays identical</text>

            <g transform="translate(60, 125)">
              <rect x="0" y="0" width="160" height="40" fill="#065f46" stroke="#10b981" rx="6" />
              <text x="80" y="25" textAnchor="middle" fill="#d1fae5" className="font-mono text-xs font-bold">Existing Data (3 ints)</text>
              <rect x="165" y="0" width="140" height="40" fill="#047857" stroke="#34d399" strokeDasharray="4 2" rx="6" />
              <text x="235" y="25" textAnchor="middle" fill="#a7f3d0" className="font-mono text-xs font-bold">+3 New Elements</text>
            </g>
            <text x="60" y="195" fill="#34d399" className="text-xs font-mono">Address 0x1000 remains 0x1000 (O(1) operation)</text>

            {/* Relocation Case */}
            <rect x="460" y="50" width="400" height="180" rx="12" fill="#431407" stroke="#f97316" strokeWidth="1.5" />
            <text x="480" y="80" fill="#fdba74" className="font-bold text-sm">CASE 2: RELOCATION &amp; COPY</text>
            <text x="480" y="102" fill="#94a3b8" className="text-xs">Adjacent space is blocked: allocates new block, copies &amp; frees old</text>

            <g transform="translate(480, 125)">
              <rect x="0" y="0" width="130" height="35" fill="#7c2d12" stroke="#ea580c" strokeDasharray="2 2" rx="6" />
              <text x="65" y="22" textAnchor="middle" fill="#fed7aa" className="font-mono text-[11px]">Old @ 0x1000 (Freed)</text>
              <text x="145" y="22" fill="#fb923c" className="font-bold text-xs">→</text>
              <rect x="165" y="0" width="180" height="35" fill="#c2410c" stroke="#f97316" rx="6" />
              <text x="255" y="22" textAnchor="middle" fill="#fff7ed" className="font-mono text-xs font-bold">New @ 0x2500 (6 ints)</text>
            </g>
            <text x="480" y="195" fill="#fb923c" className="text-xs font-mono">Old block freed automatically. Returns new address!</text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Safe Realloc Idiom
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-rose-300 text-sm">Dangerous Anti-Pattern (Memory Leak)</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-rose-400">
{`// DANGEROUS:
ptr = realloc(ptr, new_size);
// If realloc fails, ptr becomes NULL
// and the original memory is lost forever!`}</pre>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">Industrial Best Practice (Defensive Idiom)</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
{`// SAFE:
void *temp = realloc(ptr, new_size);
if (temp == NULL) {
    free(ptr); // Clean up original
    exit(1);
}
ptr = temp; // Reassign only on success`}</pre>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: realloc() Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ReallocResizeDemo.c</code>) allocates an initial 3-element buffer, safely doubles its capacity to 6 elements with a temporary pointer, and then shrinks the buffer.
        </p>

        <CFileLoader fileModule={cCode} title="ReallocResizeDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
   CODER & ACCOTAX - RESIZING HEAP BUFFERS WITH REALLOC 
========================================================

--- 1. INITIAL HEAP ALLOCATION (3 elements) ---
  Initial buffer address: 0x55d7b56822a0
  Values: [0]: 11  [1]: 22  [2]: 33  

--- 2. EXPANDING BUFFER TO 6 ELEMENTS WITH realloc() ---
  Resized buffer address: 0x55d7b56822a0 (Memory expanded in-place or safely relocated)
  All values after expansion:
  [0]: 11  [1]: 22  [2]: 33  [3]: 44  [4]: 55  [5]: 66  

--- 3. SHRINKING BUFFER TO 2 ELEMENTS ---
  Shrunk buffer address : 0x55d7b56822a0
  Values: [0]: 11  [1]: 22  

  Heap memory successfully freed.
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
            <h3 className="font-bold text-rose-300">Pitfall: Freeing Old Address After Relocation</h3>
            <p className="text-slate-300">
              When <code>realloc()</code> moves a block to a new address, it automatically deallocates the old memory block. Calling <code>free(old_ptr)</code> manually results in a fatal double-free crash!
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Exponential Growth (Doubling)</h3>
            <p className="text-slate-300">
              When implementing dynamic vectors, double the capacity (e.g. <code>cap *= 2</code>) instead of growing by 1 element each time. This achieves O(1) amortized insertion speed.
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
          If you have pointers pointing to the middle of an array (e.g. <code>int *mid = &amp;arr[2];</code>), what happens to <code>mid</code> if <code>realloc()</code> relocates the array to a different heap address?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_009 Topic 2 FAQs: realloc" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 2 Note: realloc"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Never overwrite your primary pointer directly with the result of realloc()! Always assign to a temporary pointer first (void *temp = realloc(ptr, size);). This protects your application from silent memory leaks during out-of-memory events! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
