import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tarDemoCode from "./topic13_files/TransformingAsyncResultsPipelineDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Pipeline Transformations
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Transforming Results: <code className="text-emerald-400 font-mono">thenApply</code>, <code className="text-sky-400 font-mono">thenAccept</code> &amp; <code className="text-purple-400 font-mono">thenRun</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct reactive processing pipelines: mapping intermediate values with <code className="text-emerald-300 font-mono">thenApply</code>, consuming payloads via <code className="text-sky-300 font-mono">thenAccept</code>, and triggering completion actions with <code className="text-purple-300 font-mono">thenRun</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tarDemoCode}
          title="TransformingAsyncResultsPipelineDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 20, 21, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Pipeline Transformations FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 13: Transforming Async Results"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic13_transforming_async_results_note.txt"
        />
      </section>

      <Teacher
        note="Think of it as a factory conveyor belt: 'thenApply' modifies the product, 'thenAccept' packs it into a shipping box, and 'thenRun' turns off the factory lights when done! — Sukanta Hui"
      />
    </div>
  );
}