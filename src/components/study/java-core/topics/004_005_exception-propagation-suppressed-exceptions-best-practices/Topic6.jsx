import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import logThrowDemoCode from "./topic6_files/LogAndThrowAntiPatternDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 6
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Logging Anti-Pattern
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-rose-400 font-mono">&apos;Log and Throw&apos;</code> Anti-Pattern: Preventing Log Clutter &amp; Alert Storms
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Clean up enterprise observability: learning why you must choose between handling an error or rethrowing it, preventing duplicate multi-tier stack trace pollution.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={logThrowDemoCode}
          title="LogAndThrowAntiPatternDemo.java"
          highlightLines={[7, 10, 12, 13, 17, 20, 21, 26, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Log and Throw FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 6: Log and Throw Anti-Pattern"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic6_log_and_throw_note.txt"
        />
      </section>

      <Teacher
        note="If your DAO logs an error, your Service logs the error, and your Controller logs the error, you get 3 identical error alerts at 3 AM for 1 single bug! Log it ONCE at the top boundary! — Sukanta Hui"
      />
    </div>
  );
}