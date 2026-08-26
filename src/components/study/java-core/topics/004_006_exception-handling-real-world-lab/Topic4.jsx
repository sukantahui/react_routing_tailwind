import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rollDemoCode from "./topic4_files/PartialBatchFailureRollbackDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_006 · Topic 4
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Batch Atomicity
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Handling Partial Batch Failures with Atomic Rollback Signals
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Implement robust transactional pipelines: catching partial batch errors, executing compensatory rollbacks, and propagating structured audit metadata to supervisors.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rollDemoCode}
          title="PartialBatchFailureRollbackDemo.java"
          highlightLines={[7, 15, 17, 28, 38, 39, 42, 43, 46]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Batch Rollback FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_006 Topic 4: Batch Rollbacks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_006_topic4_batch_rollback_note.txt"
        />
      </section>

      <Teacher
        note="If you are importing 100 student invoices from Excel and row 50 has corrupted data, you must either rollback all 49 previous rows or log the failure cleanly! Never leave half the data in the database! — Sukanta Hui"
      />
    </div>
  );
}