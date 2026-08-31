import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import hwwDemoCode from "./topic5_files/HowWaitReleasesLockInternalDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            wait() Mechanics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          How <code className="text-emerald-400 font-mono">wait()</code> Works: Lock Release, Wait Set &amp; Lock Re-Acquisition
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal JVM monitor transitions: understanding atomic lock releases, Wait Set enrollment, notification queues, and the mandatory lock re-acquisition phase.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={hwwDemoCode}
          title="HowWaitReleasesLockInternalDemo.java"
          highlightLines={[7, 10, 15, 16, 20, 21, 28, 29, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="wait() Mechanics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 5: How wait() Works"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic5_how_wait_works_note.txt"
        />
      </section>

      <Teacher
        note="Notice the magic of wait(): It releases the lock so another thread can enter and produce data, but when notify() is called, the waiting thread MUST re-acquire the exact same lock before continuing! — Sukanta Hui"
      />
    </div>
  );
}