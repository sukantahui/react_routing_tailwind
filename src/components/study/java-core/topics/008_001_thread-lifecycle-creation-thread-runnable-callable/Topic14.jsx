import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lspDemoCode from "./topic14_files/ThreadLifecycleStateInspectorLiveDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Live State Inspector
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Thread Lifecycle State Inspection: Observing All 6 States Live
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Witness live state transitions: orchestrating a multi-stage worker thread through <code className="text-emerald-300 font-mono">NEW</code>, <code className="text-sky-300 font-mono">RUNNABLE</code>, <code className="text-amber-300 font-mono">TIMED_WAITING</code>, <code className="text-purple-300 font-mono">WAITING</code>, and <code className="text-slate-300 font-mono">TERMINATED</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lspDemoCode}
          title="ThreadLifecycleStateInspectorLiveDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 21, 29, 33, 37, 41, 48]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Live State Inspector FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 14: Live State Inspector"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic14_live_state_inspector_note.txt"
        />
      </section>

      <Teacher
        note="Watching thread states in real-time makes everything crystal clear! Notice how calling sleep() turns it to TIMED_WAITING, wait() turns it to WAITING, and after join() it enters TERMINATED! — Sukanta Hui"
      />
    </div>
  );
}