import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/FreeMemoryDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 3
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Heap Deallocation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Deallocating Memory with free() &amp; Dangling Pointer Elimination
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Understand how <code>free()</code> communicates with the runtime allocator to reclaim physical memory. Learn why pointers become dangling hazards after deallocation and how immediate nullification eliminates Double-Free crashes.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Memory Reclaim &amp; Pointer Lifetime
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Unlike modern garbage-collected languages, pure C grants developers direct control over every single byte of heap memory. With this power comes the absolute responsibility of recycling memory with <code>free()</code> and guarding against dangling pointer vulnerabilities.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-rose-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-rose-300">🏫 Classroom Story at Coder &amp; AccoTax (Naihati &amp; Barrackpore):</p>
            <p>
              During a memory debugging lab, Debangshu called <code>free(ptr)</code> and then printed <code>printf("%d", *ptr)</code>. The program printed the original number without crashing, leading him to believe the memory was still his. Sukanta Hui explained that <code>free()</code> releases ownership back to the operating system; continuing to read that memory is an elusive <em>Use-After-Free</em> bug waiting to cause intermittent corruption. Sukanta demonstrated the mandatory habit: <code>free(ptr); ptr = NULL;</code>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: The Dangling Pointer Lifecycle
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Step 1: Active Pointer */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="240" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="20" y="30" fill="#6ee7b7" className="font-bold text-xs">STAGE 1: ALLOCATED</text>
              <rect x="20" y="45" width="200" height="35" fill="#065f46" rx="4" />
              <text x="30" y="68" fill="#ecfdf5" className="font-mono text-xs">ptr = 0x7f20 (Valid)</text>
              <text x="20" y="115" fill="#a7f3d0" className="text-xs">Points to active heap block with stored value (42)</text>
            </g>

            {/* Arrow */}
            <text x="300" y="145" fill="#64748b" className="font-bold text-lg">→</text>

            {/* Step 2: Dangling Pointer */}
            <g transform="translate(330, 50)">
              <rect x="0" y="0" width="240" height="180" rx="10" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
              <text x="20" y="30" fill="#fca5a5" className="font-bold text-xs">STAGE 2: AFTER free(ptr)</text>
              <rect x="20" y="45" width="200" height="35" fill="#7f1d1d" rx="4" />
              <text x="30" y="68" fill="#fee2e2" className="font-mono text-xs">ptr = 0x7f20 (DANGLING!)</text>
              <text x="20" y="115" fill="#f87171" className="text-xs">Memory released to OS, but ptr still holds old address!</text>
            </g>

            {/* Arrow */}
            <text x="590" y="145" fill="#64748b" className="font-bold text-lg">→</text>

            {/* Step 3: Neutralized Pointer */}
            <g transform="translate(620, 50)">
              <rect x="0" y="0" width="240" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="20" y="30" fill="#c7d2fe" className="font-bold text-xs">STAGE 3: AFTER ptr = NULL</text>
              <rect x="20" y="45" width="200" height="35" fill="#312e81" rx="4" />
              <text x="30" y="68" fill="#e0e7ff" className="font-mono text-xs">ptr = NULL (Safe 0x0)</text>
              <text x="20" y="115" fill="#a5b4fc" className="text-xs">Neutralized. free(NULL) is 100% safe. Zero crashes!</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: free() Rules &amp; Safe Patterns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-rose-300 text-sm">Dangerous Double Free Hazard</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-rose-400">
{`free(ptr);
// ptr is still non-NULL!
free(ptr); // FATAL ABORT:
// "double free detected in tcache"`}</pre>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">Safe Double-Free Immunity via NULL</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
{`free(ptr);
ptr = NULL; // Crucial line!
free(ptr); // 100% Safe no-op!
// (free(NULL) is guaranteed safe)`}</pre>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: free() &amp; Dangling Pointer Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>FreeMemoryDemo.c</code>) demonstrates active heap buffers, the dangling pointer trap, an industrial <code>safe_free()</code> pointer-to-pointer utility, and safe <code>free(NULL)</code> behavior.
        </p>

        <CFileLoader fileModule={cCode} title="FreeMemoryDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
   CODER & ACCOTAX - HEAP DEALLOCATION & DANGLING PTRS  
========================================================

--- 1. ACTIVE HEAP BUFFER ---
  data address: 0x55b1f02822a0, values: [100, 200, 300]

--- 2. THE DANGLING POINTER HAZARD ---
  After free(data), pointer still holds address: 0x55b1f02822a0 (DANGLING!)
  After data = NULL, pointer safely neutralized: (nil)

--- 3. INDUSTRIAL SAFE-FREE HELPER (Pointer-to-Pointer) ---
  buffer address before safe_free: 0x55b1f02822c0
  buffer address after safe_free : (nil) (Guaranteed NULL)

--- 4. CALLING FREE ON NULL POINTER ---
  free(NULL) executed safely with zero crashes.
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
            <h3 className="font-bold text-rose-300">Pitfall: Freeing Stack Memory</h3>
            <p className="text-slate-300">
              Never pass the address of a local variable (e.g. <code>int x; free(&amp;x);</code>) to <code>free()</code>. The heap allocator expects preceding chunk metadata and will immediately abort.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Two-Step Deallocation Rule</h3>
            <p className="text-slate-300">
              Adopt the universal systems idiom: <code>free(ptr); ptr = NULL;</code> every single time you release heap memory.
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
          Why can't <code>void free(void *ptr)</code> set <code>ptr = NULL</code> for you inside the standard library? (Hint: Think about call-by-value parameter passing in C!)
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_009 Topic 3 FAQs: free() & Dangling Pointers" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 3 Note: free() and Dangling Pointers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic3_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "The simplest rule in C programming is also the most vital: Every malloc has a free, and every free is followed by ptr = NULL! Practice this discipline until it becomes second nature! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
