import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compTableDemoCode from "./topic3_files/StringVsBuilderVsBufferComparisonDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 3
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Mastery Matrix
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comparison Table: <code className="text-sky-400 font-mono">String</code> vs <code className="text-emerald-400 font-mono">StringBuilder</code> vs <code className="text-amber-400 font-mono">StringBuffer</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete feature matrix: mutability, thread-safety, heap footprint, and performance trade-offs across Java's three textual representations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={compTableDemoCode}
          title="StringVsBuilderVsBufferComparisonDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 23, 24, 25]}
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
          title="Module 003_002 Topic 3: String Comparison Table"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic3_comparison_matrix_note.txt"
        />
      </section>

      <Teacher
        note="If it never changes, use String. If you are constructing it inside a single method, use StringBuilder. If 10 threads are writing to it at once, use StringBuffer! — Sukanta Hui"
      />
    </div>
  );
}