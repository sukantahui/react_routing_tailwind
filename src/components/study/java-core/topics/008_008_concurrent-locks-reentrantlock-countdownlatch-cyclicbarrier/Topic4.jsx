import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rrwDemoCode from "./topic4_files/ReentrantReadWriteLockMechanicsDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            ReadWriteLock
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">ReentrantReadWriteLock</code>: Shared Readers vs Exclusive Writers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect asymmetric locking: implementing shared <code className="text-sky-300 font-mono">ReadLock</code> concurrency for multi-reader workloads and enforcing exclusive <code className="text-rose-300 font-mono">WriteLock</code> isolation during mutations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rrwDemoCode}
          title="ReentrantReadWriteLockMechanicsDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 21, 22, 26, 27, 32, 33, 37, 38]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ReadWriteLock FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 4: ReentrantReadWriteLock Mechanics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic4_read_write_lock_note.txt"
        />
      </section>

      <Teacher
        note="If 100 students want to look at the exam timetable on the noticeboard at the same time, they don't need to take turns—they can all read together (ReadLock)! But if the teacher needs to erase and rewrite the board, everyone steps back (WriteLock)! That's ReadWriteLock! — Sukanta Hui"
      />
    </div>
  );
}