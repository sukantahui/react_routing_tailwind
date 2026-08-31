import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ctmDemoCode from "./topic5_files/CarrierThreadsMountingMechanicsDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Carrier Threads
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Carrier Threads</code>: How the JVM Mounts &amp; Dispatches Virtual Tasks
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore JVM internals: understanding underlying <code className="text-sky-300 font-mono">ForkJoinPool</code> carrier pools, mounting CPU bytecode execution, and heap continuation unmounting lifecycles.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ctmDemoCode}
          title="CarrierThreadsMountingMechanicsDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 21, 22, 26, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Carrier Threads FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 5: Carrier Threads"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic5_carrier_threads_note.txt"
        />
      </section>

      <Teacher
        note="Think of Carrier Threads as taxi drivers and Virtual Threads as passengers: A taxi driver picks up a passenger (mounts), drives them while they are active, and when the passenger stops to do shopping (blocking I/O), the taxi drops them off (unmounts) and picks up another passenger immediately! No wasted waiting! — Sukanta Hui"
      />
    </div>
  );
}