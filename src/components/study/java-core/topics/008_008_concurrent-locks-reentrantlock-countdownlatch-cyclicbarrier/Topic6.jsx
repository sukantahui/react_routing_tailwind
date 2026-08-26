import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sloDemoCode from "./topic6_files/StampedLockOptimisticReadingDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            StampedLock
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">StampedLock</code> Overview: Optimistic Reading &amp; Zero Lock Contention
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Harness Java 8 lock optimizations: executing stamp-based optimistic reads with <code className="text-emerald-300 font-mono">tryOptimisticRead()</code>, validating stamp integrity with <code className="text-sky-300 font-mono">validate()</code>, and preventing writer starvation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sloDemoCode}
          title="StampedLockOptimisticReadingDemo.java"
          highlightLines={[7, 10, 14, 15, 23, 24, 28, 29, 30, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="StampedLock FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 6: StampedLock & Optimistic Reading"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic6_stampedlock_optimistic_reading_note.txt"
        />
      </section>

      <Teacher
        note="StampedLock's optimistic read is like looking at a price tag without touching the item! You just glance at it (get a stamp) and check if anyone changed the tag while you were looking (validate). If nobody did, you didn't waste a single millisecond locking! — Sukanta Hui"
      />
    </div>
  );
}