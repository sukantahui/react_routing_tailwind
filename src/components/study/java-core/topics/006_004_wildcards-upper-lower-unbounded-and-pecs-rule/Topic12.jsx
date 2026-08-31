import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import apiDemoCode from "./topic12_files/ApiDesignTypeParamsVsWildcardsCapstoneDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            API Design Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          API Design Guidelines: Type Parameters (<code className="text-emerald-400 font-mono">&lt;T&gt;</code>) vs Wildcards (<code className="text-sky-400 font-mono">?</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize generic API design principles: choosing between explicit type parameters and wildcards, and adhering to Effective Java rules for method return types.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={apiDemoCode}
          title="ApiDesignTypeParamsVsWildcardsCapstoneDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="API Design FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 12: API Design Guidelines"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic12_api_design_guidelines_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 006_004! You have mastered Invariance, Unbounded Wildcards, Upper Bounds (Covariance), Lower Bounds (Contravariance), the PECS Principle, Wildcard Capture, and API design best practices! — Sukanta Hui"
      />
    </div>
  );
}