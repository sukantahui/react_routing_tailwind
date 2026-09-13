import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/ConditionalCompilationDemo.c?raw";
import { topic3Questions } from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_011</span>
          <span>•</span>
          <span>Topic 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Conditional Compilation (<code className="text-emerald-600 dark:text-emerald-400">#ifdef</code>, <code className="text-emerald-600 dark:text-emerald-400">#if</code>, <code className="text-emerald-600 dark:text-emerald-400">defined()</code>, <code className="text-emerald-600 dark:text-emerald-400">#error</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master compile-time branching. Discover how to write cross-platform C code targeting Windows, Linux, and macOS simultaneously, toggle debug telemetry with zero runtime overhead, and enforce version constraints using <code>#error</code>.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🌐 Classroom Story: The Cross-Platform Server Deployment</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Shyamnagar lab, <strong>Debangshu</strong> wrote a networking server that compiled on Windows using <code>&lt;windows.h&gt;</code>, but failed when testing on a Linux Ubuntu server with <code>fatal error: windows.h not found</code>.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> showed him how to use conditional compilation: <em>&ldquo;You don&apos;t maintain two separate repositories for different operating systems. You use <code>#ifdef _WIN32</code> and <code>#elif defined(__linux__)</code> to conditionally compile the appropriate OS socket headers from a single, unified source codebase.&rdquo;</em> Debangshu structured the project with conditional directives, and the server built seamlessly across both platforms.
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Compile-Time Code Branching
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Conditional Compilation Decision Tree"
          >
            <rect width="900" height="280" fill="none" />

            {/* Root Decision */}
            <polygon points="450,30 550,80 450,130 350,80" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="450" y="85" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">#ifdef _WIN32 ?</text>

            {/* True Branch -> Windows */}
            <path d="M 350 80 L 200 80 L 200 170" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-cond-green)" />
            <text x="260" y="70" fill="#10b981" fontSize="12" fontWeight="bold">TRUE (Win32)</text>

            <rect x="110" y="170" width="180" height="80" rx="8" fill="#064e3b" stroke="#10b981" />
            <text x="200" y="200" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Compile Windows Block</text>
            <text x="200" y="225" fill="#a7f3d0" fontSize="11" textAnchor="middle">Include &lt;windows.h&gt;</text>

            {/* False Branch -> Linux Check */}
            <path d="M 550 80 L 700 80 L 700 170" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-cond-amber)" />
            <text x="610" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold">FALSE (__linux__)</text>

            <rect x="610" y="170" width="180" height="80" rx="8" fill="#451a03" stroke="#f59e0b" />
            <text x="700" y="200" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Compile Linux Block</text>
            <text x="700" y="225" fill="#fde68a" fontSize="11" textAnchor="middle">Include &lt;unistd.h&gt;</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-cond-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-cond-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Conditional Directives Suite
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
              #ifdef &amp; #ifndef
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tests whether an identifier has been defined via <code>#define</code> or CLI <code>-D</code> flag. Used for header guards and simple on/off debug switches.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sky-600 dark:text-sky-400 text-base">
              #if defined() &amp; #elif
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Allows combining multiple expressions using logical operators: <code>#if defined(DEBUG) &amp;&amp; !defined(TESTING)</code>. Supports integer relational comparisons.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-rose-600 dark:text-rose-400 text-base">
              #error &amp; #warning
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <code>#error</code> stops compilation immediately if invalid parameters are passed. <code>#warning</code> emits a compiler diagnostic message without stopping.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: OS Detection &amp; Debug Gating in C
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program detects host OS macros, gates debug logging at compile time, and demonstrates multi-branch API version selection.
        </p>
        <CFileLoader
          fileName="ConditionalCompilationDemo.c"
          code={cCode}
          title="Cross-Platform OS Detection & Feature Flag Verification"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  C Conditional Compilation Directives (#if, #ifdef)
=====================================================

>>> 1. Target Host Architecture Detection:
    Detected Platform: Microsoft Windows Platform
    API Profile      : Modern Enterprise API v3.0 (Active)

>>> 2. Active Debug Logging Gating:
[DEBUG] Initializing high-speed telemetry engine...
[DEBUG] Allocating network ring buffer of 64 KB...
[DEBUG] System boot sequence completed successfully.

>>> 3. Feature Flag Verification:
    [STANDARD LOG] Info & Warning tracing enabled.

=== Conditional Compilation Completed Successfully ===`}
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
              <span>⚠️ Using Types or sizeof in #if</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Writing <code>#if sizeof(int) == 4</code> is illegal in C. The preprocessor runs before the compiler parses types. Use pre-defined macros like <code>__SIZEOF_INT__</code> instead.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Safe Commenting with #if 0</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Never use <code>/* ... */</code> to comment out large multi-line functions that already contain comments. Always use <code>#if 0 ... #endif</code> to disable blocks cleanly.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Zero-Cost Release Binaries</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Why is <code>#if defined(DEBUG)</code> vastly superior to a regular <code>if (isDebugEnabled)</code> statement? Because a regular <code>if</code> check still leaves string literals, function calls, and branch checks in the compiled binary. With <code>#if</code>, debug code is completely erased during preprocessing, leaving 0 bytes in production binaries!
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic3Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic3_Conditional_Compilation_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Conditional compilation is the cornerstone of portability. It enables a single C code base to build on embedded microcontrollers, desktops, supercomputers, and mobile devices alike."
      />
    </div>
  );
};

export default Topic3;
