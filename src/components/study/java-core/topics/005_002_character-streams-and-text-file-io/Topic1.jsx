import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import hierDemoCode from "./topic1_files/ReaderWriterHierarchyTaxonomyDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_002 · Topic 1
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Hierarchy Map
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Abstract Base Classes: <code className="text-emerald-400 font-mono">java.io.Reader</code> &amp; <code className="text-sky-400 font-mono">java.io.Writer</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master character I/O taxonomy: navigating the concrete subclasses of <code className="text-emerald-300 font-mono">Reader</code> and <code className="text-sky-300 font-mono">Writer</code> and understanding the Flushable contract.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={hierDemoCode}
          title="ReaderWriterHierarchyTaxonomyDemo.java"
          highlightLines={[7, 13, 14, 15, 16, 17, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Reader & Writer FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_002 Topic 1: Reader and Writer Hierarchy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_002_topic1_reader_writer_hierarchy_note.txt"
        />
      </section>

      <Teacher
        note="Remember the parallel symmetry: InputStream is paired with OutputStream for bytes; Reader is paired with Writer for text! All four hierarchies share identical design patterns! — Sukanta Hui"
      />
    </div>
  );
}