import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nulCmpDemoCode from "./topic9_files/NullSafeComparatorWrappersDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 9
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Null-Safe Sorting
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Handling Nulls: <code className="text-emerald-400 font-mono">Comparator.nullsFirst()</code> &amp; <code className="text-sky-400 font-mono">Comparator.nullsLast()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Prevent production sorting crashes: wrapping comparators with <code className="text-emerald-300 font-mono">nullsFirst()</code> and <code className="text-sky-300 font-mono">nullsLast()</code> to safely manage nullable database records.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={nulCmpDemoCode}
          title="NullSafeComparatorWrappersDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 26, 27, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Null-Safe Sorting FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 9: Null-Safe Comparators"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic9_null_safe_comparators_note.txt"
        />
      </section>

      <Teacher
        note="In real-world databases, some columns contain null values! If you sort without null protection, Java will crash with a NullPointerException! Always wrap your comparator with 'Comparator.nullsLast()' to keep your application bulletproof! — Sukanta Hui"
      />
    </div>
  );
}