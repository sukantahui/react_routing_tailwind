import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import syntaxDemoCode from "./topic2_files/TryWithResourcesSyntaxMechanicsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 2
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Syntax Mechanics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Try-with-Resources Syntax &amp; Execution Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the exact execution lifecycle: understanding block variable scoping, optional catch/finally clauses, and why resource teardown happens before error handlers run.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={syntaxDemoCode}
          title="TryWithResourcesSyntaxMechanicsDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 18, 19, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ARM Syntax FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 2: ARM Syntax Mechanics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic2_arm_syntax_mechanics_note.txt"
        />
      </section>

      <Teacher
        note="Notice that in try-with-resources, the 'catch' and 'finally' blocks are completely optional! If you declare 'throws IOException' on your method, you can write 'try (Reader r = ...)' with NO catch and NO finally! — Sukanta Hui"
      />
    </div>
  );
}