import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import gloDemoCode from "./topic8_files/GlobalLockOrderingDeadlockImmunityDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Global Lock Ordering
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Breaking Deadlocks with <code className="text-emerald-400 font-mono">Global Lock Ordering</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Implement deterministic lock hierarchies: sorting lock targets by unique IDs to eliminate inverted acquisition cycles and achieve 100% deadlock immunity during bidirectional transfers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={gloDemoCode}
          title="GlobalLockOrderingDeadlockImmunityDemo.java"
          highlightLines={[7, 10, 19, 20, 21, 24, 25, 45, 46, 52, 53]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Global Lock Ordering FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 8: Global Lock Ordering"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic8_global_lock_ordering_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you have to lock two objects together (like transferring money between two accounts), sort them by ID first! Both threads will always lock Account #101 before Account #202, making deadlocks completely impossible! — Sukanta Hui"
      />
    </div>
  );
}