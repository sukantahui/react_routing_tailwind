import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pvbDemoCode from "./topic4_files/PrimitiveVsBoxedBenchmarkDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_009 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Primitive vs Boxed
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Performance Comparison: Primitive Arrays vs Boxed Collections (<code className="text-emerald-400 font-mono">int[]</code> vs <code className="text-amber-400 font-mono">ArrayList&lt;Integer&gt;</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Measure hardware throughput disparities: analyzing L1/L2 CPU cache line utilization, pointer dereferencing delays, and auto-unboxing overhead across high-volume iterations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pvbDemoCode}
          title="PrimitiveVsBoxedBenchmarkDemo.java"
          highlightLines={[7, 10, 19, 20, 24, 25, 30, 31, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Primitive vs Boxed FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_009 Topic 4: Primitive vs Boxed Collections"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_009_topic4_primitive_vs_boxed_collections_note.txt"
        />
      </section>

      <Teacher
        note="When building high-frequency trading engines or big data analytics, use primitive arrays (or specialized libraries like Eclipse Collections / Trove)! A primitive int[] array is 5x to 10x faster than ArrayList<Integer> because it sits directly in the CPU's high-speed L1 cache! — Sukanta Hui"
      />
    </div>
  );
}