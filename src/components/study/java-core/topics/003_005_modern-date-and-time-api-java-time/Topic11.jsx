import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import periodDemoCode from "./topic11_files/PeriodDateDistanceCalculationDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Date Interval
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Measuring Date-Based Distance: <code className="text-emerald-400 font-mono">java.time.Period</code> (Years, Months, Days)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to compute exact human ages and contractual warranties: calculating calendar intervals between two <code className="text-emerald-300 font-mono">LocalDate</code> endpoints using <code className="text-emerald-300 font-mono">Period.between()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={periodDemoCode}
          title="PeriodDateDistanceCalculationDemo.java"
          highlightLines={[7, 15, 16, 19, 23, 24, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Period FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 11: java.time.Period"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic11_period_date_distance_note.txt"
        />
      </section>

      <Teacher
        note="Never calculate age by dividing total days by 365.25! That causes birthday miscalculations due to leap years. Always use 'Period.between(dob, today)' for exact calendar age! — Sukanta Hui"
      />
    </div>
  );
}