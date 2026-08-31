import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rejDemoCode from "./topic8_files/CompileTimeRejectionOutOfBoundsCapstoneDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Bounds Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Compile-Time Rejection of Invalid Out-of-Bound Type Arguments (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize bounded type safety: analyzing compile-time type verification diagnostics and observing how the compiler rejects out-of-bound arguments.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rejDemoCode}
          title="CompileTimeRejectionOutOfBoundsCapstoneDemo.java"
          highlightLines={[7, 10, 19, 20, 26, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Rejection Diagnostics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_003 Topic 8: Bounds Rejection Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_003_topic8_bounds_rejection_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 006_003! You now master Upper Bounded types, Multiple Bounds syntax and ordering rules, Recursive Type Bounds, and compile-time bounds verification! — Sukanta Hui"
      />
    </div>
  );
}