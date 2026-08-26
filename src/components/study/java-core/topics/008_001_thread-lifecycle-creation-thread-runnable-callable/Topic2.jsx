import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tmaDemoCode from "./topic2_files/ThreadMemoryArchitectureDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Thread Memory Layout
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Thread Memory Architecture: Shared <code className="text-emerald-400 font-mono">Heap</code> vs Private <code className="text-sky-400 font-mono">Call Stack</code> &amp; <code className="text-purple-400 font-mono">PC Register</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace low-level JVM memory partitioning: distinguishing globally accessible Heap/Metaspace allocations from isolated per-thread Call Stacks and instruction pointer registers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tmaDemoCode}
          title="ThreadMemoryArchitectureDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 27, 28, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Memory FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 2: Thread Memory Architecture"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic2_thread_memory_architecture_note.txt"
        />
      </section>

      <Teacher
        note="Remember this golden rule: Local variables created inside a method are 100% thread-safe because they live on that thread's private stack! Concurrency bugs only happen when multiple threads touch shared objects in the Heap! — Sukanta Hui"
      />
    </div>
  );
}