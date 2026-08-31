import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import wavDemoCode from "./topic3_files/WhatAreVirtualThreadsDeepDiveDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Virtual Threads (Java 21)
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          What are <code className="text-emerald-400 font-mono">Virtual Threads</code>? JVM-Managed M:N User-Mode Fibers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enter the modern concurrency era: exploring Project Loom, user-mode JVM scheduling, dynamic heap-allocated call frames, and <code className="text-emerald-300 font-mono">Thread.isVirtual()</code> inspection.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={wavDemoCode}
          title="WhatAreVirtualThreadsDeepDiveDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 21, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Virtual Threads FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 3: What are Virtual Threads"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic3_what_are_virtual_threads_note.txt"
        />
      </section>

      <Teacher
        note="Virtual Threads are Java's superpower! Instead of asking Windows or Linux to create a heavy 1MB thread for you, the JVM creates its own lightweight thread right on the heap for only a few hundred bytes! You can create millions of them without breaking a sweat! — Sukanta Hui"
      />
    </div>
  );
}