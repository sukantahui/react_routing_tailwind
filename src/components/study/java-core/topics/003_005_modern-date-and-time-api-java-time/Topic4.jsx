import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import localTimeDemoCode from "./topic4_files/LocalTimeDeepDiveDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            ISO-8601 Time
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">LocalTime</code>: Time Without Date or Timezone
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master human wall-clock time representation: configuring academy schedules with nanosecond precision and performing temporal comparisons using <code className="text-emerald-300 font-mono">isBefore()</code> and <code className="text-emerald-300 font-mono">isAfter()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={localTimeDemoCode}
          title="LocalTimeDeepDiveDemo.java"
          highlightLines={[7, 15, 19, 20, 21, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="LocalTime FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 4: LocalTime Deep Dive"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic4_localtime_deep_dive_note.txt"
        />
      </section>

      <Teacher
        note="Use LocalTime whenever you want to say 'Class begins at 10:00 AM every day' regardless of whether today is Monday or Friday! — Sukanta Hui"
      />
    </div>
  );
}