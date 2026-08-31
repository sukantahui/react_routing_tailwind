import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import executionSequenceDemoCode from "./topic11_files/IIBBeforeConstructorExecutionSequenceDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
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
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 11
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            JVM Execution Lifecycle
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Execution Sequence: IIB Execution Before Constructor Body
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace the exact micro-step execution order of the JVM during object instantiation: from parent constructor dispatch to child IIBs, inline field initializers, and final constructor bodies.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The 7-Step Genesis Order
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When <code className="text-sky-300 font-mono">new TraineeDeveloper(...)</code> is invoked, Java coordinates a strict multi-tier initialization sequence ensuring parent state is established before child state is configured.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Building Construction Analogy (Barrackpore):</p>
            <p className="text-sm leading-relaxed">
              You cannot install furniture on the top floor (Child Constructor) until the foundation and ground floor walls (Parent IIB + Constructor) are solidly cured!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Flow */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Complete Step-by-Step Execution Sequence
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 220" className="w-full h-auto">
            <rect x="20" y="30" width="160" height="150" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="100" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. PARENT IIB</text>
            <text x="100" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">Badge Init</text>

            <path d="M 185 105 L 235 105" stroke="#38bdf8" strokeWidth="2" />

            <rect x="240" y="30" width="160" height="150" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="320" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. PARENT BODY</text>
            <text x="320" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">super() Completes</text>

            <path d="M 405 105 L 455 105" stroke="#38bdf8" strokeWidth="2" />

            <rect x="460" y="30" width="180" height="150" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="550" y="55" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">3. CHILD IIB &amp; FIELDS</text>
            <text x="550" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">Workspace &amp; Hub Init</text>

            <path d="M 645 105 L 695 105" stroke="#38bdf8" strokeWidth="2" />

            <rect x="700" y="30" width="190" height="150" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="795" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. CHILD BODY</text>
            <text x="795" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">Trainee Name &amp; Roll Set</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={executionSequenceDemoCode}
          title="IIBBeforeConstructorExecutionSequenceDemo.java"
          highlightLines={[12, 16, 26, 31, 38, 43, 56]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Execution Sequence FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 11: IIB Execution Sequence"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic11_execution_sequence_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Master the sequence: Parent IIB → Parent Constructor → Child IIB → Child Constructor. Once you visualize this cascade, you will never have a bug with uninitialized fields! — Sukanta Hui"
      />
    </div>
  );
}