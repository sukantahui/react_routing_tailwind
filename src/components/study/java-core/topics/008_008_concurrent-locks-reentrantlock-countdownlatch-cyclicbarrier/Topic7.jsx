import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cdlDemoCode from "./topic7_files/CountDownLatchGatekeeperDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            CountDownLatch
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Concurrency Synchronizers: <code className="text-emerald-400 font-mono">CountDownLatch</code> Gatekeeper
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Coordinate multi-threaded startup phases: utilizing one-time <code className="text-emerald-300 font-mono">CountDownLatch</code> barriers to block execution until N parallel initialization tasks complete.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cdlDemoCode}
          title="CountDownLatchGatekeeperDemo.java"
          highlightLines={[7, 10, 14, 15, 26, 27, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="CountDownLatch FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 7: CountDownLatch Gatekeeper"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic7_countdownlatch_gatekeeper_note.txt"
        />
      </section>

      <Teacher
        note="CountDownLatch is like a starting gate at a marathon: The main application waits at the gate until all 3 worker threads signal 'countDown()' that their systems are ready! Once the count hits 0, the gate opens and the race begins! — Sukanta Hui"
      />
    </div>
  );
}