import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mutDemoCode from "./topic5_files/HashSetElementMutabilityHazardDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Mutability Hazard
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The Mutability Hazard: Why Elements Placed in HashSet <code className="text-rose-400 font-mono">MUST</code> Be Immutable
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine dangerous memory leaks: observing how mutating key fields after insertion traps objects in obsolete hash buckets, making them unfindable and unremovable.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mutDemoCode}
          title="HashSetElementMutabilityHazardDemo.java"
          highlightLines={[7, 10, 16, 17, 36, 37, 42, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Mutability Hazard FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 5: Mutability Hazard in HashSets"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic5_mutability_hazard_note.txt"
        />
      </section>

      <Teacher
        note="Never use a mutable object as a Set element or Map key! If someone changes the student ID later, the hash code changes, and Java will look in the wrong bucket, making your object completely lost inside memory! Always make key fields final! — Sukanta Hui"
      />
    </div>
  );
}