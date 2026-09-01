import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/FunctionPrototypesDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_004 · Topic 0
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Modular Decomposition &amp; Prototypes
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Modular Design: Function Declarations (Prototypes), Definitions &amp; Invocation
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the architecture of modular C programs. Learn the 3-step function lifecycle (declaration, definition, invocation), signature anatomy, return mechanisms, and how the CPU manages call stack execution.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (FRIENDLY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
                Teacher's Corner: Why Functions are the Building Blocks of Software
              </h2>
              <p className="text-xs text-indigo-300/80">
                A conversational classroom breakdown by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Master Chef & Recipe Card Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>🍳</span> Step 1: The Master Chef &amp; Recipe Index Analogy
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In our Barrackpore lab, students often ask: <em>"Sir, why can't we write our entire 2,000 lines of code inside <code>main()</code>?"</em>
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine a restaurant kitchen where the head chef tries to bake bread, grill steaks, fry potatoes, wash dishes, and serve guests all at the same time on one counter! The kitchen would instantly collapse in chaos!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/30 space-y-1">
              <span className="text-sky-300 font-bold block">1. Function Prototype:</span>
              <span className="text-slate-300">The <strong>Menu Card</strong> (Lists the dish name, required ingredients, and calorie count).</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-emerald-300 font-bold block">2. Function Definition:</span>
              <span className="text-slate-300">The <strong>Chef's Secret Recipe</strong> (The actual cooking steps inside the kitchen braces <code>&#123; &#125;</code>).</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-purple-300 font-bold block">3. Function Invocation:</span>
              <span className="text-slate-300">The <strong>Customer Order</strong> (Calling the function when needed to receive the finished result!).</span>
            </div>
          </div>
        </div>

        {/* Step 2: The Missing Prototype Mystery */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>⚠️</span> Step 2: Why C Demands a Function Prototype Before `main()`
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            The C compiler is a <strong>top-to-bottom single-pass reader</strong>. When it reads <code>main()</code> and sees a call to <code>calculateArea(7.0)</code>, if you haven't given it a prototype at the top of the file, the compiler panics! In C99, it halts with an error: <code>implicit declaration of function</code>.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-emerald-400 font-bold block font-sans mb-1">✅ The Standard C 3-Part Architecture:</span>
            <span className="text-sky-400 font-bold">// 1. PROTOTYPE (Above main):</span><br />
            double calculateCircleArea(double radius);<br /><br />
            <span className="text-sky-400 font-bold">// 2. INVOCATION (Inside main):</span><br />
            int main(void) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;double area = calculateCircleArea(7.0);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;return 0;<br />
            &#125;<br /><br />
            <span className="text-sky-400 font-bold">// 3. DEFINITION (Below main):</span><br />
            double calculateCircleArea(double radius) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;return 3.14159265 * radius * radius;<br />
            &#125;
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
            Explore diverse function architectures: predicate tests, multi-argument math, void helpers, and inline routines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Mathematical Calculation Module */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Mathematical Calculation Routine</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Value Returning</span>
            </div>
            <p className="text-xs text-slate-400">
              Accepts numeric parameters, computes a mathematical result, and returns a double.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`double calculateCylinderVolume(double radius, double height) {
    const double PI = 3.141592653589793;
    if (radius <= 0.0 || height <= 0.0) return 0.0;
    return PI * radius * radius * height;
}`}</pre>
          </div>

          {/* Scenario 2: Boolean Predicate Function */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Boolean Predicate Validator</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">Predicate Pattern</span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates whether an integer satisfies prime conditions and returns <code>bool</code>.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`#include <stdbool.h>

bool isPrime(int n) {
    if (n < 2) return false;
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) return false; // Early exit
    }
    return true; // Prime
}`}</pre>
          </div>

          {/* Scenario 3: Void UI Banner Decorator */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Void UI Banner Decorator</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">Void Action</span>
            </div>
            <p className="text-xs text-slate-400">
              Executes console formatting operations without returning any value.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`void printDashedDivider(int length, char symbol) {
    for (int i = 0; i < length; i++) {
        putchar(symbol);
    }
    putchar('\\n');
}`}</pre>
          </div>

          {/* Scenario 4: Fast Inline Function */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Performance Inline Routine</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">C99 inline</span>
            </div>
            <p className="text-xs text-slate-400">
              Eliminates stack frame push/pop overhead for high-frequency operations.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`static inline int clampValue(int val, int min, int max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Function Call Stack Lifecycle
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 260" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="240" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              CPU Call Stack Frame Mechanics During Function Invocation
            </text>

            {/* Caller (main) */}
            <g transform="translate(60, 70)">
              <rect x="0" y="0" width="220" height="150" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="110" y="30" textAnchor="middle" fill="#38bdf8" className="font-mono text-sm font-bold">main() Frame</text>
              <text x="20" y="65" fill="#94a3b8" className="text-[11px] font-mono">double r = 7.0;</text>
              <text x="20" y="90" fill="#cbd5e1" className="text-[11px] font-mono">call calculateArea(r);</text>
              <text x="20" y="115" fill="#94a3b8" className="text-[11px] font-mono">double area = ...;</text>
              <text x="20" y="135" fill="#64748b" className="text-[10px]">Active Stack Base</text>
            </g>

            {/* Arrow: Push */}
            <path d="M 290 130 L 370 130" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="330" y="115" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-mono">1. PUSH Frame</text>

            {/* Callee (calculateArea) */}
            <g transform="translate(380, 70)">
              <rect x="0" y="0" width="240" height="150" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="120" y="30" textAnchor="middle" fill="#34d399" className="font-mono text-sm font-bold">calculateArea() Frame</text>
              <text x="20" y="60" fill="#94a3b8" className="text-[11px] font-mono">Param: radius = 7.0</text>
              <text x="20" y="85" fill="#94a3b8" className="text-[11px] font-mono">Local: PI = 3.14159</text>
              <text x="20" y="110" fill="#cbd5e1" className="text-[11px] font-mono">Return Address: main+0x18</text>
              <text x="20" y="135" fill="#34d399" className="text-[11px] font-mono">return 153.9380;</text>
            </g>

            {/* Arrow: Pop & Return */}
            <path d="M 630 130 L 710 130" stroke="#a78bfa" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="670" y="115" textAnchor="middle" fill="#a78bfa" className="text-[10px] font-mono">2. POP &amp; Return</text>

            {/* Caller Resumed */}
            <g transform="translate(720, 70)">
              <rect x="0" y="0" width="160" height="150" rx="12" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
              <text x="80" y="30" textAnchor="middle" fill="#a78bfa" className="font-mono text-sm font-bold">Caller Resumes</text>
              <text x="15" y="65" fill="#e2e8f0" className="text-[11px] font-mono">area = 153.9380</text>
              <text x="15" y="95" fill="#94a3b8" className="text-[10px]">Stack frame popped</text>
              <text x="15" y="125" fill="#34d399" className="text-[10px]">Memory reclaimed!</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: FunctionPrototypesDemo.c
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>FunctionPrototypesDemo.c</code>) demonstrates the 3-step function lifecycle: prototypes above <code>main()</code>, value-returning invocations, boolean predicates, and complete function definitions.
        </p>

        <CFileLoader fileModule={demoCode} title="FunctionPrototypesDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     C FUNCTION PROTOTYPES & MODULAR ARCHITECTURE
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

