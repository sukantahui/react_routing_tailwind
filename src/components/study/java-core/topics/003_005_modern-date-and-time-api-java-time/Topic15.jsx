import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import interopDemoCode from "./topic15_files/LegacyInteropDateBridgeDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 15
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Legacy Interop
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Interoperability: Converting Between Legacy <code className="text-amber-400 font-mono">Date/Calendar</code> and Modern <code className="text-emerald-400 font-mono">java.time</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Bridge legacy third-party libraries and modern APIs: using <code className="text-emerald-300 font-mono">toInstant()</code> and <code className="text-emerald-300 font-mono">Date.from()</code> for zero-loss bidirectional conversion.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={interopDemoCode}
          title="LegacyInteropDateBridgeDemo.java"
          highlightLines={[7, 17, 18, 19, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Date Interop FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 15: Legacy Date Interop"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic15_legacy_interop_note.txt"
        />
      </section>

      <Teacher
        note="If a legacy library like Hibernate 4 or JasperReports requires a java.util.Date, use Date.from(instant) at the boundary, but keep your entire core domain in java.time! — Sukanta Hui"
      />
    </div>
  );
}