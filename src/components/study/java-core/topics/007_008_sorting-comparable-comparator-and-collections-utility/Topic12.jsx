import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import staDemoCode from "./topic12_files/CollectionsStatisticalAnalysisDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Statistical Methods
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Statistical Operations: <code className="text-emerald-400 font-mono">min()</code>, <code className="text-sky-400 font-mono">max()</code>, <code className="text-amber-400 font-mono">frequency()</code> &amp; <code className="text-purple-400 font-mono">disjoint()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Execute fast collection metrics: extracting extremes (<code className="text-emerald-300 font-mono">min/max</code>), computing element occurrences (<code className="text-amber-300 font-mono">frequency</code>), and testing disjoint set intersections.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={staDemoCode}
          title="CollectionsStatisticalAnalysisDemo.java"
          highlightLines={[7, 10, 16, 17, 22, 23, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Statistical Analysis FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 12: Collections Statistical Analysis"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic12_collections_statistical_analysis_note.txt"
        />
      </section>

      <Teacher
        note="'Collections.frequency(list, item)' is a lifesaver! Instead of writing a manual for-loop to count how many times an item appears, just call frequency() in one clean line! — Sukanta Hui"
      />
    </div>
  );
}