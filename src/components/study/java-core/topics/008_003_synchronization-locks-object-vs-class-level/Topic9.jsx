import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rntDemoCode from "./topic9_files/LockReentrancySelfDeadlockAvoidanceDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Lock Reentrancy
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Lock Reentrancy: Why Java Intrinsic Locks Avoid <code className="text-rose-400 font-mono">Self-Deadlock</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand lock ownership mechanics: tracing per-thread monitor recursion counters and observing how subclass-to-superclass synchronized method invocations execute without self-deadlock.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rntDemoCode}
          title="LockReentrancySelfDeadlockAvoidanceDemo.java"
          highlightLines={[7, 10, 15, 16, 21, 22, 25, 26, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Lock Reentrancy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 9: Lock Reentrancy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic9_lock_reentrancy_note.txt"
        />
      </section>

      <Teacher
        note="If Java locks were not reentrant, calling 'super.doSomething()' from a synchronized subclass method would cause the thread to freeze forever waiting for itself! Reentrancy means: if you already hold the key, you can open any internal doors inside your room without waiting! — Sukanta Hui"
      />
    </div>
  );
}