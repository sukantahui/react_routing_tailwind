import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/StorageClassesDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_004 · Topic 3
          </span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Storage Classes &amp; Linkage
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Storage Classes in C: auto, register, static &amp; extern
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the four storage classes in C. Learn how <code>static</code> creates persistent local state and internal linkage, how <code>extern</code> binds multi-file projects, and how <code>register</code> guides CPU optimizations.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (FRIENDLY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border-2 border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 text-xl border border-purple-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-purple-200 tracking-tight">
                Teacher's Corner: The 4 Storage Class Personalities
              </h2>
              <p className="text-xs text-purple-300/80">
                A memorable four-character metaphor by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The 4 Personalities */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>👥</span> Step 1: Meet the 4 Storage Class Personalities
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every variable you create in C has a personality defined by its storage class:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/30 space-y-1.5">
              <span className="text-sky-300 font-bold block text-sm">1. auto (The Temporary Worker)</span>
              <p className="text-slate-300">Default for local variables. Lives on the stack, does its task, and disappears when the function returns!</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-pink-500/30 space-y-1.5">
              <span className="text-pink-300 font-bold block text-sm">2. register (The CPU Sprinter)</span>
              <p className="text-slate-300">Lives directly inside the CPU's registers for blistering loop speed. Has <strong>no RAM address</strong> (cannot use <code>&amp;</code>)!</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-1.5">
              <span className="text-emerald-300 font-bold block text-sm">3. static (The Faithful Diary)</span>
              <p className="text-slate-300">Stays locked in the function room, but <strong>never forgets</strong> previous values across calls. Zeroed automatically!</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 space-y-1.5">
              <span className="text-purple-300 font-bold block text-sm">4. extern (The Global Passport)</span>
              <p className="text-slate-300">Defined in one <code>.c</code> file and shared across all other source files in the entire project build!</p>
            </div>
          </div>
        </div>

        {/* Step 2: The Magic of Static Local Variables */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
            <span>✨</span> Step 2: The Magic of `static` Local Variables
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In our lab, <strong>Abhronila</strong> wanted to assign unique auto-incrementing transaction IDs (<code>TXN-1001</code>, <code>TXN-1002</code>) every time a student enrolled:
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <span className="text-emerald-400 font-bold block font-sans mb-1">💡 Persistent State Without Messy Globals:</span>
            void enrollStudent(const char *name) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 font-bold">static int nextTxnId = 1001;</span> <span className="text-slate-500">// Allocated once in data segment!</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;printf("Enrolled: %s | ID: TXN-%d\n", name, nextTxnId++);<br />
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
            Real-world applications of storage classes across embedded state machines and multi-file linkage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Persistent Unique ID Generator */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Auto-Incrementing ID Counter</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">static local</span>
            </div>
            <p className="text-xs text-slate-400">
              Preserves state between calls without exposing a mutable global variable.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int getNextSessionToken(void) {
    static int currentToken = 5000; // Initialized once
    return ++currentToken;
}

// Call 1 -> 5001
// Call 2 -> 5002
// Call 3 -> 5003`}</pre>
          </div>

          {/* Scenario 2: File-Private Helper Encapsulation */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Private File Helper (Encapsulation)</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">static function</span>
            </div>
            <p className="text-xs text-slate-400">
              Restricts visibility strictly to the current source file (internal linkage).
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`// Only callable inside this .c file; hidden from linker!
static void sanitizeInputBuffer(char *buf) {
    if (buf == NULL) return;
    // Private cleaning logic...
}`}</pre>
          </div>

          {/* Scenario 3: High-Frequency Register Loop */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: High-Speed Register Counter</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">register</span>
            </div>
            <p className="text-xs text-slate-400">
              Requests CPU register placement for tight mathematical iteration loops.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`void computeFastSum(int limit) {
    register int i;
    long long total = 0;
    for (i = 1; i <= limit; i++) {
        total += i;
    }
    // &i is invalid! (Registers have no RAM address)
}`}</pre>
          </div>

          {/* Scenario 4: Multi-File Extern Header Pattern */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Multi-File Extern Linkage</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">extern</span>
            </div>
            <p className="text-xs text-slate-400">
              Shares a single global state across multiple compilation units cleanly.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`// In config.h (Header):
extern int g_systemStatus;

// In config.c (Definition):
int g_systemStatus = 1;

// In main.c (Usage):
#include "config.h"
printf("Status: %d\\n", g_systemStatus);`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Storage Class Decision Matrix
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              C Storage Classes: Storage Location, Lifetime &amp; Linkage Spectrum
            </text>

            {/* auto card */}
            <g transform="translate(40, 70)">
              <rect x="0" y="0" width="180" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="90" y="30" textAnchor="middle" fill="#38bdf8" className="font-mono text-sm font-bold">auto</text>
              <text x="15" y="60" fill="#cbd5e1" className="text-[10px]">Location: <strong>RAM Stack</strong></text>
              <text x="15" y="85" fill="#cbd5e1" className="text-[10px]">Scope: <strong>Local Block</strong></text>
              <text x="15" y="110" fill="#cbd5e1" className="text-[10px]">Lifetime: <strong>Block Exit</strong></text>
              <text x="15" y="135" fill="#f43f5e" className="text-[10px]">Default Value: <strong>Garbage</strong></text>
              <text x="15" y="155" fill="#94a3b8" className="text-[9px]">Linkage: None</text>
            </g>

            {/* register card */}
            <g transform="translate(250, 70)">
              <rect x="0" y="0" width="180" height="170" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <text x="90" y="30" textAnchor="middle" fill="#f43f5e" className="font-mono text-sm font-bold">register</text>
              <text x="15" y="60" fill="#cbd5e1" className="text-[10px]">Location: <strong>CPU Core</strong></text>
              <text x="15" y="85" fill="#cbd5e1" className="text-[10px]">Scope: <strong>Local Block</strong></text>
              <text x="15" y="110" fill="#cbd5e1" className="text-[10px]">Lifetime: <strong>Block Exit</strong></text>
              <text x="15" y="135" fill="#f43f5e" className="text-[10px]">Default Value: <strong>Garbage</strong></text>
              <text x="15" y="155" fill="#f43f5e" className="text-[9px]">No &amp;RAM address!</text>
            </g>

            {/* static card */}
            <g transform="translate(460, 70)">
              <rect x="0" y="0" width="200" height="170" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="100" y="30" textAnchor="middle" fill="#34d399" className="font-mono text-sm font-bold">static</text>
              <text x="15" y="60" fill="#cbd5e1" className="text-[10px]">Location: <strong>Data Segment</strong></text>
              <text x="15" y="85" fill="#cbd5e1" className="text-[10px]">Scope: <strong>Local / File</strong></text>
              <text x="15" y="110" fill="#34d399" className="text-[10px]">Lifetime: <strong>Program Run</strong></text>
              <text x="15" y="135" fill="#34d399" className="text-[10px]">Default Value: <strong>Zero (0)</strong></text>
              <text x="15" y="155" fill="#34d399" className="text-[9px]">Internal Linkage</text>
            </g>

            {/* extern card */}
            <g transform="translate(690, 70)">
              <rect x="0" y="0" width="190" height="170" rx="12" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
              <text x="95" y="30" textAnchor="middle" fill="#a78bfa" className="font-mono text-sm font-bold">extern</text>
              <text x="15" y="60" fill="#cbd5e1" className="text-[10px]">Location: <strong>Data Segment</strong></text>
              <text x="15" y="85" fill="#cbd5e1" className="text-[10px]">Scope: <strong>Project-wide</strong></text>
              <text x="15" y="110" fill="#a78bfa" className="text-[10px]">Lifetime: <strong>Program Run</strong></text>
              <text x="15" y="135" fill="#34d399" className="text-[10px]">Default Value: <strong>Zero (0)</strong></text>
              <text x="15" y="155" fill="#a78bfa" className="text-[9px]">External Linkage</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: StorageClassesDemo.c
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>StorageClassesDemo.c</code>) demonstrates static local variable persistence across calls, register CPU optimization loops, and static internal linkage helper functions.
        </p>

        <CFileLoader fileModule={demoCode} title="StorageClassesDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     STORAGE CLASSES IN C - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Static Local Variable (Persistent State Memory) ---
User: Swadeep      | Regular (auto): 1 | Static Transaction ID: TXN-1001
User: Tuhina       | Regular (auto): 1 | Static Transaction ID: TXN-1002
User: Abhronila    | Regular (auto): 1 | Static Transaction ID: TXN-1003
User: Debangshu    | Regular (auto): 1 | Static Transaction ID: TXN-1004

--- [2] Register Storage Class (CPU Core Optimization) ---
   Sum from 1 to 1000 calculated in CPU register: 500500

--- [3] Static Internal Linkage Helper Routine ---
   [Internal Helper] Module state verified. All storage classes functioning!

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
          <li><strong>Taking Address of Register Variable:</strong> Writing <code>&amp;regVar</code> triggers a compiler error because CPU registers lack RAM memory addresses.</li>
          <li><strong>Redefining Extern Variables:</strong> Initializing an <code>extern</code> variable in multiple <code>.c</code> files causes duplicate symbol linker errors.</li>
          <li><strong>Forgetting Static on Helper Functions:</strong> Failing to mark private module functions as <code>static</code> exposes internal names to global linker collisions.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How do <code>static</code> global variables and <code>static</code> functions enable C programmers to achieve true Object-Oriented style data hiding (encapsulation) without classes?
        </p>
      </section>

      {/* 8. Comprehensive FAQs */}
      <section>
        <FAQTemplate title="Module 001_004 Topic 3 FAQs: Storage Classes" questions={questions} />
      </section>

      {/* 9. Plain Text Note */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 3 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_004_topic3_note.txt"
        />
      </section>

      {/* 10. Teacher Note */}
      <section>
        <Teacher note="Remember the 4 storage class personalities: auto for temporary tasks, register for speed, static to remember everything, and extern to share across files! — Sukanta Hui" />
      </section>
    </div>
  );
}
