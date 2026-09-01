import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/SwitchCaseDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_003 · Topic 1
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Switch-Case &amp; Jump Tables
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The switch-case Statement: Jump Table Optimization, Fall-Through &amp; Break
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Explore C's high-speed multi-way dispatch statement. Understand CPU jump tables, why switch achieves O(1) time complexity, fall-through mechanics, and menu state machine architectures.
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
                Teacher's Corner: Switch-Case Made Super Simple
              </h2>
              <p className="text-xs text-indigo-300/80">
                A simple guide by Sukanta Hui for beginners at Coder &amp; AccoTax
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Vending Machine vs The Slow Waiter */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>🥤</span> Step 1: The Slow Waiter vs The Fast Vending Machine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-300 font-bold block text-sm">The Slow Waiter (else-if Ladder):</span>
              <p className="text-slate-300">
                Imagine sitting at a restaurant in <strong>Shyamnagar</strong> and the waiter asks: <em>"Do you want Tea? No? Coffee? No? Cold Drink? No? Mango Juice? Yes!"</em> The waiter checks every single item one-by-one from top to bottom (<strong>O(N) linear time</strong>).
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-2">
              <span className="text-indigo-300 font-bold block text-sm">The Fast Vending Machine (switch-case):</span>
              <p className="text-slate-300">
                You press button <strong>#4</strong> on an automatic beverage machine, and Mango Juice drops instantly in one single direct shot! The compiler creates a <strong>Jump Table</strong> in memory to jump directly to case 4 in <strong>O(1) constant time</strong>!
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: The Missing Break Waterfall */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>🌊</span> Step 2: The "Missing Break" Waterfall (Fall-Through)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In C, a <code>case</code> is just an entry doorway into a room. If you do not lock the exit door with a <code>break;</code> statement, execution keeps flowing downward like a waterfall into all the lower cases!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-rose-400 font-bold block font-sans">❌ Accidental Fall-Through Bug:</span>
              <pre className="text-slate-200">
{`int choice = 1;
switch(choice) {
    case 1: printf("Deposit\\n");
    case 2: printf("Withdraw\\n");
    case 3: printf("Balance\\n");
}
// Terminal Output:
// Deposit
// Withdraw
// Balance (All 3 executed!)`}</pre>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-emerald-400 font-bold block font-sans">✅ Protected with Break:</span>
              <pre className="text-slate-200">
{`int choice = 1;
switch(choice) {
    case 1: printf("Deposit\\n"); break;
    case 2: printf("Withdraw\\n"); break;
    case 3: printf("Balance\\n"); break;
}
// Terminal Output:
// Deposit (Stops and exits cleanly!)`}</pre>
            </div>
          </div>
        </div>

        {/* Step 3: Intentional Fall-Through */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🤝</span> Step 3: When Fall-Through is Actually Useful (Stacking Cases)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            When multiple options need to perform the exact same action (like uppercase 'Y' and lowercase 'y'), you can stack case labels directly on top of each other without breaks:
          </p>
          <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-sky-300 border border-slate-800">
            case 'y':<br />
            case 'Y':<br />
            &nbsp;&nbsp;&nbsp;&nbsp;printf("User confirmed: YES!\\n");<br />
            &nbsp;&nbsp;&nbsp;&nbsp;break;
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
            Real-world switch-case patterns across different engineering domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Interactive Math Calculator */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Four-Function Calculator</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Arithmetic Dispatch</span>
            </div>
            <p className="text-xs text-slate-400">
              Dispatches calculations directly based on the operator character token.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`char op = '*';
double a = 15.0, b = 3.0;

switch (op) {
    case '+': printf("%.2f\\n", a + b); break;
    case '-': printf("%.2f\\n", a - b); break;
    case '*': printf("%.2f\\n", a * b); break;
    case '/': 
        if (b != 0.0) printf("%.2f\\n", a / b);
        else printf("Error: Division by Zero\\n");
        break;
    default:  printf("Invalid Operator\\n"); break;
}`}</pre>
          </div>

          {/* Scenario 2: Calendar Month Days with Leap Year */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Days in Month Classifier</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">Stacked Cases</span>
            </div>
            <p className="text-xs text-slate-400">
              Groups all 31-day and 30-day months together with stacked case labels.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int month = 4, year = 2024, days = 0;
switch (month) {
    case 1: case 3: case 5: case 7: 
    case 8: case 10: case 12:
        days = 31; break;
    case 4: case 6: case 9: case 11:
        days = 30; break;
    case 2:
        days = ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) ? 29 : 28;
        break;
    default: days = -1; break;
}`}</pre>
          </div>

          {/* Scenario 3: State Machine Navigation */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Finite State Machine</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">Enum Dispatch</span>
            </div>
            <p className="text-xs text-slate-400">
              Controls state transitions for a traffic signal or transaction lifecycle.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`typedef enum { RED, YELLOW, GREEN } TrafficState;
