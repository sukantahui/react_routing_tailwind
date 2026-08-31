import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mfcDemoCode from "./topic16_files/MultithreadingFundamentalsCapstoneDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Threading Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Multithreading Fundamentals &amp; Lifecycle Architecture (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize thread foundation mastery: orchestrating parallel <code className="text-emerald-300 font-mono">Callable&lt;V&gt;</code> tasks across regional branch hubs, managing <code className="text-sky-300 font-mono">FutureTask</code> pipelines, and harvesting concurrent results.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mfcDemoCode}
          title="MultithreadingFundamentalsCapstoneDemo.java"
          highlightLines={[7, 10, 16, 17, 23, 24, 30, 31, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Threading Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 16: Threading Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic16_threading_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 008_001! You have mastered the foundational building blocks of Java Multithreading—from hardware concurrency versus parallelism, to the 6 lifecycle states and Callable/FutureTask execution pipelines! — Sukanta Hui"
      />
    </div>
  );
}