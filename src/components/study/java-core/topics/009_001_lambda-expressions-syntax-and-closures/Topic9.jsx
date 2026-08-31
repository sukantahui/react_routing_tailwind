import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import wmcDemoCode from "./topic9_files/WhyMutatingCapturedVariablesIsProhibitedCapstoneDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 9
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Mutation Prohibition Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Mutating Captured Variables is Prohibited: Memory Semantics &amp; Thread Safety (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize closure architecture: analyzing stack frame lifetimes, pass-by-value capture, race condition prevention in parallel streams, and heap-based atomic container workarounds.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={wmcDemoCode}
          title="WhyMutatingCapturedVariablesIsProhibitedCapstoneDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 23, 24, 28, 29, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Mutation Prohibition FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 9: Mutation Prohibition Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic9_mutation_prohibition_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 009_001! You have mastered the entire science of Java 8 Lambda Expressions—from declarative syntax shortcuts and Target Typing to SAM contracts, invokedynamic bytecode, lexical scoping, and closure memory mechanics! — Sukanta Hui"
      />
    </div>
  );
}