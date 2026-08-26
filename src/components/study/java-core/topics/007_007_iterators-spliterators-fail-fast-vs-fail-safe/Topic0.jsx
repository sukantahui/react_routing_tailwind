import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import itrDemoCode from "./topic0_files/IteratorPatternFundamentalsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_007 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Iterator Pattern
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Iterator</code> Pattern: Decoupling Traversal from Internal Structure
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master behavioral design abstractions: utilizing <code className="text-emerald-300 font-mono">Iterator</code> and <code className="text-sky-300 font-mono">Iterable</code> to traverse diverse collections without exposing internal arrays, hash tables, or tree nodes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={itrDemoCode}
          title="IteratorPatternFundamentalsDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 19, 28, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Iterator Pattern FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_007 Topic 0: Iterator Pattern Fundamentals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_007_topic0_iterator_pattern_fundamentals_note.txt"
        />
      </section>

      <Teacher
        note="The Iterator pattern is the universal passport of Java Collections! Whether you are walking through an ArrayList, a LinkedList, or a HashSet, the exact same 'while(it.hasNext())' code works everywhere! — Sukanta Hui"
      />
    </div>
  );
}