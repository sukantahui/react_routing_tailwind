import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import famDemoCode from "./topic1_files/QueueTwoMethodFamiliesOverviewDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 1
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            2 Method Families
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The 2 Method Families of <code className="text-emerald-400 font-mono">Queue</code>: Exceptions vs Special Values
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master Queue API taxonomy: comparing exception-throwing methods (<code className="text-rose-400 font-mono">add</code>, <code className="text-rose-400 font-mono">remove</code>, <code className="text-rose-400 font-mono">element</code>) against safe special-value methods (<code className="text-emerald-300 font-mono">offer</code>, <code className="text-sky-300 font-mono">poll</code>, <code className="text-amber-300 font-mono">peek</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={famDemoCode}
          title="QueueTwoMethodFamiliesOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="2 Method Families FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 1: 2 Method Families of Queue"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic1_two_method_families_queue_note.txt"
        />
      </section>

      <Teacher
        note="Never confuse 'poll()' with 'remove()'! 'poll()' returns null if the queue is empty so your server keeps running smoothly; 'remove()' throws a NoSuchElementException that will crash your thread if uncaught! — Sukanta Hui"
      />
    </div>
  );
}