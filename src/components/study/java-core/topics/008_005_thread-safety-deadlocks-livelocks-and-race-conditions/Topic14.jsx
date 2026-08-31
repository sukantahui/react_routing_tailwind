import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tsfDemoCode from "./topic14_files/ThreadStarvationAndFairLocksCapstoneDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Starvation Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Thread Starvation &amp; <code className="text-emerald-400 font-mono">Fair ReentrantLocks</code>: Guaranteeing FIFO Order (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize concurrency safety architectures: evaluating barging throughput versus FIFO fairness, preventing resource starvation with <code className="text-emerald-300 font-mono">new ReentrantLock(true)</code>, and mastering complete deadlock defense.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tsfDemoCode}
          title="ThreadStarvationAndFairLocksCapstoneDemo.java"
          highlightLines={[7, 10, 14, 15, 20, 21, 33, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Starvation Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 14: Starvation Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic14_starvation_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 008_005! You have mastered the entire science of thread safety, race conditions, the 4 Coffman deadlock conditions, jstack dump diagnostics, livelock jitter, and fair FIFO locking! — Sukanta Hui"
      />
    </div>
  );
}