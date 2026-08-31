import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import simDemoCode from "./topic4_files/SynchronizedInstanceMethodsDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Synchronized Methods
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Synchronized Instance Methods: Implicit Acquisition of <code className="text-emerald-400 font-mono">this</code> Object Lock
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enforce thread-safe transactions: applying <code className="text-emerald-300 font-mono">synchronized</code> keywords to instance methods to acquire <code className="text-sky-300 font-mono">this</code> monitor locks and eliminate financial overdraws.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={simDemoCode}
          title="SynchronizedInstanceMethodsDemo.java"
          highlightLines={[7, 10, 14, 15, 23, 24, 38, 39, 45, 46]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Synchronized Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 4: Synchronized Instance Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic4_synchronized_instance_methods_note.txt"
        />
      </section>

      <Teacher
        note="By simply adding the word 'synchronized' to our withdraw method, Swadeep acquires the lock on the account, checks the balance, and withdraws safely! When Tuhina tries, she waits politely until Swadeep is done! No more deficit! — Sukanta Hui"
      />
    </div>
  );
}