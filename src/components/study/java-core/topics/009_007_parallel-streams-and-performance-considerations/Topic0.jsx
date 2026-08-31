import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/WhatAreParallelStreamsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_007 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Parallel Streams & Performance
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          What are <code className="text-emerald-400 font-mono">Parallel Streams</code>? Multi-Core Data Splitting
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Harnessing all CPU cores with one method call: automatic divide-and-conquer recursive splitting via Spliterator across ForkJoinPool worker threads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="WhatAreParallelStreamsDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Parallel Streams FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_007 Topic 0: What are Parallel Streams"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_007_topic0_what_are_parallel_streams_note.txt"
        />
      </section>

      <Teacher
        note="Turning a sequential stream into a multi-core powerhouse is as easy as typing .parallel()! But remember: with great power comes great responsibility — parallelism is NOT free! — Sukanta Hui"
      />
    </div>
  );
}
