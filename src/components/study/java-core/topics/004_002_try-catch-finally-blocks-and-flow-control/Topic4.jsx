import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import orderDemoCode from "./topic4_files/CatchBlockOrderingRuleDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Ordering Rule
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Ordering Rule for Multiple Catch Blocks: Subclasses MUST Precede Superclasses
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Avoid unreachable catch block compile errors: mastering the Child-First, Parent-Second hierarchy sorting rule for resilient error interceptors.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={orderDemoCode}
          title="CatchBlockOrderingRuleDemo.java"
          highlightLines={[7, 14, 15, 18, 19, 22, 23, 26, 27, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Catch Ordering FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 4: Catch Block Ordering"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic4_catch_ordering_rule_note.txt"
        />
      </section>

      <Teacher
        note="Think of catch blocks like a filter net: you place the finest net (subclass) on top, and the coarsest net (Exception) at the bottom! If you put the big net on top, nothing reaches the smaller net! — Sukanta Hui"
      />
    </div>
  );
}