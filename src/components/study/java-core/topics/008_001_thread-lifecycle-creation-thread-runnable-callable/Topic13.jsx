import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import priDemoCode from "./topic13_files/ThreadPrioritiesAndOsSchedulingDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 13
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Thread Priorities
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Thread Priorities (<code className="text-emerald-400 font-mono">1 to 10</code>) &amp; OS Kernel Scheduling Realities
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine CPU scheduling mechanics: understanding priority hint constants (<code className="text-emerald-300 font-mono">MIN/NORM/MAX</code>) and analyzing why OS kernels treat priorities as non-binding hints.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={priDemoCode}
          title="ThreadPrioritiesAndOsSchedulingDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 23, 24, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Priorities FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 13: Thread Priorities"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic13_thread_priorities_note.txt"
        />
      </section>

      <Teacher
        note="Never depend on thread priorities to make your program work! Setting a priority of 10 is only a polite suggestion to Windows or Linux; the OS scheduler can completely ignore your priority whenever it wants! — Sukanta Hui"
      />
    </div>
  );
}