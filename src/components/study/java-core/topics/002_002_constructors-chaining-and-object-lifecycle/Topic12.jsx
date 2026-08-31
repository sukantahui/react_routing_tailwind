import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sibVsIibDemoCode from "./topic12_files/SIBvsIIBExecutionHierarchyDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
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
            Module 002_002 · Topic 12
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Initialization Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Static Initialization Blocks (SIB) vs Instance Initialization Blocks (IIB)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Demystify class-level vs instance-level lifecycle execution. Understand when the ClassLoader fires SIBs once into Metaspace and how IIBs execute on every Heap object birth.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Class vs Instance Genesis Divide
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java divides initialization into two distinct lifecycle planes: <strong>Static Blocks (SIB)</strong> run once per class loading, while <strong>Instance Blocks (IIB)</strong> run once per object instantiation.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300 space-y-2">
            <p className="font-medium text-indigo-300">Barrackpore Hub Campus vs Workstation Analogy:</p>
            <p className="text-sm leading-relaxed">
              Setting up the central database and building the Barrackpore center happens <strong>once</strong> (SIB). Powering on individual trainee terminals for Swadeep, Tuhina, and Abhronila happens <strong>on every session</strong> (IIB)!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Complete JVM Hierarchy Order (Parent to Child)
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 220" className="w-full h-auto">
            <rect x="30" y="30" width="260" height="160" rx="8" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
            <text x="160" y="55" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">1. STATIC LOADING (ONCE)</text>
            <rect x="45" y="75" width="230" height="45" rx="4" fill="#1e1b4b" />
            <text x="55" y="100" fill="#c7d2fe" fontSize="9" fontFamily="monospace">Parent SIB → Child SIB</text>
            <text x="160" y="150" fill="#94a3b8" fontSize="8" textAnchor="middle">Class Loaded in Metaspace</text>

            <path d="M 300 110 L 350 110" stroke="#818cf8" strokeWidth="2" />

            <rect x="360" y="30" width="260" height="160" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="490" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. PARENT INSTANCE</text>
            <rect x="375" y="75" width="230" height="45" rx="4" fill="#0c4a6e" />
            <text x="385" y="100" fill="#bae6fd" fontSize="9" fontFamily="monospace">Parent IIB → Parent Const</text>
            <text x="490" y="150" fill="#94a3b8" fontSize="8" textAnchor="middle">Base Object Constructed</text>

            <path d="M 630 110 L 680 110" stroke="#818cf8" strokeWidth="2" />

            <rect x="690" y="30" width="210" height="160" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="795" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. CHILD INSTANCE</text>
            <rect x="700" y="75" width="190" height="45" rx="4" fill="#064e3b" />
            <text x="710" y="100" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Child IIB → Child Const</text>
            <text x="795" y="150" fill="#94a3b8" fontSize="8" textAnchor="middle">Child Object Ready</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sibVsIibDemoCode}
          title="SIBvsIIBExecutionHierarchyDemo.java"
          highlightLines={[16, 26, 33, 45, 48, 51]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="SIB vs IIB FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 12: SIB vs IIB"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic12_sib_vs_iib_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Remember: SIB runs once at class loading, IIB runs on every new object creation. If it's class configuration, use static; if it's per-trainee preparation, use instance! — Sukanta Hui"
      />
    </div>
  );
}