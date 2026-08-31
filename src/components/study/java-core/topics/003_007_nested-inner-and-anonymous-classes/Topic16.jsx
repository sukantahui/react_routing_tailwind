import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import localRecDemoCode from "./topic16_files/ModernLocalRecordsDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Modern Java 16+
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Modern Java 16+ Additions: <code className="text-emerald-400 font-mono">Local Records</code> in Method Bodies
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Leverage modern JVM language evolutions: declaring lightweight immutable <code className="text-emerald-300 font-mono">record</code> tuples directly inside method blocks for zero-ceremony data aggregation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={localRecDemoCode}
          title="ModernLocalRecordsDemo.java"
          highlightLines={[7, 16, 17, 18, 19, 22, 23, 24, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Local Records FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 16: Local Records"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic16_local_records_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you need a temporary 2-field data holder inside a complex calculation or Stream pipeline, use a local record! It takes 1 line of code and keeps your outer codebase clean! — Sukanta Hui"
      />
    </div>
  );
}