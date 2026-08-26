import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import narDemoCode from "./topic4_files/NewAndRunnableStatesDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            NEW &amp; RUNNABLE States
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Thread Lifecycle: <code className="text-emerald-400 font-mono">NEW</code> &amp; <code className="text-sky-400 font-mono">RUNNABLE</code> (Ready vs Running)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace thread inception: transitioning from unstarted heap allocation (<code className="text-emerald-300 font-mono">NEW</code>) to OS kernel scheduling and CPU time-slicing (<code className="text-sky-300 font-mono">RUNNABLE</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={narDemoCode}
          title="NewAndRunnableStatesDemo.java"
          highlightLines={[7, 10, 14, 15, 23, 24, 27, 28, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="NEW & RUNNABLE FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 4: NEW and RUNNABLE States"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic4_new_and_runnable_states_note.txt"
        />
      </section>

      <Teacher
        note="When you type 'new Thread()', the thread is just a plain Java object sitting in heap memory (NEW). Only after you call 'start()' does the JVM create an actual OS thread and move it to RUNNABLE! — Sukanta Hui"
      />
    </div>
  );
}