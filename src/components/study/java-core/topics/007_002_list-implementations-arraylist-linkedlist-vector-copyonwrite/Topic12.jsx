import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cowDemoCode from "./topic12_files/CopyOnWriteArrayListObserverCapstoneDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Concurrent List Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">CopyOnWriteArrayList</code>: Lock-Free Reads &amp; Snapshot Iterators (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize thread-safe list architecture: implementing <code className="text-emerald-300 font-mono">CopyOnWriteArrayList</code> for read-heavy event listener registries with immutable snapshot iterators.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cowDemoCode}
          title="CopyOnWriteArrayListObserverCapstoneDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 19, 23, 26, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="CopyOnWriteArrayList FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 12: CopyOnWriteArrayList Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic12_copy_on_write_arraylist_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 007_002! You now know the complete engineering reality of Java lists—from ArrayList's 1.5x bitwise growth to LinkedList node memory overhead, ArrayDeque superiority, and CopyOnWriteArrayList concurrency! — Sukanta Hui"
      />
    </div>
  );
}