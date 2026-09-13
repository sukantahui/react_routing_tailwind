import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic5_files/PredefinedMacrosDemo.c?raw";
import { topic5Questions } from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_011</span>
          <span>•</span>
          <span>Topic 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Standard Predefined Macros &amp; Diagnostic Telemetry (<code className="text-emerald-600 dark:text-emerald-400">__FILE__</code>, <code className="text-emerald-600 dark:text-emerald-400">__LINE__</code>, <code className="text-emerald-600 dark:text-emerald-400">__func__</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Leverage compiler-provided metadata macros. Build zero-cost production logging frameworks, custom assertion systems, and inspect compiler target bitness and standard compliance versions.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>📍 Classroom Story: Pinpointing the Crash in 50,000 Lines of Code</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          During an accounting tax audit engine project in Shyamnagar, <strong>Abhronila</strong> received an unhelpful runtime crash message: <code>Error: division by zero</code> without any file or line indicator. Searching through 45 source files by hand took hours.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> showed the class the power of predefined compiler macros: <em>&ldquo;Let the preprocessor tag every single log message with <code>__FILE__</code>, <code>__LINE__</code>, and <code>__func__</code> automatically. When a bug occurs, the console prints the exact filename, function name, and line number in zero seconds.&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Metadata Injection at Preprocessor Stage
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Predefined Compiler Macros Injection Diagram"
          >
            <rect width="900" height="280" fill="none" />

            {/* Source Code Macro Call */}
            <rect x="40" y="40" width="340" height="200" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="70" fill="#38bdf8" fontSize="15" fontWeight="bold">Source Code Line 42</text>

            <rect x="60" y="90" width="300" height="60" rx="6" fill="#334155" />
            <text x="75" y="125" fill="#f8fafc" fontSize="13" font-family="monospace">LOG_INFO(&quot;Tax computed: $%.2f&quot;, total);</text>

            <text x="60" y="180" fill="#94a3b8" fontSize="12">Compiler injects internal constants:</text>
            <text x="60" y="200" fill="#38bdf8" fontSize="12" font-family="monospace">__FILE__ = &quot;tax_engine.c&quot;, __LINE__ = 42</text>

            {/* Expansion Arrow */}
            <path d="M 400 140 L 480 140" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-macro)" />
            <text x="440" y="130" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">Expand</text>

            {/* Expanded Console / Log Output */}
            <rect x="500" y="40" width="360" height="200" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="520" y="70" fill="#10b981" fontSize="15" fontWeight="bold">Expanded Diagnostic Log</text>

            <rect x="520" y="90" width="320" height="130" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="535" y="115" fill="#a7f3d0" fontSize="12" font-family="monospace">[INFO] [tax_engine.c:42 in computeTax()]</text>
            <text x="535" y="140" fill="#34d399" fontSize="12" font-family="monospace">Tax computed: $2250.00</text>
            <text x="535" y="175" fill="#6ee7b7" fontSize="11">Zero debugger required for instant triage!</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-macro" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Standard Macro Library
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. Location &amp; Time Metadata
            </h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300 font-mono text-xs">
              <li><span className="text-emerald-500 font-bold">__FILE__:</span> String literal of current source path.</li>
              <li><span className="text-emerald-500 font-bold">__LINE__:</span> Integer line number of the macro invocation.</li>
              <li><span className="text-emerald-500 font-bold">__func__:</span> Current function identifier (C99).</li>
              <li><span className="text-emerald-500 font-bold">__DATE__:</span> Build date (&ldquo;Sep 13 2026&rdquo;).</li>
              <li><span className="text-emerald-500 font-bold">__TIME__:</span> Build timestamp (&ldquo;14:35:00&rdquo;).</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. Standard Compliance &amp; Environment
            </h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300 font-mono text-xs">
              <li><span className="text-sky-500 font-bold">__STDC__:</span> 1 if compliant with standard C.</li>
              <li><span className="text-sky-500 font-bold">__STDC_VERSION__:</span> 199901L (C99), 201112L (C11), 201710L (C17).</li>
              <li><span className="text-sky-500 font-bold">__STDC_HOSTED__:</span> 1 for OS hosted; 0 for bare-metal firmware.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Predefined Macros &amp; Custom Assertions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates extracting compiler build metadata, logging with location tags, and triggering a diagnostic assertion failure with stack info.
        </p>
        <CFileLoader
          fileName="PredefinedMacrosDemo.c"
          code={cCode}
          title="Predefined Macros & Custom Diagnostic Logging Verification"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  Standard Predefined Macros & Compiler Diagnostics
=====================================================

>>> 1. Build Metadata & Compiler Environment:
    Source File (__FILE__)     : PredefinedMacrosDemo.c
    Line Number (__LINE__)     : 32
    Function Name (__func__)   : main()
    Build Date (__DATE__)      : Sep 13 2026
    Build Time (__TIME__)      : 14:35:00
    C Standard (__STDC_VERSION__): 201710L

-----------------------------------------------------
>>> 2. Diagnostic Telemetry Logging:

[INFO] [PredefinedMacrosDemo.c:41 in main()] Starting financial engine for Barrackpore branch...
[INFO] [PredefinedMacrosDemo.c:22 in computeTax()] Calculating GST Tax for amount = $12500.00 at rate = 18.00%...
[INFO] [PredefinedMacrosDemo.c:25 in computeTax()] Total Tax calculated = $2250.00

-----------------------------------------------------
>>> 3. Triggering Diagnostic Assertion:
[WARN] [PredefinedMacrosDemo.c:46 in main()] Simulating an invalid tax rate test...
[INFO] [PredefinedMacrosDemo.c:22 in computeTax()] Calculating GST Tax for amount = $5000.00 at rate = -5.00%...

>>> ASSERTION FAILED: 'rate >= 0.0 && rate <= 100.0'
    File    : PredefinedMacrosDemo.c
    Line    : 23
    Function: computeTax()
    Build   : Sep 13 2026 at 14:35:00

=== Predefined Macros Demonstration Completed ===`}
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
              <span>⚠️ Stringizing __func__ with #</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <code>#__func__</code> produces the string <code>&quot;__func__&quot;</code> because <code>__func__</code> is a compiler variable, not a preprocessor macro. Use <code>__func__</code> directly with <code>%s</code> formatting.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Variadic Logging with ##__VA_ARGS__</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Use <code>##__VA_ARGS__</code> in logging macros. The GCC token paste operator automatically deletes the preceding comma when zero extra arguments are passed, preventing syntax compilation errors.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Reproducible Builds</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Why do cybersecurity and Linux distribution maintainers (Debian, Alpine) disable <code>__DATE__</code> and <code>__TIME__</code> in official releases? Because if you compile the same source code tomorrow, the binary hash changes! Reproducible builds require bit-for-bit identical binary hashes for verification.
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic5Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic5_Predefined_Macros_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Predefined macros bridge the gap between static source code and runtime telemetry, giving your software full situational awareness of its own build environment."
      />
    </div>
  );
};

export default Topic5;
