import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import steDemoCode from "./topic6_files/SingleThreadExecutorSequentialDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            SingleThreadExecutor
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Executors.newSingleThreadExecutor()</code>: Sequential FIFO &amp; Self-Healing
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct single-writer pipelines: enforcing strict FIFO execution ordering and utilizing automatic worker replacement upon uncaught task exceptions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={steDemoCode}
          title="SingleThreadExecutorSequentialDemo.java"
          highlightLines={[7, 10, 15, 16, 20, 21, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="SingleThreadExecutor FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 6: SingleThreadExecutor"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic6_single_thread_executor_note.txt"
        />
      </section>

      <Teacher
        note="If you need a background task that writes audit logs in exact order without locking, SingleThreadExecutor is your best friend! And if an unexpected bug crashes the worker thread, the executor automatically creates a new one so your logging never stops! — Sukanta Hui"
      />
    </div>
  );
}