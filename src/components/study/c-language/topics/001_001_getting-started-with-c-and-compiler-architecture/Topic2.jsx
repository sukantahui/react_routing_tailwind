import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic2_files/CompilerPipelineDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_001 · Topic 2
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Compiler Pipeline
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Understanding C Compilation Pipeline &amp; GCC Toolchain
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master how GCC converts C source code into preprocessed text streams, target CPU assembly instructions, relocatable binary object files, and linked executable binaries.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: 4-Stage Compilation Architecture
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Unlike interpreted languages (like Python or JavaScript) that parse source code line-by-line during runtime, C source code undergoes a multi-phase translation pipeline before any machine instruction executes.
          </p>
          <p>
            The GNU Compiler Collection (GCC) toolchain processes C source code through four distinct, isolated sub-tools:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-sm text-slate-300">
            <li>
              <strong>1. Preprocessor Phase (<code>cpp</code>):</strong>
              <br />
              Reads source <code>.c</code> files, expands all <code>#include</code> header directives by pasting header contents directly into the stream, substitutes <code>#define</code> macros, strips single/multi-line comments, and evaluates conditional compilation (<code>#ifdef</code>). Outputs a flat preprocessed text file (<code>.i</code>).
            </li>
            <li>
              <strong>2. Compiler Phase (<code>cc1</code>):</strong>
              <br />
              Parses preprocessed C code (<code>.i</code>), checks syntax validity, builds abstract syntax trees (AST), performs code optimization passes (e.g. <code>-O2</code>), and translates C statements into human-readable target assembly language instructions (<code>.s</code>) for x86_64 or ARM CPU architectures.
            </li>
            <li>
              <strong>3. Assembler Phase (<code>as</code>):</strong>
              <br />
              Translates human-readable assembly instructions (<code>.s</code>) into binary machine opcodes. Outputs a relocatable binary object file (<code>.o</code>) containing machine instructions and a symbol table.
            </li>
            <li>
              <strong>4. Linker Phase (<code>ld</code>):</strong>
              <br />
              Resolves unresolved external function references (e.g. connecting call sites of <code>printf</code> to their actual implementation inside the C standard library <code>libc.so</code>) and merges multiple <code>.o</code> object files into a single, runnable binary executable.
            </li>
          </ol>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 text-xs md:text-sm mt-4">
            <p className="font-semibold text-amber-300 mb-1">🏫 Classroom Scenario at Coder &amp; AccoTax (Barrackpore):</p>
            <p className="leading-relaxed">
              When <b>Swadeep</b> encountered an <em>"undefined reference to `main`"</em> error during lab practice, <b>Sukanta Hui</b> demonstrated running <code>gcc -c main.c -o main.o</code>. He showed how the compiler phase succeeded without errors, but the linker phase failed because the symbol table lacked the mandatory <code>main</code> entry point address!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: The 4 GCC Pipeline Stages
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 240" className="w-full min-w-[700px] font-sans">
            {/* Stage 1: Source Code */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="20" y="70" width="150" height="90" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="95" y="105" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">Source Code</text>
              <text x="95" y="130" textAnchor="middle" fill="#94a3b8" className="text-xs">main.c</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 170 115 L 210 115" stroke="#64748b" strokeWidth="2" />

            {/* Stage 2: Preprocessor */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="210" y="70" width="150" height="90" rx="12" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="285" y="105" textAnchor="middle" fill="#818cf8" className="font-bold text-sm">Preprocessor</text>
              <text x="285" y="130" textAnchor="middle" fill="#94a3b8" className="text-xs">gcc -E (main.i)</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 360 115 L 400 115" stroke="#64748b" strokeWidth="2" />

            {/* Stage 3: Compiler */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="400" y="70" width="150" height="90" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="475" y="105" textAnchor="middle" fill="#f59e0b" className="font-bold text-sm">Compiler</text>
              <text x="475" y="130" textAnchor="middle" fill="#94a3b8" className="text-xs">gcc -S (main.s)</text>
            </g>

            {/* Arrow 3 */}
            <path d="M 550 115 L 590 115" stroke="#64748b" strokeWidth="2" />

            {/* Stage 4: Assembler/Linker */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="590" y="70" width="150" height="90" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="665" y="105" textAnchor="middle" fill="#34d399" className="font-bold text-sm">Assembler/Linker</text>
              <text x="665" y="130" textAnchor="middle" fill="#94a3b8" className="text-xs">gcc -c (main.o -&gt; app)</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: GCC Flags &amp; Intermediate File Extensions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Pipeline Stage</th>
                <th className="p-3">GCC Command Flag</th>
                <th className="p-3">Output Extension</th>
                <th className="p-3">File Content Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-sky-400">1. Preprocessing</td>
                <td className="p-3 font-mono text-amber-300">gcc -E main.c -o main.i</td>
                <td className="p-3 font-mono">.i</td>
                <td className="p-3">Expanded text stream with headers &amp; macro replacements.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">2. Compilation</td>
                <td className="p-3 font-mono text-amber-300">gcc -S main.i -o main.s</td>
                <td className="p-3 font-mono">.s</td>
                <td className="p-3">Human-readable x86_64 or ARM assembly code instructions.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">3. Assembly</td>
                <td className="p-3 font-mono text-amber-300">gcc -c main.s -o main.o</td>
                <td className="p-3 font-mono">.o / .obj</td>
                <td className="p-3">Relocatable binary machine opcodes with symbol tables.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">4. Linking</td>
                <td className="p-3 font-mono text-amber-300">gcc main.o -o myprogram</td>
                <td className="p-3 font-mono">Executable (ELF / .exe)</td>
                <td className="p-3">Merged executable binary linked with C library (libc).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: GCC Compilation Pipeline Demonstration
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            The program below (<code>CompilerPipelineDemo.c</code>) demonstrates macro expansion (<code>#define MULTIPLY</code>), header inclusions, function prototyping, arithmetic calculations, and system console output.
          </p>
          <p className="text-xs text-slate-400">
            Try stopping GCC at each stage:
            <br />
            <code>gcc -E CompilerPipelineDemo.c -o demo.i</code> (Inspect macro expansion)
            <br />
            <code>gcc -S demo.i -o demo.s</code> (Inspect x86_64 assembly code)
            <br />
            <code>gcc -c demo.s -o demo.o</code> (Generate relocatable object code)
            <br />
            <code>gcc demo.o -o demo</code> (Link final executable)
          </p>
        </div>

        {/* Code Loader */}
        <CFileLoader fileModule={demoCode} title="CompilerPipelineDemo.c" editable={false} />

        {/* Expected Console Output Box */}
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 GCC Compiler Toolchain Pipeline Inspector
 Center: Barrackpore | Educator: Sukanta Hui
====================================================

Stage 1: Preprocessor  (gcc -E) -> Expands #include & #define macros
Stage 2: Compiler      (gcc -S) -> Translates C into x86_64 assembly (.s)
Stage 3: Assembler     (gcc -c) -> Assembles text into binary object (.o)
Stage 4: Linker        (gcc -o) -> Links object files into native binary

--- Calculation Example ---
Item Count : 5 units
Unit Price : Rs. 120
Total Cost : Rs. 600 (Evaluated via Macro MULTIPLY)`}
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
            <b>Confusing Compiler Errors with Linker Errors:</b> Compiler syntax errors occur during Phase 2 (e.g. missing semicolon). Linker symbol errors occur during Phase 4 (e.g. <code>undefined reference to function_name</code>).
          </li>
          <li>
            <b>Omitting Output Flag (-o):</b> Compiling without <code>-o</code> produces a default output binary named <code>a.out</code> on Linux or <code>a.exe</code> on Windows.
          </li>
          <li>
            <b>Always Compile with Warnings Enabled:</b> Use <code>gcc -std=c11 -Wall -Wextra main.c -o main</code> to catch potential bugs early during compilation!
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400">
          🤔 Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does object file linking allow building massive multi-million line C software projects incrementally? How does recompiling only modified <code>.c</code> files into <code>.o</code> objects save build time?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_001 Topic 2 FAQs" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 2 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_001_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Inspecting intermediate files with gcc -S allows you to see how C loops, macros, and pointers translate into low-level CPU assembly instructions! — Sukanta Hui" />
      </section>
    </div>
  );
}
