import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compilerOmissionDemoCode from "./topic4_files/CompilerNoArgOmissionRulesDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Compiler Omission Rules
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          When Does the Compiler NOT Generate a Default Constructor?
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the precise conditions under which javac permanently suppresses default constructor generation, why this design protects domain invariants, and how it impacts subclass constructor chaining.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>🚫</span> The Golden Rule of Constructor Omission
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, the default constructor is a <strong>fallback mechanism</strong> provided only when a class has no explicit constructors. As soon as you declare <em>any</em> constructor—regardless of access modifier or parameter count—the compiler ceases default generation.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (The Missing No-Arg Trap in Barrackpore):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Tuhina Das</strong> added <code className="text-sky-300 font-mono">public EnrolledStudent(int roll, String name)</code> to her class, all older code calling <code className="text-rose-300 font-mono">new EnrolledStudent()</code> immediately failed with compile errors! The compiler revoked the default constructor because an explicit constructor was provided.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Flow */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Compiler Decision Flowchart
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 260" className="w-full h-auto">
            <rect x="30" y="30" width="260" height="200" rx="10" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <text x="160" y="60" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">SCENARIO A: ZERO CONSTRUCTORS</text>
            <rect x="50" y="85" width="220" height="60" rx="6" fill="#1e293b" />
            <text x="60" y="110" fill="#94a3b8" fontSize="10" fontFamily="monospace">class Student {'{'}</text>
            <text x="75" y="130" fill="#94a3b8" fontSize="10" fontFamily="monospace">// zero constructors</text>
            <text x="60" y="140" fill="#94a3b8" fontSize="10" fontFamily="monospace">{'}'}</text>
            <rect x="50" y="160" width="220" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="160" y="190" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">✔ Compiler Generates Default</text>

            <rect x="330" y="30" width="560" height="200" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="610" y="60" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">SCENARIO B: EXPLICIT CONSTRUCTOR DEFINED</text>
            <rect x="350" y="85" width="520" height="60" rx="6" fill="#1e293b" />
            <text x="360" y="110" fill="#94a3b8" fontSize="10" fontFamily="monospace">class Student {'{'}</text>
            <text x="375" y="130" fill="#fde047" fontSize="10" fontFamily="monospace">Student(String name) {'{ ... }'} // Explicit constructor</text>
            <text x="360" y="140" fill="#94a3b8" fontSize="10" fontFamily="monospace">{'}'}</text>
            <rect x="350" y="160" width="520" height="50" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="610" y="190" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">✖ Compiler SUPPRESSES Default Constructor (new Student() FAILS)</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={compilerOmissionDemoCode}
          title="CompilerNoArgOmissionRulesDemo.java"
          highlightLines={[16, 31, 35]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Compiler Omission Rules FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 4: Compiler Omission Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic4_compiler_omission_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Remember: 'You write one, you lose the free default.' If your classes will be used by frameworks like Spring or Hibernate, always explicitly write a no-arg constructor alongside your parameterized ones! — Sukanta Hui"
      />
    </div>
  );
}