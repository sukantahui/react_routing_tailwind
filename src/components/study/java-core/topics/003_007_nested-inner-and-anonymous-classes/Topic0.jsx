import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whyNestDemoCode from "./topic0_files/WhyNestClassesOverviewDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Encapsulation Strategy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why Nest Classes: Logical Grouping &amp; Enhanced Encapsulation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn why nested classes improve object-oriented architectures: grouping helper data models, accessing private outer members without getters, and avoiding package namespace clutter.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={whyNestDemoCode}
          title="WhyNestClassesOverviewDemo.java"
          highlightLines={[7, 10, 11, 14, 15, 16, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Why Nest Classes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 0: Why Nest Classes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic0_why_nest_classes_note.txt"
        />
      </section>

      <Teacher
        note="If a helper class like 'InvoiceItem' only belongs to 'Invoice', don't create a separate public top-level class. Nest it inside Invoice to keep your domain model clean and tightly encapsulated! — Sukanta Hui"
      />
    </div>
  );
}