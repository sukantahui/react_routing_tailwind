import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import arithDemoCode from "./topic10_files/DateArithmeticOperationsDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Immutable Arithmetic
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Date Arithmetic: <code className="text-emerald-400 font-mono">plusDays()</code>, <code className="text-sky-400 font-mono">minusMonths()</code> &amp; <code className="text-amber-400 font-mono">withDayOfMonth()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master clean, side-effect-free date calculations: adding billing payment terms, subtracting audit windows, and replacing temporal fields with <code className="text-amber-300 font-mono">with...()</code> adjusters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={arithDemoCode}
          title="DateArithmeticOperationsDemo.java"
          highlightLines={[7, 18, 19, 20, 27, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Date Arithmetic FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 10: Date Arithmetic Operations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic10_date_arithmetic_note.txt"
        />
      </section>

      <Teacher
        note="Notice how clean 'date.plusDays(30)' is compared to legacy Calendar where you had to write 'cal.add(Calendar.DAY_OF_MONTH, 30)' and it mutated the object! — Sukanta Hui"
      />
    </div>
  );
}