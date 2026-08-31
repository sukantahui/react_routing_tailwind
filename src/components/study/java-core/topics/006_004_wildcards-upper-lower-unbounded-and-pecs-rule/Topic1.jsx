import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import wldDemoCode from "./topic1_files/WildcardSymbolIntroductionDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 1
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Wildcard Symbol
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Introduction to the Wildcard Symbol (<code className="text-emerald-400 font-mono">?</code>): Unknown Type Representation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Restore collection polymorphism: utilizing the <code className="text-emerald-300 font-mono">?</code> wildcard to accept any parameterized list and inspect elements safely as Java Objects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={wldDemoCode}
          title="WildcardSymbolIntroductionDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Wildcard FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 1: Wildcard Symbol (?)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic1_wildcard_symbol_intro_note.txt"
        />
      </section>

      <Teacher
        note="The wildcard '?' is like a blank wildcard in a card game! It says 'I don't know or care what type is inside this list, I will treat them all respectfully as Objects!' — Sukanta Hui"
      />
    </div>
  );
}