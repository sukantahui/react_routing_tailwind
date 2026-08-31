import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import svrDemoCode from "./topic11_files/StartVsRunDirectInvocationDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 11
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            start() vs run()
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Starting a Thread: Why We MUST Call <code className="text-emerald-400 font-mono">thread.start()</code> instead of <code className="text-rose-400 font-mono">run()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Avoid the #1 junior multithreading mistake: understanding native <code className="text-emerald-300 font-mono">start0()</code> stack allocation versus synchronous in-thread method invocation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={svrDemoCode}
          title="StartVsRunDirectInvocationDemo.java"
          highlightLines={[7, 10, 18, 19, 23, 24, 27, 28, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="start() vs run() FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 11: thread.start() vs thread.run()"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic11_start_vs_run_note.txt"
        />
      </section>

      <Teacher
        note="Never call 'thread.run()' directly! If you call run(), it runs on the main thread like a plain old method call! Only 'thread.start()' creates a brand new thread in the operating system! — Sukanta Hui"
      />
    </div>
  );
}