import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nestDemoCode from "./topic12_files/NestedTryCatchDelegationCapstoneDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Flow Control Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Nested <code className="text-emerald-400 font-mono">try-catch</code> Blocks &amp; Multi-Tier Exception Delegation (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize flow control mastery: orchestrating multi-tiered nested error recovery, local fallbacks, and escalating failures to outer supervisor catch blocks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={nestDemoCode}
          title="NestedTryCatchDelegationCapstoneDemo.java"
          highlightLines={[7, 12, 17, 18, 20, 21, 26, 27, 30, 31, 35, 36, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Nested Try-Catch FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 12: Nested try-catch Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic12_nested_try_catch_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 004_002! You have mastered try, multiple catch blocks, ordering rules, Java 7 multi-catch, guaranteed finally execution, return corner cases, and nested delegation! — Sukanta Hui"
      />
    </div>
  );
}