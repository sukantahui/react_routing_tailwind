import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ovcDemoCode from "./topic8_files/ObjectVsClassLockSimultaneousDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Object vs Class Lock
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Object-Level</code> vs <code className="text-purple-400 font-mono">Class-Level</code> Lock: Simultaneous Execution
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Contrast memory locking domains: proving why instance-level locks (<code className="text-emerald-300 font-mono">this</code>) and class-level locks (<code className="text-purple-300 font-mono">Class.class</code>) execute concurrently without blocking contention.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ovcDemoCode}
          title="ObjectVsClassLockSimultaneousDemo.java"
          highlightLines={[7, 10, 14, 15, 22, 23, 38, 39, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Object vs Class Lock FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 8: Object vs Class Lock"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic8_object_vs_class_lock_note.txt"
        />
      </section>

      <Teacher
        note="Instance locks and Class locks are two completely different keys in different pockets! A thread holding the 'this' instance key will NEVER block a thread holding the 'Class.class' key! They both run in parallel! — Sukanta Hui"
      />
    </div>
  );
}