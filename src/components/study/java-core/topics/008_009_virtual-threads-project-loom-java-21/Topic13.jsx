import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import svcDemoCode from "./topic13_files/ScopedValuesContextSharingDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Scoped Values
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Scoped Values</code> (JEP 446): Lightweight Immutable Context Sharing
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Evolve beyond mutable thread locals: implementing immutable, leak-free <code className="text-emerald-300 font-mono">ScopedValue</code> context propagation across millions of concurrent virtual threads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={svcDemoCode}
          title="ScopedValuesContextSharingDemo.java"
          highlightLines={[7, 10, 14, 15, 19, 20, 21, 22]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Scoped Values FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 13: Scoped Values"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic13_scoped_values_note.txt"
        />
      </section>

      <Teacher
        note="ThreadLocal was dangerous because developers would forget to call remove(), causing memory leaks. Scoped Values fix this forever: you declare a value for a specific code block, and the moment the block ends, the memory is cleaned up automatically! — Sukanta Hui"
      />
    </div>
  );
}