import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import logDemoCode from "./topic13_files/TreeSetLogNPerformanceDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 13
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            O(log n) Complexity
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          TreeSet Performance: <code className="text-amber-400 font-mono">O(log n)</code> Time Complexity &amp; Tree Height Guarantees
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze logarithmic tree bounds: calculating maximum Red-Black tree heights and evaluating the trade-off between O(1) hash lookups and O(log n) continuous sorting.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={logDemoCode}
          title="TreeSetLogNPerformanceDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="O(log n) Performance FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 13: TreeSet O(log n) Performance"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic13_treeset_logn_performance_note.txt"
        />
      </section>

      <Teacher
        note="While HashSet is O(1), TreeSet is O(log n). For 1 million items, log₂(1,000,000) is only about 20 comparisons! That is still blazingly fast, and you get continuous sorted order for free! — Sukanta Hui"
      />
    </div>
  );
}