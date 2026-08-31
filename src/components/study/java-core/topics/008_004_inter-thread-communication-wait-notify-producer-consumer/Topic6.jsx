import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ntfDemoCode from "./topic6_files/HowNotifyWakesSingleWaiterDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            notify() Mechanics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          How <code className="text-amber-400 font-mono">notify()</code> Works: Arbitrary Selection &amp; Starvation Hazards
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze single-signal dispatching: examining non-deterministic Wait-Set selection, Entry-Set lock migration, and the risk of orphaned waiting threads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ntfDemoCode}
          title="HowNotifyWakesSingleWaiterDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 36, 37, 38, 48, 49]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="notify() Mechanics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 6: How notify() Works"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic6_how_notify_works_note.txt"
        />
      </section>

      <Teacher
        note="If 3 students are waiting for admission results and you call 'notify()', Java picks ONLY ONE random student to wake up! The other 2 remain asleep forever! That's why in real-world systems, we almost always use 'notifyAll()' so nobody gets left behind! — Sukanta Hui"
      />
    </div>
  );
}