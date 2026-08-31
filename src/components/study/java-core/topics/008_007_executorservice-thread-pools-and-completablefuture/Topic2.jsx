import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import eihDemoCode from "./topic2_files/ExecutorInterfaceHierarchyDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Interface Hierarchy
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Executor Hierarchy: <code className="text-emerald-400 font-mono">Executor</code>, <code className="text-sky-400 font-mono">ExecutorService</code> &amp; <code className="text-purple-400 font-mono">ScheduledExecutorService</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Survey the core concurrency contracts: evaluating base task dispatchers, lifecycle management interfaces, and periodic timer scheduling engines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={eihDemoCode}
          title="ExecutorInterfaceHierarchyDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Executor Hierarchy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 2: Executor Interface Hierarchy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic2_executor_hierarchy_note.txt"
        />
      </section>

      <Teacher
        note="Remember the 3-tier hierarchy: 'Executor' is the simple worker (execute), 'ExecutorService' is the manager (submit, return values, shutdown), and 'ScheduledExecutorService' is the calendar (scheduled and recurring tasks)! — Sukanta Hui"
      />
    </div>
  );
}