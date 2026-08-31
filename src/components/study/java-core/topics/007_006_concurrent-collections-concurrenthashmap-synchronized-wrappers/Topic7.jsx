import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sizDemoCode from "./topic7_files/ConcurrentHashMapSizeCalculationDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Striped Size Counters
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">ConcurrentHashMap</code> Size: <code className="text-emerald-400 font-mono">baseCount</code> &amp; <code className="text-purple-400 font-mono">CounterCell[]</code> (LongAdder Pattern)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand high-throughput counter striping: analyzing how <code className="text-emerald-300 font-mono">baseCount</code> and <code className="text-purple-300 font-mono">CounterCell[]</code> eliminate CAS storms during concurrent element counting.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sizDemoCode}
          title="ConcurrentHashMapSizeCalculationDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 29, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Size Calculation FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 7: Size Calculation & CounterCell"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic7_size_calculation_countercell_note.txt"
        />
      </section>

      <Teacher
        note="If 50 threads try to increment a single counter at once, 49 of them will fail CAS and retry! Doug Lea solved this with CounterCell array: threads spread their increments across different slots, and size() sums them up! — Sukanta Hui"
      />
    </div>
  );
}