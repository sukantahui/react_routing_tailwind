import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cmpDemoCode from "./topic11_files/ListCreationComparisonMatrixDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 11
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            List Creation Comparison
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Differences: <code className="text-emerald-400 font-mono">Arrays.asList()</code> vs <code className="text-sky-400 font-mono">List.of()</code> vs <code className="text-purple-400 font-mono">unmodifiableList()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect list factories: comparing fixed-size array wrappers (<code className="text-emerald-300 font-mono">Arrays.asList</code>), unmodifiable view delegates, and standalone immutable collections (<code className="text-sky-300 font-mono">List.of</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cmpDemoCode}
          title="ListCreationComparisonMatrixDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 25, 26, 27, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="List Comparison FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 11: List Creation Comparison"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic11_list_creation_comparison_note.txt"
        />
      </section>

      <Teacher
        note="Be careful with 'Arrays.asList()'! Calling 'list.set(0, value)' will silently change the elements in your original array! If you want a truly independent immutable list with no side effects, always use 'List.of()' in modern Java! — Sukanta Hui"
      />
    </div>
  );
}