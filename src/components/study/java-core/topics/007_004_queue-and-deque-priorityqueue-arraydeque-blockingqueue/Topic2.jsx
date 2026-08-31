import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import excDemoCode from "./topic2_files/QueueExceptionThrowingMethodsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 2
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Exception Methods
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Exception-Throwing Methods: <code className="text-rose-400 font-mono">add()</code>, <code className="text-rose-400 font-mono">remove()</code> &amp; <code className="text-rose-400 font-mono">element()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace runtime exception triggers: examining <code className="text-rose-300 font-mono">NoSuchElementException</code> on empty extraction and <code className="text-rose-300 font-mono">IllegalStateException</code> on bounded queue capacity saturation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={excDemoCode}
          title="QueueExceptionThrowingMethodsDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 35, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Exception Queue Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 2: Exception-Throwing Queue Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic2_exception_queue_methods_note.txt"
        />
      </section>

      <Teacher
        note="If you call 'remove()' on an empty queue, Java throws NoSuchElementException immediately! That's why high-performance server apps prefer 'poll()', which quietly returns null without paying the heavy cost of generating stack traces! — Sukanta Hui"
      />
    </div>
  );
}