import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import regexArchDemoCode from "./topic1_files/RegexPackageArchitectureDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Regex Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.util.regex</code> Package: <code className="text-emerald-400 font-mono">Pattern</code>, <code className="text-sky-400 font-mono">Matcher</code> &amp; <code className="text-rose-400 font-mono">PatternSyntaxException</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the tripartite regex engine: thread-safe compiled <code className="text-emerald-300 font-mono">Pattern</code> automata, mutable <code className="text-sky-300 font-mono">Matcher</code> cursors, and syntax exception diagnostics.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={regexArchDemoCode}
          title="RegexPackageArchitectureDemo.java"
          highlightLines={[7, 16, 17, 21, 22, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Regex Architecture FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 1: Regex Architecture"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic1_regex_architecture_note.txt"
        />
      </section>

      <Teacher
        note="Never compile a Pattern inside a loop! Pre-compile it once as 'public static final Pattern MY_PAT = Pattern.compile(...);' to save massive CPU compiling overhead! — Sukanta Hui"
      />
    </div>
  );
}