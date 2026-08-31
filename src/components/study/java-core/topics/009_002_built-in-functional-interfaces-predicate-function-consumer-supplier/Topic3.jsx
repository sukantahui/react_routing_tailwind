import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fdmDemoCode from "./topic3_files/FunctionDataMappingDeepDiveDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Function&lt;T, R&gt;
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Function&lt;T, R&gt;</code>: Data Mapping &amp; Type Transformation Pipelines
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct generic conversion pipelines: utilizing <code className="text-emerald-300 font-mono">Function&lt;T, R&gt;</code> <code className="text-sky-300 font-mono">R apply(T t)</code> methods to transform domain objects, calculate formulas, and power stream maps.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fdmDemoCode}
          title="FunctionDataMappingDeepDiveDemo.java"
          highlightLines={[7, 10, 20, 21, 23, 24, 38, 39, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Function<T, R> FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 3: Function<T, R> Deep Dive"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic3_function_deep_dive_note.txt"
        />
      </section>

      <Teacher
        note="Function<T, R> is the bread and butter of data transformation! You feed it an input of type T (e.g. Student), and it transforms it into output R (e.g. InvoiceDTO or Fee amount)! — Sukanta Hui"
      />
    </div>
  );
}