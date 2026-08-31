import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import grwDemoCode from "./topic2_files/ArrayListGrowthFormulaCalculationDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 2
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Growth Formula (1.5x)
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          ArrayList Growth Formula: <code className="text-amber-400 font-mono">oldCapacity + (oldCapacity &gt;&gt; 1)</code> (1.5x)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect bitwise growth mathematics: calculating ArrayList capacity expansions, analyzing bitwise right-shift CPU optimization, and understanding JVM memory block recycling.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={grwDemoCode}
          title="ArrayListGrowthFormulaCalculationDemo.java"
          highlightLines={[7, 10, 11, 19, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Growth Formula FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 2: ArrayList Growth Formula"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic2_arraylist_growth_formula_note.txt"
        />
      </section>

      <Teacher
        note="Why does Java multiply by 1.5 instead of 2.0? Because 1.5x allows the JVM garbage collector to reuse previously discarded memory chunks! Plus, '>> 1' executes in a single CPU cycle! — Sukanta Hui"
      />
    </div>
  );
}