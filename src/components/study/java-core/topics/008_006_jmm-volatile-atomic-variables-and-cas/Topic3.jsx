import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jmmDemoCode from "./topic3_files/JavaMemoryModelSpecificationOverviewDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JMM Specification
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Java Memory Model (JMM)</code>: JSR-133 Specification
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the formal JVM memory contract: understanding JSR-133 revisions, cross-platform memory abstractions, and the dual pillars of visibility and instruction ordering.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jmmDemoCode}
          title="JavaMemoryModelSpecificationOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JMM Specification FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 3: JMM Specification"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic3_jmm_specification_note.txt"
        />
      </section>

      <Teacher
        note="Different computers (like Intel Core i7 vs Apple M3 chips) handle memory caches differently. The Java Memory Model (JMM) is Java's master rulebook that guarantees your multi-threaded code runs identically and correctly on every CPU on earth! — Sukanta Hui"
      />
    </div>
  );
}