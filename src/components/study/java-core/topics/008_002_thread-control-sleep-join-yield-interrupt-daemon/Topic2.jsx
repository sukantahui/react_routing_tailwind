import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import joiDemoCode from "./topic2_files/ThreadCoordinationJoinDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            thread.join()
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Thread Coordination with <code className="text-emerald-400 font-mono">thread.join()</code>: Synchronizing Parallel Tasks
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Coordinate parallel execution pipelines: using <code className="text-emerald-300 font-mono">thread.join()</code> to pause parent threads until background child workers reach the <code className="text-slate-300 font-mono">TERMINATED</code> state.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={joiDemoCode}
          title="ThreadCoordinationJoinDemo.java"
          highlightLines={[7, 10, 24, 25, 29, 30, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="thread.join() FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 2: Thread Coordination with join()"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic2_thread_join_coordination_note.txt"
        />
      </section>

      <Teacher
        note="Calling 'worker.join()' on the main thread is like waiting for your friend to finish baking a cake before you light the birthday candles! Main thread pauses and waits patiently until worker finishes! — Sukanta Hui"
      />
    </div>
  );
}