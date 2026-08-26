import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rccDemoCode from "./topic1_files/RaceConditionCategoriesTaxonomyDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 1
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Race Taxonomies
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Categories of Race Conditions: <code className="text-rose-400 font-mono">Read-Modify-Write</code> &amp; <code className="text-amber-400 font-mono">Check-Then-Act</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Classify concurrency hazards: contrasting lost update anomalies in <code className="text-rose-300 font-mono">Read-Modify-Write</code> counters with stale verification bugs in <code className="text-amber-300 font-mono">Check-Then-Act</code> lazy initializations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rccDemoCode}
          title="RaceConditionCategoriesTaxonomyDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 30, 31, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Race Categories FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 1: Categories of Race Conditions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic1_race_condition_categories_note.txt"
        />
      </section>

      <Teacher
        note="Almost all concurrency bugs fall into one of these two buckets: Either you are updating a number without locking (Read-Modify-Write), or you are checking if something is null before creating it (Check-Then-Act)! Master both and you master concurrency! — Sukanta Hui"
      />
    </div>
  );
}