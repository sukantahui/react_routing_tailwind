import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import scmDemoCode from "./topic14_files/StructuredConcurrencyModelCapstoneDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Structured Concurrency Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Structured Concurrency</code> (JEP 453): Eliminating Thread Leaks (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize modern parallel execution: organizing asynchronous subtasks into structured scopes with <code className="text-emerald-300 font-mono">StructuredTaskScope</code>, auto-cancelling sibling failures, and mastering Java 21+ concurrency.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={scmDemoCode}
          title="StructuredConcurrencyModelCapstoneDemo.java"
          highlightLines={[7, 10, 14, 15, 19, 20, 24, 25, 26, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Structured Concurrency FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 14: Structured Concurrency Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic14_structured_concurrency_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 008_009 and the ENTIRE Segment 8! You have mastered the complete evolution of Java multithreading—from basic Thread lifecycles, synchronization, and deadlocks to Java 21 Virtual Threads, Project Loom, and Structured Concurrency! — Sukanta Hui"
      />
    </div>
  );
}