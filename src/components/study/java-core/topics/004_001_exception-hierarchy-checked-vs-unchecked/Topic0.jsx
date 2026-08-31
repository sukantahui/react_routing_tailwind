import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import structDemoCode from "./topic0_files/StructuredExceptionsVsReturnCodesDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Fault Tolerance Strategy
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Structured Exception Handling is Superior to Return-Code Error Checking
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why modern enterprise systems eliminate C-style error codes: separating clean happy-path business logic from failure recovery and enforcing unignorable error handling.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={structDemoCode}
          title="StructuredExceptionsVsReturnCodesDemo.java"
          highlightLines={[7, 10, 11, 12, 17, 18, 20, 21, 37, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Structured Exceptions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 0: Structured Exception Handling"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic0_structured_exceptions_note.txt"
        />
      </section>

      <Teacher
        note="In C programming, if you forgot to check 'if (result == -1)', the program continued running with corrupted data! In Java, an unhandled exception halts immediately, preventing database and financial corruption! — Sukanta Hui"
      />
    </div>
  );
}