import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fviDemoCode from "./topic0_files/FunctionalVsImperativeParadigmsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Functional Paradigm
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What is <code className="text-emerald-400 font-mono">Functional Programming</code>? Unifying OOP with Declarative Paradigms
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enter the functional era: contrasting imperative mutating loops with declarative data streams, and understanding behavior parameterization in Java 8.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fviDemoCode}
          title="FunctionalVsImperativeParadigmsDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 22, 23, 24, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Functional Paradigm FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 0: Functional Paradigm"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic0_functional_paradigm_note.txt"
        />
      </section>

      <Teacher
        note="In imperative programming, you tell Java HOW to make tea step by step (boil water, add leaves, strain). In functional programming, you just say 'Give me filtered tea!' You focus on WHAT you want, and let Java handle the rest! — Sukanta Hui"
      />
    </div>
  );
}