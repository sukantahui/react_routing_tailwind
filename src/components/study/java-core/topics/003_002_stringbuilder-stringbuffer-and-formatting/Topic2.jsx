import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sbufDemoCode from "./topic2_files/StringBufferSynchronizedDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 2
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Synchronized Buffer
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-amber-400 font-mono">java.lang.StringBuffer</code>: Synchronized Thread-Safe String Builder
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore Java's legacy synchronized buffer: testing multi-threaded concurrent appends, monitor locking, and understanding the synchronization performance penalty.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sbufDemoCode}
          title="StringBufferSynchronizedDemo.java"
          highlightLines={[7, 15, 18, 22, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="StringBuffer FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 2: StringBuffer Synchronization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic2_stringbuffer_note.txt"
        />
      </section>

      <Teacher
        note="StringBuffer was created in Java 1.0 back when computers only had single CPU cores. Today, we use StringBuilder 99.9% of the time, and only touch StringBuffer for legacy multithreaded code. — Sukanta Hui"
      />
    </div>
  );
}