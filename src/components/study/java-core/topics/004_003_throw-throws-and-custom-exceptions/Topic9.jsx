import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import suiteDemoCode from "./topic9_files/StandardExceptionConstructorsSuiteDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Canonical Idioms
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Implementing the 4 Standard Custom Exception Constructors
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Follow Java API best practices: implementing the 4 standard constructors (no-arg, message, cause, and message + cause) for robust exception chaining.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={suiteDemoCode}
          title="StandardExceptionConstructorsSuiteDemo.java"
          highlightLines={[7, 10, 11, 15, 16, 20, 21, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Exception Constructors FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 9: 4 Canonical Constructors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic9_canonical_constructors_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you create a custom exception class in IntelliJ or Eclipse, always generate all 4 constructors! That way your fellow developers can throw it with a message, with a root cause, or both! — Sukanta Hui"
      />
    </div>
  );
}