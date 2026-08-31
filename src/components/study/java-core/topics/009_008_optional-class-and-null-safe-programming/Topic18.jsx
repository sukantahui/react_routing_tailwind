import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic18_files/NullSafeArchitectureCapstoneDemo.java?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions";

export default function Topic18() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_008 · Topic 18
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Optional & Null-Safety
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Null-Safe Functional Architecture: <code className="text-emerald-400 font-mono">End-to-End Optional Pipelines</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Comprehensive null-safe architecture: eliminating all NullPointerExceptions from multi-tier enterprise systems using Optional pipelines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="NullSafeArchitectureCapstoneDemo.java"
          highlightLines={[18,25,34,43,52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Optional & Null-Safe Programming FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_008 Topic 18: Null-Safe Architecture Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_008_topic18_null_safe_architecture_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on mastering Optional and Null-Safe Functional Programming! You have eliminated the Billion Dollar Mistake from your Java applications forever! — Sukanta Hui"
      />
    </div>
  );
}
