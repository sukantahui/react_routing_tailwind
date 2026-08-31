import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import recursiveDemoCode from "./topic16_files/RecursiveConstructorErrorDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
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
            Module 002_002 · Topic 16
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Compiler Trap &amp; Detection
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Recursive Constructor Invocation Compilation Error
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand why the Java compiler strictly prohibits circular <code className="text-rose-400 font-mono">this()</code> chains, how javac detects dependency cycles, and how to guarantee that every constructor chain terminates cleanly.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>🔄</span> The Circular Delegation Trap
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When writing overloaded constructors, calling <code className="text-sky-300 font-mono">this()</code> creates a delegation chain. If Constructor A calls Constructor B, and Constructor B calls Constructor A, an infinite loop is forged. Java detects this at compile time with the error <strong className="text-rose-400 font-mono">recursive constructor invocation</strong>.
          </p>
        </div>
      </section>

      {/* Section 2: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={recursiveDemoCode}
          title="RecursiveConstructorErrorDemo.java"
          highlightLines={[12, 16, 20, 42]}
        />
      </section>

      {/* Section 3: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Recursive Constructor FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 4: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 16: Recursive Constructor Error"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic16_recursive_constructor_note.txt"
        />
      </section>

      {/* Section 5: Teacher's Note */}
      <Teacher
        note="Every chain of this(...) calls must terminate at a Master constructor that assigns the fields. Never allow constructor A to call B if B calls A! — Sukanta Hui"
      />
    </div>
  );
}