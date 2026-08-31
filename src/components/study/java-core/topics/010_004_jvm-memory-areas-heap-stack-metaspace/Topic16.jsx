import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic16_files/AnalyzingMemoryErrorsCapstoneDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 010_004 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JVM Memory Model
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Analyzing JVM Memory Errors: <code className="text-emerald-400 font-mono">Heap OOM vs Metaspace OOM vs StackOverflowError</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnostic mastery: distinguishing Java heap space OutOfMemoryError, Metaspace OutOfMemoryError, and thread StackOverflowError with root cause fixes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="AnalyzingMemoryErrorsCapstoneDemo.java"
          highlightLines={[18,25,34,43,52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JVM Memory Areas FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 010_004 Topic 16: Analyzing Memory Errors Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="010_004_topic16_analyzing_memory_errors_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on mastering Module 4 of Segment 10! You now understand the exact difference between Heap OOM, Metaspace OOM, and StackOverflowError! Next up: Garbage Collection Algorithms & Tuning (G1, ZGC)! — Sukanta Hui"
      />
    </div>
  );
}
