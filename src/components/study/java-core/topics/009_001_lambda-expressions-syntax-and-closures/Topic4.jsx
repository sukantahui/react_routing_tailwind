import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fisDemoCode from "./topic4_files/FunctionalInterfaceSamContractDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            SAM Contract
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Functional Interfaces: The <code className="text-emerald-400 font-mono">Single Abstract Method (SAM)</code> Contract
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master SAM interface architecture: analyzing the single abstract method rule, default and static method allowances, and Object method overrides.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fisDemoCode}
          title="FunctionalInterfaceSamContractDemo.java"
          highlightLines={[7, 8, 11, 14, 15, 19, 20, 24, 25, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="SAM Contract FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 4: SAM Contract"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic4_sam_contract_note.txt"
        />
      </section>

      <Teacher
        note="The SAM rule is very strict: exactly ONE abstract method! You can add 50 default methods or static utility methods, but there can only ever be ONE abstract method for a lambda to bind to! — Sukanta Hui"
      />
    </div>
  );
}