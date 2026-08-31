import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whyEnumDemoCode from "./topic0_files/WhyEnumsAreEssentialDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Anti-Pattern Elimination
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Enums Are Needed: Eliminating Brittle <code className="text-rose-400 font-mono">int</code> Constants
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why modern Java architectures mandate type-safe enums: replacing brittle numeric codes, catching invalid states at compile time, and enhancing debugging logs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={whyEnumDemoCode}
          title="WhyEnumsAreEssentialDemo.java"
          highlightLines={[7, 10, 11, 12, 16, 17, 18, 19, 23, 27, 36, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Why Enums FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 0: Why Enums Are Needed"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic0_why_enums_needed_note.txt"
        />
      </section>

      <Teacher
        note="Never use 'public static final int' for status codes or days of the week! If a student passes '99' to an int method, Java compiles it silently. With an Enum, the compiler blocks invalid data immediately! — Sukanta Hui"
      />
    </div>
  );
}