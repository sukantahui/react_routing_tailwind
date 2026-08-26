import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nvgDemoCode from "./topic12_files/NavigableSetQueryMethodsSuiteDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Query Suite
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">NavigableSet</code> Complete Query Suite: Proximity, Ranges &amp; Polls
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Execute advanced range queries: mastering boundary-inclusive interval slicing (<code className="text-emerald-300 font-mono">subSet</code>), threshold lookups, and atomic extreme element extraction (<code className="text-sky-300 font-mono">pollFirst</code> / <code className="text-purple-300 font-mono">pollLast</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={nvgDemoCode}
          title="NavigableSetQueryMethodsSuiteDemo.java"
          highlightLines={[7, 10, 18, 19, 20, 21, 26, 27, 28, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Query Suite FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 12: NavigableSet Query Suite"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic12_navigableset_query_suite_note.txt"
        />
      </section>

      <Teacher
        note="With NavigableSet, you can pull sub-ranges with exact inclusive/exclusive control (like fetching all students between marks 60 and 90 inclusive) with zero manual loop filtering! — Sukanta Hui"
      />
    </div>
  );
}