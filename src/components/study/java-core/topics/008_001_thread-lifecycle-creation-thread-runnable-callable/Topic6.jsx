import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tntDemoCode from "./topic6_files/TimedWaitingAndTerminatedStatesDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            TIMED_WAITING &amp; TERMINATED
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Thread Lifecycle: <code className="text-amber-400 font-mono">TIMED_WAITING</code> (Timeout) vs <code className="text-slate-400 font-mono">TERMINATED</code> (Dead)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Complete the lifecycle continuum: understanding bounded timer delays (<code className="text-amber-300 font-mono">TIMED_WAITING</code>), post-execution destruction (<code className="text-slate-300 font-mono">TERMINATED</code>), and the illegal restart invariant.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tntDemoCode}
          title="TimedWaitingAndTerminatedStatesDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 30, 31, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="TIMED_WAITING & TERMINATED FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 6: TIMED_WAITING & TERMINATED States"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic6_timed_waiting_and_terminated_states_note.txt"
        />
      </section>

      <Teacher
        note="Once a thread finishes its run() method and becomes TERMINATED, it is completely dead and its stack memory is gone! You can NEVER call start() on it again—if you try, Java will immediately throw an IllegalThreadStateException! — Sukanta Hui"
      />
    </div>
  );
}