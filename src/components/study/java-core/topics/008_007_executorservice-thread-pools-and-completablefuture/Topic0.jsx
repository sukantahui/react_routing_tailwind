import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mtcDemoCode from "./topic0_files/ManualThreadCreationAntiPatternDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Thread Creation Anti-Pattern
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why Manual <code className="text-rose-400 font-mono">new Thread()</code> is an Anti-Pattern: Allocation Overhead &amp; OOM Crashes
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand production scaling bottlenecks: examining native stack allocation costs, OS thread exhaustion risks, and why modern architectures mandate managed thread pools.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mtcDemoCode}
          title="ManualThreadCreationAntiPatternDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Creation Anti-Pattern FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 0: Manual Thread Creation Anti-Pattern"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic0_manual_thread_creation_note.txt"
        />
      </section>

      <Teacher
        note="Never type 'new Thread().start()' in an enterprise web app! Every thread eats 1MB of RAM and dies after one job. If 5,000 users visit at once, your server crashes with OutOfMemoryError! Use a Thread Pool instead! — Sukanta Hui"
      />
    </div>
  );
}