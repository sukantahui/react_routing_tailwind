import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import closeDemoCode from "./topic4_files/CloseableVsAutoCloseableComparisonDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 4
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Interface Taxonomy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-indigo-400 font-mono">java.io.Closeable</code> Interface (Sub-Interface with <code className="text-amber-400 font-mono">IOException</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Compare interface specifications: understanding why <code className="text-indigo-300 font-mono">Closeable</code> extends <code className="text-emerald-300 font-mono">AutoCloseable</code> and narrows exception propagation to <code className="text-amber-300 font-mono">IOException</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={closeDemoCode}
          title="CloseableVsAutoCloseableComparisonDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Closeable vs AutoCloseable FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 4: Closeable vs AutoCloseable"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic4_closeable_vs_autocloseable_note.txt"
        />
      </section>

      <Teacher
        note="If you are writing general resources (like Database connection pools or thread locks), implement AutoCloseable. If you are writing a byte or character stream, implement Closeable! — Sukanta Hui"
      />
    </div>
  );
}