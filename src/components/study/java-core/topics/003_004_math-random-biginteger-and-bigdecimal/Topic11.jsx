import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bdCompDemoCode from "./topic11_files/BigDecimalEqualsVsCompareToDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 11
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Scale Sensitivity Trap
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">BigDecimal</code> Comparison: <code className="text-emerald-400 font-mono">compareTo()</code> vs <code className="text-rose-400 font-mono">equals()</code> (Scale Sensitivity)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the cardinal rule of BigDecimal equality: diagnosing why <code className="text-emerald-300 font-mono">2.0</code> and <code className="text-emerald-300 font-mono">2.00</code> fail with <code className="text-rose-400 font-mono">equals()</code>, and handling HashSet vs TreeSet deduplication.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bdCompDemoCode}
          title="BigDecimalEqualsVsCompareToDemo.java"
          highlightLines={[7, 17, 18, 25, 26, 31, 32, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="BigDecimal Comparison FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 11: BigDecimal Comparison"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic11_bigdecimal_comparison_note.txt"
        />
      </section>

      <Teacher
        note="If you put new BigDecimal('2.0') and new BigDecimal('2.00') in a HashSet, it will store TWO items because their scale is different! Always use compareTo() for numeric comparison! — Sukanta Hui"
      />
    </div>
  );
}
