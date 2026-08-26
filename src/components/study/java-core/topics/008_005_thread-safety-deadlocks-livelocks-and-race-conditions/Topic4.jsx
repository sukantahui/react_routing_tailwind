import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import c1mDemoCode from "./topic4_files/Coffman1MutualExclusionDeepDiveDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Coffman 1: Mutex
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Coffman Condition 1: <code className="text-purple-400 font-mono">Mutual Exclusion</code> (Non-Shareable Resources)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine exclusive lock semantics: analyzing why write operations mandate mutual exclusion and how <code className="text-emerald-300 font-mono">ReadWriteLock</code> relaxes exclusivity for concurrent readers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={c1mDemoCode}
          title="Coffman1MutualExclusionDeepDiveDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Mutual Exclusion FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 4: Mutual Exclusion"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic4_mutual_exclusion_note.txt"
        />
      </section>

      <Teacher
        note="Mutual exclusion simply means only one person can hold the microphone at a time. If everyone is just listening (reading data), multiple people can share the speaker! But when someone speaks (writes data), they need exclusive access! — Sukanta Hui"
      />
    </div>
  );
}