import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fmtDemoCode from "./topic14_files/DateTimeFormatterMasteryDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Thread-Safe Formatting
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Formatting &amp; Parsing with <code className="text-emerald-400 font-mono">DateTimeFormatter</code> (Thread-Safe)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build high-concurrency formatting pipelines: creating custom patterns like <code className="text-emerald-300 font-mono">"dd/MM/yyyy HH:mm:ss"</code> and storing thread-safe formatters in static constants.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fmtDemoCode}
          title="DateTimeFormatterMasteryDemo.java"
          highlightLines={[7, 16, 20, 21, 25, 26, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="DateTimeFormatter FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 14: DateTimeFormatter Mastery"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic14_datetime_formatter_note.txt"
        />
      </section>

      <Teacher
        note="You can declare 'public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern(\'dd-MM-yyyy\');' once at class level and share it across 100 threads safely! SimpleDateFormat would have crashed! — Sukanta Hui"
      />
    </div>
  );
}
