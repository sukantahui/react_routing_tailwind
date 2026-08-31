import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/WhatIsTerminalOperationDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_005 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Terminal Operations & Reductions
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          What is a <code className="text-emerald-400 font-mono">Terminal Operation</code>? Triggering Pipeline Execution
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          The ignition switch of the Stream pipeline: consuming elements, producing results or side-effects, and closing the stream lifecycle.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="WhatIsTerminalOperationDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Terminal Operations & Reductions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_005 Topic 0: What is a Terminal Operation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_005_topic0_what_is_terminal_operation_note.txt"
        />
      </section>

      <Teacher
        note="Without a terminal operation, a stream pipeline is just an idle blueprint on paper. The moment you call a terminal method like forEach(), collect(), or count(), the JVM starts pulling data through the pipeline! — Sukanta Hui"
      />
    </div>
  );
}
