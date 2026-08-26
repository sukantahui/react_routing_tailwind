import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import flagsDemoCode from "./topic3_files/RegexCompilationFlagsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 3
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Flag Modifiers
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Regex Flags: <code className="text-purple-400 font-mono">CASE_INSENSITIVE</code>, <code className="text-emerald-400 font-mono">MULTILINE</code> &amp; <code className="text-amber-400 font-mono">DOTALL</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to customize pattern compilation rules: matching across newlines with <code className="text-amber-300 font-mono">Pattern.DOTALL</code> and combining flags using bitwise bitmasks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={flagsDemoCode}
          title="RegexCompilationFlagsDemo.java"
          highlightLines={[7, 15, 16, 25, 26, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Regex Flags FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 3: Regex Flags"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic3_regex_flags_note.txt"
        />
      </section>

      <Teacher
        note="If your regex needs to scrape HTML or JSON across multiple lines, you MUST use Pattern.DOTALL! Otherwise, the dot '.' stops as soon as it hits the first newline! — Sukanta Hui"
      />
    </div>
  );
}