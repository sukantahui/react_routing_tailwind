import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import extDemoCode from "./topic7_files/ExtendingThreadClassDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 7
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Creation Method 1
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Creation Method 1: Extending <code className="text-emerald-400 font-mono">java.lang.Thread</code> &amp; Overriding <code className="text-sky-400 font-mono">run()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine the classical subclassing approach: extending <code className="text-emerald-300 font-mono">Thread</code> and analyzing why single inheritance constraints make it obsolete in enterprise design.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={extDemoCode}
          title="ExtendingThreadClassDemo.java"
          highlightLines={[7, 10, 16, 17, 33, 34, 37, 38]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Extending Thread FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 7: Extending Thread Class"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic7_extending_thread_class_note.txt"
        />
      </section>

      <Teacher
        note="While extending Thread is the easiest way to write your very first multithreaded program, avoid it in production! Java only allows extending ONE class; if you extend Thread, your class can never extend any other useful business class! — Sukanta Hui"
      />
    </div>
  );
}