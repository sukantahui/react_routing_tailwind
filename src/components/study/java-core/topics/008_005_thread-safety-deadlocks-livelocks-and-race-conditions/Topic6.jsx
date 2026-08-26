import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import c3pDemoCode from "./topic6_files/Coffman3NoPreemptionDeepDiveDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Coffman 3: No Preemption
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Coffman Condition 3: <code className="text-purple-400 font-mono">No Preemption</code> (Unconfiscated Lock Ownership)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze lock retention immutability: understanding why JVM monitors forbid forced lock revocation and mastering cooperative back-off via <code className="text-emerald-300 font-mono">tryLock()</code> timeouts.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={c3pDemoCode}
          title="Coffman3NoPreemptionDeepDiveDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="No Preemption FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 6: No Preemption"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic6_no_preemption_note.txt"
        />
      </section>

      <Teacher
        note="'No Preemption' means the JVM will never wrestle a lock out of a thread's hands! If thread A is holding a lock, it keeps it until it chooses to release it! That's why we use 'tryLock()' so threads can voluntarily release their locks if they get stuck! — Sukanta Hui"
      />
    </div>
  );
}