import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tppDemoCode from "./topic12_files/ThreadPinningPitfallDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 12
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Thread Pinning Pitfall
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-rose-400 font-mono">Thread Pinning</code> Pitfall: <code className="text-amber-400 font-mono">synchronized</code> vs <code className="text-emerald-400 font-mono">ReentrantLock</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Identify production concurrency traps: diagnosing carrier thread pinning inside <code className="text-rose-300 font-mono">synchronized</code> blocks and migrating to unmount-safe <code className="text-emerald-300 font-mono">ReentrantLock</code> synchronization.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tppDemoCode}
          title="ThreadPinningPitfallDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 24, 25, 26, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Pinning FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 12: Thread Pinning Pitfall"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic12_thread_pinning_pitfall_note.txt"
        />
      </section>

      <Teacher
        note="If you migrate an app to Java 21 Virtual Threads and your performance slows down, check for Pinning! If you have blocking database calls inside old 'synchronized' methods, the thread is pinned and cannot unmount! Replace 'synchronized' with 'ReentrantLock' and watch it fly! — Sukanta Hui"
      />
    </div>
  );
}