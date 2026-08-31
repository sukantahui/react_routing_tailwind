import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import exDemoCode from "./topic3_files/RecoverableExceptionsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Recoverable Conditions
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.lang.Exception</code>: Recoverable Application-Level Conditions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build resilient, self-healing applications: catching recoverable <code className="text-emerald-300 font-mono">IOException</code> errors and providing automated fallback mechanisms without crashing.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={exDemoCode}
          title="RecoverableExceptionsDemo.java"
          highlightLines={[7, 14, 15, 17, 18, 19, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Recoverable Exceptions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 3: java.lang.Exception"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic3_recoverable_exceptions_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you catch an Exception, ask yourself: 'How can I recover gracefully?' If a file is missing, load default settings; if a server is busy, retry in 2 seconds! — Sukanta Hui"
      />
    </div>
  );
}