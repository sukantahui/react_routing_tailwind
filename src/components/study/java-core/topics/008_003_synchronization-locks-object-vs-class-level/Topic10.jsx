import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pflDemoCode from "./topic10_files/PrivateFinalLockIdiomDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Private Final Locks
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Defensive Concurrency: <code className="text-emerald-400 font-mono">private final Object lock</code> Idiom
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Harden concurrency boundaries: using encapsulated <code className="text-emerald-300 font-mono">private final Object</code> lock targets to prevent external client-side lock hijacking and denial-of-service deadlocks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pflDemoCode}
          title="PrivateFinalLockIdiomDemo.java"
          highlightLines={[7, 10, 15, 16, 20, 21, 38, 39, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Private Final Lock FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 10: Private Final Lock Idiom"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic10_private_final_lock_idiom_note.txt"
        />
      </section>

      <Teacher
        note="Never let outside callers see your lock! If you synchronize on 'this', anyone can write 'synchronized(yourObject)' and freeze your entire class! Always create a 'private final Object lock = new Object()' to keep your synchronization completely private and safe! — Sukanta Hui"
      />
    </div>
  );
}