import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cmpStratDemoCode from "./topic4_files/ComparatorStrategyPatternDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Comparator Strategy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.util.Comparator&lt;T&gt;</code> Interface: Strategy Pattern via <code className="text-emerald-400 font-mono">compare()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply the Gang of Four Strategy Pattern: decoupling domain models from sorting logic using interchangeable <code className="text-emerald-300 font-mono">Comparator</code> strategy classes and lambda expressions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cmpStratDemoCode}
          title="ComparatorStrategyPatternDemo.java"
          highlightLines={[7, 10, 27, 28, 29, 30, 48, 49, 53, 54]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Comparator Strategy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 4: Comparator Strategy Pattern"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic4_comparator_strategy_pattern_note.txt"
        />
      </section>

      <Teacher
        note="If you are sorting a third-party class that you cannot edit (like String, Date, or a library class), you cannot add Comparable to it! But with Comparator, you can write external sorting strategies to sort anything in the universe! — Sukanta Hui"
      />
    </div>
  );
}