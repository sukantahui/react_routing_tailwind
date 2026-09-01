import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic2_files/VariableScopeDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_004 · Topic 2
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Scope, Lifetime &amp; Visibility
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Variable Scope &amp; Lifetime: Local/Block Scope vs Global/File Scope
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Understand the boundaries of variable accessibility and memory persistence in C. Learn how block scope protects local state, how global scope functions, why variable shadowing occurs, and how the OS manages memory segments.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (FRIENDLY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 text-xl border border-amber-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-amber-200 tracking-tight">
                Teacher's Corner: The Private Bedroom vs Public Park Analogy
              </h2>
              <p className="text-xs text-amber-300/80">
                A simple mental model taught by Sukanta Hui at Coder &amp; AccoTax (Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Bedroom vs Public Park Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🏡</span> Step 1: Scope vs Lifetime Made Intuitive
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Beginners often mix up <strong>Scope</strong> and <strong>Lifetime</strong>. Here is how Sukanta Hui explains it:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 space-y-2">
              <span className="text-sky-300 font-bold text-sm block">1. Local / Block Scope = Your Private Bedroom:</span>
              <p className="text-slate-300">
                Variables declared inside braces <code>&#123; int x = 10; &#125;</code> belong strictly to that room. When you leave the room (closing brace), the room is tidied up and the local variable vanishes! Nobody outside can see or touch it.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
              <span className="text-amber-300 font-bold text-sm block">2. Global Scope = A Public City Park in Barrackpore:</span>
              <p className="text-slate-300">
                A variable declared outside all functions is like a statue in a public park. Anyone walking by from any function can view it, paint it, or modify it! If a bug happens, it's hard to know which function caused it.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: The Variable Shadowing Mask */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
            <span>🎭</span> Step 2: The Mask of Variable Shadowing
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            What happens when <strong>Tuhina</strong> declares a local variable <code>int count = 5;</code> inside a function when there is already a global <code>int count = 100;</code>?
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-emerald-400 font-bold block font-sans mb-1">🎭 Variable Shadowing Mechanics:</span>
            Inside that function, the local <code>count</code> wears a <strong>mask</strong> that temporarily hides the global <code>count</code>. Any updates to <code>count</code> only affect the local 5, leaving the global 100 completely untouched! Once the function returns, the global 100 becomes visible again!
          </div>
        </div>
      </section>

      {/* 3. DEDICATED MULTI-SCENARIO EXAMPLES SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
            <span>📚</span> Multi-Scenario Code Examples &amp; Practical Variations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Explore diverse scoping scenarios: block isolation, loop headers, global configuration flags, and shadowing traps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Block Isolation Inside If-Statements */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Block Scope in Conditionals</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Block Isolation</span>
            </div>
            <p className="text-xs text-slate-400">
              Temporary calculation variables declared inside <code>if</code> blocks die upon block exit.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`if (orderTotal > 5000.0) {
    double discount = orderTotal * 0.10; // Exists only inside this block!
    orderTotal -= discount;
    printf("Discount Applied: INR %.2f\\n", discount);
}
// 'discount' is completely destroyed here!`}</pre>
          </div>

          {/* Scenario 2: C99 Loop-Header Scope */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Loop-Header Scope in C99</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">C99 for-loop</span>
            </div>
            <p className="text-xs text-slate-400">
              Loop variables declared in <code>for(int i=0; ...)</code> prevent polluting the parent function.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`for (int i = 0; i < 5; i++) {
    printf("Item %d\\n", i);
}
// In C99+, 'i' is out of scope here!
// You can declare 'for (int i = 0; ...)' again safely!`}</pre>
          </div>

          {/* Scenario 3: Global Constant Configuration Pattern */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Safe Global Constant Pattern</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">const Read-Only</span>
            </div>
            <p className="text-xs text-slate-400">
              Shares immutable system constants across functions without side-effect risks.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`const double TAX_RATE_GST = 0.18; // Immutable global
const int MAX_USERS = 500;

double calculateGross(double net) {
    return net * (1.0 + TAX_RATE_GST); // Read-only access is safe!
}`}</pre>
          </div>

          {/* Scenario 4: Deep Multi-Tier Nested Shadowing */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Multi-Tier Nested Shadowing</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Lexical Lookup</span>
            </div>
            <p className="text-xs text-slate-400">
              Demonstrates how innermost declarations always take lexical precedence.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int val = 1; // Global
void test(void) {
    int val = 2; // Function local
    {
        int val = 3; // Block local
        printf("%d ", val); // Prints 3
    }
    printf("%d ", val); // Prints 2
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Memory Segments &amp; Variable Lifetimes
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Operating System Memory Segments: Lifetime &amp; Scope Hierarchy
            </text>

            {/* Text Segment */}
            <g transform="translate(40, 70)">
              <rect x="0" y="0" width="180" height="170" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <text x="90" y="30" textAnchor="middle" fill="#94a3b8" className="font-mono text-xs font-bold">Text (.text / .rodata)</text>
              <text x="15" y="65" fill="#cbd5e1" className="text-[10px] font-mono">Compiled Code</text>
              <text x="15" y="90" fill="#cbd5e1" className="text-[10px] font-mono">String Literals</text>
              <text x="15" y="115" fill="#64748b" className="text-[10px]">Read-Only Memory</text>
              <text x="15" y="145" fill="#38bdf8" className="text-[10px]">Program Duration</text>
            </g>

            {/* Data Segment (Globals) */}
            <g transform="translate(250, 70)">
              <rect x="0" y="0" width="200" height="170" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="100" y="30" textAnchor="middle" fill="#f59e0b" className="font-mono text-xs font-bold">Data (.data / .bss)</text>
              <text x="15" y="65" fill="#fde68a" className="text-[10px] font-mono">Global Variables</text>
              <text x="15" y="90" fill="#fde68a" className="text-[10px] font-mono">Static Local Variables</text>
              <text x="15" y="115" fill="#94a3b8" className="text-[10px]">Fixed RAM Addresses</text>
              <text x="15" y="145" fill="#38bdf8" className="text-[10px]">Program Duration</text>
            </g>

            {/* Heap Segment */}
            <g transform="translate(480, 70)">
              <rect x="0" y="0" width="180" height="170" rx="12" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
              <text x="90" y="30" textAnchor="middle" fill="#a78bfa" className="font-mono text-xs font-bold">Heap Segment</text>
              <text x="15" y="65" fill="#ddd6fe" className="text-[10px] font-mono">malloc() / calloc()</text>
              <text x="15" y="90" fill="#ddd6fe" className="text-[10px] font-mono">Dynamic Memory</text>
              <text x="15" y="115" fill="#94a3b8" className="text-[10px]">Grows Upward</text>
              <text x="15" y="145" fill="#a78bfa" className="text-[10px]">Until free()</text>
            </g>

            {/* Stack Segment */}
            <g transform="translate(690, 70)">
              <rect x="0" y="0" width="190" height="170" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="95" y="30" textAnchor="middle" fill="#34d399" className="font-mono text-xs font-bold">Stack Segment</text>
              <text x="15" y="65" fill="#a7f3d0" className="text-[10px] font-mono">Local Variables</text>
              <text x="15" y="90" fill="#a7f3d0" className="text-[10px] font-mono">Function Parameters</text>
              <text x="15" y="115" fill="#94a3b8" className="text-[10px]">Grows Downward</text>
              <text x="15" y="145" fill="#f43f5e" className="text-[10px]">Block Scope Lifetime</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: VariableScopeDemo.c
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>VariableScopeDemo.c</code>) demonstrates global variable mutation across functions, local variable shadowing, and nested block scope isolation.
        </p>

        <CFileLoader fileModule={demoCode} title="VariableScopeDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     VARIABLE SCOPE & LIFETIME LAB - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Global Variable Mutation Across Functions ---
Initial globalSystemCounter in main() = 100
   [demonstrateGlobalAccess] Reading globalSystemCounter = 100
   [demonstrateGlobalAccess] Updated globalSystemCounter = 150
After function call in main() = 150

--- [2] Variable Shadowing (Local Masks Global) ---
   [demonstrateLocalShadowing] Local Shadowed Value = 999
Global globalSystemCounter in main() remains = 150

--- [3] Block Scope & Lifetime Inside Braces { } ---
   [demonstrateBlockScope] Outer block: outerX = 10
      [Nested Block] innerY = 20, Shadowed outerX = 55
   [demonstrateBlockScope] After nested block: outerX = 10 (Restored)

===================================================================`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><strong>Overusing Global Variables:</strong> Mutable globals create hidden dependencies that make programs difficult to debug and test.</li>
          <li><strong>Unintended Shadowing:</strong> Declaring a local variable with the same name as a global can cause confusion; compile with <code>-Wshadow</code> to catch these early.</li>
          <li><strong>Accessing Out-of-Scope Variables:</strong> Attempting to access a variable outside its declaring <code>&#123; &#125;</code> block triggers an 'undeclared identifier' compiler error.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does the C runtime allocate local variables on the call stack instead of in the data segment? How does the stack enable functions to be called recursively without overwriting each other's local variables?
        </p>
      </section>

      {/* 8. Comprehensive FAQs */}
      <section>
        <FAQTemplate title="Module 001_004 Topic 2 FAQs: Variable Scope" questions={questions} />
      </section>

      {/* 9. Plain Text Note */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 2 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_004_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher Note */}
      <section>
        <Teacher note="Always keep your variable scope as narrow and local as possible! Declare variables right when you need them to keep your code clean, modular, and bug-free! — Sukanta Hui" />
      </section>
    </div>
  );
}
