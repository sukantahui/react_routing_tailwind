import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import builderDemoCode from "./topic6_files/StudentAdmissionProfile.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Enterprise Design Patterns
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          When to Choose Static Nested Classes: The <code className="text-purple-400 font-mono">Builder Pattern</code> &amp; <code className="text-emerald-400 font-mono">Map.Entry</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build immutable enterprise models: leveraging static nested classes for fluent builder pattern pipelines and understanding standard library <code className="text-emerald-300 font-mono">Map.Entry</code> architecture.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={builderDemoCode}
          title="StudentAdmissionProfile.java"
          highlightLines={[7, 13, 20, 26, 43, 44, 57, 58, 59, 60, 61, 62]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Builder Pattern FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 6: Static Nested Builder Pattern"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic6_builder_pattern_note.txt"
        />
      </section>

      <Teacher
        note="Look at Lombok's @Builder annotation or java.util.Map.Entry! They are all powered by static nested classes. They make code so clean and eliminate telescoping constructors! — Sukanta Hui"
      />
    </div>
  );
}