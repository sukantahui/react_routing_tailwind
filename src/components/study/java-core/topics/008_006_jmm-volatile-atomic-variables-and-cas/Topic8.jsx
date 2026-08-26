import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vnaDemoCode from "./topic8_files/VolatileNonAtomicityTrapDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Non-Atomicity Trap
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why <code className="text-rose-400 font-mono">volatile</code> Does NOT Guarantee Atomicity (<code className="text-rose-400 font-mono">count++</code> Fallacy)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Expose the #1 concurrency misconception: analyzing why volatile memory visibility cannot protect compound Read-Modify-Write <code className="text-rose-300 font-mono">count++</code> operations from lost update data corruption.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vnaDemoCode}
          title="VolatileNonAtomicityTrapDemo.java"
          highlightLines={[7, 10, 13, 14, 21, 22, 23, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="volatile Non-Atomicity FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 8: volatile Non-Atomicity Fallacy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic8_volatile_non_atomicity_note.txt"
        />
      </section>

      <Teacher
        note="This is the biggest trap in all of Java! Junior developers think: 'If I make my counter volatile, it will be thread-safe!' WRONG! Volatile gives you fresh eyes to read data, but it does NOT stop someone else from writing at the same time! Use AtomicInteger for counters! — Sukanta Hui"
      />
    </div>
  );
}