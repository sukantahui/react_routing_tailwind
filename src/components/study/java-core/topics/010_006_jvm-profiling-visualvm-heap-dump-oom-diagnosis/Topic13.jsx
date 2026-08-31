import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic13_files/HeapDumpOnOomDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 010_006 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JVM Profiling & OOM
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Automatic Heap Dump on Crash: <code className="text-emerald-400 font-mono">-XX:+HeapDumpOnOutOfMemoryError</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Post-mortem disaster insurance: configuring automatic HPROF snapshots upon OutOfMemoryError for offline forensic root cause analysis.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="HeapDumpOnOomDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Memory Profiling & OOM FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 010_006 Topic 13: Heap Dump on OutOfMemoryError"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="010_006_topic13_heap_dump_on_oom_note.txt"
        />
      </section>

      <Teacher
        note="If a production JVM crashes at 3 AM with an OutOfMemoryError, you cannot debug a dead process! But with -XX:+HeapDumpOnOutOfMemoryError, the JVM leaves a full .hprof snapshot on disk! You can open it in MAT and find the exact bug in 5 minutes! — Sukanta Hui"
      />
    </div>
  );
}
