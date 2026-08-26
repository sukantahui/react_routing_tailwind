import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import yldDemoCode from "./topic4_files/ThreadYieldCooperativeSchedulingDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Thread.yield()
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Thread.yield()</code>: Voluntary Cooperative CPU Yielding
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore CPU time-slice management: examining voluntary cooperative yielding hints, run-queue re-prioritization, and lock retention invariants.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={yldDemoCode}
          title="ThreadYieldCooperativeSchedulingDemo.java"
          highlightLines={[7, 10, 15, 16, 19, 20, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread.yield() FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 4: Thread.yield() Scheduling"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic4_thread_yield_scheduling_note.txt"
        />
      </section>

      <Teacher
        note="'Thread.yield()' is like a polite driver waving other cars through an intersection! It tells the CPU: 'If someone else of equal priority needs the core, they can go first, otherwise I will keep running!' — Sukanta Hui"
      />
    </div>
  );
}