import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import uncheckDemoCode from "./topic6_files/UncheckedRuntimeExceptionCatalogDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Runtime Defects
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Unchecked Exceptions: Subclasses of <code className="text-rose-400 font-mono">RuntimeException</code> (<code className="text-rose-300 font-mono">NullPointerException</code>, <code className="text-amber-400 font-mono">ArithmeticException</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Catalogue the core runtime defects: understanding why the compiler ignores <code className="text-rose-300 font-mono">NullPointerException</code> and why defensive coding beats try-catch wrapping.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={uncheckDemoCode}
          title="UncheckedRuntimeExceptionCatalogDemo.java"
          highlightLines={[7, 14, 15, 21, 22, 28, 29, 35, 36, 42, 43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Unchecked Exceptions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 6: Unchecked Exceptions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic6_unchecked_exceptions_note.txt"
        />
      </section>

      <Teacher
        note="Never write 'try { ... } catch (NullPointerException e)'! That is an amateur code smell. Use an if-statement: 'if (obj != null)'! Unchecked exceptions should be prevented, not caught! — Sukanta Hui"
      />
    </div>
  );
}