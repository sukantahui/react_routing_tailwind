import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import srtDemoCode from "./topic0_files/SortingParadigmOverviewDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Sorting Paradigms
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Sorting Objects in Java: Natural Ordering vs Custom Strategy Ordering
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master object sequencing paradigms: comparing intrinsic default ordering (<code className="text-emerald-300 font-mono">Comparable</code>) against dynamic external sorting strategies (<code className="text-sky-300 font-mono">Comparator</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={srtDemoCode}
          title="SortingParadigmOverviewDemo.java"
          highlightLines={[7, 10, 26, 27, 43, 44, 48, 49]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Sorting Paradigms FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 0: Sorting Paradigms"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic0_sorting_paradigms_note.txt"
        />
      </section>

      <Teacher
        note="Welcome to Module 007_008! Think of Comparable as a person's natural default sorting (like sorting students by roll number), while Comparator is an external judge sorting them by GPA, height, or name! — Sukanta Hui"
      />
    </div>
  );
}