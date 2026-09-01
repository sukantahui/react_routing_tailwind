import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/LoopsConstructsDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_003 · Topic 2
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Loop Constructs &amp; Iteration
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Iterative Loop Constructs: while, do-while (post-test) &amp; for (pre-test)
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master repeating code blocks efficiently in C. Understand the mechanics of pre-test counting loops (<code>for</code>), condition-controlled loops (<code>while</code>), and guaranteed single-execution post-test loops (<code>do-while</code>).
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
                Teacher's Corner: The 3 Runners on the Track
              </h2>
              <p className="text-xs text-amber-300/80">
                A simple breakdown by Sukanta Hui for students at Coder &amp; AccoTax
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The 3 Runners Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🏃</span> Step 1: Meet the 3 Runners (Which Loop to Pick?)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Beginners often ask: <em>"Teacher, why do we have three different types of loops in C?"</em> Here is the simple mental picture:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            {/* for loop */}
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 space-y-2">
              <span className="text-sky-300 font-bold block text-sm">1. The Lap Counter (`for` Loop)</span>
              <p className="text-slate-300">
                You know <strong>in advance</strong> that you want to run exactly <strong>10 laps</strong> around the Barrackpore stadium.
              </p>
              <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-sky-300">
                for(int lap=1; lap&lt;=10; lap++)
              </div>
              <p className="text-slate-400 text-[11px]">
                <strong>Use when:</strong> You know the exact start, stop, and step counts.
              </p>
            </div>

            {/* while loop */}
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
              <span className="text-amber-300 font-bold block text-sm">2. The Daylight Runner (`while` Loop)</span>
              <p className="text-slate-300">
                You run <strong>as long as</strong> the sun is up. You check the sky <strong>before</strong> taking a single step (Pre-test). If it is already pitch dark, you run <strong>0 laps</strong>!
              </p>
              <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-amber-300">
                while(isDaylight == true)
              </div>
              <p className="text-slate-400 text-[11px]">
                <strong>Use when:</strong> Running based on an event or external condition.
              </p>
            </div>

            {/* do-while loop */}
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-emerald-300 font-bold block text-sm">3. The Rollercoaster (`do-while` Loop)</span>
              <p className="text-slate-300">
                You enter the amusement park ride and enjoy it <strong>at least once</strong>. Only at the exit gate does the guard check if you have a ticket to repeat (Post-test)!
              </p>
              <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-emerald-300">
                do &#123; ride(); &#125; while(hasTicket);
              </div>
              <p className="text-slate-400 text-[11px]">
                <strong>Use when:</strong> Code MUST execute at least 1 time (like ATM PIN prompt).
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Number Digit Peeling Trick */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
            <span>🧅</span> Step 2: The Famous "Digit Peeling" Pattern (Modulo 10 &amp; Divide 10)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In almost every C exam and interview, you will be asked to reverse a number, sum its digits, or check for palindromes. Sukanta Hui teaches this <strong>3-step onion peeling recipe</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono">
              <span className="text-sky-400 font-bold block">1. Peel Last Digit:</span>
              <span className="text-slate-300">int digit = num % 10;</span>
              <p className="text-slate-500 text-[10px]">1234 % 10 gives 4</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono">
              <span className="text-amber-400 font-bold block">2. Accumulate / Reverse:</span>
              <span className="text-slate-300">rev = (rev * 10) + digit;</span>
              <p className="text-slate-500 text-[10px]">Shifts left and adds 4</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono">
              <span className="text-emerald-400 font-bold block">3. Discard Last Digit:</span>
              <span className="text-slate-300">num = num / 10;</span>
              <p className="text-slate-500 text-[10px]">1234 becomes 123</p>
            </div>
          </div>
        </div>

        {/* Step 3: Semicolon Freeze Bug */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>❄️</span> Step 3: The "Semicolon Freeze" Trap
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Never put a semicolon directly after <code>while (i &lt; 10);</code>. It creates an invisible empty loop body that traps the CPU in an infinite spin because <code>i</code> is never updated!
          </p>
        </div>
      </section>

      {/* 3. DEDICATED MULTI-SCENARIO EXAMPLES SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
            <span>📚</span> Multi-Scenario Code Examples &amp; Practical Variations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Explore 4 essential algorithmic loop recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Number Palindrome Checker */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Palindrome Checker</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">while loop</span>
            </div>
            <p className="text-xs text-slate-400">
              Reverses digits to test if number equals its mirror image (e.g. 12321).
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int num = 12321, original = num, reversed = 0;

while (num > 0) {
    reversed = (reversed * 10) + (num % 10);
    num /= 10;
}

if (original == reversed) {
    printf("%d is a PALINDROME!\\n", original);
} else {
    printf("%d is NOT a palindrome.\\n", original);
}`}</pre>
          </div>

          {/* Scenario 2: ATM PIN Prompt */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: ATM PIN 3-Attempt Validator</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">do-while loop</span>
            </div>
            <p className="text-xs text-slate-400">
              Guarantees the user is prompted at least once, allowing at most 3 tries.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int correctPin = 9876, enteredPin, attempts = 0;

do {
    printf("Enter 4-digit PIN (Attempt %d/3): ", attempts + 1);
    scanf("%d", &enteredPin);
    attempts++;
    if (enteredPin == correctPin) {
        printf("PIN Accepted! Access Granted.\\n");
        break;
    }
} while (attempts < 3);

if (enteredPin != correctPin) printf("Card Blocked!\\n");`}</pre>
          </div>

          {/* Scenario 3: Factorial and Series Accumulator */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Series Accumulator</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">for loop</span>
            </div>
            <p className="text-xs text-slate-400">
              Calculates sum of squares: $1^2 + 2^2 + 3^2 + ... + N^2$.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int n = 5;
long long sumOfSquares = 0;

for (int i = 1; i <= n; i++) {
    sumOfSquares += (long long)i * i;
}
printf("Sum of squares up to %d = %lld\\n", n, sumOfSquares);`}</pre>
          </div>

          {/* Scenario 4: Binary to Decimal Converter */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Binary to Decimal Converter</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Binary Math</span>
            </div>
            <p className="text-xs text-slate-400">
              Converts binary integer string `1101` to decimal (13) using powers of 2.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int binary = 1101, decimal = 0, base = 1;

while (binary > 0) {
    int lastBit = binary % 10;
    decimal += lastBit * base;
    base *= 2;
    binary /= 10;
}
printf("Decimal Value: %d\\n", decimal); // Prints 13`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Pre-Test vs Post-Test Iteration Mechanics
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Loops in C repeat a block of code based on a controlling expression. In <strong>pre-test loops</strong> (<code>for</code> and <code>while</code>), the condition is evaluated <em>before</em> each iteration. If false initially, the body never runs. In <strong>post-test loops</strong> (<code>do-while</code>), the condition is checked <em>after</em> the body executes, guaranteeing at least one iteration.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Context (Barrackpore Systems Lab):</p>
            <p>
              When <strong>Swadeep</strong> and <strong>Debangshu</strong> wrote a number reversal loop, their loop ran endlessly because they forgot <code>num /= 10;</code> inside the body. <strong>Sukanta Hui</strong> showed how every loop must guarantee progress toward its termination condition.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Pre-Test (while) vs Post-Test (do-while)
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Execution Architecture: Pre-Test (while) vs Post-Test (do-while) Loops
            </text>

            {/* Left: Pre-Test while */}
            <g transform="translate(40, 60)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="400" height="180" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="200" y="28" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">while Loop (Pre-Test: 0 or more times)</text>
              
              {/* Condition Box */}
              <polygon points="200,45 280,75 200,105 120,75" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="200" y="78" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">Condition?</text>

              {/* Loop body */}
              <rect x="120" y="120" width="160" height="40" rx="8" fill="#0369a1" />
              <text x="200" y="145" textAnchor="middle" fill="#ffffff" className="font-bold text-xs">Loop Body</text>

              {/* Arrows */}
              <path d="M 200 105 L 200 120" stroke="#34d399" strokeWidth="2" />
              <path d="M 280 140 L 320 140 L 320 75 L 280 75" stroke="#34d399" strokeWidth="2" fill="none" />
            </g>

            {/* Right: Post-Test do-while */}
            <g transform="translate(480, 60)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="400" height="180" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="200" y="28" textAnchor="middle" fill="#34d399" className="font-bold text-sm">do-while Loop (Post-Test: 1 or more times)</text>
              
              {/* Loop body FIRST */}
              <rect x="120" y="45" width="160" height="40" rx="8" fill="#065f46" />
              <text x="200" y="70" textAnchor="middle" fill="#ffffff" className="font-bold text-xs">Loop Body (Runs 1st!)</text>

              {/* Condition Box SECOND */}
              <polygon points="200,105 280,135 200,165 120,135" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
              <text x="200" y="138" textAnchor="middle" fill="#34d399" className="font-bold text-xs">Condition?</text>

              {/* Arrows */}
              <path d="M 200 85 L 200 105" stroke="#34d399" strokeWidth="2" />
              <path d="M 280 135 L 320 135 L 320 65 L 280 65" stroke="#34d399" strokeWidth="2" fill="none" />
            </g>
          </svg>
        </div>
      </section>

      {/* 6. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Comparing for vs while vs do-while
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Loop Type</th>
                <th className="p-3">Test Timing</th>
                <th className="p-3">Min Iterations</th>
                <th className="p-3">Best Architectural Scenario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">for loop</td>
                <td className="p-3">Pre-test (Before entry)</td>
                <td className="p-3 font-mono text-emerald-400">0</td>
                <td className="p-3">Array traversal, fixed counter mathematical series</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">while loop</td>
                <td className="p-3">Pre-test (Before entry)</td>
                <td className="p-3 font-mono text-emerald-400">0</td>
                <td className="p-3">Digit extraction, socket reading, linked list traversal</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-300">do-while loop</td>
                <td className="p-3">Post-test (After body)</td>
                <td className="p-3 font-mono text-rose-400 font-bold">1 (Guaranteed)</td>
                <td className="p-3">User menu prompts, password validation, retry handlers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Loop Constructs in Action
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>LoopsConstructsDemo.c</code>) demonstrates a <code>for</code> loop computing factorial, a <code>while</code> loop reversing digits, and a <code>do-while</code> loop handling authentication attempts.
        </p>

        <CFileLoader fileModule={cCode} title="LoopsConstructsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     ITERATIVE LOOP CONSTRUCTS IN C - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Pre-Test 'for' Loop (Counting & Accumulation) ---
Calculations for N = 5:
Sum (1 to 5)       : 15
Factorial (5!)     : 120

--- [2] Pre-Test 'while' Loop (Digit Extraction) ---
Original Number     : 12345
Extracted Digits    : 5
Reversed Number     : 54321

--- [3] Post-Test 'do-while' Loop (Guaranteed Entry) ---
PIN Validation Attempt #1: Checking PIN 4321...
Access Granted on attempt 1!
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
          <li><strong>Missing Update in while loop:</strong> Forgetting <code>i++</code> creates an unintended infinite loop!</li>
          <li><strong>Semicolon after while header:</strong> <code>while (i &lt; 5);</code> creates an empty spin loop that freezes the CPU.</li>
          <li><strong>Missing Semicolon after do-while:</strong> <code>do &#123; ... &#125; while (cond);</code> requires a trailing semicolon.</li>
        </ul>
      </section>

      {/* 9. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why did the C99 standard permit variable declarations inside <code>for (int i = 0; ...)</code> headers? How does limiting the lifetime of <code>i</code> to the loop scope prevent accidental variable corruption bugs in large programs?
        </p>
      </section>

      {/* 10. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_003 Topic 2 FAQs: Loop Constructs" questions={questions} />
      </section>

      {/* 11. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 2 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_003_topic2_note.txt"
        />
      </section>

      {/* 12. Teacher's Note Section */}
      <section>
        <Teacher note="Always ensure that your loop's controlling variable actively moves toward the exit condition on every iteration! Testing loop termination with small inputs on paper first is the sign of a great programmer! — Sukanta Hui" />
      </section>
    </div>
  );
}
