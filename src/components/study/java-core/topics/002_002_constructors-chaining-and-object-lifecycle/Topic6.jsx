import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import overloadingDemoCode from "./topic6_files/ConstructorOverloadingPolymorphismDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
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
            Module 002_002 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Polymorphic Instantiation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Constructor Overloading: Multiple Parameter Signatures
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Empower your Java classes with multiple instantiation pathways. Explore compile-time signature resolution, parameter differentiation laws, and how to design clean multi-tier constructor APIs.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> What is Constructor Overloading?
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Constructor Overloading</strong> is the practice of providing multiple constructors in the same class, each distinguished by a unique parameter list (parameter count, data types, or sequence). This allows callers to instantiate objects according to available information.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Barrackpore Hub Course Packages (Analogy):</p>
            <p className="text-sm leading-relaxed">
              When students enroll at Coder &amp; AccoTax, they can choose: <strong>Fast Track</strong> (2 parameters: Code + Subject), <strong>Regional Hub</strong> (3 parameters: Code + Subject + Hub), or <strong>Enterprise Complete</strong> (5 parameters with custom mentor and capacity).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Constructor Overloading Dispatch Matrix
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 240" className="w-full h-auto">
            <rect x="30" y="30" width="260" height="180" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="160" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">OVERLOAD 1 (2-Arg)</text>
            <text x="160" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">CourseBatch(code, subject)</text>
            <rect x="45" y="100" width="230" height="90" rx="6" fill="#1e293b" />
            <text x="55" y="125" fill="#fde047" fontSize="10" fontFamily="monospace">new CourseBatch(</text>
            <text x="70" y="145" fill="#a7f3d0" fontSize="10" fontFamily="monospace">&quot;J1&quot;, &quot;Java Core&quot;</text>
            <text x="55" y="165" fill="#fde047" fontSize="10" fontFamily="monospace">)</text>

            <rect x="330" y="30" width="260" height="180" rx="8" fill="#0f172a" stroke="#9333ea" strokeWidth="2" />
            <text x="460" y="60" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">OVERLOAD 2 (3-Arg)</text>
            <text x="460" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">CourseBatch(code, subj, hub)</text>
            <rect x="345" y="100" width="230" height="90" rx="6" fill="#1e293b" />
            <text x="355" y="125" fill="#fde047" fontSize="10" fontFamily="monospace">new CourseBatch(</text>
            <text x="370" y="145" fill="#a7f3d0" fontSize="10" fontFamily="monospace">&quot;J2&quot;, &quot;Adv Java&quot;, &quot;Naihati&quot;</text>
            <text x="355" y="165" fill="#fde047" fontSize="10" fontFamily="monospace">)</text>

            <rect x="630" y="30" width="260" height="180" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="760" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">OVERLOAD 3 (5-Arg)</text>
            <text x="760" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Complete Custom Config</text>
            <rect x="645" y="100" width="230" height="90" rx="6" fill="#1e293b" />
            <text x="655" y="125" fill="#fde047" fontSize="10" fontFamily="monospace">new CourseBatch(</text>
            <text x="670" y="145" fill="#a7f3d0" fontSize="9" fontFamily="monospace">&quot;J3&quot;, &quot;Spring&quot;, &quot;Sukanta&quot;, ...</text>
            <text x="655" y="165" fill="#fde047" fontSize="10" fontFamily="monospace">)</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={overloadingDemoCode}
          title="ConstructorOverloadingPolymorphismDemo.java"
          highlightLines={[16, 26, 36, 56, 60, 64]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Constructor Overloading FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 6: Constructor Overloading"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic6_constructor_overloading_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Constructor overloading is wonderful for API flexibility, but don't duplicate code! Always chain your overloaded constructors into one master constructor using this(...). We will master that next in Topic 7! — Sukanta Hui"
      />
    </div>
  );
}