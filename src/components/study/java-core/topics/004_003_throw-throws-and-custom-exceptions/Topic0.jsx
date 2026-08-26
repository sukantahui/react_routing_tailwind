import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import throwDemoCode from "./topic0_files/ThrowKeywordExplicitDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Explicit Raising
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-rose-400 font-mono">throw</code> Keyword: Explicitly Raising Exception Instances at Runtime
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to actively enforce business preconditions: using the <code className="text-rose-300 font-mono">throw</code> statement to instantiate exception objects and abort invalid program states.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={throwDemoCode}
          title="ThrowKeywordExplicitDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 14, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Throw Keyword FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 0: The throw Keyword"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic0_throw_keyword_note.txt"
        />
      </section>

      <Teacher
        note="Think of 'throw' as pressing an emergency fire alarm button in your method body! When you execute 'throw new ...', execution stops right there! — Sukanta Hui"
      />
    </div>
  );
}