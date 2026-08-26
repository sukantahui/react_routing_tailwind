import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lirDemoCode from "./topic1_files/LockInterfaceAndReentrantLockDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            ReentrantLock Idiom
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Lock</code> Interface &amp; <code className="text-sky-400 font-mono">ReentrantLock</code>: The Golden Idiom
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master explicit locking: implementing the mandatory <code className="text-emerald-300 font-mono">lock()</code> pre-try acquisition and guaranteeing leak-free <code className="text-amber-300 font-mono">unlock()</code> execution inside <code className="text-purple-300 font-mono">finally</code> blocks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lirDemoCode}
          title="LockInterfaceAndReentrantLockDemo.java"
          highlightLines={[7, 10, 14, 15, 18, 19, 21, 22, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ReentrantLock Idiom FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 1: ReentrantLock Idiom"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic1_reentrantlock_idiom_note.txt"
        />
      </section>

      <Teacher
        note="Memorize this pattern for life: 'lock.lock()' goes RIGHT BEFORE the try block, and 'lock.unlock()' goes in the finally block! If you forget the finally block, an unhandled exception will lock up your server forever! — Sukanta Hui"
      />
    </div>
  );
}