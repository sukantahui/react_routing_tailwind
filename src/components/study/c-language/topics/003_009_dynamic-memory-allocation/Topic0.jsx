import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/StackVsHeapMemoryDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 0
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Process Memory Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Stack vs Heap Memory: Process Address Space &amp; Variable Lifetimes
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Explore how the operating system partitions virtual memory into Text, Data, BSS, Heap, and Stack segments. Understand the fundamental architectural differences between automatic stack memory and dynamic heap management.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Stack vs Heap Memory Architecture
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When an executable C binary is loaded into memory by the operating system kernel, it is assigned a structured virtual address space. Understanding where your variables reside is the single most critical foundation of systems programming and pointer mastery.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              During a systems programming session at Barrackpore, Swadeep noticed that an array declared inside a function was overwritten as soon as another function executed. Tuhina and Debangshu wondered why a pointer returned from that function contained garbage values. Sukanta Hui drew the process memory map on the whiteboard, explaining how stack frames are dismantled on return, while heap memory remains alive until explicitly reclaimed via <code>free()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Process Virtual Memory Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 320" className="w-full min-w-[750px] font-sans">
            {/* Background container */}
            <rect x="20" y="20" width="860" height="280" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* High Memory Label */}
            <text x="50" y="50" fill="#94a3b8" className="text-xs font-mono font-bold">0x7FFFFFFFFFFF (High Memory - OS Kernel Space)</text>

            {/* Stack Box (Downwards) */}
            <rect x="50" y="65" width="370" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <text x="70" y="95" fill="#a5b4fc" className="font-bold text-sm">STACK SEGMENT (Automatic Storage)</text>
            <text x="70" y="118" fill="#818cf8" className="text-xs font-mono">Local Variables, Function Call Frames (Grows ↓)</text>

            {/* Heap Box (Upwards) */}
            <rect x="50" y="150" width="370" height="70" rx="8" fill="#3b0764" stroke="#d946ef" strokeWidth="2" />
            <text x="70" y="180" fill="#f5d0fe" className="font-bold text-sm">HEAP SEGMENT (Dynamic Runtime Storage)</text>
            <text x="70" y="203" fill="#e879f9" className="text-xs font-mono">malloc(), calloc(), realloc() (Grows ↑)</text>

            {/* Data & Text Right Column */}
            <rect x="460" y="65" width="390" height="45" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <text x="480" y="93" fill="#6ee7b7" className="font-bold text-xs font-mono">.BSS SEGMENT (Uninitialized Global/Static = 0)</text>

            <rect x="460" y="120" width="390" height="45" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
            <text x="480" y="148" fill="#86efac" className="font-bold text-xs font-mono">.DATA SEGMENT (Initialized Global/Static Variables)</text>

            <rect x="460" y="175" width="390" height="45" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
            <text x="480" y="203" fill="#7dd3fc" className="font-bold text-xs font-mono">TEXT / CODE SEGMENT (Read-Only Machine Instructions)</text>

            {/* Low Memory Label */}
            <text x="50" y="275" fill="#94a3b8" className="text-xs font-mono font-bold">0x000000000000 (Low Memory - Null Pointer Trap Zone)</text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Stack vs Heap Comparison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-indigo-300 text-sm">Stack Characteristics</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Management:</strong> Automatically pushed/popped by CPU Stack Pointer (RSP).</li>
              <li><strong>Speed:</strong> Blazing fast (single instruction pointer shift).</li>
              <li><strong>Size:</strong> Strictly bounded (typically 1MB - 8MB max).</li>
              <li><strong>Failure Mode:</strong> Stack Overflow (SIGSEGV crash).</li>
            </ul>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-purple-300 text-sm">Heap Characteristics</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Management:</strong> Explicit programmer control via <code>malloc()</code> and <code>free()</code>.</li>
              <li><strong>Speed:</strong> Slower due to allocator searching and fragmentation checks.</li>
              <li><strong>Size:</strong> Limited only by total system physical RAM &amp; virtual swap.</li>
              <li><strong>Failure Mode:</strong> Returns <code>NULL</code> pointer when memory is exhausted.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Stack vs Heap Memory Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>StackVsHeapMemoryDemo.c</code>) inspects the runtime memory addresses of global variables, recursive stack frames, and dynamic heap buffers to prove process address layout.
        </p>

        <CFileLoader fileModule={cCode} title="StackVsHeapMemoryDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
  CODER & ACCOTAX - STACK VS HEAP MEMORY ARCHITECTURE   
========================================================

--- 1. PROCESS MEMORY SEGMENTS ---
  Code/Text Segment (main function) : 0x55a29b4e11a9
  Initialized Data Segment (.data)  : 0x55a29b4e4010
  Uninitialized Data Segment (.bss) : 0x55a29b4e4018

--- 2. STACK MEMORY ALLOCATION (Downward Growth) ---
  [Stack Frame 1] stack_var address: 0x7ffd524ea644, value: 10
  [Stack Frame 2] stack_var address: 0x7ffd524ea614, value: 20
  [Stack Frame 3] stack_var address: 0x7ffd524ea5e4, value: 30

--- 3. HEAP DYNAMIC ALLOCATION (Upward Growth) ---
  heap_ptr1 allocated address       : 0x55a29c7822a0, value: 42
  heap_ptr2 allocated address       : 0x55a29c7822c0, value: 84
  Address difference (bytes)        : 32

  Heap buffers released and pointers reset to NULL.
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
            <h3 className="font-bold text-rose-300">Pitfall: Returning Local Stack Pointer</h3>
            <p className="text-slate-300">
              Returning the address of a local variable from a function (e.g. <code>return &amp;local_val;</code>) produces a dangling pointer because the stack frame is destroyed on return.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Allocate on Heap for Persistence</h3>
            <p className="text-slate-300">
              When data must persist beyond the function that created it, allocate it dynamically on the heap via <code>malloc()</code> and return the heap pointer to the caller.
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
          Why does an array of size <code>int arr[10000000];</code> declared inside <code>main()</code> crash the program immediately with a Segmentation Fault, while <code>int *arr = malloc(10000000 * sizeof(int));</code> succeeds effortlessly?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_009 Topic 0 FAQs: Stack vs Heap" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 0 Note: Stack vs Heap Architecture"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Always visualize your memory segments before writing code! Remember: Stack memory is fast but strictly temporary and limited in size. Heap memory gives you unlimited runtime flexibility, but demands disciplined deallocation hygiene with free()! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
