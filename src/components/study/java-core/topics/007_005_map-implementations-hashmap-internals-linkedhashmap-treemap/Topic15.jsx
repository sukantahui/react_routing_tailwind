import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lstDemoCode from "./topic15_files/HashMapMutableKeyLostProblemDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 15
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Lost Key Hazard
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Mutable Key Hazard: How Mutating Keys Produces Unreachable <code className="text-rose-400 font-mono">&quot;Lost Keys&quot;</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine dangerous enterprise defects: observing how mutating key fields after insertion strands entries in obsolete hash buckets, causing silent memory leaks and null lookups.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lstDemoCode}
          title="HashMapMutableKeyLostProblemDemo.java"
          highlightLines={[7, 10, 16, 17, 36, 37, 43, 44, 45]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Lost Key FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 15: Mutable Key Lost Problem"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic15_mutable_key_lost_problem_note.txt"
        />
      </section>

      <Teacher
        note="This is a classic senior Java interview question: 'What happens if you change a key's field after putting it in a HashMap?' The answer is: the key is LOST! Java looks in the new bucket and finds nothing, while the old entry sits in memory forever! Always use immutable keys! — Sukanta Hui"
      />
    </div>
  );
}