import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import escapeDemoCode from "./topic5_files/JavaDoubleBackslashEscapingDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 5
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Escaping Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Java Escaping Requirement: Why Double Backslashes (<code className="text-amber-400 font-mono">\d</code>, <code className="text-amber-400 font-mono">\.</code>) Are Mandatory
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand the two-tier parsing pipeline: tracing how the Java language compiler and the regex engine interpret backslash sequences in string literals.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={escapeDemoCode}
          title="JavaDoubleBackslashEscapingDemo.java"
          highlightLines={[7, 14, 15, 16, 20, 21, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Double Backslash FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 5: Double Backslash Escaping"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic5_double_backslash_note.txt"
        />
      </section>

      <Teacher
        note="If you want to match a literal dot in a filename like 'test.txt', writing 'test.txt' will match 'testXtxt' because '.' is any character! You must write 'test\\.txt'! — Sukanta Hui"
      />
    </div>
  );
}