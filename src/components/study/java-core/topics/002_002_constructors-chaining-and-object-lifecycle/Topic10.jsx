import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import iibBasicsDemoCode from "./topic10_files/InstanceInitBlockBasicsDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
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
            Module 002_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Instance Initialization
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Instance Initialization Blocks (IIB): Syntax, Purpose &amp; Execution Order
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the mechanics of Instance Initialization Blocks <code className="text-amber-300 font-mono">&#123; ... &#125;</code>: how javac inlines them into constructor bytecode, how they execute before constructor bodies, and why they empower anonymous inner classes.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> What is an Instance Initialization Block?
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An <strong>Instance Initialization Block (IIB)</strong> is an unnamed block of code written directly inside a class body without the <code className="text-amber-300 font-mono">static</code> keyword. It executes automatically on every object creation immediately following <code className="text-sky-300 font-mono">super()</code> and before any constructor body executes.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Barrackpore Lab Terminal Security (Analogy):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> or <strong>Tuhina Das</strong> log into any terminal at the Barrackpore center, the IIB automatically generates a cryptographic session UUID and runs security diagnostics before the constructor assigns their seat number!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> IIB Execution Sequence in Object Genesis
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 220" className="w-full h-auto">
            <rect x="30" y="30" width="240" height="160" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="150" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">STEP 1: SUPER CONSTRUCTOR</text>
            <rect x="45" y="85" width="210" height="85" rx="6" fill="#1e293b" />
            <text x="55" y="115" fill="#fde047" fontSize="10" fontFamily="monospace">super();</text>
            <text x="55" y="140" fill="#94a3b8" fontSize="9">Parent class state initialized</text>

            <path d="M 280 110 L 330 110" stroke="#38bdf8" strokeWidth="2" />

            <rect x="340" y="30" width="240" height="160" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="460" y="60" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">STEP 2: IIB EXECUTION</text>
            <rect x="355" y="85" width="210" height="85" rx="6" fill="#451a03" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
            <text x="365" y="115" fill="#fde047" fontSize="10" fontFamily="monospace">&#123; initSecurityToken(); &#125;</text>
            <text x="365" y="140" fill="#fef3c7" fontSize="9">Universal pre-constructor logic</text>

            <path d="M 590 110 L 640 110" stroke="#38bdf8" strokeWidth="2" />

            <rect x="650" y="30" width="240" height="160" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="770" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">STEP 3: CONSTRUCTOR BODY</text>
            <rect x="665" y="85" width="210" height="85" rx="6" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
            <text x="675" y="115" fill="#a7f3d0" fontSize="10" fontFamily="monospace">this.trainee = &quot;Swadeep&quot;;</text>
            <text x="675" y="140" fill="#a7f3d0" fontSize="9">Custom constructor statements</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={iibBasicsDemoCode}
          title="InstanceInitBlockBasicsDemo.java"
          highlightLines={[20, 29, 34, 41, 56, 60]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Instance Initialization Blocks FAQs (20 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 10: Instance Initialization Blocks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic10_iib_basics_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Remember: IIBs execute before the constructor body runs. If you have 5 constructors and need a universal security audit or UUID generated on every creation, put it in an IIB! — Sukanta Hui"
      />
    </div>
  );
}