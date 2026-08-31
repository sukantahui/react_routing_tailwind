import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mtxCmpDemoCode from "./topic5_files/ComparableVsComparatorComparisonMatrixDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 5
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Comparison Matrix
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          When to Choose <code className="text-emerald-400 font-mono">Comparable</code> vs <code className="text-sky-400 font-mono">Comparator</code>: Comprehensive Decision Matrix
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize Java sorting interfaces: evaluating packages, method signatures, source modification constraints, and lambda support across the comparison matrix.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mtxCmpDemoCode}
          title="ComparableVsComparatorComparisonMatrixDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Comparison Matrix FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 5: Comparable vs Comparator Matrix"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic5_comparable_vs_comparator_matrix_note.txt"
        />
      </section>

      <Teacher
        note="Remember this in interviews: Comparable has 1 argument ('compareTo(o)') because 'this' is the first object! Comparator has 2 arguments ('compare(o1, o2)') because it is an external referee comparing two outside objects! — Sukanta Hui"
      />
    </div>
  );
}