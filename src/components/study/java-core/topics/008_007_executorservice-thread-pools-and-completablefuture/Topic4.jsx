import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ftpDemoCode from "./topic4_files/FixedThreadPoolUnboundedQueueRiskDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            FixedThreadPool
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Executors.newFixedThreadPool(n)</code>: Unbounded Queue &amp; OOM Hazards
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect fixed-worker pool internals: analyzing <code className="text-emerald-300 font-mono">LinkedBlockingQueue</code> allocation, task buffering dynamics, and heap memory exhaustion failure modes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ftpDemoCode}
          title="FixedThreadPoolUnboundedQueueRiskDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 18, 19, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="FixedThreadPool FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 4: FixedThreadPool & Unbounded Queue"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic4_fixed_thread_pool_note.txt"
        />
      </section>

      <Teacher
        note="In FixedThreadPool, the number of worker threads is fixed (e.g. 3), but the queue waiting behind them is infinite! If 1,000,000 tasks arrive and your 3 workers are slow, your JVM heap explodes! — Sukanta Hui"
      />
    </div>
  );
}