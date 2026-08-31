import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ordDemoCode from "./topic10_files/TreeSetNaturalVsCustomOrderingDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Comparable vs Comparator
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          TreeSet Ordering: Natural (<code className="text-emerald-400 font-mono">Comparable</code>) vs Custom (<code className="text-sky-400 font-mono">Comparator</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Control sorting behavior: implementing natural ordering via <code className="text-emerald-300 font-mono">Comparable.compareTo()</code> and dynamic custom ordering using modern Java lambda Comparators.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ordDemoCode}
          title="TreeSetNaturalVsCustomOrderingDemo.java"
          highlightLines={[7, 10, 21, 22, 38, 39, 47, 48]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="TreeSet Ordering FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 10: TreeSet Ordering"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic10_treeset_ordering_note.txt"
        />
      </section>

      <Teacher
        note="Remember: Natural sorting belongs to the class itself using Comparable.compareTo(), but if you want custom sorting (like sorting students by GPA descending), pass a Comparator into the TreeSet constructor! — Sukanta Hui"
      />
    </div>
  );
}