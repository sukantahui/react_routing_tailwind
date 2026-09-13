import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/MultiFileArchitectureDemo.c?raw";
import { topic4Questions } from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_012</span>
          <span>•</span>
          <span>Topic 4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Multi-File C Project Architecture: Translation Units &amp; Symbol Linkage
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master industrial C project organization. Understand the boundary between headers (<code className="text-emerald-600 dark:text-emerald-400">.h</code>) and implementation files (<code className="text-emerald-600 dark:text-emerald-400">.c</code>), internal vs external symbol linkage (<code className="font-mono text-emerald-500">static</code> vs <code className="font-mono text-emerald-500">extern</code>), and separate compilation workflows.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🏗️ Classroom Story: Splitting the 10,000-Line Monolith</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Barrackpore software project, <strong>Tuhina</strong> and <strong>Abhronila</strong> kept all data structures, student algorithms, UI logic, and tax calculators in a single <code>main.c</code> file exceeding 6,000 lines. Compiling took 15 seconds on every single typo fix, and merge conflicts were constant.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> guided them through modular refactoring: <em>&ldquo;Professional systems separate interface from implementation. Put struct schemas and prototypes in <code>student.h</code>, algorithms and private helpers in <code>student.c</code>, and driver logic in <code>main.c</code>. Each file compiles independently into an object file (<code>.o</code>), slashing rebuild times to milliseconds!&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Multi-File Compilation &amp; Linker Resolution
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Multi-File Compilation Pipeline"
          >
            <rect width="900" height="280" fill="none" />

            {/* Header: student.h */}
            <rect x="360" y="20" width="180" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="450" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">student.h (Public API)</text>
            <text x="450" y="60" fill="#94a3b8" fontSize="10" textAnchor="middle">Prototypes &amp; Struct Schema</text>

            {/* Translation Units */}
            <path d="M 400 70 L 220 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-mf)" />
            <path d="M 500 70 L 680 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-mf)" />

            <rect x="130" y="105" width="180" height="55" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="220" y="130" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">student.c</text>
            <text x="220" y="148" fill="#a7f3d0" fontSize="10" textAnchor="middle">gcc -c &rarr; student.o</text>

            <rect x="590" y="105" width="180" height="55" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="680" y="130" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">main.c</text>
            <text x="680" y="148" fill="#a7f3d0" fontSize="10" textAnchor="middle">gcc -c &rarr; main.o</text>

            {/* Linker Stage */}
            <path d="M 220 160 L 400 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-mf)" />
            <path d="M 680 160 L 500 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-mf)" />

            <rect x="350" y="205" width="200" height="60" rx="8" fill="#047857" stroke="#10b981" strokeWidth="2" />
            <text x="450" y="230" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">LINKER (ld / gcc -o)</text>
            <text x="450" y="250" fill="#ccfbf1" fontSize="11" textAnchor="middle">Output: student_app.exe</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-mf" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: Linkage &amp; Encapsulation Rules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. External vs Internal Linkage
            </h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <strong>External Linkage (Default):</strong> Functions and non-static globals are visible across all <code>.o</code> files.
              </li>
              <li>
                <strong>Internal Linkage (<code>static</code>):</strong> Functions and file-scope variables marked <code>static</code> are strictly private to their own <code>.c</code> file.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. Declaration vs Definition
            </h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <strong>Declaration (Header):</strong> <code>extern int g_count;</code> announces type without allocating storage.
              </li>
              <li>
                <strong>Definition (Source):</strong> <code>int g_count = 0;</code> allocates physical memory in the data segment.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Multi-File Modular Simulation
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This single compilable file simulates the exact division of labor between <code>student.h</code>, <code>student.c</code>, and <code>main.c</code> with static private helpers and shared extern globals.
        </p>
        <CFileLoader
          fileName="MultiFileArchitectureDemo.c"
          code={cCode}
          title="Multi-File Modular Architecture & Linkage Simulation"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Multi-File C Project Architecture & Linkage
=====================================================

>>> 1. Creating Student Records via Module API:
    [ID: 101] Swadeep Sharma     | GPA: 3.85 | Grade: A
    [ID: 102] Tuhina Roy         | GPA: 3.95 | Grade: A
    [ID: 103] Abhronila Das      | GPA: 3.70 | Grade: B

-----------------------------------------------------
>>> 2. Inspecting Shared Global State via extern linkage:
    Total Students Registered = 3

=== Multi-File Architecture Demonstration Completed ===`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Pitfalls &amp; Professional Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <span>⚠️ Multiple Definition Linker Error</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Placing <code>int totalCount = 0;</code> in a header file allocates separate storage in every <code>.c</code> file including it, causing a fatal <code>multiple definition of &apos;totalCount&apos;</code> error during linking. Always use <code>extern</code> in headers!
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Mark Private Helpers as static</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Any helper function not exposed in the public header must be marked <code>static</code> in the implementation file. This prevents global symbol collisions and enables aggressive compiler inlining.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: The Opaque Pointer Pattern (Information Hiding)</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          How do real libraries (like SQLite or standard <code>FILE*</code>) achieve strict object-oriented encapsulation in pure C? They declare <code>typedef struct Database Database;</code> in the public header without declaring its members! Callers can only pass <code>Database*</code> pointers to official API functions, making it impossible to tamper with private struct fields.
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic4Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic4_Multi_File_Architecture_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Modular architecture turns C from a simple procedural language into an industrial-strength systems engineering platform capable of managing millions of lines of code."
      />
    </div>
  );
};

export default Topic4;
