import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import checkedDemoCode from "./topic4_files/CheckedExceptionsCompileTimeDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Compile-Time Enforcement
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Checked Exceptions: Subclasses of <code className="text-emerald-400 font-mono">Exception</code> (<code className="text-amber-400 font-mono">IOException</code>, <code className="text-sky-400 font-mono">SQLException</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand compile-time exception checking: exploring why the compiler refuses to build code until external I/O and database failures are explicitly acknowledged.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={checkedDemoCode}
          title="CheckedExceptionsCompileTimeDemo.java"
          highlightLines={[7, 14, 15, 16, 29, 30, 31, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Checked Exceptions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 4: Checked Exceptions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic4_checked_exceptions_note.txt"
        />
      </section>

      <Teacher
        note="If your code calls a method that throws IOException and you don't wrap it in try-catch or declare 'throws IOException', your Java file will NOT even compile! That is the definition of a Checked Exception! — Sukanta Hui"
      />
    </div>
  );
}