import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import genDemoCode from "./topic8_files/CatchGenericThrowableAntiPatternDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Anti-Pattern
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-rose-400 font-mono">&apos;Catch Generic Throwable/Exception&apos;</code> Anti-Pattern
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Maintain JVM stability: discovering why catching <code className="text-rose-300 font-mono">Throwable</code> traps the JVM in corrupt memory states and learning precise exception filtering.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={genDemoCode}
          title="CatchGenericThrowableAntiPatternDemo.java"
          highlightLines={[7, 10, 14, 15, 20, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Catch Generic FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 8: Catch Generic Throwable"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic8_catch_generic_throwable_note.txt"
        />
      </section>

      <Teacher
        note="Catching Throwable is dangerous because if the JVM runs out of memory (OutOfMemoryError), your catch block catches it and tries to keep running! Always catch specific exceptions! — Sukanta Hui"
      />
    </div>
  );
}