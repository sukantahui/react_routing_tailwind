import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import parameterizedDemoCode from "./topic5_files/ParameterizedConstructorStateDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
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
            Module 002_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            State Initialization
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Parameterized Constructors: State Initialization at Object Birth
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to forge robust, invariant-protected Java objects by passing required state parameters directly into constructors, resolving parameter shadowing with <code className="text-sky-300 font-mono">this</code>, and performing defensive validation.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Power of Parameterized Initialization
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong>Parameterized Constructor</strong> accepts one or more arguments during instantiation, enabling caller code to inject initial state directly. This guarantees that an object is born in a complete, valid state without relying on sequential setter calls.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Swadeep &amp; Abhronila Registration):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> and <strong>Abhronila Das</strong> enroll, their records are created with verified Roll Numbers, Hub names (Barrackpore &amp; Shyamnagar), and scholarship percentages in a single atomic step!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Parameterized Constructor Memory Flow
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 240" className="w-full h-auto">
            <rect x="30" y="30" width="300" height="180" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="180" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">CALL SITE (STACK)</text>
            <rect x="50" y="80" width="260" height="110" rx="6" fill="#1e293b" />
            <text x="65" y="105" fill="#fde047" fontSize="10" fontFamily="monospace">new TraineeRecord(</text>
            <text x="80" y="130" fill="#a7f3d0" fontSize="10" fontFamily="monospace">101, &quot;Swadeep&quot;,</text>
            <text x="80" y="155" fill="#a7f3d0" fontSize="10" fontFamily="monospace">&quot;Barrackpore&quot;, 95.0</text>
            <text x="65" y="175" fill="#fde047" fontSize="10" fontFamily="monospace">);</text>

            <path d="M 340 120 L 440 120" stroke="#38bdf8" strokeWidth="2" />
            <text x="390" y="110" fill="#38bdf8" fontSize="10" textAnchor="middle">passes values</text>

            <rect x="450" y="30" width="440" height="180" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="670" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">HEAP MEMORY OBJECT</text>
            <rect x="470" y="80" width="400" height="110" rx="6" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
            <text x="490" y="105" fill="#e0f2fe" fontSize="10" fontFamily="monospace">traineeId: 101</text>
            <text x="490" y="130" fill="#e0f2fe" fontSize="10" fontFamily="monospace">traineeName: &quot;Swadeep Paul&quot;</text>
            <text x="490" y="155" fill="#e0f2fe" fontSize="10" fontFamily="monospace">branchHub: &quot;Barrackpore&quot;</text>
            <text x="490" y="175" fill="#e0f2fe" fontSize="10" fontFamily="monospace">scholarshipPercentage: 95.0</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={parameterizedDemoCode}
          title="ParameterizedConstructorStateDemo.java"
          highlightLines={[18, 25, 41, 45]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Parameterized Constructors FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 5: Parameterized Constructors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic5_parameterized_constructors_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Always validate parameters inside your constructor! Throwing IllegalArgumentException or NullPointerException immediately halts invalid object creation, ensuring your application stays crash-free. — Sukanta Hui"
      />
    </div>
  );
}