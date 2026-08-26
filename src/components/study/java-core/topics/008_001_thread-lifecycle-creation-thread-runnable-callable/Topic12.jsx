import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tniDemoCode from "./topic12_files/ThreadNamingAndIdentificationDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Thread Identification
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Thread Identification: <code className="text-emerald-400 font-mono">Thread.currentThread()</code>, <code className="text-sky-400 font-mono">getName()</code> &amp; <code className="text-amber-400 font-mono">setName()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enhance production observability: inspecting active thread metadata and naming background worker threads descriptively for fast <code className="text-emerald-300 font-mono">jstack</code> thread-dump diagnostics.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tniDemoCode}
          title="ThreadNamingAndIdentificationDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 20, 21, 26, 27, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Identification FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 12: Thread Identification"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic12_thread_identification_note.txt"
        />
      </section>

      <Teacher
        note="Always give your threads meaningful names like 'Payment-Processor-1' instead of letting Java call them 'Thread-0'! When a production server crashes at 2 AM and you look at the thread dump, descriptive names will save your life! — Sukanta Hui"
      />
    </div>
  );
}