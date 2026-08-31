import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tstDemoCode from "./topic3_files/ThreadLifecycleStateEnumOverviewDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Thread Lifecycle
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Thread Lifecycle: The 6 States of <code className="text-emerald-400 font-mono">java.lang.Thread.State</code> Enum
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master state transition mechanics: exploring the 6 formal lifecycle stages (<code className="text-emerald-300 font-mono">NEW</code>, <code className="text-sky-300 font-mono">RUNNABLE</code>, <code className="text-rose-300 font-mono">BLOCKED</code>, <code className="text-purple-300 font-mono">WAITING</code>, <code className="text-amber-300 font-mono">TIMED_WAITING</code>, <code className="text-slate-300 font-mono">TERMINATED</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tstDemoCode}
          title="ThreadLifecycleStateEnumOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 19, 20, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Lifecycle FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 3: Thread Lifecycle Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic3_thread_lifecycle_overview_note.txt"
        />
      </section>

      <Teacher
        note="A Java thread is like a train journey: it is built at the station (NEW), moves on the tracks (RUNNABLE), stops at red signals for locks (BLOCKED), waits for passengers (WAITING / TIMED_WAITING), and arrives at the terminal (TERMINATED)! — Sukanta Hui"
      />
    </div>
  );
}