import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import npvDemoCode from "./topic11_files/NeverPoolVirtualThreadsGoldenRuleDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 11
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Golden Rule: Never Pool
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The Golden Rule of Project Loom: <code className="text-amber-400 font-mono">NEVER POOL</code> Virtual Threads
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Unlearn legacy pooling habits: discovering why virtual threads are designed as ephemeral single-task objects and learning to throttle downstream resources via <code className="text-emerald-300 font-mono">Semaphore</code> primitives.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={npvDemoCode}
          title="NeverPoolVirtualThreadsGoldenRuleDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Never Pool Virtual Threads FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 11: Never Pool Virtual Threads"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic11_never_pool_virtual_threads_note.txt"
        />
      </section>

      <Teacher
        note="Old habits die hard! Developers often try to create a 'FixedThreadPool(50)' of Virtual Threads. Don't do it! Virtual Threads are like disposable paper cups: use one for a task and throw it away! If you need to limit database connections, use a Semaphore! — Sukanta Hui"
      />
    </div>
  );
}