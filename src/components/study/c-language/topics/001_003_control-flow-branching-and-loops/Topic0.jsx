import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/ConditionalBranchingDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_003 · Topic 0
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Decision Making &amp; Branching
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Conditional Branching: if, if-else, else-if Ladder &amp; Nested Decision Trees
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master C program decision-making logic. Learn how the CPU switches execution paths using boolean evaluations, multi-tier <code>else-if</code> ladders, nested decision trees, and defensive coding guards.
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
                Teacher's Corner: Decision Making Explained Step-by-Step
              </h2>
              <p className="text-xs text-emerald-300/80">
                A warm, beginner-friendly guide by Sukanta Hui (Coder &amp; AccoTax)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Railway Switcher Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>🚂</span> Step 1: The Railway Track Switcher Analogy
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Normally, a computer program runs like a train on a single straight track—executing line 1, then line 2, then line 3. But what if there is a roadblock or a decision to make?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-emerald-300 font-bold block text-sm">When Signal is GREEN (TRUE / Non-Zero):</span>
              <p className="text-slate-300">
                The track switches! The train enters the <code>if</code> station and runs the special block of code inside <code>&#123; ... &#125;</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-2">
              <span className="text-rose-300 font-bold block text-sm">When Signal is RED (FALSE / 0):</span>
              <p className="text-slate-300">
                The train skips the <code>if</code> block completely and either takes the bypass track or enters the <code>else</code> station.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: The #1 Bug in C History */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>🚨</span> Step 2: The #1 Trap for Beginners: Single = vs Double ==
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In our Barrackpore lab, almost every new student makes this mistake at least once:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-rose-400 font-bold block font-sans">❌ The Danger (Single '=' Assignment):</span>
              <pre className="text-slate-200">
{`int role = 0; // 0 means Guest

if (role = 1) { 
    printf("Access Granted!"); 
}
// What happened?
// 1 is ASSIGNED into role!
// The condition tests '1' (TRUE)!
// The guest gets Admin access!`}</pre>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-emerald-400 font-bold block font-sans">✅ The Teacher's Fix (Double '==' Comparison):</span>
              <pre className="text-slate-200">
{`int role = 0;

if (role == 1) { 
    printf("Access Granted!"); 
}
// What happens?
// Compares: Is role equal to 1?
// Since role is 0, condition is FALSE!
// Access is safely DENIED!`}</pre>
            </div>
          </div>
          <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/40 text-xs text-amber-200">
            <strong>Teacher's Secret Trick ("Yoda Condition"):</strong> Write <code>if (1 == role)</code>. If you accidentally write <code>if (1 = role)</code>, the compiler will immediately stop you with an error because you cannot assign a value to the number 1!
          </div>
        </div>

        {/* Step 3: The else-if Ladder Priority */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🪜</span> Step 3: How the else-if Ladder Works Like a Priority Filter
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Think of an <code>else-if</code> ladder like an examination grading filter in school. It checks from top to bottom. As soon as a student's score matches <strong>one</strong> level, that grade is awarded, and the computer <strong>skips all remaining tests</strong> below it!
          </p>
          <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 space-y-1 border border-slate-800">
            <span className="text-sky-300">if (marks &gt;= 90)</span> &rarr; Award 'O' (95 matches here &rarr; Exits ladder immediately!)<br />
            <span className="text-emerald-300">else if (marks &gt;= 80)</span> &rarr; Award 'E'<br />
            <span className="text-amber-300">else if (marks &gt;= 70)</span> &rarr; Award 'A'<br />
            <span className="text-rose-300">else</span> &rarr; Award 'F' (Runs only if ALL conditions above failed)
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
            Real-world branching patterns and practical logic scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Leap Year Detector */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Leap Year Detector</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Boolean Logic</span>
            </div>
            <p className="text-xs text-slate-400">
              Combines modulo arithmetic with logical AND (<code>&amp;&amp;</code>) and OR (<code>||</code>).
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int year = 2024;
if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
    printf("%d is a Leap Year (366 days)\\n", year);
} else {
    printf("%d is a Normal Year (365 days)\\n", year);
}`}</pre>
          </div>

          {/* Scenario 2: ATM Withdrawal Balance Validator */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: ATM Balance Validator</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">Nested if-else</span>
            </div>
            <p className="text-xs text-slate-400">
              Validates multiple security boundaries step-by-step before dispensing cash.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`double balance = 15000.0, withdraw = 4000.0;

