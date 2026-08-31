import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import errDemoCode from "./topic2_files/UnrecoverableErrorsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Fatal JVM Failures
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-rose-400 font-mono">java.lang.Error</code>: Unrecoverable System Failures (<code className="text-rose-300 font-mono">OutOfMemoryError</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnose fatal JVM crashes: understanding call-stack exhaustion in <code className="text-rose-300 font-mono">StackOverflowError</code> and why catching <code className="text-rose-400 font-mono">Error</code> corrupts server stability.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={errDemoCode}
          title="UnrecoverableErrorsDemo.java"
          highlightLines={[7, 10, 11, 14, 21, 22, 23, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JVM Errors FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 2: java.lang.Error"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic2_errors_unrecoverable_note.txt"
        />
      </section>

      <Teacher
        note="If your server runs out of RAM (OutOfMemoryError), catching it in a try-catch will not magically give you more RAM! The JVM is dying; let it restart cleanly! — Sukanta Hui"
      />
    </div>
  );
}