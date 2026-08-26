import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chainingThisDemoCode from "./topic7_files/ConstructorChainingThisDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
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
            Module 002_002 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            DRY Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Constructor Chaining Within Same Class Using <code className="text-sky-400 font-mono">this()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Eliminate code duplication and enforce bulletproof domain invariants by chaining overloaded constructors into a single master constructor using the <code className="text-sky-300 font-mono">this()</code> delegation protocol.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Master Constructor Architecture
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When building overloaded constructors, duplicating field assignments and validation checks across every constructor creates maintenance nightmares. <strong>Constructor Chaining</strong> solves this by allowing one constructor to invoke another using <code className="text-sky-300 font-mono">this(...)</code>.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Barrackpore Admission Relay Story:</p>
            <p className="text-sm leading-relaxed">
              When <strong>Debangshu</strong>, <strong>Tuhina</strong>, and <strong>Swadeep</strong> register with different levels of information, each constructor delegates downward until reaching the <strong>Master Constructor</strong>, which validates all fields and stamps the record in memory once!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Constructor Delegation Pipeline
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 220" className="w-full h-auto">
            <rect x="30" y="30" width="180" height="150" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="120" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1-Arg Constructor</text>
            <text x="120" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Student(roll)</text>
            <rect x="40" y="100" width="160" height="60" rx="6" fill="#1e293b" />
            <text x="50" y="130" fill="#fde047" fontSize="10" fontFamily="monospace">this(roll, &quot;Trainee&quot;);</text>

            <path d="M 210 105 L 260 105" stroke="#38bdf8" strokeWidth="2" />

            <rect x="260" y="30" width="200" height="150" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="360" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">2-Arg Constructor</text>
            <text x="360" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Student(roll, name)</text>
            <rect x="270" y="100" width="180" height="60" rx="6" fill="#1e293b" />
            <text x="280" y="130" fill="#fde047" fontSize="10" fontFamily="monospace">this(roll, name, &quot;Hub&quot;);</text>

            <path d="M 460 105 L 510 105" stroke="#38bdf8" strokeWidth="2" />

            <rect x="510" y="30" width="380" height="150" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="700" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">MASTER CONSTRUCTOR (5-Arg)</text>
            <text x="700" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Performs ALL validation &amp; field assignments</text>
            <rect x="525" y="100" width="350" height="60" rx="6" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
            <text x="540" y="125" fill="#a7f3d0" fontSize="10" fontFamily="monospace">super(); // Initialized parent</text>
            <text x="540" y="145" fill="#a7f3d0" fontSize="10" fontFamily="monospace">validate(); this.roll = roll; this.name = name; ...</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chainingThisDemoCode}
          title="ConstructorChainingThisDemo.java"
          highlightLines={[19, 25, 31, 37, 56, 60, 64]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Constructor Chaining this() FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 7: Constructor Chaining with this()"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic7_constructor_chaining_this_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Master the relay: Write one strong Master Constructor with all validations, and let all overloaded constructors delegate to it with defaults. Your code will be clean, robust, and easy to maintain! — Sukanta Hui"
      />
    </div>
  );
}