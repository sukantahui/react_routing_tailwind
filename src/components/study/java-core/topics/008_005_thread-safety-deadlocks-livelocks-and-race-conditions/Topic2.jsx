import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dlkDemoCode from "./topic2_files/DeadlockDefinitionConceptDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 2
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Deadlock Concept
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What is a <code className="text-rose-400 font-mono">Deadlock</code>: Anatomy of Circular Mutual Lock Blockages
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Uncover the deadly embrace: understanding how inverted lock acquisition orders cause multiple threads to enter permanent <code className="text-rose-300 font-mono">BLOCKED</code> state dependencies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={dlkDemoCode}
          title="DeadlockDefinitionConceptDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Deadlock Concept FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 2: What is a Deadlock"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic2_deadlock_concept_note.txt"
        />
      </section>

      <Teacher
        note="Deadlock is like two stubborn people meeting in a narrow doorway: person A refuses to step back until person B steps back, and person B refuses to step back until person A steps back! Both stand frozen forever! — Sukanta Hui"
      />
    </div>
  );
}