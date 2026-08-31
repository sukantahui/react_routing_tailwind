import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic7_files/Phase3ClassInitializationDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 010_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JVM & ClassLoaders
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Phase 3: <code className="text-emerald-400 font-mono">Initialization (&lt;clinit&gt;)</code>: Executing SIBs & Static Fields
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Bringing the class alive: the compiler-generated &lt;clinit&gt; method, thread-safe class initialization, and static execution order.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="Phase3ClassInitializationDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JVM Architecture & ClassLoaders FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 010_003 Topic 7: Phase 3: Class Initialization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="010_003_topic7_phase3_class_initialization_note.txt"
        />
      </section>

      <Teacher
        note="The compiler collects all static variable assignments and static initializer blocks into a single hidden method called <clinit>()! The JVM guarantees that <clinit>() is thread-safe and runs only ONCE! — Sukanta Hui"
      />
    </div>
  );
}
