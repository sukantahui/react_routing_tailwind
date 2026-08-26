import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mviDemoCode from "./topic1_files/MemoryVisibilityInfiniteLoopDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 1
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Memory Visibility
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-rose-400 font-mono">Memory Visibility</code> Problem: Stale CPU Caches &amp; Infinite Loops
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Witness stale cache bugs live: observing how JIT compiler hoisting and un-synchronized CPU registers trap background worker threads in infinite loops despite main memory updates.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mviDemoCode}
          title="MemoryVisibilityInfiniteLoopDemo.java"
          highlightLines={[7, 10, 13, 14, 21, 22, 29, 30, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Memory Visibility FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 1: Memory Visibility Problem"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic1_memory_visibility_note.txt"
        />
      </section>

      <Teacher
        note="If you change a normal boolean flag to false on the main thread, the worker thread on another CPU core might NEVER see it! The worker caches 'true' in its CPU register and runs forever in an infinite loop! That is the Memory Visibility bug! — Sukanta Hui"
      />
    </div>
  );
}