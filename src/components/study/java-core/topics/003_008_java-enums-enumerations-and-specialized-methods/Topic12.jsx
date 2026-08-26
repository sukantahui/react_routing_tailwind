import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import singleDemoCode from "./topic12_files/DatabaseConnectionPoolSingleton.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Singleton Capstone
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why Enum is the Ultimate Thread-Safe <code className="text-emerald-400 font-mono">Singleton</code> in Java (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the highest standard of enterprise singleton architecture: exploring why single-element enums provide impenetrable defense against multithreading races, serialization duplication, and reflection attacks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={singleDemoCode}
          title="DatabaseConnectionPoolSingleton.java"
          highlightLines={[7, 10, 11, 14, 15, 23, 24, 27, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Enum Singleton FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 12: Enum Singleton Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic12_enum_singleton_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations! You have completed Module 003_008 and ALL OF SEGMENT 3! You have mastered Java Strings, StringBuilders, Wrapper Classes, Math & BigDecimals, java.time, Regex Pattern & Matcher, Nested Classes, and Java Enums! — Sukanta Hui"
      />
    </div>
  );
}