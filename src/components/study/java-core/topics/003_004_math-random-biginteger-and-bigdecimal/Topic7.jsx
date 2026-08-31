import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bdArchDemoCode from "./topic7_files/BigDecimalArchitectureOverviewDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Arbitrary Decimal Precision
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.math.BigDecimal</code>: Arbitrary-Precision Signed Decimals
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover how Java achieves flawless decimal accuracy: examining the internal <code className="text-indigo-300 font-mono">unscaledValue</code> BigInteger and 32-bit <code className="text-emerald-300 font-mono">scale</code> mechanics.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bdArchDemoCode}
          title="BigDecimalArchitectureOverviewDemo.java"
          highlightLines={[7, 19, 23, 24, 25, 29, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="BigDecimal Architecture FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 7: BigDecimal Architecture"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic7_bigdecimal_architecture_note.txt"
        />
      </section>

      <Teacher
        note="With BigDecimal, 0.1 + 0.2 gives exactly 0.3 every single time! It is the industry gold standard across Wall Street, banks, and enterprise tax engines. — Sukanta Hui"
      />
    </div>
  );
}