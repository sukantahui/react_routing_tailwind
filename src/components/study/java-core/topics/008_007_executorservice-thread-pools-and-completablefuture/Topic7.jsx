import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stpDemoCode from "./topic7_files/ScheduledThreadPoolRateVsDelayDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            ScheduledThreadPool
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-purple-400 font-mono">ScheduledExecutorService</code>: <code className="text-emerald-400 font-mono">FixedRate</code> vs <code className="text-sky-400 font-mono">FixedDelay</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master time-driven scheduling: contrasting start-to-start clock frequencies in <code className="text-emerald-300 font-mono">scheduleAtFixedRate</code> with end-to-start rest intervals in <code className="text-sky-300 font-mono">scheduleWithFixedDelay</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={stpDemoCode}
          title="ScheduledThreadPoolRateVsDelayDemo.java"
          highlightLines={[7, 10, 15, 16, 23, 24, 30, 31, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ScheduledThreadPool FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 7: ScheduledThreadPool Rate vs Delay"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic7_scheduled_thread_pool_note.txt"
        />
      </section>

      <Teacher
        note="If you are running a database backup, always use 'scheduleWithFixedDelay()'! That guarantees the system waits 10 minutes AFTER the last backup finishes before starting the next one, preventing multiple slow backups from piling up on top of each other! — Sukanta Hui"
      />
    </div>
  );
}