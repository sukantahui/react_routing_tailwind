import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import synCapDemoCode from "./topic11_files/SynchronizationOverheadCapstoneDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Synchronization Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Performance Overhead of Synchronization: <code className="text-emerald-400 font-mono">Context Switching</code> &amp; <code className="text-sky-400 font-mono">JMM</code> Memory Barriers (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize locking architectures: measuring hardware throughput overhead, CPU memory barrier flushes, and OS context switching latencies across synchronization boundaries.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={synCapDemoCode}
          title="SynchronizationOverheadCapstoneDemo.java"
          highlightLines={[7, 10, 16, 17, 23, 24, 25, 33, 34, 39, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Synchronization Overhead FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 11: Synchronization Overhead Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic11_synchronization_overhead_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 008_003! You now understand the complete mechanics of thread synchronization—from race conditions and Mark Word intrinsic locks, to instance vs class locks, reentrancy, and private final lock objects! — Sukanta Hui"
      />
    </div>
  );
}