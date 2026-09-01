import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/LoopControlJumpDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_003 · Topic 3
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Loop Control &amp; Jump Mechanics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Loop Control Mechanics: break, continue &amp; Appropriate Use of goto
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master non-local jump control in C. Understand early termination with <code>break</code>, skipping iterations with <code>continue</code>, and the legitimate systems-level engineering use cases for <code>goto</code> error unwinding.
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
                Teacher's Corner: break vs continue vs goto Explained
              </h2>
              <p className="text-xs text-rose-300/80">
                Intuitive real-world analogies by Sukanta Hui (Coder &amp; AccoTax)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: 3 Everyday Analogies */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🎭</span> Step 1: Everyday Analogies for the 3 Jumps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            {/* break */}
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-2">
              <span className="text-rose-400 font-bold block text-sm">1. break (Emergency Handbrake)</span>
              <p className="text-slate-300">
                You pull the red chain on a train! The whole ride <strong>STOPS immediately</strong>. You step out of the loop and never look back!
              </p>
              <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-rose-300">
                if (targetFound) break;
              </div>
            </div>

            {/* continue */}
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
              <span className="text-amber-400 font-bold block text-sm">2. continue (Skip Bad Song on Spotify)</span>
              <p className="text-slate-300">
                You don't delete your playlist! You just <strong>skip the rest of this current song</strong> and immediately start playing the next song!
              </p>
              <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-amber-300">
                if (isBadSong) continue;
              </div>
            </div>

            {/* goto */}
            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30 space-y-2">
              <span className="text-purple-400 font-bold block text-sm">3. goto (The Teleport Portal)</span>
              <p className="text-slate-300">
                Instantly teleports the CPU instruction pointer straight to a target bookmark label. Used in the Linux Kernel for error cleanup!
              </p>
              <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-purple-300">
                goto error_cleanup;
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: The while continue trap */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>🚨</span> Step 2: The Hidden "Continue in While Loop" Infinite Loop Trap
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In our lab, <strong>Swadeep</strong> wrote this while loop and wondered why his program froze:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-rose-400 font-bold block font-sans">❌ The Frozen Loop Bug:</span>
              <pre className="text-slate-200">
{`int i = 1;
while (i <= 5) {
    if (i == 3) {
        continue; // BUG!
    }
    printf("%d ", i);
    i++; // SKIPPED when i == 3!
}
// i stays 3 forever -> Infinite loop!`}</pre>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-emerald-400 font-bold block font-sans">✅ The Teacher's Fix:</span>
              <pre className="text-slate-200">
{`// Option 1: Increment before continue
if (i == 3) {
    i++;
    continue;
}

// Option 2: Use a 'for' loop!
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue; // Safe!
    printf("%d ", i);
}`}</pre>
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
            Real-world jump applications from linear searches to kernel error handling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Early Search Termination */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Early Search Exit</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">break statement</span>
            </div>
            <p className="text-xs text-slate-400">
              Halts iterations the millisecond the search target is located.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int arr[] = {12, 45, 78, 89, 99};
int target = 78, foundAt = -1;

