import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic1_files/ParameterPassingDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_004 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Parameter Passing &amp; Pointer Semantics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Parameter Passing Mechanisms: Call by Value vs Passing Pointers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the mechanics of data transmission across stack frame boundaries. Understand why C passes everything strictly by value, how passing pointer addresses simulates call-by-reference, and how to return multiple results using out-parameters.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (FRIENDLY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 text-xl border border-emerald-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-emerald-200 tracking-tight">
                Teacher's Corner: The Great Swap Mystery &amp; The Photocopy Analogy
              </h2>
              <p className="text-xs text-emerald-300/80">
                A crystal-clear classroom breakdown by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Photocopy Sheet Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>📄</span> Step 1: The Photocopy Sheet vs GPS Coordinates Analogy
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            When <strong>Swadeep</strong> and <strong>Debangshu</strong> wrote a function to swap two numbers, their code looked like this:
          </p>
          <div className="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2 font-mono text-xs">
            <span className="text-rose-400 font-bold block font-sans">❌ Why this fails to swap the original variables:</span>
            <pre className="text-slate-200">
{`void swap(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
} // 'x' and 'y' are just local copies on swap's stack frame!
  // When swap() finishes, its stack frame vanishes into thin air!`}</pre>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine handing a student a <strong>photocopy</strong> of your handwritten notebook. If that student erases lines or spills ink on their photocopy, your original notebook on your desk remains 100% pristine and untouched! That is <strong>Call by Value</strong>.
          </p>
          <p className="text-sm text-emerald-300 leading-relaxed">
            To actually modify the notebook on your desk, you must give the student the <strong>exact GPS coordinates (Memory Address `&amp;var`)</strong> to your desk and hand them a master key (`*ptr`). That is <strong>Passing Pointers</strong>!
          </p>
        </div>

        {/* Step 2: The Two Magical Characters: & and * */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
            <span>🗝️</span> Step 2: The Two Key Symbols You Must Master
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 space-y-2">
              <span className="text-sky-300 font-bold text-sm block">1. The Address-Of Operator (`&amp;`):</span>
              <p className="text-slate-300">
                Used at the <strong>Call Site</strong> in <code>main()</code> to obtain the memory address of the variable:
              </p>
              <code className="bg-slate-900 px-2 py-1 rounded text-sky-300 font-mono block">swap(&amp;a, &amp;b); // Passes RAM addresses</code>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-emerald-300 font-bold text-sm block">2. The Dereference Operator (`*`):</span>
              <p className="text-slate-300">
                Used inside the <strong>Function Body</strong> to reach through the pointer and manipulate the original data:
              </p>
              <code className="bg-slate-900 px-2 py-1 rounded text-emerald-300 font-mono block">*ptrA = *ptrB; // Mutates original memory</code>
            </div>
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
            Explore diverse parameter passing architectures: in-place mutators, multiple out-parameters, array decay, and const-safe pointers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: In-Place Variable Mutator */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: In-Place Score Incrementer</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Pointer In-Out</span>
            </div>
            <p className="text-xs text-slate-400">
              Directly increments a caller's score variable without needing assignment return.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`void awardBonusPoints(int *scorePtr, int bonus) {
    if (scorePtr == NULL) return; // Defensive null check
    *scorePtr += bonus; // Directly mutates caller variable!
}

// In caller:
int score = 85;
awardBonusPoints(&score, 10); // score becomes 95`}</pre>
          </div>

          {/* Scenario 2: Multiple Return Out-Parameters */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Returning Multiple Values</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">Out-Parameters</span>
            </div>
            <p className="text-xs text-slate-400">
              Computes both the quotient and remainder in a single function invocation.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`void divide(int a, int b, int *quotient, int *remainder) {
    if (b == 0 || quotient == NULL || remainder == NULL) return;
    *quotient = a / b;
    *remainder = a % b;
}

// In caller:
int q, r;
divide(47, 6, &q, &r); // q = 7, r = 5`}</pre>
          </div>

          {/* Scenario 3: Array Decay & Passing Array Buffers */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Passing Arrays to Functions</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">Array Decay</span>
            </div>
            <p className="text-xs text-slate-400">
              Arrays decay into pointers; always pass the size parameter explicitly!
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`double calculateAverage(const int *arr, int size) {
    if (arr == NULL || size <= 0) return 0.0;
    long long sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i]; // const prevents accidental edits!
    }
    return (double)sum / size;
}`}</pre>
          </div>

          {/* Scenario 4: Fast Struct Passing via Const Pointer */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: High-Speed Struct Passing</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Const Struct*</span>
            </div>
            <p className="text-xs text-slate-400">
              Avoids copying large structures while preserving read-only safety with <code>const</code>.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`typedef struct {
    int id;
    char name[64];
    double balance;
} Account;

void displayAccount(const Account *acc) {
    if (acc == NULL) return;
    // Arrow operator -> combines dereferencing and field access!
    printf("ID: %d | Holder: %s | Bal: %.2f\\n", acc->id, acc->name, acc->balance);
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Call by Value vs Pointer Dereferencing
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Memory Stack Layout: Caller Frame vs Callee Frame Dereferencing
            </text>

            {/* Caller Stack Frame (main) */}
            <g transform="translate(60, 70)">
              <rect x="0" y="0" width="280" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="140" y="28" textAnchor="middle" fill="#38bdf8" className="font-mono text-sm font-bold">main() Stack Frame</text>
              
              {/* Var A */}
              <rect x="20" y="45" width="240" height="45" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="35" y="72" fill="#e2e8f0" className="font-mono text-xs">int a = 10;</text>
              <text x="245" y="72" textAnchor="end" fill="#f59e0b" className="font-mono text-[10px]">Addr: 0x7fff..10</text>

              {/* Var B */}
              <rect x="20" y="105" width="240" height="45" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="35" y="132" fill="#e2e8f0" className="font-mono text-xs">int b = 20;</text>
              <text x="245" y="132" textAnchor="end" fill="#f59e0b" className="font-mono text-[10px]">Addr: 0x7fff..14</text>
            </g>

            {/* Callee Stack Frame (swapByPointer) */}
            <g transform="translate(560, 70)">
              <rect x="0" y="0" width="300" height="170" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="150" y="28" textAnchor="middle" fill="#34d399" className="font-mono text-sm font-bold">swapByPointer() Frame</text>
              
              {/* ptrX */}
              <rect x="20" y="45" width="260" height="45" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="35" y="72" fill="#34d399" className="font-mono text-xs">int *ptrX = 0x7fff..10;</text>

              {/* ptrY */}
              <rect x="20" y="105" width="260" height="45" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="35" y="132" fill="#34d399" className="font-mono text-xs">int *ptrY = 0x7fff..14;</text>
            </g>

            {/* Dereference Arrows pointing back to main() */}
            <path d="M 580 137 C 460 110, 420 110, 320 137" stroke="#34d399" strokeWidth="2.5" strokeDasharray="6,4" />
            <path d="M 580 162 C 460 170, 420 170, 320 197" stroke="#34d399" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="450" y="110" textAnchor="middle" fill="#34d399" className="text-[11px] font-mono font-bold">*ptrX reaches into main()</text>
            <text x="450" y="225" textAnchor="middle" fill="#34d399" className="text-[11px] font-mono font-bold">*ptrY reaches into main()</text>
          </svg>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: ParameterPassingDemo.c
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ParameterPassingDemo.c</code>) demonstrates the failure of call-by-value swapping, the success of pointer-based swapping, and multiple return out-parameters.
        </p>

        <CFileLoader fileModule={demoCode} title="ParameterPassingDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     CALL BY VALUE VS PASSING POINTERS - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [Test 1] Call by Value (Passing Copies) ---
Before Function Call : A = 10, B = 20
   [Inside trySwapByValue] Copy X = 20, Copy Y = 10
After Function Call  : A = 10, B = 20 (UNMODIFIED!)

--- [Test 2] Passing Pointers (Simulated Call by Reference) ---
Before Function Call : A = 10, B = 20
   [Inside swapByPointer] Memory values at 0x7ffd5820 and 0x7ffd5824 swapped!
After Function Call  : A = 20, B = 10 (SUCCESSFULLY SWAPPED!)

--- [Test 3] Multiple Return Out-Parameters ---
Dividend = 47, Divisor = 6 -> Quotient = 7, Remainder = 5
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
          <li><strong>Returning Local Stack Address:</strong> Never return the address of a local variable (<code>return &amp;localVar;</code>) because its stack memory is destroyed upon return!</li>
          <li><strong>Missing Address-Of Operator (&amp;):</strong> Forgetting <code>&amp;</code> when calling a pointer function (e.g. <code>swap(a, b)</code> instead of <code>swap(&amp;a, &amp;b)</code>) causes type mismatch compilation errors.</li>
          <li><strong>Dereferencing NULL Pointers:</strong> Always check if a pointer is <code>NULL</code> before accessing <code>*ptr</code> to avoid Segmentation Fault crashes.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does standard C not have reference variables like C++ (`int &amp;ref = x;`), requiring programmers to explicitly use `*` and `&amp;`? How does this explicit syntax make memory mutations obvious when reading large C codebases?
        </p>
      </section>

      {/* 8. Comprehensive FAQs */}
      <section>
        <FAQTemplate title="Module 001_004 Topic 1 FAQs: Parameter Passing" questions={questions} />
      </section>

      {/* 9. Plain Text Note */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_004_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher Note */}
      <section>
        <Teacher note="Remember the photocopy analogy: modifying a photocopy doesn't change your original notebook! Pass memory addresses with '&' and dereference with '*' to alter caller data! — Sukanta Hui" />
      </section>
    </div>
  );
}
