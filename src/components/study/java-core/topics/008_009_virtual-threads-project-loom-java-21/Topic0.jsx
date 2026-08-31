import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ptlDemoCode from "./topic0_files/PlatformThreadsLimitationsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Platform Thread Limits
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Limitations of <code className="text-rose-400 font-mono">Platform (OS) Threads</code>: 1:1 Kernel Mapping &amp; 1MB Stack Costs
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze legacy concurrency bottlenecks: examining 1:1 OS kernel mappings, the ~1 MB native stack memory wall, and the 5,000-thread ceiling in enterprise servers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ptlDemoCode}
          title="PlatformThreadsLimitationsDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Platform Thread Limits FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 0: Platform Thread Limitations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic0_platform_thread_limitations_note.txt"
        />
      </section>

      <Teacher
        note="For 28 years (from Java 1.0 until Java 21), every thread in Java was a heavy OS kernel thread costing 1 MB of RAM! That meant a server could only handle a few thousand users before running out of memory! Project Loom changes everything! — Sukanta Hui"
      />
    </div>
  );
}