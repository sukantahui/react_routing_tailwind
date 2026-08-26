import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import errorsDemoCode from "./topic15_files/CompilationErrorsDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
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
            Module 001_001 · Topic 15
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Compiler Diagnostics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Common Beginner Compilation Errors & Diagnostics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnose and resolve the most common <code className="text-amber-300">javac</code> compiler errors: <code className="text-rose-400">cannot find symbol</code>, <code className="text-rose-400">incompatible types</code>, <code className="text-rose-400">non-static variable in static context</code>, and <code className="text-rose-400">variable might not have been initialized</code>.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🛡️</span> The Compiler as Your Safety Net
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Compilation errors occur before any bytecode is emitted. Every error raised by <code className="text-amber-300">javac</code> is a guaranteed runtime crash prevented before your code ever reaches production.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300">
            <p className="font-medium text-rose-300 mb-1">Classroom Scenario (Barrackpore Lab):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Debangshu</strong> in Barrackpore declared an instance variable <code className="text-amber-300">int balance = 100;</code> and tried to print it directly inside <code className="text-amber-300">public static void main</code>, <code className="text-amber-300">javac</code> threw <code className="text-rose-400">non-static variable balance cannot be referenced from a static context</code>. Once he instantiated his class with <code className="text-emerald-300">new BankingApp().balance</code>, the program ran flawlessly!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🔍</span> Top 4 Compiler Errors Diagnostic Map
        </h2>
        <p className="text-sm text-slate-400">
          Learn how to recognize the error signature and apply the exact fix immediately:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 320"
            className="w-full h-auto"
            aria-label="Common Compilation Errors Diagnostic Diagram"
          >
            {/* Error 1: cannot find symbol */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="25" y="30" width="195" height="260" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
              <rect x="35" y="45" width="175" height="35" rx="6" fill="#881337" />
              <text x="122" y="68" textAnchor="middle" fill="#fecdd3" fontWeight="bold" fontSize="12">
                cannot find symbol
              </text>
              <text x="122" y="105" textAnchor="middle" fill="#fb7185" fontWeight="bold" fontSize="11">
                Cause:
              </text>
              <text x="122" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Typo in variable name
              </text>
              <text x="122" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Missing import
              </text>
              <text x="122" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Variable out of scope
              </text>
              <rect x="35" y="210" width="175" height="60" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="122" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Fix:
              </text>
              <text x="122" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Check spelling & imports
              </text>
            </g>

            {/* Error 2: incompatible types */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="235" y="30" width="195" height="260" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <rect x="245" y="45" width="175" height="35" rx="6" fill="#78350f" />
              <text x="332" y="68" textAnchor="middle" fill="#fef3c7" fontWeight="bold" fontSize="12">
                incompatible types
              </text>
              <text x="332" y="105" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="11">
                Cause:
              </text>
              <text x="332" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • double assigned to int
              </text>
              <text x="332" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Type mismatch
              </text>
              <text x="332" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Missing type cast
              </text>
              <rect x="245" y="210" width="175" height="60" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="332" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Fix:
              </text>
              <text x="332" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Add explicit cast (int)
              </text>
            </g>

            {/* Error 3: non-static in static context */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="445" y="30" width="195" height="260" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <rect x="455" y="45" width="175" height="35" rx="6" fill="#581c87" />
              <text x="542" y="68" textAnchor="middle" fill="#f3e8ff" fontWeight="bold" fontSize="11">
                non-static context
              </text>
              <text x="542" y="105" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="11">
                Cause:
              </text>
              <text x="542" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Calling instance field
              </text>
              <text x="542" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • directly from main()
              </text>
              <text x="542" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • No object instance
              </text>
              <rect x="455" y="210" width="175" height="60" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="542" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Fix:
              </text>
              <text x="542" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Create new Object() instance
              </text>
            </g>

            {/* Error 4: uninitialized variable */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="655" y="30" width="195" height="260" rx="10" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
              <rect x="665" y="45" width="175" height="35" rx="6" fill="#164e63" />
              <text x="752" y="68" textAnchor="middle" fill="#cffafe" fontWeight="bold" fontSize="11">
                uninitialized variable
              </text>
              <text x="752" y="105" textAnchor="middle" fill="#22d3ee" fontWeight="bold" fontSize="11">
                Cause:
              </text>
              <text x="752" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Local var in if-block
              </text>
              <text x="752" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Definite Assignment
              </text>
              <text x="752" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • No default values
              </text>
              <rect x="665" y="210" width="175" height="60" rx="6" fill="#0f172a" stroke="#22c55e" />
              <text x="752" y="235" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="10">
                Fix:
              </text>
              <text x="752" y="255" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                Initialize with int x = 0;
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Golden Rules */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📋</span> The Golden Rules of Debugging Compiler Errors
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-sky-400 text-base mb-1">Rule 1: Always Fix Error #1 First</h3>
            <p>
              When <code className="text-amber-300">javac</code> spits out 15 errors, do not panic! In 90% of cases, the compiler got confused by a single missing curly brace or wrong import on line 5. Fixing the very first error at the top often clears all 14 cascading phantom errors immediately!
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
            Example: Diagnostic Demonstration of Common Compilation Fixes
          </h3>
          <JavaFileLoader
            fileModule={errorsDemoCode}
            title="CompilationErrorsDemo.java"
            highlightLines={[10, 11, 14, 15, 18, 26, 27, 28, 29, 30]}
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
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Missing Return Statement in If-Else Blocks</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If a non-void method returns values inside <code className="text-amber-300">if</code> and <code className="text-amber-300">else if</code> without a final fallback <code className="text-emerald-300">else</code> or default return at the bottom, <code className="text-rose-400">javac</code> rejects the code.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Pay Attention to Line Numbers</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The compiler output <code className="text-emerald-300 font-mono">App.java:24: error: cannot find symbol</code> gives the exact file and line number (line 24) where the problem is located.
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
            🤔 <em>“Why does `javac` refuse to compile code containing an unreachable statement (like a line right after an unconditional `return`), rather than just ignoring it?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Unreachable code is almost always a serious developer logic mistake or unintended bug—the compiler enforces clean control flow!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Common Beginner Compilation Errors FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 15: Common Compilation Errors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic15_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Do not fear compiler errors—embrace them. Each compiler error is a free mentor pointing directly to a flaw in your syntax, typing, or scoping before your application ever reaches users. When you learn to read compiler diagnostics with ease, your debugging speed multiplies tenfold. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
