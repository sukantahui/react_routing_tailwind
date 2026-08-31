import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import optDemoCode from "./topic5_files/ArrayListCapacityOptimizationDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capacity Optimization
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Optimizing ArrayList: <code className="text-emerald-400 font-mono">ensureCapacity()</code> &amp; <code className="text-sky-400 font-mono">trimToSize()</code> Tuning
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Tune JVM heap allocation: pre-allocating buffer capacities to eliminate repeated array resizes and reclaiming idle memory using <code className="text-sky-300 font-mono">trimToSize()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={optDemoCode}
          title="ArrayListCapacityOptimizationDemo.java"
          highlightLines={[7, 10, 14, 15, 23, 24, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Optimization FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 5: ArrayList Optimization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic5_arraylist_optimization_note.txt"
        />
      </section>

      <Teacher
        note="If you know you are fetching 10,000 student records from a database, never use 'new ArrayList&lt;&gt;()' without arguments! Use 'new ArrayList&lt;&gt;(10000)'! That single change eliminates 12 separate array reallocations! — Sukanta Hui"
      />
    </div>
  );
}