1. Circle Area Calculation:
   Radius = 7.00 units -> Calculated Area = 153.9380 sq units

2. Maximum Integer Comparison:
   Inputs: 145, 280 -> Maximum = 280

3. Even Number Predicate Test:
   Number 42 is EVEN

--- Execution Summary ---
All 3 modular subroutines invoked and executed cleanly.
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
          <li><strong>Missing Prototypes:</strong> Defining a function below <code>main()</code> without a prototype causes compilation errors in C99/C11.</li>
          <li><strong>Writing Code After Return:</strong> Any statements placed immediately after an unconditional <code>return</code> will never execute (dead code).</li>
          <li><strong>Mismatched Parameter Types:</strong> Passing a <code>float</code> to a function expecting a pointer or different integer width triggers type conversion warnings.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does C pass function arguments on the call stack by value rather than by reference by default? How does this protect caller variables from unintended side effects in called subroutines?
        </p>
      </section>

      {/* 8. Comprehensive FAQs */}
      <section>
        <FAQTemplate title="Module 001_004 Topic 0 FAQs: Function Prototypes" questions={questions} />
      </section>

      {/* 9. Plain Text Note */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_004_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher Note */}
      <section>
        <Teacher note="Always remember the 3-step function lifecycle: Prototype above main, Call inside main, and Definition below main! Follow this pattern to write professional, modular C code! — Sukanta Hui" />
      </section>
    </div>
  );
}
