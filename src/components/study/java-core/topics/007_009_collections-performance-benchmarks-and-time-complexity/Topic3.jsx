import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jolDemoCode from "./topic3_files/MemoryFootprintAnalysisJolDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_009 · Topic 3
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Memory Footprint
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Memory Footprint Analysis: Object Headers, References &amp; <code className="text-amber-400 font-mono">JOL</code> Internals
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect JVM memory consumption: analyzing 12-byte object headers, 8-byte alignment padding, pointer overhead, and heap memory bloat across node-based collection architectures.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jolDemoCode}
          title="MemoryFootprintAnalysisJolDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 21, 22, 27, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Memory Footprint FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_009 Topic 3: Memory Footprint Analysis"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_009_topic3_memory_footprint_analysis_note.txt"
        />
      </section>

      <Teacher
        note="Every Java object carries a 12-byte backpack called the Object Header! That's why storing 1 million numbers in a LinkedList takes 48 MB, while a simple int[] array takes only 4 MB! Choose your data structures wisely in memory-constrained microservices! — Sukanta Hui"
      />
    </div>
  );
}