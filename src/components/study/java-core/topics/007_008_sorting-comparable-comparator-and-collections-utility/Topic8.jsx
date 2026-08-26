import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chnSortDemoCode from "./topic8_files/MultiLevelChainedSortingDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            thenComparing Chaining
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Multi-Level Chained Sorting: <code className="text-emerald-400 font-mono">thenComparing()</code> &amp; SQL-Like Ordering
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct complex multi-criteria tie-breakers: chaining primary, secondary, and tertiary sorting stages using fluent <code className="text-emerald-300 font-mono">thenComparing()</code> combinators.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chnSortDemoCode}
          title="MultiLevelChainedSortingDemo.java"
          highlightLines={[7, 10, 27, 28, 38, 39, 40, 41, 42, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="thenComparing Chaining FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 8: Multi-Level Chained Sorting"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic8_multi_level_chained_sorting_note.txt"
        />
      </section>

      <Teacher
        note="'thenComparing()' is just like SQL 'ORDER BY Department ASC, Salary DESC, Name ASC'! If the department matches, it checks salary; if salaries match, it checks names! It makes complex sorting look like plain English! — Sukanta Hui"
      />
    </div>
  );
}