import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fiaDemoCode from "./topic5_files/StudentDiscountPolicy.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            @FunctionalInterface
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">@FunctionalInterface</code> Annotation: Compiler Validation &amp; Safety
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply defensive API design: using the <code className="text-emerald-300 font-mono">@FunctionalInterface</code> annotation to guard SAM contracts against inadvertent multi-method modifications at compile time.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fiaDemoCode}
          title="StudentDiscountPolicy.java"
          highlightLines={[7, 8, 10, 12, 13]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="@FunctionalInterface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 5: @FunctionalInterface Annotation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic5_functional_interface_annotation_note.txt"
        />
      </section>

      <Teacher
        note="Always put '@FunctionalInterface' on your custom functional interfaces! Just like '@Override' guards methods, '@FunctionalInterface' stops any junior teammate from adding a second method that breaks 500 lambda expressions across your project! — Sukanta Hui"
      />
    </div>
  );
}