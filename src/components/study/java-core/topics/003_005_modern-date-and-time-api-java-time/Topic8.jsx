import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import instantDemoCode from "./topic8_files/InstantUtcTimestampMasteryDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Database UTC Standard
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Instant</code>: Point on the Timeline in UTC Epoch Seconds
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the enterprise database standard for audit logs: measuring UTC Unix Epoch timestamps with nanosecond precision via <code className="text-emerald-300 font-mono">Instant.now()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={instantDemoCode}
          title="InstantUtcTimestampMasteryDemo.java"
          highlightLines={[7, 14, 18, 19, 20, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Instant FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 8: java.time.Instant"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic8_instant_utc_note.txt"
        />
      </section>

      <Teacher
        note="In our Barrackpore database schemas, every table has 'created_at' mapped to Instant. It records the global UTC moment so server migrations across AWS Mumbai and US East never corrupt audit trails! — Sukanta Hui"
      />
    </div>
  );
}