import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chainDemoCode from "./topic4_files/ExceptionChainingAndWrappingDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Abstraction Protection
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Exception Chaining &amp; Wrapping: Translating Technical Failures into Domain Semantics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply Effective Java Item 73: encapsulating low-level database and network errors into expressive domain exceptions without losing root cause forensic histories.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chainDemoCode}
          title="ExceptionChainingAndWrappingDemo.java"
          highlightLines={[7, 10, 11, 12, 19, 20, 21, 22, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Exception Chaining FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 4: Exception Chaining"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic4_exception_chaining_note.txt"
        />
      </section>

      <Teacher
        note="If your UI controller catches SQLException, your architecture is leaking database details! Catch the SQLException in the DAO layer and rethrow StudentPersistenceException with the SQL error as the cause! — Sukanta Hui"
      />
    </div>
  );
}