import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cmqDemoCode from "./topic3_files/ConditionMultipleWaitQueuesDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Condition Queues
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Condition</code> Interface: Multiple Wait Queues (<code className="text-sky-400 font-mono">notFull</code> &amp; <code className="text-purple-400 font-mono">notEmpty</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Evolve beyond monolithic monitor sets: creating multiple targeted <code className="text-emerald-300 font-mono">Condition</code> wait-queues per lock to eliminate producer/consumer signal thrashing.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cmqDemoCode}
          title="ConditionMultipleWaitQueuesDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 26, 27, 32, 33, 42, 43, 48, 49]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Condition Interface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 3: Condition Interface & Multiple Queues"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic3_condition_interface_note.txt"
        />
      </section>

      <Teacher
        note="With Object.wait(), producers and consumers sleep in the same crowded room. When you call notifyAll(), everyone wakes up in confusion! With Condition, producers sleep in Room 1 (notFull) and consumers sleep in Room 2 (notEmpty)! You only wake up the exact room you need! — Sukanta Hui"
      />
    </div>
  );
}