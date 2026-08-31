import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stringIntroDemoCode from "./topic0_files/StringFoundationsOverviewDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Segment 3 Opener
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          What is <code className="text-indigo-400 font-mono">java.lang.String</code> &amp; Why It Dominates Java Memory
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why <code className="text-indigo-300 font-mono">java.lang.String</code> accounts for over 30% of enterprise JVM heap memory, and explore modern Java 9 Compact Strings (<code className="text-emerald-400 font-mono">byte[]</code> Latin-1).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={stringIntroDemoCode}
          title="StringFoundationsOverviewDemo.java"
          highlightLines={[7, 14, 17, 18, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="String Foundations FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 0: java.lang.String Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic0_string_overview_note.txt"
        />
      </section>

      <Teacher
        note="Welcome to Segment 3! In Java, Strings are not primitive types like int or double—they are full-fledged immutable objects with their own specialized memory region in the Heap. — Sukanta Hui"
      />
    </div>
  );
}
