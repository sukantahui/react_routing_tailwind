import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import defaultConstructorDemoCode from "./topic3_files/DefaultConstructorMechanicsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
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
            Module 002_002 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Constructor Synthesis
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Default Constructor: Compiler-Generated vs User-Defined No-Arg
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand how the Java compiler automatically synthesizes a default no-argument constructor when none is provided, explore memory zeroing mechanics, and contrast it with developer-authored no-arg constructors.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Automatic Compiler Synthesis
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a Java class contains zero constructor definitions, <code className="text-sky-300 font-mono">javac</code> automatically injects a <strong>default constructor</strong>. This invisible constructor takes zero arguments, has the same access modifier as the class, and simply executes <code className="text-sky-300 font-mono">super();</code> to initialize the parent class.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">Compiler-Generated Default</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Created automatically. Leaves fields at JVM zero defaults (<code className="text-rose-300 font-mono">null</code>, <code className="text-amber-300 font-mono">0</code>, <code className="text-purple-300 font-mono">false</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">User-Defined No-Arg</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Authored by developer. Assigns explicit business default values (e.g. <code className="text-emerald-300 font-mono">campusHub = &quot;Barrackpore&quot;</code>).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Default Constructor Synthesis Workflow
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 260" className="w-full h-auto">
            <rect x="30" y="30" width="250" height="200" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="155" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">JAVA SOURCE CODE</text>
            <text x="155" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">public class Student {'}'}</text>
            <rect x="50" y="100" width="210" height="100" rx="6" fill="#1e293b" />
            <text x="60" y="130" fill="#94a3b8" fontSize="10" fontFamily="monospace">// Zero constructors</text>
            <text x="60" y="150" fill="#94a3b8" fontSize="10" fontFamily="monospace">// written by developer</text>
            <text x="60" y="180" fill="#fde047" fontSize="10" fontFamily="monospace">int roll; String name;</text>

            <path d="M 290 130 L 370 130" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow1)" />
            <text x="330" y="120" fill="#38bdf8" fontSize="10" textAnchor="middle">javac</text>

            <rect x="380" y="30" width="510" height="200" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="635" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">COMPILED BYTECODE (.class)</text>
            <rect x="400" y="80" width="470" height="130" rx="6" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
            <text x="415" y="105" fill="#a7f3d0" fontSize="11" fontFamily="monospace">public Student() {'{'}</text>
            <text x="445" y="130" fill="#fde047" fontSize="11" fontFamily="monospace">super(); // invokespecial java.lang.Object.&lt;init&gt;</text>
            <text x="445" y="155" fill="#a7f3d0" fontSize="11" fontFamily="monospace">this.roll = 0; this.name = null;</text>
            <text x="415" y="180" fill="#a7f3d0" fontSize="11" fontFamily="monospace">{'}'}</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={defaultConstructorDemoCode}
          title="DefaultConstructorMechanicsDemo.java"
          highlightLines={[12, 28, 48, 52]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Default Constructor FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 3: Default Constructor Mechanics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic3_default_constructor_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Always remember my rule: The compiler gives you a free default constructor only as long as you write zero constructors. As soon as you write a parameterized constructor for Swadeep or Tuhina, you must write your no-arg constructor manually if you need it! — Sukanta Hui"
      />
    </div>
  );
}