for (int i = 0; i < 5; i++) {
    if (arr[i] == target) {
        foundAt = i;
        break; // Stops checking remaining elements!
    }
}
printf("Found at index %d\\n", foundAt);`}</pre>
          </div>

          {/* Scenario 2: Data Filtering and Skipping */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Skipping Negative Noise</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">continue statement</span>
            </div>
            <p className="text-xs text-slate-400">
              Processes only valid positive sensor telemetry data while skipping corrupted samples.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int sensorReadings[] = {25, -1, 30, -99, 28, 31};
int validSum = 0;

for (int i = 0; i < 6; i++) {
    if (sensorReadings[i] < 0) {
        continue; // Skip corrupted negative readings
    }
    validSum += sensorReadings[i];
}
printf("Valid telemetry sum: %d\\n", validSum);`}</pre>
          </div>

          {/* Scenario 3: Linux Kernel Style Error Unwinding */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Unified Error Cleanup</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">goto cleanup</span>
            </div>
            <p className="text-xs text-slate-400">
              The gold standard pattern for cleaning up resources in reverse order of allocation.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int allocateBuffers(void) {
    if (!initNetwork()) goto err_net;
    if (!initDatabase()) goto err_db;
    
    printf("All subsystems ready!\\n");
    return 0; // Success

err_db:
    closeNetwork();
err_net:
    return -1; // Unified failure exit
}`}</pre>
          </div>

          {/* Scenario 4: Breaking Out of Deep Nested Loops */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Multi-Level Loop Break</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Matrix Breakout</span>
            </div>
            <p className="text-xs text-slate-400">
              Jumps out of 3 nested loops in a single bound when a target pixel is found.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`for (int x = 0; x < 100; x++) {
    for (int y = 0; y < 100; y++) {
        for (int z = 0; z < 100; z++) {
            if (grid[x][y][z] == TARGET) {
                printf("Hit at %d, %d, %d\\n", x, y, z);
                goto end_3d_search;
            }
        }
    }
}
end_3d_search:
printf("3D Grid search complete!\\n");`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Non-Local Jump Semantics &amp; Control Flow Integrity
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Standard loop execution follows predictable cyclic paths. The <code>break</code>, <code>continue</code>, and <code>goto</code> keywords allow programmers to bypass standard loop iterations or transfer control unconditionally to designated program points.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Context (Barrackpore Systems Lab):</p>
            <p>
              When <strong>Tuhina</strong> asked why <code>goto</code> is used in the Linux Kernel when textbook authors warn against it, <strong>Sukanta Hui</strong> explained that disciplined forward error jumps prevent duplicated deallocation code and eliminate memory leaks!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: break vs continue Execution Paths
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Execution Path Redirection: break (Exit Loop) vs continue (Next Cycle)
            </text>

            {/* Loop Header */}
            <g transform="translate(60, 90)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="160" height="60" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="80" y="35" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">for Loop Header</text>
            </g>

            {/* Arrow to Body */}
            <path d="M 220 120 L 290 120" stroke="#64748b" strokeWidth="2" />

            {/* Loop Body */}
            <g transform="translate(290, 60)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="280" height="120" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <text x="140" y="25" textAnchor="middle" fill="#cbd5e1" className="font-bold text-xs">Loop Body Statements</text>

              {/* continue branch */}
              <rect x="20" y="40" width="240" height="30" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
              <text x="140" y="60" textAnchor="middle" fill="#fef3c7" className="font-mono text-xs font-bold">if (condition) continue;</text>

              {/* break branch */}
              <rect x="20" y="80" width="240" height="30" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
              <text x="140" y="100" textAnchor="middle" fill="#ffe4e6" className="font-mono text-xs font-bold">if (condition) break;</text>
            </g>

            {/* Continue Loopback Arrow */}
            <path d="M 430 40 L 430 20 L 140 20 L 140 90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <text x="280" y="15" fill="#f59e0b" className="text-[10px] font-bold">continue &rarr; Loop Update/Header</text>

            {/* Break Exit Arrow */}
            <path d="M 570 140 L 680 140" stroke="#f43f5e" strokeWidth="2" />
            <text x="620" y="130" fill="#f43f5e" className="text-[10px] font-bold">break &rarr; Exit</text>

            {/* Post Loop Block */}
            <g transform="translate(680, 90)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="180" height="60" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
              <text x="90" y="35" textAnchor="middle" fill="#34d399" className="font-bold text-xs">Post-Loop Code</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 6. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Jump Statements Compared
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Statement</th>
                <th className="p-3">Jump Destination</th>
                <th className="p-3">Scope Boundary</th>
                <th className="p-3">Recommended Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-rose-400">break</td>
                <td className="p-3">Immediately after closing brace of loop/switch</td>
                <td className="p-3">Innermost enclosing construct</td>
                <td className="p-3">Early exit from searches, switch fall-through termination</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-400">continue</td>
                <td className="p-3">Loop update expression (for) or condition test (while)</td>
                <td className="p-3">Innermost enclosing loop only</td>
                <td className="p-3">Skipping invalid/corrupted records or odd/even filters</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-400">goto</td>
                <td className="p-3">Target named label</td>
                <td className="p-3">Current function scope</td>
                <td className="p-3">Multi-level nested loop breakout, unified error unwinding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Jump Statements in Action
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>LoopControlJumpDemo.c</code>) demonstrates early search termination with <code>break</code>, odd number filtering with <code>continue</code>, and multi-level matrix breakout with <code>goto</code>.
        </p>

        <CFileLoader fileModule={cCode} title="LoopControlJumpDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     LOOP CONTROL JUMPS: BREAK, CONTINUE, GOTO - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Early Loop Exit with 'break' (Linear Search) ---
Target 73 FOUND at array index 3! Breaking early.

--- [2] Skipping Current Iteration with 'continue' ---
Odd numbers between 1 and 10: 1 3 5 7 9 

--- [3] Breaking Out of Deep Nested Loops (Matrix Search) ---
Value 99 found at matrix[1][1]! Jumping out via goto.
Search completed successfully with zero redundant iterations.
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
          <li><strong>Continue bypassing counter update in while:</strong> In a <code>while</code> loop, placing <code>continue</code> above <code>i++</code> skips the increment and triggers an infinite loop!</li>
          <li><strong>Backwards goto statements:</strong> Never use <code>goto</code> to jump backwards in code. Use standard loops instead.</li>
          <li><strong>Overusing break statements:</strong> Excessively scattering break points across a long loop makes logic difficult to verify.</li>
        </ul>
      </section>

      {/* 9. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does placing nested loops inside a dedicated helper function and calling <code>return foundValue;</code> often eliminate the need for both <code>goto</code> and boolean status flags? How does function extraction improve modularity?
        </p>
      </section>

      {/* 10. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_003 Topic 3 FAQs: Loop Control Jumps" questions={questions} />
      </section>

      {/* 11. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 3 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_003_topic3_note.txt"
        />
      </section>

      {/* 12. Teacher's Note Section */}
      <section>
        <Teacher note="Use 'break' to stop wasting CPU cycles once a search condition is met, and use 'continue' to filter unwanted records cleanly! Keep your jump mechanics simple and clean! — Sukanta Hui" />
      </section>
    </div>
  );
}
