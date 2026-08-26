import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import literalDemoCode from "./topic1_files/StringLiteralVsConstructorDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Memory Allocation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          String Creation: String Literal vs <code className="text-amber-400 font-mono">new String()</code> Constructor
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace the exact memory footprint differences between string literals in the Constant Pool versus explicit <code className="text-amber-300 font-mono">new String()</code> heap allocations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={literalDemoCode}
          title="StringLiteralVsConstructorDemo.java"
          highlightLines={[7, 15, 16, 19, 23, 26, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="String Literal FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 1: String Literal vs Constructor"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic1_literal_vs_constructor_note.txt"
        />
      </section>

      <Teacher
        note="Never write 'new String('hello')'! It creates an unnecessary duplicate object on the Heap. Just write 'hello' so Java reuses the shared pool instance. — Sukanta Hui"
      />
    </div>
  );
}
