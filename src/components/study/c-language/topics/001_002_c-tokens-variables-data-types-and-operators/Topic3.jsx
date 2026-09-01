import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/ConstantsAndMacrosDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 3
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Constants &amp; Macro Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Constants in C: #define Preprocessor Macros vs const Type Qualifier
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Uncover the architectural difference between preprocessor text substitution (<code>#define</code>) and compiler-enforced read-only memory variables (<code>const</code>). Master pointer constness rules and macro evaluation pitfalls.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (BEGINNER-FRIENDLY & INTUITIVE) */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
                Teacher's Breakdown: Constants Made Simple for Beginners
              </h2>
              <p className="text-xs text-indigo-300/80">
                A simple guide by Sukanta Hui for students starting their C journey
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            Beginner Friendly Concept
          </span>
        </div>

        {/* Part A: Why do we even need constants? */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>💡</span> Step 1: Why Do We Need Constants at All?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine you are creating a billing software for a medicine shop in <strong>Barrackpore</strong>. The medicine discount rate is <strong>10%</strong> (<code>0.10</code>). If you write the raw number <code>0.10</code> in 40 different places in your code, and next year the government changes the discount to <strong>12%</strong>, you would have to find and rewrite all 40 lines manually! If you miss even one line, customer bills will be calculated wrong!
          </p>
          <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
            <strong>The Teacher's Solution:</strong> Instead of writing magic numbers, we give that value a single permanent name: <code>DISCOUNT_RATE</code>. If the rate changes, we only edit <strong>1 line</strong> at the top, and the whole program updates automatically!
          </div>
        </div>

        {/* Part B: The Two Approaches Explained with Real-World Analogies */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🎭</span> Step 2: The Two Ways to Create Constants (Real-World Analogies)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            {/* Analogy 1: #define */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-sm">Way 1: #define (The Find &amp; Replace Assistant)</span>
                <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">Preprocessor</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Think of <code>#define</code> like an automatic <strong>"Find &amp; Replace"</strong> robot in Microsoft Word before your paper is printed:
              </p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300">
                #define MAX_SEATS 60<br />
                <span className="text-slate-500">// Before compilation starts, every word "MAX_SEATS"</span><br />
                <span className="text-slate-500">// is blindly replaced with the literal number "60".</span>
              </div>
              <ul className="list-disc pl-4 text-slate-400 text-xs space-y-1">
                <li><strong className="text-slate-200">Zero Memory Used:</strong> It doesn't create a box in RAM.</li>
                <li><strong className="text-rose-400">Caution:</strong> No semicolon (<code>;</code>) at the end! If you write <code>#define MAX 60;</code>, it pastes the semicolon into your math formulas and breaks your code!</li>
              </ul>
            </div>

            {/* Analogy 2: const */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-sky-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-300 text-sm">Way 2: const (The Glass Box with a Padlock)</span>
                <span className="bg-sky-500/10 text-sky-400 text-[10px] px-2 py-0.5 rounded border border-sky-500/20">Compiler Guarded</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Think of <code>const</code> like creating a <strong>real storage box in RAM</strong>, putting a value inside, and locking it with a permanent glass padlock:
              </p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-sky-300">
                const int maxSeats = 60;<br />
                <span className="text-slate-500">// maxSeats has a real data type (int) and RAM address.</span><br />
                <span className="text-slate-500">// maxSeats = 70; --&gt; Compiler immediately throws an ERROR!</span>
              </div>
              <ul className="list-disc pl-4 text-slate-400 text-xs space-y-1">
                <li><strong className="text-slate-200">Strict Type Safety:</strong> The compiler validates whether it is an integer, float, or character.</li>
                <li><strong className="text-emerald-400">Debugger Friendly:</strong> You can see <code>maxSeats</code> by name inside GDB debugging tools.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Part C: The "Why Did 2 + 3 Give 11?" Mystery Explained */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>🚨</span> Step 3: The Beginner Macro Trap (Why Did 2 + 3 Equal 11?)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In our lab class, when <strong>Abhronila</strong> wrote a macro to find the square of a number:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2">
              <span className="font-bold text-rose-400 text-xs">❌ The Buggy Macro (Without Parentheses):</span>
              <pre className="font-mono text-xs text-slate-200">
{`#define SQUARE(x) x * x

// You call:
int result = SQUARE(2 + 3);

// What the preprocessor blindly pastes:
int result = 2 + 3 * 2 + 3;
// Math rule: 3 * 2 = 6 first!
// So: 2 + 6 + 3 = 11  <-- WRONG!`}</pre>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400 text-xs">✅ The Teacher's Golden Fix:</span>
              <pre className="font-mono text-xs text-slate-200">
{`#define SQUARE(x) ((x) * (x))

// You call:
int result = SQUARE(2 + 3);

// What the preprocessor pastes:
int result = ((2 + 3) * (2 + 3));
// Math rule: Brackets evaluated first!
// So: (5) * (5) = 25  <-- CORRECT!`}</pre>
            </div>
          </div>
          <p className="text-xs text-amber-300 font-semibold pt-1">
            📌 Rule of Thumb: When writing `#define` math macros, ALWAYS put brackets around every single parameter and the whole expression!
          </p>
        </div>

        {/* Part D: Sukanta's Right-to-Left Pointer Trick */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
            <span>🧭</span> Step 4: The Secret "Right-to-Left" Trick for Const Pointers
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Beginners often get terrified seeing <code>const int *ptr</code> vs <code>int * const ptr</code>. Here is <strong>Sukanta Hui's secret trick</strong>: Read the declaration <em>backwards (from right to left)</em>!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-sky-300 font-bold">const int *ptr;</span>
              <p className="text-slate-400 text-[11px]">
                Read backwards: <code>ptr</code> is a <code>*</code> (pointer) to <code>int</code> that is <code>const</code>.
              </p>
              <p className="text-emerald-400 font-semibold text-[11px]">
                🔑 Meaning: The data is locked! You cannot edit the data through <code>*ptr = 50</code>, but the pointer can point to another variable.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-mono text-purple-300 font-bold">int * const ptr = &amp;x;</span>
              <p className="text-slate-400 text-[11px]">
                Read backwards: <code>ptr</code> is a <code>const</code> <code>*</code> (pointer) to an <code>int</code>.
              </p>
              <p className="text-amber-400 font-semibold text-[11px]">
                🔑 Meaning: The pointer address is handcuffed to <code>&amp;x</code>! You can change the data inside <code>*ptr = 50</code>, but you cannot move <code>ptr</code> to another address.
              </p>
            </div>
          </div>
        </div>

        {/* Part E: Which one should I use as a beginner? */}
        <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl space-y-2 text-xs">
          <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
            <span>🎯</span> Quick Decision Guide: Which One Should I Use?
          </h4>
          <ul className="list-disc pl-5 text-slate-300 space-y-1">
            <li><strong>For regular math numbers / configuration values (like $\pi$, Max Speed, Tax Rate):</strong> Always prefer <code>const float PI = 3.14159f;</code>. It is safe, typed, and clean.</li>
            <li><strong>For header guards and system switches before compilation:</strong> Use <code>#define HEADER_H</code> or <code>#define DEBUG_MODE 1</code>.</li>
            <li><strong>For a group of related states (like PENDING, ACTIVE, COMPLETED):</strong> Use <code>enum Status &#123; PENDING, ACTIVE, COMPLETED &#125;;</code>.</li>
          </ul>
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Technical Topic Description: Textual Substitution vs Read-Only Memory Symbols
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In C, making values immutable can be accomplished through two distinct mechanisms operating at completely different phases of the compilation pipeline:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-300">
            <li>
              <strong>The <code>#define</code> Preprocessor Directive:</strong> Evaluated during the <em>Preprocessing Phase</em> (<code>gcc -E</code>). It performs a blind find-and-replace of text tokens across the source code before any syntax or type checking occurs.
            </li>
            <li>
              <strong>The <code>const</code> Type Qualifier:</strong> Evaluated during the <em>Compiler Semantic Analysis Phase</em> (<code>gcc -S</code>). It defines a typed variable that is placed in the read-only memory segment (<code>.rodata</code>), enforcing strict type validation.
            </li>
          </ul>

          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore Lab):</p>
            <p>
              When <strong>Tuhina</strong> and <strong>Swadeep</strong> inspected the assembly output using <code>gcc -S</code>, they noticed that <code>#define MAX 100</code> vanished into the assembly instruction <code>movl $100, %eax</code> directly as an immediate literal opcode, whereas <code>const int max = 100;</code> generated an entry in the symbol table in the <code>.rodata</code> section!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Preprocessor Expansion vs .rodata Symbol Table
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Execution Architecture: #define Text Inlining vs const in RAM .rodata
            </text>

            {/* #define Architecture */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="40" y="65" width="400" height="120" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="240" y="95" textAnchor="middle" fill="#f59e0b" className="font-bold text-sm">#define MAX 100 (Preprocessor)</text>
              <rect x="60" y="115" width="360" height="50" rx="6" fill="#78350f" />
              <text x="240" y="135" textAnchor="middle" fill="#fef3c7" className="font-mono text-xs">
                printf("%d", MAX);  --&gt;  printf("%d", 100);
              </text>
              <text x="240" y="155" textAnchor="middle" fill="#fde68a" className="text-[10px]">
                No RAM Address · Immediate CPU Opcode Constant
              </text>
            </g>

            {/* const Architecture */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="480" y="65" width="400" height="120" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="680" y="95" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">const int maxVal = 100 (Compiler)</text>
              <rect x="500" y="115" width="360" height="50" rx="6" fill="#0369a1" />
              <text x="680" y="135" textAnchor="middle" fill="#e0f2fe" className="font-mono text-xs">
                Memory Address 0x7FFF04 (.rodata segment)
              </text>
              <text x="680" y="155" textAnchor="middle" fill="#bae6fd" className="text-[10px]">
                Typed &amp; Checked · Supports &amp; Address-Of Operator
              </text>
            </g>

            {/* Bottom Pointer Rule */}
            <rect x="40" y="200" width="840" height="50" rx="8" fill="#111827" stroke="#334155" strokeWidth="1" />
            <text x="460" y="222" textAnchor="middle" fill="#a78bfa" className="text-xs font-mono font-semibold">
              Pointer Rules: const int *p (Points to read-only data) | int * const p (Pointer address is locked)
            </text>
            <text x="460" y="240" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Tip: Read pointer const declarations from right-to-left.
            </text>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: #define vs const vs enum
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">#define Macro</th>
                <th className="p-3">const Variable</th>
                <th className="p-3">enum Constant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-bold text-slate-200">Evaluation Phase</td>
                <td className="p-3 font-mono text-amber-300">Preprocessing (cpp)</td>
                <td className="p-3 font-mono text-sky-300">Compilation (cc1)</td>
                <td className="p-3 font-mono text-emerald-300">Compilation (cc1)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Type Checking</td>
                <td className="p-3 text-rose-400">None (Pure text match)</td>
                <td className="p-3 text-emerald-400">Strict compiler typing</td>
                <td className="p-3 text-emerald-400">Integer type safety</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Memory Allocation</td>
                <td className="p-3">0 bytes (inlined in code)</td>
                <td className="p-3">Allocated in <code>.rodata</code> / Stack</td>
                <td className="p-3">0 bytes (treated as literal)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Address-Of (&amp;) Operator</td>
                <td className="p-3 text-rose-400">Illegal (No RAM address)</td>
                <td className="p-3 text-emerald-400">Legal (<code>const int*</code>)</td>
                <td className="p-3 text-rose-400">Illegal</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Debugger (GDB) Visibility</td>
                <td className="p-3 text-rose-400">Hidden (Inlined literal)</td>
                <td className="p-3 text-emerald-400">Visible named symbol</td>
                <td className="p-3 text-emerald-400">Visible named symbol</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Scope Rules</td>
                <td className="p-3">File scope (until <code>#undef</code>)</td>
                <td className="p-3">Block scope <code>{`{ ... }`}</code></td>
                <td className="p-3">Block or File scope</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Constants &amp; Macro Mechanics Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ConstantsAndMacrosDemo.c</code>) demonstrates macro expansion pitfalls, <code>const</code> variable invariants, enum definitions, and pointer-to-const vs const-pointer constraints.
        </p>

        <CFileLoader fileModule={cCode} title="ConstantsAndMacrosDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     CONSTANTS & PREPROCESSOR MACROS - CODER & ACCOTAX
     Educator: Sukanta Hui | City: Barrackpore
===================================================================

--- [1] #define vs const Comparison ---
#define MAX_STUDENTS : 60 (Textual Preprocessor Replacement)
const maxLabCapacity : 45 (Typed Memory Variable in .rodata)
PI (#define)         : 3.141593
PI (const float)     : 3.141593

--- [2] Preprocessor Macro Expansion Pitfall ---
CALC_SQUARE(2 + 3)   : 25 (Correct: ((2+3) * (2+3)) = 25)
BAD_SQUARE(2 + 3)    : 11 (Pitfall: 2 + 3 * 2 + 3 = 11!)

--- [3] Enumeration Constants (enum) ---
Faculty Security Lvl : 20
Admin Security Lvl   : 99

--- [4] Pointer Constness Invariants ---
Value via ptrToConst : 38
ptrToConst redirected: 7 (points to waitlisted)
Modified via constPtr: 40 (currentEnrolled updated)
===================================================================`}
          </pre>
        </div>
      </section>

      {/* 7. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><strong>Unparenthesized Macros:</strong> Always wrap every parameter and the overall macro expression in parentheses: <code>#define CUBE(x) ((x) * (x) * (x))</code>.</li>
          <li><strong>Macro Side-Effect Pitfall:</strong> Avoid passing expressions with increment/decrement operators like <code>SQUARE(i++)</code> as they will be evaluated multiple times, corrupting <code>i</code>!</li>
          <li><strong>Casting Away const:</strong> Writing <code>*(int*)&amp;myConst = 50;</code> invokes Undefined Behavior (UB) and will crash if <code>myConst</code> resides in read-only <code>.rodata</code>.</li>
        </ul>
      </section>

      {/* 8. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why did C99 introduce <code>static inline</code> functions to replace complex function-like macros? How does an inline function provide zero-overhead execution while guaranteeing that arguments with side-effects (like <code>x++</code>) are evaluated exactly once?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 3 FAQs: Constants & Macros" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 3 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic3_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher note="Always favor const variables and enums over raw #define macros for mathematical constants and state enums. They show up cleanly in GDB debuggers and guarantee complete compiler type checking! — Sukanta Hui" />
      </section>
    </div>
  );
}
