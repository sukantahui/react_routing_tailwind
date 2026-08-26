import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prfDemoCode from "./topic4_files/ArrayListPerformanceCharacteristicsDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Performance Profile
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          ArrayList Performance: <code className="text-emerald-400 font-mono">O(1)</code> Random Access, Amortized Appends &amp; <code className="text-rose-400 font-mono">O(n)</code> Shifts
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze Big-O performance metrics: benchmarking constant-time pointer reads (<code className="text-emerald-300 font-mono">O(1)</code>), amortized append efficiency, and element shifting overhead during middle insertions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={prfDemoCode}
          title="ArrayListPerformanceCharacteristicsDemo.java"
          highlightLines={[7, 10, 16, 17, 22, 23, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ArrayList Performance FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 4: ArrayList Performance"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic4_arraylist_performance_note.txt"
        />
      </section>

      <Teacher
        note="If you need to look up elements by index all day long, ArrayList is unbeatable! It accesses any index in O(1) instant time because memory is contiguous! — Sukanta Hui"
      />
    </div>
  );
}