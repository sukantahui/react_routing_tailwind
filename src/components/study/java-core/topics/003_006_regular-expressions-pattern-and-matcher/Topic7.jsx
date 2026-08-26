import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import quantDemoCode from "./topic7_files/RegexQuantifiersComparisonDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Quantifier Mechanics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Quantifiers: Greedy (<code className="text-rose-400 font-mono">.*</code>), Reluctant (<code className="text-emerald-400 font-mono">.*?</code>) &amp; Possessive (<code className="text-sky-400 font-mono">.*+</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the three engine matching strategies: avoiding greedy HTML tag over-consumption with lazy <code className="text-emerald-300 font-mono">.*?</code> and preventing backtracking CPU thrashing with possessive quantifiers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={quantDemoCode}
          title="RegexQuantifiersComparisonDemo.java"
          highlightLines={[7, 16, 17, 24, 25, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Quantifiers FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 7: Regex Quantifiers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic7_quantifiers_note.txt"
        />
      </section>

      <Teacher
        note="If you are parsing HTML tags, NEVER use '<b>.*</b>'! It will swallow all your tags from the first <b> on line 1 to the last </b> on line 50! Always use lazy '<b>.*?</b>'! — Sukanta Hui"
      />
    </div>
  );
}