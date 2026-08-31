import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import reuseDemoCode from "./topic1_files/StandardExceptionsReuseDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Standard Idioms
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Throwing Built-in Standard Exceptions (<code className="text-emerald-400 font-mono">IllegalArgumentException</code>, <code className="text-sky-400 font-mono">IllegalStateException</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply Effective Java Item 72: mastering the standard JDK exception idioms to report invalid arguments, lifecycle violations, and missing elements cleanly.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={reuseDemoCode}
          title="StandardExceptionsReuseDemo.java"
          highlightLines={[7, 10, 11, 12, 19, 23, 24, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Standard Exceptions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 1: Standard Exceptions Reuse"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic1_standard_exceptions_reuse_note.txt"
        />
      </section>

      <Teacher
        note="Before creating a custom 'BadInputException', check if 'IllegalArgumentException' already does the job! Reusing standard exceptions makes your code intuitive to every Java engineer in the world! — Sukanta Hui"
      />
    </div>
  );
}