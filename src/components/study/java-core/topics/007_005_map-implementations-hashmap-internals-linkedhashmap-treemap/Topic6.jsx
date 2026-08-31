import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ldfDemoCode from "./topic6_files/HashMapLoadFactorThresholdDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Load Factor &amp; Threshold
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Load Factor (<code className="text-emerald-400 font-mono">0.75f</code>) &amp; Threshold Calculation: Balancing Time vs Space
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace table growth triggers: calculating capacity thresholds (<code className="text-emerald-300 font-mono">16 * 0.75 = 12</code>) and observing capacity doubling upon the 13th element insertion.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ldfDemoCode}
          title="HashMapLoadFactorThresholdDemo.java"
          highlightLines={[7, 10, 16, 23, 24, 30, 31, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Load Factor FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 6: Load Factor & Threshold"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic6_load_factor_threshold_note.txt"
        />
      </section>

      <Teacher
        note="Remember: 16 capacity with 0.75 load factor means the table resizes on the 13th element! Capacity doubles to 32, and the new threshold becomes 24! — Sukanta Hui"
      />
    </div>
  );
}