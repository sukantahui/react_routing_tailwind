import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rmvDemoCode from "./topic2_files/SafeRemovalDuringIterationDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_007 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Safe Element Removal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Removing Elements Safely: <code className="text-emerald-400 font-mono">iterator.remove()</code> &amp; <code className="text-sky-400 font-mono">removeIf()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Prevent iteration corruption: mastering safe element elimination using <code className="text-emerald-300 font-mono">iterator.remove()</code> and modern Java 8 declarative <code className="text-sky-300 font-mono">removeIf()</code> predicates.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rmvDemoCode}
          title="SafeRemovalDuringIterationDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 21, 22, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Safe Removal FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_007 Topic 2: Safe Removal via iterator.remove()"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_007_topic2_safe_removal_iterator_note.txt"
        />
      </section>

      <Teacher
        note="Never call 'list.remove(item)' inside a for-each loop! That crashes with ConcurrentModificationException! Always use 'iterator.remove()' or 'list.removeIf(item -> condition)'! — Sukanta Hui"
      />
    </div>
  );
}