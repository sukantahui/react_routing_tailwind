import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mcqDemoCode from "./topic11_files/Segment1ComprehensiveMCQExamDemo.java?raw";
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
          @keyframes glowExam {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ex {
            animation: glowExam 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone Evaluation · Segment 1 Synthesis
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Segment 1 Comprehensive Multiple Choice Question (MCQ) Exam
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Comprehensive synthesis and evaluation across all 7 foundational pillars in Java Core (Modules 001_001 through 001_007): assessing JVM architecture, datatypes, operators, switch expressions, loops, arrays, methods, and recursion with automated grading and merit awards in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Segment 1 Comprehensive Knowledge Domain Map
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The Segment 1 Comprehensive Exam assesses conceptual rigor, memory tracing, and problem-solving readiness across 7 core modules:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">JVM &amp; Types</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Stack vs Heap, 8 primitives, literals, widening promotions &amp; narrowing casts.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">Control Flow</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                if-else decision ladders, Java 14+ switch expressions with arrow syntax.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">Loops &amp; Arrays</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                for, while, do-while, 1D &amp; 2D matrices, ragged bounds, and in-place mutations.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">Methods &amp; Stack</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Pass-by-value, overloading, varargs, Call Stack frames, and recursion base cases.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Assessment Results):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore capstone exam, <strong>Swadeep</strong> and <strong>Tuhina</strong> scored <code className="text-emerald-400 font-semibold">100.0% (Grade A → ₹5,000 award)</code>, while <strong>Debangshu</strong> scored <code className="text-sky-300 font-semibold">85.7% (Grade B → ₹2,500 award)</code>, demonstrating complete foundational readiness for Object-Oriented Programming (Segment 2)!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Segment 1 Mastery Synthesis &amp; Automated Exam Engine
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the 7 foundational pillars evaluated by the automated testing engine:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Segment 1 Comprehensive Exam Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradExamLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradExamRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: The 7 Pillars Synthesis */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. THE 7 FOUNDATION PILLARS (001_001..007)</text>

            <rect x="45" y="70" width="360" height="30" rx="4" fill="#082f49" />
            <text x="55" y="90" fill="#bae6fd" fontSize="10" fontFamily="monospace">Pillars 1 &amp; 2: JVM Memory Area + 8 Primitive Types</text>

            <rect x="45" y="105" width="360" height="30" rx="4" fill="#082f49" />
            <text x="55" y="125" fill="#bae6fd" fontSize="10" fontFamily="monospace">Pillars 3 &amp; 4: Type Casting + Switch Expressions</text>

            <rect x="45" y="140" width="360" height="30" rx="4" fill="#082f49" />
            <text x="55" y="160" fill="#bae6fd" fontSize="10" fontFamily="monospace">Pillars 5 &amp; 6: Loops + 1D/2D Ragged Matrix Arrays</text>

            <rect x="45" y="175" width="360" height="30" rx="4" fill="#082f49" />
            <text x="55" y="195" fill="#bae6fd" fontSize="10" fontFamily="monospace">Pillar 7     : Pass-by-Value + Call Stack Recursion</text>

            {/* Right Panel: Student Exam Score Distribution */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. AUTOMATED EXAM EVALUATION RESULTS</text>

            <rect x="465" y="70" width="370" height="40" rx="4" fill="#022c22" />
            <text x="475" y="90" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">Swadeep   : 7/7 (100.0%) | Grade A | ₹5,000 Award</text>
            <text x="475" y="102" fill="#6ee7b7" fontSize="9">Perfect score across all 7 module domains</text>

            <rect x="465" y="120" width="370" height="40" rx="4" fill="#022c22" />
            <text x="475" y="140" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">Tuhina    : 7/7 (100.0%) | Grade A | ₹5,000 Award</text>
            <text x="475" y="152" fill="#6ee7b7" fontSize="9">Perfect score across all 7 module domains</text>

            <rect x="465" y="170" width="370" height="40" rx="4" fill="#082f49" />
            <text x="475" y="190" fill="#bae6fd" fontSize="10" fontFamily="monospace" fontWeight="bold">Debangshu : 6/7 (85.7%)  | Grade B | ₹2,500 Award</text>
            <text x="475" y="202" fill="#7dd3fc" fontSize="9">Qualified for Segment 2 OOP advancement</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              The Segment 1 MCQ exam verifies comprehensive mastery of all foundational Java Core concepts.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Segment 1 Modules Evaluated &amp; Core Invariants
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Module Evaluated</th>
                <th className="p-3 font-semibold text-emerald-400">Core Tested Concept</th>
                <th className="p-3 font-semibold text-purple-400">Key Syntax Invariant</th>
                <th className="p-3 font-semibold text-amber-400">Common Exam Trap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_001 JVM Architecture</td>
                <td className="p-3 text-slate-300 font-sans">Memory Allocation</td>
                <td className="p-3 text-slate-300">Stack (Frames) vs Heap (Objects)</td>
                <td className="p-3 text-rose-400 font-sans">Thinking local primitives live on Heap</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_002 Types &amp; Variables</td>
                <td className="p-3 text-slate-300 font-sans">Definite Assignment</td>
                <td className="p-3 text-slate-300">8 Primitives (`int` = 32 bits)</td>
                <td className="p-3 text-rose-400 font-sans">Assuming local variables have default values</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_003 Operators &amp; Casting</td>
                <td className="p-3 text-slate-300 font-sans">Narrowing Cast</td>
                <td className="p-3 text-slate-300">`(int) 7.9 = 7` (Truncation)</td>
                <td className="p-3 text-rose-400 font-sans">Expecting `(int) 7.9` to round to 8</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_004 Decision Making</td>
                <td className="p-3 text-slate-300 font-sans">Switch Expressions</td>
                <td className="p-3 text-slate-300">`case 1 -&gt; "A"` (No fall-through)</td>
                <td className="p-3 text-rose-400 font-sans">Missing breaks in legacy switch</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_005 Loops &amp; Jumps</td>
                <td className="p-3 text-slate-300 font-sans">do-while Guarantees</td>
                <td className="p-3 text-slate-300">Executes &ge; 1 time</td>
                <td className="p-3 text-rose-400 font-sans">Off-by-one loop boundaries</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_006 Arrays in Java</td>
                <td className="p-3 text-slate-300 font-sans">Default Initializations</td>
                <td className="p-3 text-slate-300">`boolean[]` defaults to `false`</td>
                <td className="p-3 text-rose-400 font-sans">ArrayIndexOutOfBoundsException</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_007 Methods &amp; Recursion</td>
                <td className="p-3 text-slate-300 font-sans">Pass-by-Value</td>
                <td className="p-3 text-slate-300">Base Case + Inductive Step</td>
                <td className="p-3 text-rose-400 font-sans">Believing Java is pass-by-reference</td>
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
            Segment1ComprehensiveMCQExamDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program compiles and executes the automated exam evaluation and merit billing engine.
        </p>

        <JavaFileLoader
          fileModule={mcqDemoCode}
          title="Segment1ComprehensiveMCQExamDemo.java"
          highlightLines={[16, 25, 36, 41, 46, 51, 56, 61, 71, 80, 95]}
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
              <span>❌</span> Pitfall 1: Confusing Pass-by-Value with Pass-by-Reference
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Java is strictly Pass-by-Value. When passing an object, Java copies the reference address value into the method frame; reassigning the parameter variable (<code className="text-rose-300 font-mono">obj = new Object();</code>) does NOT alter the caller&apos;s original object reference.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Build Solid Memory Tracing Habits
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always trace Stack frames (local variables, return addresses) and Heap allocations (objects, arrays) on paper when reasoning about Java execution.
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
            🤔 <em>&ldquo;How does Segment 1 directly pave the path for Object-Oriented Programming (OOP)?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The Mechanics of State &amp; Behavior! In Segment 1, you mastered primitive data types (state) and methods (behavior). In Segment 2 OOP, you will encapsulate state and behavior together into Classes, Objects, and Polymorphic Hierarchies!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Segment 1 Comprehensive Exam FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 11: Segment 1 Comprehensive MCQ Exam"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic11_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Congratulations on mastering the 7 foundational pillars of Java Core! In Topic 12, we conclude Segment 1 with our final challenge: The Segment 1 Timed Coding Assessment! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
