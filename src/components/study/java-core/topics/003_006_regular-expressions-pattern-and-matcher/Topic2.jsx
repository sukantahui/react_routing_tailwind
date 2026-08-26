import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compileDemoCode from "./topic2_files/PatternCompileAndMatcherExecutionDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Matcher Execution
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Compiling Regex: <code className="text-emerald-400 font-mono">Pattern.compile()</code> &amp; <code className="text-sky-400 font-mono">Matcher.find()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the core regex iteration loop: scanning unstructured paragraphs, extracting matching substrings with <code className="text-emerald-300 font-mono">matcher.group()</code>, and tracking boundary indices.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={compileDemoCode}
          title="PatternCompileAndMatcherExecutionDemo.java"
          highlightLines={[7, 13, 21, 25, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Pattern Compilation FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 2: Pattern Compilation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic2_pattern_compile_note.txt"
        />
      </section>

      <Teacher
        note="Notice the while (matcher.find()) loop! It acts like an Iterator over every match found in the text, allowing you to extract each item one by one! — Sukanta Hui"
      />
    </div>
  );
}