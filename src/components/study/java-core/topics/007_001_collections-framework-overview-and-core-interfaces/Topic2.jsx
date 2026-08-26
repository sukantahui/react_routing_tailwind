import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import itbDemoCode from "./topic2_files/IterableInterfaceAndForEachDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Root Interface
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The Root Interface: <code className="text-emerald-400 font-mono">java.lang.Iterable&lt;T&gt;</code> &amp; <code className="text-sky-400 font-mono">forEach()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master collection iteration roots: understanding how <code className="text-emerald-300 font-mono">Iterable&lt;T&gt;</code> powers enhanced for-each loops, iterator cursors, and Java 8 functional consumers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={itbDemoCode}
          title="IterableInterfaceAndForEachDemo.java"
          highlightLines={[7, 10, 18, 19, 20, 25, 26, 27, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Iterable FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 2: java.lang.Iterable"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic2_iterable_interface_note.txt"
        />
      </section>

      <Teacher
        note="Any time you write 'for (String s : list)', Java is quietly calling 'list.iterator()' behind the scenes! By implementing 'Iterable<T>', you can make your own custom classes work in for-each loops too! — Sukanta Hui"
      />
    </div>
  );
}