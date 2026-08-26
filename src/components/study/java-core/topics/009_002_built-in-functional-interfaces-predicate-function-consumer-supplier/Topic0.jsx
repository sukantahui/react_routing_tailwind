import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fpoDemoCode from "./topic0_files/FunctionPackageOverviewDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Functional Interfaces
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Overview of <code className="text-emerald-400 font-mono">java.util.function</code>: The 43 Built-In Interfaces
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Survey the standard functional taxonomy: exploring the 4 core interface pillars, two-argument Bi variants, specialized mathematical operators, and primitive unboxed types.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fpoDemoCode}
          title="FunctionPackageOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 21, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Function Package FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 0: Function Package Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic0_function_package_overview_note.txt"
        />
      </section>

      <Teacher
        note="You almost never need to write your own '@FunctionalInterface' in real projects! Java 8 already gave you 43 perfect built-in interfaces in 'java.util.function' that cover every possible combination of inputs and outputs! — Sukanta Hui"
      />
    </div>
  );
}