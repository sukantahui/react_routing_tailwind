import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import traceDemoCode from "./topic11_files/NestedLoopIterationTraceTableDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowTrace {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-tr {
            animation: glowTrace 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 11
          </span>
          <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Dry Running Nested Loops Using Iteration Trace Tables
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master manual algorithmic verification: step-by-step state transition tracking, inner loop reset verification, off-by-one boundary validation, and triangular tuition discount matrices in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Science of Manual Dry Running
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An <strong>Iteration Trace Table</strong> (Dry Run Table) is a formal tabular model that records the exact values of all variables, boolean conditions, and output streams at every discrete clock step of loop execution:
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs md:text-sm text-sky-300 space-y-1">
            <p>+------+-------+----------+-------+----------+--------------------+----------------+</p>
            <p>| Step | Outer |  i &lt;= 3  | Inner |  j &lt;= i  |  Action / Value    | Printed Output |</p>
            <p>+------+-------+----------+-------+----------+--------------------+----------------+</p>
            <p>|    1 |  i=1  | true     |  j=1  | true     | Term: 1 (Sum:  1)  | 1*1=1          |</p>
            <p>|    2 |  i=2  | true     |  j=1  | true     | Term: 2 (Sum:  3)  | 2*1=2          |</p>
            <p>|    3 |  i=2  | true     |  j=2  | true     | Term: 4 (Sum:  7)  | 2*2=4          |</p>
            <p>|    4 |  i=3  | true     |  j=1  | true     | Term: 3 (Sum: 10)  | 3*1=3          |</p>
            <p>|    5 |  i=3  | true     |  j=2  | true     | Term: 6 (Sum: 16)  | 3*2=6          |</p>
            <p>|    6 |  i=3  | true     |  j=3  | true     | Term: 9 (Sum: 25)  | 3*3=9          |</p>
            <p>+------+-------+----------+-------+----------+--------------------+----------------+</p>
          </div>
          <p>
            <strong>The Inner Loop Reset:</strong> Notice how in Steps 2 and 4, as outer <code className="text-sky-300 font-mono">i</code> advances, inner <code className="text-emerald-300 font-mono">j</code> completely <strong>resets back to 1</strong>. This visual proof eliminates all mystery from nested loops!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-teal-500 text-slate-300 space-y-2">
            <p className="font-medium text-teal-300">Classroom Case Study (Barrackpore Discount Multiplier Verification):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> drafted trace tables on paper for a triangular tuition fee discount formula in Indian Rupees (<code className="text-emerald-400 font-semibold">₹1,000 to ₹9,000</code>). By manually validating all 6 clock steps with <strong>Abhronila</strong> and <strong>Debangshu</strong>, they eliminated all off-by-one errors before typing a single line of code across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Iteration Trace Table Execution Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How manual trace tables systematically verify state transitions and output correctness:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Iteration Trace Table Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradTrace1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradTrace2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradTrace3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Outer Step & Condition */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradTrace1)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Outer Loop State</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">i = 1 &rarr; i &lt;= 3 (TRUE)</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">i = 2 &rarr; i &lt;= 3 (TRUE)</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">i = 4 &rarr; 4 &lt;= 3 (FALSE - Halt!)</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Outer Boundary Gate
            </text>

            {/* Box 2: Inner Loop Lifecycle */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradTrace2)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Inner Loop Reset &amp; Run</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">j resets to 1 on every i step</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Runs while: j &lt;= i</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Steps: 1 + 2 + 3 = 6 total</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Inner Triangular Reset
            </text>

            {/* Box 3: Verification & Output */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradTrace3)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Output Verification</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">Row 1: [₹1,000]</text>
            <text x="615" y="122" fill="#fde68a" fontSize="11" fontFamily="monospace">Row 2: [₹2,000] [₹4,000]</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Row 3: [₹3,000]..[₹9,000]</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              100% Bug-Free Output
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Trace Table Methodology: Record discrete clock states to prove algorithmic correctness before coding.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Standard Iteration Trace Table Blueprint
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Step #</th>
                <th className="p-3 font-semibold text-sky-300">Outer `i`</th>
                <th className="p-3 font-semibold text-emerald-400">`i &lt;= 3`</th>
                <th className="p-3 font-semibold text-amber-400">Inner `j`</th>
                <th className="p-3 font-semibold text-emerald-400">`j &lt;= i`</th>
                <th className="p-3 font-semibold text-purple-400">Printed Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-slate-400">1</td>
                <td className="p-3 text-sky-300">1</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-amber-300">1</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-purple-300">₹1,000</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-slate-400">2</td>
                <td className="p-3 text-sky-300">2</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-amber-300">1 (Reset!)</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-purple-300">₹2,000</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-slate-400">3</td>
                <td className="p-3 text-sky-300">2</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-amber-300">2</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-purple-300">₹4,000</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-slate-400">4</td>
                <td className="p-3 text-sky-300">3</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-amber-300">1 (Reset!)</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-purple-300">₹3,000</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-slate-400">5</td>
                <td className="p-3 text-sky-300">3</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-amber-300">2</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-purple-300">₹6,000</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-slate-400">6</td>
                <td className="p-3 text-sky-300">3</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-amber-300">3</td>
                <td className="p-3 text-emerald-400">true</td>
                <td className="p-3 text-purple-300">₹9,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            NestedLoopIterationTraceTableDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program automatically prints a formatted console trace table and renders its corresponding 2D matrix in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={traceDemoCode}
          title="NestedLoopIterationTraceTableDemo.java"
          highlightLines={[27, 28, 29, 32, 33]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Relying on Mental Arithmetic During Dry Runs
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Attempting to track 2 or 3 loop variables mentally inevitably leads to lost state and skipped boundary checks. Always write down every variable mutation row-by-row on paper!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Small Sample Inputs ($N=3$) for Whiteboard Tracing
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Choosing <code className="text-emerald-400 font-mono">N=3</code> generates enough steps (6 to 9 rows) to expose patterns and boundary transitions without causing calculation fatigue.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;How does a trace table prove that a triangular pattern runs in $O(N^2)$ time?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Summation Arithmetic! Counting the rows of a triangular trace table gives <code className="text-emerald-300 font-mono">1 + 2 + 3 + ... + N = N(N + 1) / 2 = (N^2 + N) / 2</code>. In asymptotic analysis, dropping the lower-order terms and constants leaves <code className="text-sky-400 font-bold">O(N^2)</code> quadratic time!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Iteration Trace Tables FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 11: Nested Loop Iteration Trace Tables"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic11_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: When in doubt, trace it out! Drawing a 4-column trace table on paper turns confusing nested loops into a transparent, step-by-step reality. In Topic 12, we begin jump statements with the 'break' statement! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
