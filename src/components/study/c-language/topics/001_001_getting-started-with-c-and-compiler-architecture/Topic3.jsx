import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/ProgramStructureDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_001 · Topic 3
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Program Structure
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Structure of a Standard C Program
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Dissect the structural layout of C source files: preprocessor directives, global space, main() entry point, function prototypes, and exit status codes.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Anatomy of C Source Files
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            A C source file is organized logically into distinct structural sections. Understanding this structure allows developers to write clean, modular, and maintainable C code:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-300">
            <li>
              <strong>1. Preprocessor Directives:</strong>
              <br />
              Directives starting with <code>#</code> (such as <code>#include &lt;stdio.h&gt;</code> or <code>#define MAX 100</code>) located at the very top of the file. They instruct the preprocessor to pull in standard library headers and evaluate symbolic constants.
            </li>
            <li>
              <strong>2. Global Space &amp; Function Prototypes:</strong>
              <br />
              Function declarations (prototypes) and global constants declared outside any function. Function prototypes inform the compiler of a function's name, return type, and argument parameters before its actual invocation inside <code>main()</code>.
            </li>
            <li>
              <strong>3. Main Entry Point Function (<code>int main(void)</code>):</strong>
              <br />
              The mandatory execution entry point. When an OS executes a compiled binary, system startup code (<code>crt0</code>) jumps to <code>main()</code>.
            </li>
            <li>
              <strong>4. Statement Execution &amp; Scope Blocks (<code>{}</code>):</strong>
              <br />
              Executable statements enclosed in curly braces. Variables declared inside a block exist only within that local block scope.
            </li>
            <li>
              <strong>5. Exit Status Return Code:</strong>
              <br />
              The final statement <code>return 0;</code> passes exit status code <code>0</code> (<code>EXIT_SUCCESS</code>) back to the parent operating system shell.
            </li>
          </ul>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 text-xs md:text-sm mt-4">
            <p className="font-semibold text-amber-300 mb-1">🏫 Classroom Scenario at Coder &amp; AccoTax (Barrackpore):</p>
            <p className="leading-relaxed">
              When <b>Abhronila</b> asked why C requires <code>int main(void)</code> instead of non-standard <code>void main()</code>, <b>Sukanta Hui</b> demonstrated how parent shell scripts inspect process exit status codes (<code>$?</code> in Linux or <code>%ERRORLEVEL%</code> in Windows CMD). Returning an integer from <code>main()</code> communicates whether execution succeeded or failed!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Visual Diagram: Structural Layout of a C File
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 850 260" className="w-full min-w-[700px] font-sans">
            {/* Top: Directives */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="30" y="30" width="790" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="425" y="55" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">Section 1: Preprocessor Directives (#include &lt;stdio.h&gt;, #define)</text>
            </g>

            {/* Middle Top: Prototypes */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="30" y="80" width="790" height="40" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="425" y="105" textAnchor="middle" fill="#818cf8" className="font-bold text-xs">Section 2: Global Space &amp; Function Prototypes (void printHeader(void);)</text>
            </g>

            {/* Middle: main() */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="30" y="130" width="790" height="60" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="425" y="155" textAnchor="middle" fill="#34d399" className="font-bold text-xs">Section 3: Main Function Entry Point (int main(void) &#123; ... return 0; &#125;)</text>
              <text x="425" y="175" textAnchor="middle" fill="#94a3b8" className="text-[11px]">Primary execution block invoked by Operating System</text>
            </g>

            {/* Bottom: Functions */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="30" y="200" width="790" height="40" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="425" y="225" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs">Section 4: Custom Function Definitions (void printHeader(void) &#123; ... &#125;)</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Dissecting 'int main(void)' Word by Word
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Role &amp; Purpose</th>
                <th className="p-3">Technical Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">int</td>
                <td className="p-3">Return Data Type</td>
                <td className="p-3">Specifies that main() returns a 32-bit signed integer status code to the host OS shell.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-400">main</td>
                <td className="p-3">Global Entry Identifier</td>
                <td className="p-3">The mandatory symbol name recognized by C runtime startup code (<code>crt0</code>) as execution entry.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-400">(void)</td>
                <td className="p-3">Parameter List</td>
                <td className="p-3">Explicitly enforces that this main() function accepts zero input arguments from terminal.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-400">{`{ ... }`}</td>
                <td className="p-3">Function Body Block</td>
                <td className="p-3">Encloses executable statements and block-scoped local variables.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-400">return 0;</td>
                <td className="p-3">Exit Status Statement</td>
                <td className="p-3">Returns <code>0</code> (<code>EXIT_SUCCESS</code>) to signal clean, error-free program completion.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: C Program Structure &amp; Function Scope Demonstration
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            The program below (<code>ProgramStructureDemo.c</code>) demonstrates a complete C source layout featuring preprocessor macro definitions (<code>ACADEMY_NAME</code>), global function prototypes (<code>printHeaderBanner</code>), main entry point execution, local variables, helper function calls, and process return status codes.
          </p>
        </div>

        {/* Code Loader */}
        <CFileLoader fileModule={demoCode} title="ProgramStructureDemo.c" editable={false} />

        {/* Expected Console Output Box */}
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Coder & AccoTax Learning Center
 Location: Barrackpore, West Bengal | Educator: Sukanta Hui
 Course  : C Programming & Systems Fundamentals
====================================================

[Execution State] Inside main() entry point function.
Processing Student Roll: 101 with Score: 88.50...

--> [processStudentStatus] Roll 101 Scored 88.50 marks.
--> Result: PASSED (Grade A)
[Execution State] Returning from main() with exit code 0.`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <b>Using Non-Standard void main():</b> Writing <code>void main()</code> violates C standards and causes undefined behavior on modern compilers. Always use <code>int main(void)</code>!
          </li>
          <li>
            <b>Omitting Function Prototypes:</b> Calling custom functions inside <code>main()</code> before declaring their prototype causes compiler warnings or argument type mismatch errors.
          </li>
          <li>
            <b>Polluting Global Scope:</b> Avoid declaring unnecessary global variables. Keep variables local to their functions to prevent accidental side effects.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400">
          🤔 Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How do shell scripts in automated build pipelines (like GitHub Actions or Makefiles) use the return status code of <code>main()</code> to decide whether to continue or abort a build process?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_001 Topic 3 FAQs" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 3 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_001_topic3_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always declare function prototypes before main() to allow the compiler to validate parameter types before function invocation! — Sukanta Hui" />
      </section>
    </div>
  );
}
