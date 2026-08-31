import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pvtDemoCode from "./topic1_files/ProcessVsThreadComparisonDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Process vs Thread
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Process</code> vs <code className="text-sky-400 font-mono">Thread</code>: Address Space Isolation vs Shared Memory Concurrency
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand runtime boundaries: contrasting isolated OS process address spaces and Inter-Process Communication against lightweight in-process shared memory threads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pvtDemoCode}
          title="ProcessVsThreadComparisonDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 19, 20, 21, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Process vs Thread FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 1: Process vs Thread"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic1_process_vs_thread_note.txt"
        />
      </section>

      <Teacher
        note="Think of an OS Process like an entire house with its own private address and fence. Inside the house, the family members are Threads—they share the kitchen (Heap memory) and living room, but each person has their own private notebook (Call Stack)! — Sukanta Hui"
      />
    </div>
  );
}