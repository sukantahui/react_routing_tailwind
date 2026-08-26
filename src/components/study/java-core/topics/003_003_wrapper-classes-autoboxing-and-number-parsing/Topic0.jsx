import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whyWrappersDemoCode from "./topic0_files/WhyWrapperClassesExistDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Type System Bridge
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why Wrapper Classes Exist: Collections Compatibility &amp; Null Support
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why Java provides object wrappers for all eight primitive types: bridging primitives with Collections, representing SQL <code className="text-amber-400 font-mono">NULL</code>, and providing parsing utilities.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={whyWrappersDemoCode}
          title="WhyWrapperClassesExistDemo.java"
          highlightLines={[7, 18, 19, 26, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Wrapper Classes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 0: Why Wrapper Classes Exist"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic0_why_wrappers_note.txt"
        />
      </section>

      <Teacher
        note="If a student skipped an exam, an int score defaults to 0, which looks like a failing grade! An Integer can be null, accurately recording that the test was never attempted. — Sukanta Hui"
      />
    </div>
  );
}