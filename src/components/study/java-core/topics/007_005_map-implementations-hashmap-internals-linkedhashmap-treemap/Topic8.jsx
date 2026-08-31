import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import idxDemoCode from "./topic8_files/HashMapBucketIndexCalculationDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Bitwise Indexing
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Bucket Index Calculation: <code className="text-emerald-400 font-mono">index = (n - 1) &amp; hash</code> Mathematics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace low-level bitmask arithmetic: proving why <code className="text-emerald-300 font-mono">(n - 1) &amp; hash</code> matches modulo operations while executing in a single CPU clock cycle.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={idxDemoCode}
          title="HashMapBucketIndexCalculationDemo.java"
          highlightLines={[7, 10, 13, 14, 21, 22, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bucket Indexing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 8: Bucket Index Calculation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic8_bucket_index_calculation_note.txt"
        />
      </section>

      <Teacher
        note="Modulo '%' is an expensive mathematical division in CPU hardware! By forcing the table size to be 16, 32, 64, etc., Java replaces division with '(15 & hash)', which runs at raw wire speed in 1 clock cycle! — Sukanta Hui"
      />
    </div>
  );
}