TrafficState current = RED;

switch (current) {
    case RED:
        printf("STOP - Halt Vehicle\\n");
        current = GREEN; // Next transition
        break;
    case YELLOW:
        printf("READY - Prepare to Move\\n");
        current = RED;
        break;
    case GREEN:
        printf("GO - Clear to Proceed\\n");
        current = YELLOW;
        break;
}`}</pre>
          </div>

          {/* Scenario 4: Local Scope Variable Declaration */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Local Scope in Cases</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Block Scoping</span>
            </div>
            <p className="text-xs text-slate-400">
              Wrapping case blocks in <code>&#123; &#125;</code> allows safe variable declarations.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int action = 1;
switch (action) {
    case 1: {
        // Braces create a new local scope!
        int bonus = 500;
        int totalPayout = 1000 + bonus;
        printf("Payout: %d\\n", totalPayout);
        break;
    }
    case 2:
        printf("No bonus applied.\\n");
        break;
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Jump Table Compilation &amp; CPU Dispatch
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When a C compiler compiles a <code>switch-case</code> with densely clustered integer constants, it does not generate a sequential chain of <code>cmp</code> and <code>jne</code> instructions. Instead, it generates a <strong>Jump Table</strong> (an array of code address pointers).
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Context (Naihati &amp; Barrackpore Labs):</p>
            <p>
              When <strong>Tuhina</strong> and <strong>Abhronila</strong> built an interactive billing menu, they forgot to put <code>break;</code> after Case 1, causing an automatic withdrawal whenever someone deposited money! <strong>Sukanta Hui</strong> showed how <code>break</code> creates an assembly <code>jmp</code> instruction to the end of the switch block.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Jump Table Dispatch Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Compiler Optimization: Switch Expression to Direct O(1) Jump Table Lookup
            </text>

            {/* Input Expression Box */}
            <g transform="translate(40, 90)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="180" height="80" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="90" y="35" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">switch(key)</text>
              <text x="90" y="55" textAnchor="middle" fill="#cbd5e1" className="font-mono text-xs">key = 2</text>
            </g>

            {/* Arrow to Jump Table */}
            <path d="M 220 130 L 290 130" stroke="#38bdf8" strokeWidth="2" />

            {/* Jump Table Array */}
            <g transform="translate(290, 60)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="220" height="150" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <text x="110" y="25" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs">Jump Table [.rodata]</text>
              
              <rect x="10" y="35" width="200" height="25" fill="#1e293b" />
              <text x="20" y="52" fill="#94a3b8" className="font-mono text-[10px]">Index 0 &rarr; &amp;Case_0</text>

              <rect x="10" y="65" width="200" height="25" fill="#1e293b" />
              <text x="20" y="82" fill="#94a3b8" className="font-mono text-[10px]">Index 1 &rarr; &amp;Case_1</text>

              <rect x="10" y="95" width="200" height="25" fill="#3b82f6" />
              <text x="20" y="112" fill="#ffffff" className="font-mono text-[10px] font-bold">Index 2 &rarr; &amp;Case_2 (MATCH)</text>

              <rect x="10" y="125" width="200" height="20" fill="#1e293b" />
              <text x="20" y="138" fill="#94a3b8" className="font-mono text-[10px]">Index 3 &rarr; &amp;Case_3</text>
            </g>

            {/* Arrow to Case Code */}
            <path d="M 510 110 L 600 110" stroke="#34d399" strokeWidth="2" />

            {/* Target Case Code Block */}
            <g transform="translate(600, 75)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="280" height="110" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
              <text x="140" y="30" textAnchor="middle" fill="#ffffff" className="font-bold text-sm">case 2 Code Block</text>
              <text x="140" y="55" textAnchor="middle" fill="#a7f3d0" className="font-mono text-xs">printf("Target Match!");</text>
              <text x="140" y="80" textAnchor="middle" fill="#6ee7b7" className="font-mono text-xs font-bold">break;  &rarr;  jmp .L_exit</text>
            </g>

            {/* Bottom summary */}
            <text x="460" y="240" textAnchor="middle" fill="#94a3b8" className="text-xs">
              ⚡ Direct indexed memory jump: 0 comparisons executed regardless of case count!
            </text>
          </svg>
        </div>
      </section>

      {/* 6. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: switch-case vs else-if Ladder
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">switch-case Statement</th>
                <th className="p-3">else-if Ladder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-bold text-slate-200">Execution Complexity</td>
                <td className="p-3 font-mono text-emerald-400">O(1) Constant Time (Jump Table)</td>
                <td className="p-3 font-mono text-amber-400">O(N) Linear Time (Sequential checks)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Allowed Data Types</td>
                <td className="p-3">Only integral types (int, char, enum)</td>
                <td className="p-3">Any boolean expression (floats, pointers, ranges)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Range Checks (&gt;, &lt;)</td>
                <td className="p-3 text-rose-400">No (only discrete exact equality)</td>
                <td className="p-3 text-emerald-400">Yes (supports any inequality)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Fall-Through Capability</td>
                <td className="p-3 text-sky-400">Yes (cascades unless broken)</td>
                <td className="p-3">No (mutually exclusive evaluation)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-200">Best Use Case</td>
                <td className="p-3">Command menus, state machines, tokens</td>
                <td className="p-3">Grading scales, range boundaries, complex conditions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: switch-case Architecture Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>SwitchCaseDemo.c</code>) demonstrates interactive menu arithmetic dispatch, intentional stacked fall-through for calendar days, and character vowel categorization.
        </p>

        <CFileLoader fileModule={cCode} title="SwitchCaseDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     SWITCH-CASE ARCHITECTURE & MECHANICS - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Menu Calculator using switch-case ---
12.50 * 4.00 = 50.00

--- [2] Intentional Fall-Through (Days in Month) ---
Month 2 in Year 2024 has 29 days.

--- [3] Grouped Case Statements (Vowel Classifier) ---
Character 'E' is a VOWEL.
===================================================================`}
          </pre>
        </div>
      </section>

      {/* 8. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><strong>Forgotten break Statements:</strong> Causes accidental fall-through into unintended case routines!</li>
          <li><strong>Attempting to match Float/Double variables:</strong> Causes compiler error (<code>switch quantity not an integer</code>).</li>
          <li><strong>Missing default Case:</strong> Always include a <code>default:</code> label to handle invalid input tokens safely.</li>
        </ul>
      </section>

      {/* 9. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does the compiler choose a balanced binary search tree rather than a jump table when case values are widely spaced (e.g. <code>case 5:</code>, <code>case 5000:</code>, <code>case 1000000:</code>)? How does this save memory in the <code>.rodata</code> segment?
        </p>
      </section>

      {/* 10. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_003 Topic 1 FAQs: switch-case Mechanics" questions={questions} />
      </section>

      {/* 11. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_003_topic1_note.txt"
        />
      </section>

      {/* 12. Teacher's Note Section */}
      <section>
        <Teacher note="Whenever writing state machines, menu dispatchers, or packet decoders in C, always prefer switch-case over if-else! Jump tables execute at blistering O(1) CPU speed! — Sukanta Hui" />
      </section>
    </div>
  );
}
