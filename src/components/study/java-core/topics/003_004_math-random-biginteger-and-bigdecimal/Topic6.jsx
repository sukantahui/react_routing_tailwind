import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import finDemoCode from "./topic6_files/FinancialDoubleDisasterSimulationDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 6
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Financial Integrity Law
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why <code className="text-rose-400 font-mono">float</code> &amp; <code className="text-rose-400 font-mono">double</code> Must NEVER Be Used for Financial Calculations
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Simulate a real-world accounting disaster: demonstrating how floating-point micro-errors accumulate into corrupted ledgers, failed transactions, and audit discrepancies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={finDemoCode}
          title="FinancialDoubleDisasterSimulationDemo.java"
          highlightLines={[7, 16, 17, 19, 20, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Financial Math FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 6: Financial Calculations Law"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic6_financial_double_disaster_note.txt"
        />
      </section>

      <Teacher
        note="At AccoTax Barrackpore, we deal with GST invoices and income tax calculations every day. If you use double for taxes, you can go to jail for tax fraud due to cumulative roundoff error! Always use BigDecimal! — Sukanta Hui"
      />
    </div>
  );
}