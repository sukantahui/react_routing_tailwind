import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import legDemoCode from "./topic0_files/LegacyFinallyFlawsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Legacy Anti-Patterns
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Problem with Manual Resource Cleanup in Legacy <code className="text-rose-400 font-mono">finally</code> Blocks
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why pre-Java 7 manual resource teardowns caused devastating production leaks, masked diagnostic stack traces, and produced unwieldy nested boilerplate.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={legDemoCode}
          title="LegacyFinallyFlawsDemo.java"
          highlightLines={[7, 14, 15, 27, 28, 29, 30, 35, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Legacy Cleanup FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 0: Legacy Cleanup Flaws"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic0_legacy_cleanup_flaws_note.txt"
        />
      </section>

      <Teacher
        note="In the old days of Java 1.4 to 6, closing 3 database objects (Connection, Statement, ResultSet) took 30 lines of ugly finally code! Java 7 changed everything with Try-with-Resources! — Sukanta Hui"
      />
    </div>
  );
}