import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cvoDemoCode from "./topic7_files/CreatingVirtualThreadsOverviewDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Creation APIs
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Creating <code className="text-emerald-400 font-mono">Virtual Threads</code>: Overview of the 3 Core Java 21 APIs
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Survey modern thread factories: comparing the fluent <code className="text-emerald-300 font-mono">Thread.ofVirtual()</code> builder, one-line <code className="text-sky-300 font-mono">startVirtualThread()</code> launches, and the <code className="text-purple-300 font-mono">newVirtualThreadPerTaskExecutor</code> engine.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cvoDemoCode}
          title="CreatingVirtualThreadsOverviewDemo.java"
          highlightLines={[7, 10, 14, 15, 17, 18, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Creation APIs FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 7: Creating Virtual Threads Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic7_creating_virtual_threads_overview_note.txt"
        />
      </section>

      <Teacher
        note="Java 21 gives you three great ways to spawn Virtual Threads: the fluent builder for custom names, startVirtualThread() for quick scripts, and newVirtualThreadPerTaskExecutor() for enterprise web backends! — Sukanta Hui"
      />
    </div>
  );
}