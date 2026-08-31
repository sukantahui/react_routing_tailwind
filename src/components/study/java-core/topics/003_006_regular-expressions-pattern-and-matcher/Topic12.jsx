import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import transDemoCode from "./topic12_files/AdvancedMatcherTransformationsDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 12
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Functional Transformations
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Advanced Matcher Transformations: <code className="text-emerald-400 font-mono">replaceAll(Function)</code> in Java 9+
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build dynamic text processing pipelines: computing math calculations and applying GST taxes directly inside regex replacement lambdas.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={transDemoCode}
          title="AdvancedMatcherTransformationsDemo.java"
          highlightLines={[7, 17, 18, 20, 21, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Advanced Matcher FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 12: Matcher Transformations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic12_matcher_transformations_note.txt"
        />
      </section>

      <Teacher
        note="In modern Java (Java 9+), you can pass a lambda directly to matcher.replaceAll()! You can convert currencies, capitalize names, or calculate taxes in 3 lines of code! — Sukanta Hui"
      />
    </div>
  );
}