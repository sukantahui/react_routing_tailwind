import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tlkDemoCode from "./topic9_files/BreakingDeadlocksWithTryLockTimeoutDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            tryLock() Timeouts
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Breaking Deadlocks with Timeouts: <code className="text-emerald-400 font-mono">ReentrantLock.tryLock(timeout)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct resilient lock acquisitions: replacing unbounded blocking with timed <code className="text-emerald-300 font-mono">tryLock()</code> attempts, voluntary lock release in <code className="text-amber-300 font-mono">finally</code>, and randomized back-off loops.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tlkDemoCode}
          title="BreakingDeadlocksWithTryLockTimeoutDemo.java"
          highlightLines={[7, 10, 19, 20, 24, 25, 33, 34, 35, 41, 42]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="tryLock() Timeouts FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 9: Breaking Deadlocks with tryLock()"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic9_trylock_timeouts_note.txt"
        />
      </section>

      <Teacher
        note="With 'synchronized', if someone doesn't give you the lock, your thread waits until the end of time! With 'tryLock(50, TimeUnit.MILLISECONDS)', your thread says: 'If you don't give me the lock in 50 milliseconds, I'm dropping my other lock and trying again later!' Deadlock defeated! — Sukanta Hui"
      />
    </div>
  );
}