import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fncDemoCode from "./topic2_files/Java8FunctionalMapMethodsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Java 8 Functional Maps
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Java 8 Functional Additions: <code className="text-emerald-400 font-mono">computeIfAbsent()</code>, <code className="text-sky-400 font-mono">merge()</code> &amp; <code className="text-amber-400 font-mono">compute()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply modern functional Map patterns: building lazy multi-map groups with <code className="text-emerald-300 font-mono">computeIfAbsent</code> and one-line frequency aggregations with <code className="text-sky-300 font-mono">merge()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fncDemoCode}
          title="Java8FunctionalMapMethodsDemo.java"
          highlightLines={[7, 10, 18, 19, 20, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Functional Map FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 2: Java 8 Functional Map Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic2_java8_functional_map_methods_note.txt"
        />
      </section>

      <Teacher
        note="'map.merge(key, 1, Integer::sum)' is the single most famous Java 8 idiom for counting word frequencies! It replaces a 5-line if-else block with one clean, professional line! — Sukanta Hui"
      />
    </div>
  );
}