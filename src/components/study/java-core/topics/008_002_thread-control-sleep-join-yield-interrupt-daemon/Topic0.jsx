import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import slpDemoCode from "./topic0_files/ThreadSleepTimingAndLockRuleDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Thread.sleep()
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Controlling Thread Timing: <code className="text-emerald-400 font-mono">Thread.sleep(millis)</code> &amp; The Lock Retention Rule
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master execution pauses: analyzing <code className="text-emerald-300 font-mono">Thread.sleep()</code> mechanics, <code className="text-amber-300 font-mono">TIMED_WAITING</code> transitions, and why sleeping threads hold onto locks without releasing them.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={slpDemoCode}
          title="ThreadSleepTimingAndLockRuleDemo.java"
          highlightLines={[7, 10, 15, 16, 20, 21, 28, 29, 41, 42]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread.sleep() FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 0: Thread.sleep() and Lock Retention"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic0_thread_sleep_lock_rule_note.txt"
        />
      </section>

      <Teacher
        note="Remember this rule for exams: 'sleep()' sleeps with the key in its pocket! It never releases its synchronized lock! If you want a thread to release its lock while waiting, use 'wait()' instead! — Sukanta Hui"
      />
    </div>
  );
}