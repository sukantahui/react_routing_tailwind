import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bncDemoCode from "./topic9_files/ArrayListVsLinkedListBenchmarkDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Hardware Benchmark
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comprehensive Benchmark: <code className="text-emerald-400 font-mono">ArrayList</code> vs <code className="text-purple-400 font-mono">LinkedList</code> &amp; CPU Cache Locality
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Execute real-world performance benchmarks: discovering how CPU spatial locality and 64-byte cache line prefetching give contiguous ArrayLists a decisive advantage over pointer-chasing LinkedLists.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bncDemoCode}
          title="ArrayListVsLinkedListBenchmarkDemo.java"
          highlightLines={[7, 10, 18, 19, 23, 24, 33, 34, 39, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Benchmark FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 9: Benchmark & CPU Cache Locality"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic9_arraylist_vs_linkedlist_benchmark_note.txt"
        />
      </section>

      <Teacher
        note="In university textbooks, people teach that LinkedList is better for insertions. But on modern CPUs, ArrayList wins almost 100% of the time because hardware loves contiguous memory and CPU cache lines! — Sukanta Hui"
      />
    </div>
  );
}