if (withdraw > 0 && (int)withdraw % 100 == 0) {
    if (withdraw <= balance) {
        balance -= withdraw;
        printf("Dispensing cash. New Balance: INR %.2f\\n", balance);
    } else {
        printf("Error: Insufficient funds!\\n");
    }
} else {
    printf("Error: Amount must be in multiples of 100!\\n");
}`}</pre>
          </div>

          {/* Scenario 3: Triangle Classification */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Triangle Geometry Checker</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">else-if Ladder</span>
            </div>
            <p className="text-xs text-slate-400">
              Tests triangle inequality theorem followed by side equality classification.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int a = 5, b = 5, c = 5;

if (a + b > c && a + c > b && b + c > a) {
    if (a == b && b == c) {
        printf("Equilateral Triangle\\n");
    } else if (a == b || b == c || a == c) {
        printf("Isosceles Triangle\\n");
    } else {
        printf("Scalene Triangle\\n");
    }
} else {
    printf("Invalid Triangle dimensions!\\n");
}`}</pre>
          </div>

          {/* Scenario 4: Fast Guard Clause Pattern */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Defensive Guard Clause</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Clean Architecture</span>
            </div>
            <p className="text-xs text-slate-400">
              Fails fast and exits early to keep business logic clean without deep nesting.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int processStudentAdmission(int age, float marks) {
    if (age < 17 || age > 25) return -1; // Guard: Age fail
    if (marks < 60.0f)        return -2; // Guard: Marks fail
    
    // Core admission logic proceeds without nested indentations!
    printf("Enrolled successfully!\\n");
    return 0;
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Architectural Flow &amp; CPU Branch Evaluation
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In standard procedural C, instructions execute sequentially unless redirected by control flow structures. Conditional branching statements inspect expressions and cause the CPU instruction pointer to jump to target memory addresses.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Context (Shyamnagar &amp; Barrackpore Labs):</p>
            <p>
              When <strong>Swadeep</strong> and <strong>Debangshu</strong> were calculating discount percentages, they accidentally wrote <code>if (discount = 0.20)</code>. <strong>Sukanta Hui</strong> demonstrated using GDB how single equals mutated the variable at runtime. Always verify comparison operators before testing business logic!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: if-else &amp; else-if Ladder Flowchart
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Control Flow Branching Architecture: Decision Diamond &amp; Ladder
            </text>

            {/* Decision Diamond */}
            <g transform="translate(100, 60)" className="transition-transform duration-300 hover:scale-105">
              <polygon points="120,10 210,60 120,110 30,60" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="120" y="65" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">score &gt;= 40 ?</text>
            </g>

            {/* True Path */}
            <path d="M 310 120 L 400 120" stroke="#34d399" strokeWidth="2" />
            <text x="355" y="110" textAnchor="middle" fill="#34d399" className="text-xs font-bold font-mono">TRUE</text>
            <g transform="translate(400, 85)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="180" height="70" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
              <text x="90" y="30" textAnchor="middle" fill="#ffffff" className="font-bold text-xs">Execute if Block</text>
              <text x="90" y="50" textAnchor="middle" fill="#a7f3d0" className="text-[10px]">printf("PASSED")</text>
            </g>

            {/* False Path */}
            <path d="M 220 170 L 220 215 L 400 215" stroke="#f43f5e" strokeWidth="2" fill="none" />
            <text x="240" y="200" fill="#f43f5e" className="text-xs font-bold font-mono">FALSE</text>
            <g transform="translate(400, 180)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="180" height="70" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
              <text x="90" y="30" textAnchor="middle" fill="#ffffff" className="font-bold text-xs">Execute else Block</text>
              <text x="90" y="50" textAnchor="middle" fill="#fecdd3" className="text-[10px]">printf("FAILED")</text>
            </g>

            {/* Join paths */}
            <path d="M 580 120 L 680 120 L 680 160" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 580 215 L 680 215 L 680 160" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 680 160 L 730 160" stroke="#64748b" strokeWidth="2" />

            <g transform="translate(730, 130)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="150" height="60" rx="10" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
              <text x="75" y="35" textAnchor="middle" fill="#a78bfa" className="font-bold text-xs">Next Instructions</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 6. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Branching Mechanics &amp; Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Construct</th>
                <th className="p-3">Evaluation Logic</th>
                <th className="p-3">Best Used For</th>
                <th className="p-3">Common Pitfall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">Simple if</td>
                <td className="p-3">Executes body if condition evaluates non-zero</td>
                <td className="p-3">Optional execution, error checks, guard clauses</td>
                <td className="p-3 text-rose-400">Accidental semicolon: <code>if(x);</code></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-300">if-else</td>
                <td className="p-3">Two mutually exclusive binary paths</td>
                <td className="p-3">Pass/Fail, Yes/No, True/False outcomes</td>
                <td className="p-3 text-rose-400">Dangling else ambiguity in nested code</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">else-if Ladder</td>
                <td className="p-3">Multi-way priority evaluation (top to bottom)</td>
                <td className="p-3">Grade scales, tax brackets, range classifications</td>
                <td className="p-3 text-rose-400">Incorrect condition ordering</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-300">Nested if</td>
                <td className="p-3">Multi-tier hierarchical decision trees</td>
                <td className="p-3">Multi-factor security or admission eligibility</td>
                <td className="p-3 text-rose-400">Deep indentation "Arrow Anti-Pattern"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Conditional Branching Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ConditionalBranchingDemo.c</code>) demonstrates simple <code>if-else</code> checks, an <code>else-if</code> grading ladder, multi-stage nested admission trees, and boolean leap year testing.
        </p>

        <CFileLoader fileModule={cCode} title="ConditionalBranchingDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     CONDITIONAL BRANCHING DEMONSTRATION - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Simple if & if-else Decision ---
Result: PASSED (Score: 85)

--- [2] Grade Classification (else-if Ladder) ---
Exam Score: 85 -> Awarded Grade: 'E'

--- [3] College Admission Decision Tree (Nested if-else) ---
Status: ADMISSION GRANTED to B.Tech Computer Science!

--- [4] Leap Year Boolean Logic ---
Year 2024 is a LEAP YEAR (366 days).
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
          <li><strong>Single '=' Assignment in Condition:</strong> <code>if (x = 5)</code> assigns 5 to <code>x</code> and evaluates to true! Always use <code>==</code> for comparison.</li>
          <li><strong>Semicolon after if condition:</strong> Writing <code>if (x &gt; 0);</code> creates an empty statement and executes the following block unconditionally.</li>
          <li><strong>Missing Braces in Multi-line Blocks:</strong> Without braces <code>&#123; &#125;</code>, only the first line belongs to the if statement!</li>
        </ul>
      </section>

      {/* 9. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>if (year % 4 == 0 &amp;&amp; year % 100 != 0 || year % 400 == 0)</code> correctly classify year 2000 as a leap year, but year 1900 as a regular year? How does operator precedence evaluate <code>&amp;&amp;</code> before <code>||</code>?
        </p>
      </section>

      {/* 10. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_003 Topic 0 FAQs: Conditional Branching" questions={questions} />
      </section>

      {/* 11. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_003_topic0_note.txt"
        />
      </section>

      {/* 12. Teacher's Note Section */}
      <section>
        <Teacher note="Always wrap your if and else bodies with curly braces, even for one line! It prevents subtle dangling else logic bugs when extending your code in the future! — Sukanta Hui" />
      </section>
    </div>
  );
}
