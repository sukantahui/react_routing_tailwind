import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic6_files/DiagnosticBenchmarkSuiteDemo.c?raw";
import { topic6Questions } from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_011</span>
          <span>•</span>
          <span>Topic 6 (Capstone Project)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Capstone Project: Industrial Diagnostic Logging &amp; Performance Benchmarking Suite
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Synthesize function-like variadic macros, token pasting, stringizing, predefined compiler metadata, and conditional log gating into a production-grade systems diagnostic toolkit.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🚀 Classroom Story: The Zero-Cost Telemetry Suite</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Barrackpore masterclass, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> were building a high-frequency algorithmic trade processor. They required detailed telemetry logging, execution micro-benchmarks, and safety assertions, but the engine could not afford runtime string formatting overhead.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Under <strong>Sukanta Sir&apos;s</strong> guidance, they engineered a complete preprocessor diagnostic suite: compile-time log level filtering with <code>#if</code>, token-pasted execution block timers with <code>clock()</code>, and stringized custom assertions with full file and line diagnostics. In release builds, all instrumentation vanished into 0 bytes of machine code, preserving maximum hardware execution speed.
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Diagnostic Suite Pipeline
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Diagnostic Suite Architecture Diagram"
          >
            <rect width="900" height="280" fill="none" />

            {/* Diagnostic Modules */}
            <rect x="40" y="40" width="240" height="200" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">1. Variadic Logging</text>
            <rect x="55" y="85" width="210" height="32" rx="6" fill="#047857" />
            <text x="160" y="106" fill="#ffffff" fontSize="11" textAnchor="middle">LOG_D(), LOG_I()</text>
            <rect x="55" y="125" width="210" height="32" rx="6" fill="#d97706" />
            <text x="160" y="146" fill="#ffffff" fontSize="11" textAnchor="middle">LOG_W(), LOG_E()</text>
            <rect x="55" y="165" width="210" height="32" rx="6" fill="#334155" />
            <text x="160" y="186" fill="#94a3b8" fontSize="10" textAnchor="middle">Gated by ACTIVE_LOG_LEVEL</text>

            {/* Micro-Benchmark */}
            <rect x="330" y="40" width="240" height="200" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="450" y="70" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">2. Micro-Benchmarking</text>
            <rect x="345" y="85" width="210" height="40" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="450" y="105" fill="#a7f3d0" fontSize="11" textAnchor="middle">TIME_BLOCK(sim, &#123; ... &#125;)</text>
            <text x="450" y="120" fill="#34d399" fontSize="10" textAnchor="middle">Local start_sim &amp; end_sim</text>
            <rect x="345" y="140" width="210" height="45" rx="6" fill="#334155" />
            <text x="450" y="160" fill="#f8fafc" fontSize="10" textAnchor="middle">High-Resolution clock()</text>
            <text x="450" y="175" fill="#94a3b8" fontSize="9" textAnchor="middle">Output elapsed ms on console</text>

            {/* Panic Assertion */}
            <rect x="620" y="40" width="240" height="200" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
            <text x="740" y="70" fill="#f43f5e" fontSize="14" fontWeight="bold" textAnchor="middle">3. Panic Assertions</text>
            <rect x="635" y="85" width="210" height="40" rx="6" fill="#4c0519" stroke="#be123c" />
            <text x="740" y="105" fill="#fca5a5" fontSize="11" textAnchor="middle">PANIC_ASSERT(cond, msg)</text>
            <text x="740" y="120" fill="#f87171" fontSize="9" textAnchor="middle">Stringized #condition dump</text>
            <rect x="635" y="140" width="210" height="45" rx="6" fill="#334155" />
            <text x="740" y="160" fill="#f8fafc" fontSize="10" textAnchor="middle">__FILE__, __LINE__, __func__</text>
            <text x="740" y="175" fill="#fca5a5" fontSize="9" textAnchor="middle">Instant root-cause location</text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The 4 Core Architectural Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. Variadic Log Dispatcher
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Wraps format string and arguments with <code>##__VA_ARGS__</code>. Uses <code>do &#123; ... &#125; while (0)</code> and evaluates log level against <code>ACTIVE_LOG_LEVEL</code>.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. TIME_BLOCK Performance Profiler
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Uses token concatenation (<code>start_##name</code>) to generate unique timestamp variables, allowing nested profiling blocks without variable name collisions.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Complete Capstone Code: Diagnostic &amp; Profiling Suite
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Inspect this complete, compilable diagnostic macro suite demonstrating multi-level logging, micro-benchmarking, type-generic array sizing, and panic assertions.
        </p>
        <CFileLoader
          fileName="DiagnosticBenchmarkSuiteDemo.c"
          code={cCode}
          title="Industrial Macro Metaprogramming & Diagnostic Suite"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  CAPSTONE: Industrial Macro Metaprogramming Suite
=====================================================

[DEBUG] [DiagnosticBenchmarkSuiteDemo.c:65 in main()] Bootstrapping core diagnostics engine...
[INFO ] [DiagnosticBenchmarkSuiteDemo.c:66 in main()] System configuration loaded. Active Log Level: 0
[WARN ] [DiagnosticBenchmarkSuiteDemo.c:67 in main()] Memory usage approaching 70% threshold.
[ERROR] [DiagnosticBenchmarkSuiteDemo.c:68 in main()] Failed to connect to secondary backup cluster.

-----------------------------------------------------
[INFO ] [DiagnosticBenchmarkSuiteDemo.c:73 in main()] Numbers array capacity via ARRAY_SIZE macro = 8 elements

-----------------------------------------------------
[INFO ] [DiagnosticBenchmarkSuiteDemo.c:51 in runHeavySimulation()] Starting mathematical simulation with 1000000 iterations...
[INFO ] [DiagnosticBenchmarkSuiteDemo.c:58 in runHeavySimulation()] Simulation complete. Final Accumulator = 499999500.00
[BENCHMARK] 'heavy_sim_100k' executed in 2.8450 ms

-----------------------------------------------------
[INFO ] [DiagnosticBenchmarkSuiteDemo.c:82 in main()] Testing PANIC_ASSERT on valid condition...
[INFO ] [DiagnosticBenchmarkSuiteDemo.c:86 in main()] Testing PANIC_ASSERT on failing condition...

=====================================================
[CRITICAL PANIC] Assertion Failed: 'activeConnections >= 0'
Message : Active connections count corrupted!
Location: DiagnosticBenchmarkSuiteDemo.c:88 in function main()
Build   : Sep 13 2026 14:40:00
=====================================================

=== Metaprogramming Capstone Completed Successfully ===`}
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
              <span>⚠️ Using ARRAY_SIZE on Decayed Pointers</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <code>ARRAY_SIZE(ptr)</code> on a function parameter returns <code>sizeof(pointer) / sizeof(*ptr)</code> (typically <code>8 / 4 = 2</code>), NOT the actual array length! Only use it on stack-allocated arrays.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Zero-Overhead Production Builds</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              By setting <code>-DACTIVE_LOG_LEVEL=3 -DNDEBUG</code> during production compilation, all telemetry and assertions are completely stripped out, generating minimal, ultra-fast binaries.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: The Famous Linux container_of Macro</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          How does the Linux kernel navigate from an embedded linked list node pointer back to the parent structure that contains it? (<em>Answer: <code>#define container_of(ptr, type, member) ((type *)((char *)(ptr) - offsetof(type, member)))</code> &mdash; a brilliant triumph of pure C pointer arithmetic and preprocessor metaprogramming!</em>)
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic6Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic6_Capstone_Macro_Suite_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="When you master macro metaprogramming, you become the architect of your own domain-specific C extensions. You build software that is both extraordinarily expressive and relentlessly fast."
      />
    </div>
  );
};

export default Topic6;
