import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import spdDemoCode from "./topic11_files/ArrayDequeSuperiorityBenchmarkDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Performance Benchmark
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why <code className="text-emerald-400 font-mono">ArrayDeque</code> Outperforms <code className="text-rose-400 font-mono">Stack</code> (LIFO) &amp; <code className="text-purple-400 font-mono">LinkedList</code> (FIFO)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Benchmark queue engines: proving why ArrayDeque&apos;s unsynchronized circular array crushes legacy <code className="text-rose-300 font-mono">Stack</code> locking and pointer-chasing <code className="text-purple-300 font-mono">LinkedList</code> node allocation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={spdDemoCode}
          title="ArrayDequeSuperiorityBenchmarkDemo.java"
          highlightLines={[7, 10, 19, 20, 26, 27, 36, 37, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ArrayDeque Superiority FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 11: ArrayDeque Superiority Benchmark"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic11_arraydeque_superiority_benchmark_note.txt"
        />
      </section>

      <Teacher
        note="If you need a Stack or a Queue in Java, forget all the other classes—just use ArrayDeque! It is 3 to 4 times faster than Stack and LinkedList because it has no locks and no node objects! — Sukanta Hui"
      />
    </div>
  );
}