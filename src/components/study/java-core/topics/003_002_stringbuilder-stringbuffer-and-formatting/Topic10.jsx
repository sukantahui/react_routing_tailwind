import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tbMethodsDemoCode from "./topic10_files/TextBlockMethodsAndInterpolationDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Modern Text Utilities
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Text Block Interpolation: <code className="text-purple-400 font-mono">.formatted()</code> &amp; Line Continuations
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn modern template interpolation: using Java 15 <code className="text-emerald-300 font-mono">.formatted()</code> on text blocks, suppressing line breaks with trailing backslashes, and preserving trailing whitespace.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tbMethodsDemoCode}
          title="TextBlockMethodsAndInterpolationDemo.java"
          highlightLines={[7, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Text Block Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 10: Text Block Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic10_tb_methods_note.txt"
        />
      </section>

      <Teacher
        note="Using .formatted() at the end of a Text Block gives you clean, python-like template interpolation without needing third-party template libraries! — Sukanta Hui"
      />
    </div>
  );
}