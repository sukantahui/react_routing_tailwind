import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import philDemoCode from "./topic7_files/CheckedVsUncheckedDesignPhilosophyDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Architectural Philosophy
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Philosophy: When to Design <code className="text-emerald-400 font-mono">Checked</code> vs <code className="text-rose-400 font-mono">Unchecked</code> Exceptions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply Effective Java Item 70: designing domain exception hierarchies that distinguish actionable business recovery from fatal precondition violations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={philDemoCode}
          title="CheckedVsUncheckedDesignPhilosophyDemo.java"
          highlightLines={[7, 10, 11, 19, 20, 25, 28, 33, 48, 49]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Design Philosophy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 7: Design Philosophy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic7_exception_design_philosophy_note.txt"
        />
      </section>

      <Teacher
        note="Ask this one simple question: 'Can the calling method realistically fix this issue?' If yes, make it Checked. If it's a programming bug or bad input, make it Unchecked! — Sukanta Hui"
      />
    </div>
  );
}