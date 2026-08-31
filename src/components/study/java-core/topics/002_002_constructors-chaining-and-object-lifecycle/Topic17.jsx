import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import immutableDemoCode from "./topic17_files/ImmutableClassConstructorSafetyDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 17
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Thread-Safety &amp; Immutability
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Constructors in Immutable Classes: Safe Final Field Assignment
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to design rock-solid immutable entities in Java. Master defensive copying of mutable collections, safe <code className="text-emerald-300 font-mono">final</code> field assignments, and avoiding the dangerous "this reference escape" trap.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🛡️</span> Building Thread-Safe Invariant Shields
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An <strong>Immutable Object</strong> cannot be altered once created. Its constructor serves as the sole gateway for state setup, requiring defensive copying of incoming collections and absolute freeze semantics.
          </p>
        </div>
      </section>

      {/* Section 2: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={immutableDemoCode}
          title="ImmutableClassConstructorSafetyDemo.java"
          highlightLines={[19, 26, 44, 50]}
        />
      </section>

      {/* Section 3: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Immutable Class Constructors FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 4: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 17: Immutable Class Constructors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic17_immutable_constructors_note.txt"
        />
      </section>

      {/* Section 5: Teacher's Note */}
      <Teacher
        note="In concurrent enterprise Java, immutability is king. Always defensively copy mutable collections in your constructor, assign final fields, and never let 'this' escape before the constructor finishes! — Sukanta Hui"
      />
    </div>
  );
}