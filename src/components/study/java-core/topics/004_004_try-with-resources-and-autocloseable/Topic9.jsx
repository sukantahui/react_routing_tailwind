import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import inspDemoCode from "./topic9_files/ProgrammaticSuppressedInspectionDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Diagnostic Inspection
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Inspecting Suppressed Exceptions using <code className="text-emerald-400 font-mono">Throwable.getSuppressed()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Inspect multi-tiered runtime failures: iterating suppressed arrays, parsing chained teardown faults, and reading composite stack trace output.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={inspDemoCode}
          title="ProgrammaticSuppressedInspectionDemo.java"
          highlightLines={[7, 13, 14, 18, 19, 27, 28, 38, 39, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Suppressed Inspection FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 9: getSuppressed Inspection"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic9_suppressed_inspection_note.txt"
        />
      </section>

      <Teacher
        note="When debugging production logs in Barrackpore, look for 'Suppressed:' lines right under the main exception! They tell you which resource failed during closing! — Sukanta Hui"
      />
    </div>
  );
}