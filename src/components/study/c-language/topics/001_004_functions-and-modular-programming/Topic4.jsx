import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/RecursionStackDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_004 · Topic 4
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Recursion &amp; Stack Frame Mechanics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Recursion Fundamentals: Base Condition, Stack Frames &amp; Tail Calls
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the art and science of recursive problem solving in C. Learn how call stack frames expand and unwind, why base conditions prevent fatal stack overflows, how tail call optimization works, and how to solve classic puzzles like the Tower of Hanoi.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (FRIENDLY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-2 border-rose-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 text-xl border border-rose-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-rose-200 tracking-tight">
                Teacher's Corner: The Russian Nesting Dolls Analogy
              </h2>
              <p className="text-xs text-rose-300/80">
                How Sukanta Hui teaches recursion intuition at Coder &amp; AccoTax (Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Russian Matryoshka Doll Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>🪆</span> Step 1: The Matryoshka Doll &amp; The Two Phases of Recursion
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine a set of wooden Russian nesting dolls on your table:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 space-y-2">
              <span className="text-sky-300 font-bold text-sm block">1. The Winding Phase (Stack Expansion):</span>
              <p className="text-slate-300">
                You open a big doll, and inside is a smaller doll. You open that one, and find an even smaller doll! Each doll opened is a <strong>new stack frame pushed onto the CPU call stack</strong>. No final answers yet—just waiting!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-emerald-300 font-bold text-sm block">2. The Base Case &amp; Unwinding Phase:</span>
              <p className="text-slate-300">
                Finally, you open a doll and find the <strong>tiniest solid baby doll (The Base Case!)</strong>. It cannot be opened further! Now, you start closing all the dolls back up one-by-one, calculating the result at each step as stack frames pop off!
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: The Missing Base Case Disaster */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>💥</span> Step 2: What Happens If You Forget the Base Case? (Stack Overflow!)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            When <strong>Swadeep</strong> and <strong>Tuhina</strong> ran their first recursive program without an <code>if (n &lt;= 1)</code> halting check, their program instantly crashed with a <code>Segmentation Fault</code>.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-rose-400 font-bold block font-sans mb-1">❌ Infinite Call Stack Explosion:</span>
            fact(4) &rarr; fact(3) &rarr; fact(2) &rarr; fact(1) &rarr; fact(0) &rarr; fact(-1) &rarr; fact(-2)...<br />
            Thousands of stack frames eat up all available RAM stack memory until the OS forcibly terminates the program with a <strong>Stack Overflow</strong>!
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
            Explore classic recursive patterns from mathematical factorials and Euclidean GCD to Tower of Hanoi and fast binary exponentiation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Euclidean Recursive GCD */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Euclidean Recursive GCD</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Tail Recursive</span>
            </div>
            <p className="text-xs text-slate-400">
              Computes Greatest Common Divisor in $O(\log N)$ logarithmic recursive steps.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int gcdRecursive(int a, int b) {
    // Base Case: when divisor reaches 0, 'a' is GCD!
    if (b == 0) return a;
    return gcdRecursive(b, a % b); // Tail call!
}`}</pre>
          </div>

          {/* Scenario 2: Tail-Recursive Factorial with Accumulator */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Tail-Call Optimized Factorial</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">TCO Pattern</span>
            </div>
            <p className="text-xs text-slate-400">
              Passes intermediate products forward, enabling $O(1)$ stack frame reuse.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`unsigned long long factTail(int n, unsigned long long acc) {
    if (n <= 1) return acc;
    // Pure tail call (no pending multiplication!)
    return factTail(n - 1, n * acc);
}`}</pre>
          </div>

          {/* Scenario 3: Fast Binary Power (X^N in O(log N)) */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Fast Divide-and-Conquer Power</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">O(log N) Divide &amp; Conquer</span>
            </div>
            <p className="text-xs text-slate-400">
              Halves the exponent on every step instead of slow linear multiplication.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`double fastPower(double x, int n) {
    if (n == 0) return 1.0;
    double half = fastPower(x, n / 2);
    if (n % 2 == 0) return half * half;
    return x * half * half;
}`}</pre>
          </div>

          {/* Scenario 4: Classic Tower of Hanoi Puzzle */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Tower of Hanoi 3-Peg Solver</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Tree Recursion</span>
            </div>
            <p className="text-xs text-slate-400">
              Solves the $2^N - 1$ disk transfer game with 3 recursive peg shifts.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c -> %c\\n", from, to);
        return;
    }
    hanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c -> %c\\n", n, from, to);
    hanoi(n - 1, aux, to, from);
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Recursion Call Stack Expansion &amp; Unwinding
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 300" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="280" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              The 2 Phases of Factorial(3): Winding (Stack Push) &amp; Unwinding (Stack Pop)
            </text>

            {/* Step 1: fact(3) */}
            <g transform="translate(60, 70)">
              <rect x="0" y="0" width="160" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="80" y="28" textAnchor="middle" fill="#38bdf8" className="font-mono text-xs font-bold">1. Call fact(3)</text>
              <rect x="15" y="45" width="130" height="40" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="25" y="70" fill="#e2e8f0" className="font-mono text-[11px]">n = 3</text>
              <text x="15" y="115" fill="#f59e0b" className="text-[10px]">3 * fact(2)</text>
              <text x="15" y="140" fill="#34d399" className="text-[10px] font-bold">Returns: 3 * 2 = 6</text>
            </g>

            {/* Winding Arrow 1 */}
            <path d="M 230 110 L 290 110" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="260" y="98" textAnchor="middle" fill="#38bdf8" className="text-[9px] font-mono">PUSH</text>

            {/* Step 2: fact(2) */}
            <g transform="translate(300, 70)">
              <rect x="0" y="0" width="160" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="80" y="28" textAnchor="middle" fill="#f59e0b" className="font-mono text-xs font-bold">2. Call fact(2)</text>
              <rect x="15" y="45" width="130" height="40" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="25" y="70" fill="#e2e8f0" className="font-mono text-[11px]">n = 2</text>
              <text x="15" y="115" fill="#f59e0b" className="text-[10px]">2 * fact(1)</text>
              <text x="15" y="140" fill="#34d399" className="text-[10px] font-bold">Returns: 2 * 1 = 2</text>
            </g>

            {/* Winding Arrow 2 */}
            <path d="M 470 110 L 530 110" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="500" y="98" textAnchor="middle" fill="#38bdf8" className="text-[9px] font-mono">PUSH</text>

            {/* Step 3: Base Case fact(1) */}
            <g transform="translate(540, 70)">
              <rect x="0" y="0" width="170" height="180" rx="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="85" y="28" textAnchor="middle" fill="#34d399" className="font-mono text-xs font-bold">3. BASE CASE fact(1)</text>
              <rect x="15" y="45" width="140" height="40" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="25" y="70" fill="#34d399" className="font-mono text-[11px] font-bold">if (n &lt;= 1) return 1;</text>
              <text x="15" y="115" fill="#34d399" className="text-[10px]">Halts Recursion!</text>
              <text x="15" y="140" fill="#34d399" className="text-[10px] font-bold">Returns: 1</text>
            </g>

            {/* Unwinding Curved Return Path */}
            <path d="M 625 210 C 500 260, 300 260, 140 210" stroke="#a78bfa" strokeWidth="3" strokeDasharray="6,4" />
            <text x="380" y="270" textAnchor="middle" fill="#a78bfa" className="text-[11px] font-mono font-bold">
              UNWINDING RESOLUTION PHASE &rarr; Popping Stack Frames &amp; Computing Products
            </text>
          </svg>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: RecursionStackDemo.c
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>RecursionStackDemo.c</code>) traces call stack expansion and unwinding in real-time, demonstrates tail recursive optimization, computes the Fibonacci sequence, and solves the Tower of Hanoi puzzle.
        </p>

        <CFileLoader fileModule={demoCode} title="RecursionStackDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     RECURSION & CALL STACK ANALYSIS - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Factorial Call Stack Expansion & Unwinding (N = 4) ---
-> Entering fact(4) [Stack Depth 0]
  -> Entering fact(3) [Stack Depth 1]
    -> Entering fact(2) [Stack Depth 2]
      -> Entering fact(1) [Stack Depth 3]
      <- Base Case Reached at fact(1) = 1 [Unwinding Begins]
    <- Returning from fact(2): 2 * 1 = 2
  <- Returning from fact(3): 3 * 2 = 6
<- Returning from fact(4): 4 * 6 = 24
Final Calculated Factorial (4!) = 24

--- [2] Tail Recursive Factorial (N = 5, Accumulator = 1) ---
5! via Tail Recursion = 120

--- [3] Recursive Fibonacci Terms [0 to 7] ---
Fib(0) = 0  Fib(1) = 1  Fib(2) = 1  Fib(3) = 2  Fib(4) = 3  Fib(5) = 5  Fib(6) = 8  Fib(7) = 13  

--- [4] Tower of Hanoi Solution (3 Disks: A -> C via B) ---
   Move disk 1 from peg A -> peg C
   Move disk 2 from peg A -> peg B
   Move disk 1 from peg C -> peg B
   Move disk 3 from peg A -> peg C
   Move disk 1 from peg B -> peg A
   Move disk 2 from peg B -> peg C
   Move disk 1 from peg A -> peg C

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
          <li><strong>Missing Base Case:</strong> Always write the base condition first to prevent runaway infinite recursion and Stack Overflow crashes.</li>
          <li><strong>Moving Away from Base Case:</strong> Writing <code>fact(n + 1)</code> instead of <code>fact(n - 1)</code> diverges from the halting rule.</li>
          <li><strong>Exponential Naive Fibonacci:</strong> Re-computing overlapping subproblems in multi-branch recursion causes severe performance slowdowns; use iteration or dynamic memoization for Fibonacci.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How does Tail Call Optimization (TCO) allow functional programming languages and modern C compilers to execute deep recursive functions without consuming extra stack memory?
        </p>
      </section>

      {/* 8. Comprehensive FAQs */}
      <section>
        <FAQTemplate title="Module 001_004 Topic 4 FAQs: Recursion Fundamentals" questions={questions} />
      </section>

      {/* 9. Plain Text Note */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 4 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_004_topic4_note.txt"
        />
      </section>

      {/* 10. Teacher Note */}
      <section>
        <Teacher note="Remember the Matryoshka nesting doll: always establish your base case first, and trust the recursive leap of faith! Recursion is the superpower of data structures! — Sukanta Hui" />
      </section>
    </div>
  );
}
