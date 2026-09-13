import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/CommandLineArgsDemo.c?raw";
import { topic3Questions } from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_012</span>
          <span>•</span>
          <span>Topic 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Command-Line Argument Processing: <code className="text-emerald-600 dark:text-emerald-400 font-mono">argc</code> &amp; <code className="text-emerald-600 dark:text-emerald-400 font-mono">argv</code>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master terminal application interfaces. Understand how operating system shells pass arguments to <code>main(int argc, char *argv[])</code>, parse short/long flags, convert strings with <code>strtol</code>, and build production-grade CLI tools.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💻 Classroom Story: Transforming Hardcoded Scripts into CLI Tools</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our Shyamnagar lab, <strong>Swadeep</strong> wrote a tax calculation program with hardcoded filenames: <code>fopen(&quot;students_2025.csv&quot;, &quot;r&quot;)</code>. Every time a new semester started, he had to modify the C source code, recompile, and redeploy the executable.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> showed him how real UNIX utilities work: <em>&ldquo;Software should never require recompilation to change input files. By parsing command-line parameters via <code>argc</code> and <code>argv</code>, your program can be invoked as <code>./tax_engine -i batch1.csv -o report.dat -v</code>, allowing seamless automation in cron jobs and shell scripts!&rdquo;</em>
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: argv Memory Vector Layout
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="argc and argv Memory Layout"
          >
            <rect width="900" height="280" fill="none" />

            {/* argv pointer array */}
            <rect x="50" y="40" width="220" height="200" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">char *argv[] (argc = 4)</text>

            <rect x="70" y="85" width="180" height="30" rx="4" fill="#334155" />
            <text x="80" y="105" fill="#f8fafc" fontSize="11" font-family="monospace">argv[0] &rarr;</text>
            <text x="180" y="105" fill="#38bdf8" fontSize="10">0x7FFE10</text>

            <rect x="70" y="120" width="180" height="30" rx="4" fill="#334155" />
            <text x="80" y="140" fill="#f8fafc" fontSize="11" font-family="monospace">argv[1] &rarr;</text>
            <text x="180" y="140" fill="#38bdf8" fontSize="10">0x7FFE20</text>

            <rect x="70" y="155" width="180" height="30" rx="4" fill="#334155" />
            <text x="80" y="175" fill="#f8fafc" fontSize="11" font-family="monospace">argv[2] &rarr;</text>
            <text x="180" y="175" fill="#38bdf8" fontSize="10">0x7FFE30</text>

            <rect x="70" y="190" width="180" height="30" rx="4" fill="#0f172a" stroke="#475569" />
            <text x="80" y="210" fill="#94a3b8" fontSize="11" font-family="monospace">argv[3] &rarr; NULL</text>

            {/* Target Strings in Memory */}
            <path d="M 250 100 L 350 100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-arg)" />
            <rect x="350" y="85" width="220" height="30" rx="4" fill="#064e3b" stroke="#10b981" />
            <text x="360" y="105" fill="#ffffff" fontSize="12" font-family="monospace">&quot;./app.exe&quot;</text>

            <path d="M 250 135 L 350 135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-arg)" />
            <rect x="350" y="120" width="220" height="30" rx="4" fill="#064e3b" stroke="#10b981" />
            <text x="360" y="140" fill="#ffffff" fontSize="12" font-family="monospace">&quot;-i&quot;</text>

            <path d="M 250 170 L 350 170" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-arg)" />
            <rect x="350" y="155" width="220" height="30" rx="4" fill="#064e3b" stroke="#10b981" />
            <text x="360" y="175" fill="#ffffff" fontSize="12" font-family="monospace">&quot;students.csv&quot;</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-arg" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The CLI Parsing Toolkit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. Fundamental Rules of argc / argv
            </h3>
            <ul className="text-sm space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li><code>argc</code> is always $\ge 1$ (argv[0] holds executable name).</li>
              <li><code>argv[argc]</code> is guaranteed to be <code>NULL</code> by ANSI C.</li>
              <li>Arguments are passed as null-terminated character strings (<code>char*</code>).</li>
              <li>Return <code>0</code> for success, non-zero for failure to shell.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. Safe Number Conversion (strtol vs atoi)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Never use <code>atoi()</code> in production CLI tools because it cannot detect parse failures or overflow. Always use <code>strtol()</code>:
            </p>
            <pre className="bg-slate-900 text-sky-300 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
{`char *endptr;
long port = strtol(argv[i], &endptr, 10);
if (*endptr != '\\0' || errno == ERANGE) {
    fprintf(stderr, "Error: Invalid numerical port!\\n");
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Robust Command-Line Argument Parser
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates manual CLI flag parsing (<code>-i</code>, <code>-o</code>, <code>-v</code>, <code>--dry-run</code>, <code>--help</code>) with full usage documentation and error handling.
        </p>
        <CFileLoader
          fileName="CommandLineArgsDemo.c"
          code={cCode}
          title="Command-Line Argument Parser & Option Processor"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  C Command-Line Argument Processing (argc / argv)
=====================================================

>>> 1. Raw CLI Argument Inspection:
    Total argument count (argc) = 1
    argv[0] = "./app.exe"

-----------------------------------------------------
>>> 2. Parsing Simulated CLI Options:
    Parsing simulated arguments: ./app.exe -i students.csv -o report.dat -v -v --dry-run 

>>> Parsed Configuration Result:
    Input File  : students.csv
    Output File : report.dat
    Verbosity   : 2 (Levels of debug)
    Dry Run Mode: TRUE

=== Command-Line Argument Processing Completed ===`}
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
              <span>⚠️ Unchecked argv[++i] Boundary Overflow</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              If a flag expects a value (e.g. <code>-i</code>), writing <code>config-&gt;file = argv[++i];</code> without first verifying <code>if (i + 1 &lt; argc)</code> will read out of bounds or dereference <code>argv[argc]</code> (NULL), causing a segmentation fault.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Always Provide a Help Manual (-h)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Implement a clean <code>printUsage()</code> helper triggered on <code>-h</code>, <code>--help</code>, or whenever invalid arguments are detected, printing standard synopsis and option descriptions.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: The Third Parameter in main()</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Did you know <code>main()</code> can accept a third argument: <code>int main(int argc, char *argv[], char *envp[])</code>? <code>envp</code> is a null-terminated array of strings containing all operating system environment variables (like <code>PATH</code>, <code>USER</code>, <code>HOME</code>)!
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
        <PlainTextPrint note={noteText} fileName="Topic3_Command_Line_Arguments_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Command-line argument processing is the gateway through which your C software interfaces with operating systems, automation scripts, and server deployment pipelines."
      />
    </div>
  );
};

export default Topic3;
