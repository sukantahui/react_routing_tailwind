import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/HelloWorldDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_001 · Topic 0
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            C Foundations
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Getting Started with C &amp; Compiler Pipeline
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the origin of C language, standards evolution (C99, C11, C17), the four-stage GCC compilation pipeline (Preprocessor, Compiler, Assembler, Linker), and your first C console program.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: What is C &amp; Why Systems Engineers Rely on It
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Created in 1972 by Dennis Ritchie at Bell Laboratories, C was designed to build the Unix operating system. Today, C remains the backbone of modern computer systems—powering OS kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL), virtual machines (JVM, Python interpreter), and microcontrollers.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              When <b>Swadeep</b> and <b>Tuhina</b> asked why Java and Python run slightly slower than C, <b>Sukanta Hui</b> demonstrated how C compiles directly down to native x86_64 CPU instructions without relying on heavy virtual machine abstraction layers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: The GCC Compilation Pipeline
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 240" className="w-full min-w-[700px] font-sans">
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="20" y="70" width="150" height="90" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="95" y="105" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">Source Code</text>
              <text x="95" y="130" textAnchor="middle" fill="#94a3b8" className="text-xs">main.c</text>
            </g>

            <path d="M 170 115 L 210 115" stroke="#64748b" strokeWidth="2" />

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="210" y="70" width="150" height="90" rx="12" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="285" y="105" textAnchor="middle" fill="#818cf8" className="font-bold text-sm">Preprocessor</text>
              <text x="285" y="130" textAnchor="middle" fill="#94a3b8" className="text-xs">gcc -E (main.i)</text>
            </g>

            <path d="M 360 115 L 400 115" stroke="#64748b" strokeWidth="2" />

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="400" y="70" width="150" height="90" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="475" y="105" textAnchor="middle" fill="#f59e0b" className="font-bold text-sm">Compiler</text>
              <text x="475" y="130" textAnchor="middle" fill="#94a3b8" className="text-xs">gcc -S (main.s)</text>
            </g>

            <path d="M 550 115 L 590 115" stroke="#64748b" strokeWidth="2" />

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
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: GCC Terminal Commands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300">Phase 1: Preprocessor</h3>
            <p className="text-slate-300"><code className="text-amber-300">gcc -E main.c -o main.i</code></p>
            <p className="text-slate-400">Strips comments, substitutes #define macros, inserts header declarations into a flat text stream.</p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300">Phase 2: Compiler</h3>
            <p className="text-slate-300"><code className="text-amber-300">gcc -S main.i -o main.s</code></p>
            <p className="text-slate-400">Translates preprocessed C into target assembly language instructions (x86_64 or ARM).</p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300">Phase 3: Assembler</h3>
            <p className="text-slate-300"><code className="text-amber-300">gcc -c main.s -o main.o</code></p>
            <p className="text-slate-400">Converts assembly opcodes into relocatable machine-code binary object file.</p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300">Phase 4: Linker</h3>
            <p className="text-slate-300"><code className="text-amber-300">gcc main.o -o myprogram</code></p>
            <p className="text-slate-400">Combines object files with system library object files (libc) into a final executable binary.</p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: First C Program Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>HelloWorldDemo.c</code>) demonstrates a complete standalone C console application featuring standard header inclusion (<code>#include &lt;stdio.h&gt;</code>), <code>main()</code> entry point, formatted console output via <code>printf()</code>, and return exit status.
        </p>

        <CFileLoader fileModule={cCode} title="HelloWorldDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Welcome to C Programming at Coder & AccoTax!
 Center: Barrackpore | Educator: Sukanta Hui
====================================================

Hello World! Preparing for Systems & GCC Architecture.`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><b>Missing #include &lt;stdio.h&gt;:</b> Causes compiler warnings regarding implicit declaration of <code>printf</code> or <code>scanf</code>.</li>
          <li><b>Forgetting Semicolon:</b> Statements in C must terminate with a semicolon (<code>;</code>).</li>
          <li><b>Forgetting return 0:</b> Returning 0 explicitly informs the operating system that execution succeeded.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400">
          🤔 Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          What happens when you run <code>gcc -Wall -Wextra main.c</code> on Linux vs Windows? Why does standard ANSI C code run seamlessly across all major operating systems?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_001 Topic 0 FAQs" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_001_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always inspect intermediate preprocessor output using gcc -E when learning macro behavior. It gives total transparency into how C code transforms before compilation! — Sukanta Hui" />
      </section>
    </div>
  );
}
