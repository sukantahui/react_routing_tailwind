import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ifaceDemoCode from "./topic10_files/IncomeTaxRegime.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Interface Extensibility
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Enums Implementing Interfaces: Extensible Enums &amp; The <code className="text-emerald-400 font-mono">Strategy Pattern</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build extensible strategy engines: implementing interfaces across enum constants to enable polymorphic assignment and pluggable tax calculation rules.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ifaceDemoCode}
          title="IncomeTaxRegime.java"
          highlightLines={[7, 12, 13, 14, 19, 20, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Interface Implementation FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 10: Enums Implementing Interfaces"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic10_enums_implementing_interfaces_note.txt"
        />
      </section>

      <Teacher
        note="If you need extensible enums (where different modules can add new operations), have an interface like 'Operation' and let different enums implement it! This is pure Effective Java elegance! — Sukanta Hui"
      />
    </div>
  );
}