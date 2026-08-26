import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import roundDemoCode from "./topic10_files/RoundingModesAndScaleMasteryDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Banker's Precision
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Handling Non-Terminating Decimals: <code className="text-emerald-400 font-mono">HALF_UP</code> vs <code className="text-purple-400 font-mono">HALF_EVEN</code> (Banker's Rounding)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master enterprise rounding algorithms: contrasting standard arithmetic roundups against statistically neutral <code className="text-purple-300 font-mono">HALF_EVEN</code> Banker's rounding.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={roundDemoCode}
          title="RoundingModesAndScaleMasteryDemo.java"
          highlightLines={[7, 14, 15, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Rounding Modes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 10: Rounding Modes and Scale"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic10_rounding_modes_note.txt"
        />
      </section>

      <Teacher
        note="Why does a bank use HALF_EVEN? If a bank rounds millions of transactions up by half a cent, they lose millions of dollars a year! HALF_EVEN balances it evenly! — Sukanta Hui"
      />
    </div>
  );
}