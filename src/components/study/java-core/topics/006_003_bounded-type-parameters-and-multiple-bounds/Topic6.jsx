import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import recDemoCode from "./topic6_files/RecursiveTypeBoundsSelfComparisonDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_003 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Recursive Bounds
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Recursive Type Bounds: <code className="text-purple-400 font-mono">&lt;T extends Comparable&lt;T&gt;&gt;</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master mutual comparability: implementing self-referential generic type bounds (<code className="text-emerald-300 font-mono">&lt;T extends Comparable&lt;T&gt;&gt;</code>) to power sorting and extreme search algorithms.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={recDemoCode}
          title="RecursiveTypeBoundsSelfComparisonDemo.java"
          highlightLines={[7, 10, 13, 14, 17, 18, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Recursive Bounds FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_003 Topic 6: Recursive Type Bounds"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_003_topic6_recursive_type_bounds_note.txt"
        />
      </section>

      <Teacher
        note="'<T extends Comparable<T>>' is one of the most elegant concepts in Java! It says: 'T is any class that knows how to compare itself with another T'! That's how Collections.max() works for Strings, Dates, and Integers! — Sukanta Hui"
      />
    </div>
  );
}