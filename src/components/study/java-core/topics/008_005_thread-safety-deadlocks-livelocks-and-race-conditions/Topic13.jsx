import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lvlDemoCode from "./topic13_files/LivelockPolitePedestriansDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 13
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Livelock Anomaly
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-amber-400 font-mono">Livelock</code>: Active State Mutation &amp; Excessive Politeness Without Progress
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Contrast dynamic concurrency stalls: distinguishing 100% CPU burn in <code className="text-amber-300 font-mono">Livelock</code> retry resonance from zero-CPU <code className="text-rose-300 font-mono">Deadlock</code> freezes, and applying randomized back-off jitter.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lvlDemoCode}
          title="LivelockPolitePedestriansDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Livelock FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 13: Livelock Mechanics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic13_livelock_mechanics_note.txt"
        />
      </section>

      <Teacher
        note="In Deadlock, two threads are frozen asleep (0% CPU). In Livelock, two threads are running around frantically politely trying to let the other go first (100% CPU), but neither makes progress! Add a random delay before retrying, and the livelock vanishes! — Sukanta Hui"
      />
    </div>
  );
}