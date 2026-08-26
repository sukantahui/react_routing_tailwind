import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import hzdDemoCode from "./topic0_files/StandardCollectionsThreadSafetyHazardsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Thread Safety Hazards
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why Standard Collections Are <code className="text-rose-400 font-mono">NOT</code> Thread-Safe: Race Conditions &amp; Corruption
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Demonstrate multi-threaded data corruption: executing concurrent mutations on plain HashMaps to witness race conditions, lost updates, and corrupted size counters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={hzdDemoCode}
          title="StandardCollectionsThreadSafetyHazardsDemo.java"
          highlightLines={[7, 10, 16, 18, 19, 24, 25, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Safety Hazards FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 0: Thread Safety Hazards"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic0_thread_safety_hazards_note.txt"
        />
      </section>

      <Teacher
        note="If two threads call 'put()' on a standard HashMap at the exact same moment, one of them will overwrite the other's node pointer, and your data vanishes into thin air! Standard collections must never be mutated concurrently without protection! — Sukanta Hui"
      />
    </div>
  );
}