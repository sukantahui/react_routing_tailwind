import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rafDemoCode from "./topic2_files/ReentrantLockAdvancedFeaturesDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Advanced Lock Features
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">ReentrantLock</code> Features: <code className="text-sky-400 font-mono">tryLock()</code>, Timeouts &amp; <code className="text-purple-400 font-mono">lockInterruptibly()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct resilient locking: comparing non-blocking polling, timed acquisition timeouts, interrupt-responsive queuing with <code className="text-purple-300 font-mono">lockInterruptibly()</code>, and FIFO fairness policies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rafDemoCode}
          title="ReentrantLockAdvancedFeaturesDemo.java"
          highlightLines={[7, 10, 14, 15, 18, 19, 23, 24, 28, 29, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Advanced Lock Features FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 2: ReentrantLock Advanced Features"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic2_reentrantlock_advanced_features_note.txt"
        />
      </section>

      <Teacher
        note="If a user clicks 'Cancel' on a long transfer in your app, 'lockInterruptibly()' lets you cancel their waiting thread immediately! With 'synchronized', the thread would be stuck forever ignoring the cancel button! — Sukanta Hui"
      />
    </div>
  );
}