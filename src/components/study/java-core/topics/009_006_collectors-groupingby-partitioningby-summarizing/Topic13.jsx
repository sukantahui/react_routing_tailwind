import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic13_files/CollectorsPartitioningByDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_006 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            The Collectors Framework
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Boolean Partitioning with <code className="text-emerald-400 font-mono">Collectors.partitioningBy()</code>: Binary Splitting
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Splitting streams into true/false maps: Map&lt;Boolean, List&lt;T&gt;&gt;, combining partitioning with downstream reducers, and binary partitioning performance.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="CollectorsPartitioningByDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Collectors Framework FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_006 Topic 13: Collectors.partitioningBy()"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_006_topic13_collectors_partitioningby_note.txt"
        />
      </section>

      <Teacher
        note="partitioningBy() is a specialized 2-way groupingBy() where the key is ALWAYS a boolean (true or false). It is faster than groupingBy and guarantees both true and false keys exist in the Map! — Sukanta Hui"
      />
    </div>
  );
}
