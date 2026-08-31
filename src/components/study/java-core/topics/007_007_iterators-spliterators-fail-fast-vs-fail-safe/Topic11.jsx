import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import parDemoCode from "./topic11_files/StreamSpliteratorParallelCapstoneDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_007 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Parallel Streams Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          How Streams Use <code className="text-emerald-400 font-mono">Spliterators</code> for Multi-Threaded Parallel Execution (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize iterator evolution: connecting classical sequential <code className="text-emerald-300 font-mono">Iterator</code> and fail-fast invariants with modern parallel stream <code className="text-purple-300 font-mono">Spliterator</code> partitioning across CPU cores.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={parDemoCode}
          title="StreamSpliteratorParallelCapstoneDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 21, 25, 26, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Parallel Streams Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_007 Topic 11: Streams & Spliterators Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_007_topic11_stream_spliterator_parallel_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 007_007! You now understand the complete mechanics of Java iterators—from modCount tracking and Fail-Fast CME crashes, to ListIterator bidirectional power, Fail-Safe snapshot views, and Spliterator parallel streams! — Sukanta Hui"
      />
    </div>
  );
}