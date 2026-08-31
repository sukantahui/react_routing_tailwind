import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import finalDemoCode from "./topic6_files/MultiCatchImplicitlyFinalDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 6
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Type Safety Guard
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Multi-Catch Exception Parameter is Implicitly <code className="text-emerald-400 font-mono">final</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore JVM type safety invariants: understanding why Java strictly forbids reassigning union-type multi-catch parameters and preserves compiler integrity.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={finalDemoCode}
          title="MultiCatchImplicitlyFinalDemo.java"
          highlightLines={[7, 14, 15, 17, 18, 23, 24, 25, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Implicitly Final FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 6: Multi-Catch Implicitly Final"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic6_multicatch_final_note.txt"
        />
      </section>

      <Teacher
        note="Even though you don't write the keyword 'final', the multi-catch variable is 100% final! The compiler guarantees you cannot reassign it! — Sukanta Hui"
      />
    </div>
  );
}