import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pipelineDemoCode from "./topic7_files/CompilationPipelineDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_001 · Topic 7
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Compiler Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Java Source (.java) to Bytecode (.class) Compilation Pipeline
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace the internal compilation stages of <code className="text-amber-300">javac</code>: Lexical Tokenization, Abstract Syntax Tree (AST) Parsing, Semantic Type Analysis, Syntactic Desugaring, and Binary Bytecode Generation.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>⚡</span> What Happens When You Run `javac`?
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When you invoke <code className="text-amber-300">javac HelloWorld.java</code>, the compiler does not produce native machine code. Instead, it executes a rigorous 5-phase pipeline to translate human syntax into standard JVM Bytecode.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300">
            <p className="font-medium text-amber-300 mb-1">Classroom Scenario (Shyamnagar Lab):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Tuhina</strong> writes an enhanced for-each loop (<code className="text-emerald-300">for(String name : list)</code>), we used the <code className="text-amber-300">javap -c</code> disassembler in our Shyamnagar lab to show how <code className="text-amber-300">javac</code> silently "desugared" her loop into an explicit <code className="text-amber-300">Iterator</code> loop under the hood!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Pipeline */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🔄</span> The 5 Stages of the `javac` Compilation Pipeline
        </h2>
        <p className="text-sm text-slate-400">
          Follow the step-by-step transformation from raw source text to bytecode:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="javac 5-Stage Compilation Pipeline Diagram"
          >
            {/* Stage 1: Lexical Analysis */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="20" y="80" width="145" height="110" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="92" y="110" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="13">
                1. Lexical Analysis
              </text>
              <text x="92" y="130" textAnchor="middle" fill="#ffffff" fontSize="11">
                (Scanner)
              </text>
              <text x="92" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Source Characters
              </text>
              <text x="92" y="168" textAnchor="middle" fill="#94a3b8" fontSize="10">
                → Token Stream
              </text>
            </g>

            {/* Arrow 1 */}
            <path d="M 165 135 L 195 135" stroke="#38bdf8" strokeWidth="2" />

            {/* Stage 2: Syntax Analysis */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="195" y="80" width="145" height="110" rx="10" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="267" y="110" textAnchor="middle" fill="#818cf8" fontWeight="bold" fontSize="13">
                2. Syntax Analysis
              </text>
              <text x="267" y="130" textAnchor="middle" fill="#ffffff" fontSize="11">
                (Parser)
              </text>
              <text x="267" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Grammar Validation
              </text>
              <text x="267" y="168" textAnchor="middle" fill="#94a3b8" fontSize="10">
                → Builds AST Tree
              </text>
            </g>

            {/* Arrow 2 */}
            <path d="M 340 135 L 370 135" stroke="#818cf8" strokeWidth="2" />

            {/* Stage 3: Semantic Analysis */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="370" y="80" width="145" height="110" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
              <text x="442" y="110" textAnchor="middle" fill="#22c55e" fontWeight="bold" fontSize="13">
                3. Semantic Analysis
              </text>
              <text x="442" y="130" textAnchor="middle" fill="#ffffff" fontSize="11">
                (Type Checking)
              </text>
              <text x="442" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Symbol Table
              </text>
              <text x="442" y="168" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Definite Assignment
              </text>
            </g>

            {/* Arrow 3 */}
            <path d="M 515 135 L 545 135" stroke="#22c55e" strokeWidth="2" />

            {/* Stage 4: Desugaring */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="545" y="80" width="145" height="110" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="617" y="110" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="13">
                4. Desugaring
              </text>
              <text x="617" y="130" textAnchor="middle" fill="#ffffff" fontSize="11">
                (Lowering)
              </text>
              <text x="617" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Unwraps Generics
              </text>
              <text x="617" y="168" textAnchor="middle" fill="#94a3b8" fontSize="10">
                For-each & Autobox
              </text>
            </g>

            {/* Arrow 4 */}
            <path d="M 690 135 L 720 135" stroke="#f59e0b" strokeWidth="2" />

            {/* Stage 5: Bytecode Gen */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="720" y="80" width="145" height="110" rx="10" fill="#78350f" stroke="#f97316" strokeWidth="2" />
              <text x="792" y="110" textAnchor="middle" fill="#fdba74" fontWeight="bold" fontSize="13">
                5. Code Gen
              </text>
              <text x="792" y="130" textAnchor="middle" fill="#ffffff" fontSize="11">
                (.class Output)
              </text>
              <text x="792" y="152" textAnchor="middle" fill="#fed7aa" fontSize="10">
                0xCAFEBABE
              </text>
              <text x="792" y="168" textAnchor="middle" fill="#fed7aa" fontSize="10">
                Constant Pool Table
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔬</span> What is Inside a Compiled `.class` File?
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-sky-400 text-lg mb-1">1. The Constant Pool Table</h3>
            <p>
              The <strong>Constant Pool</strong> is the central lookup table of the class file. Every string literal, class name, method name, field signature, and numeric constant is given a unique index (e.g. <code className="text-amber-300">#1 = Methodref</code>, <code className="text-amber-300">#2 = String</code>). Bytecode instructions reference these indices instead of storing full text strings.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">2. Disassembling Bytecode with `javap`</h3>
            <p>
              You can inspect the exact bytecode emitted by <code className="text-amber-300">javac</code> using the built-in disassembler:
              <br />
              <code className="text-emerald-300 font-mono text-xs md:text-sm block mt-2 p-2 bg-slate-950 rounded">
                javap -c -p HelloWorld.class
              </code>
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Simulating Compiler Phases in Java
          </h3>
          <JavaFileLoader
            fileModule={pipelineDemoCode}
            title="CompilationPipelineDemo.java"
            highlightLines={[8, 9, 10, 11, 12, 13, 14, 17]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Variable Might Not Have Been Initialized Error</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              During Semantic Analysis, <code className="text-amber-300">javac</code> enforces <strong>Definite Assignment</strong> on local variables. If an execution path exists where a local variable is read before being assigned, <code className="text-rose-400">javac</code> rejects the program with a compile-time error.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Inspect Bytecode When Tuning Performance</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When writing high-frequency code, disassemble your methods with <code className="text-emerald-300">javap -c</code> to verify that unintended autoboxing or object allocation isn't hiding inside your loops.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Hints & Thinking Guidance */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Why does `javac` erase generic types like `List&lt;String&gt;` into raw `List` during compilation, rather than creating specialized classes at runtime?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about 100% backward compatibility with legacy Java 1.4 bytecode compiled before Generics existed in 2004!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Compilation Pipeline (.java to .class) FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 7: Compilation Process"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic7_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Remember: The compiler is your best friend. Every error javac raises is a bug prevented from crashing in front of your end-users. Treat compiler warnings with respect, use 'javap' to see the real bytecode behind modern syntax sugar, and strive for deep mechanical sympathy. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
