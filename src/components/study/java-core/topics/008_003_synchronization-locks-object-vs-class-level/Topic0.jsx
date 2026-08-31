import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rceDemoCode from "./topic0_files/SharedMutableStateRaceConditionDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Race Conditions
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Problem of Shared Mutable State: <code className="text-rose-400 font-mono">Race Conditions</code> &amp; Data Corruption
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine concurrent memory anomalies: dissecting non-atomic <code className="text-rose-300 font-mono">count++</code> operations into Read-Modify-Write machine cycles and observing lost update corruptions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rceDemoCode}
          title="SharedMutableStateRaceConditionDemo.java"
          highlightLines={[7, 10, 13, 14, 20, 21, 28, 29, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Race Conditions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 0: Shared Mutable State & Race Conditions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic0_race_conditions_note.txt"
        />
      </section>

      <Teacher
        note="Writing 'counter++' looks like one simple line of Java, but under the hood the CPU does three separate steps: READ, MODIFY, and WRITE! When two threads interleave these steps, increments vanish into thin air! This is the classic Race Condition! — Sukanta Hui"
      />
    </div>
  );
}