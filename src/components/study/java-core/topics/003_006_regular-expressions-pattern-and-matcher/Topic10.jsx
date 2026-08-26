import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import backrefDemoCode from "./topic10_files/RegexBackreferencesMasteryDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 10
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Self-Referencing Patterns
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Backreferences (<code className="text-amber-400 font-mono">\1</code>, <code className="text-amber-400 font-mono">\2</code>): Detecting Duplicate Words &amp; Typos
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build intelligent grammar linters: matching duplicate consecutive words with <code className="text-amber-300 font-mono">\1</code> and deduplicating phrases with replacement tokens <code className="text-emerald-300 font-mono">$1</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={backrefDemoCode}
          title="RegexBackreferencesMasteryDemo.java"
          highlightLines={[7, 15, 17, 23, 24, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Backreferences FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 10: Regex Backreferences"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic10_backreferences_note.txt"
        />
      </section>

      <Teacher
        note="Backreferences are so powerful! With '\\b(\\w+)\\s+\\1\\b' you can scan an entire 500-page book and instantly highlight every single duplicate word typo! — Sukanta Hui"
      />
    </div>
  );
}