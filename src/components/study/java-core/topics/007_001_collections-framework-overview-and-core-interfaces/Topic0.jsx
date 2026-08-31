import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import arrDemoCode from "./topic0_files/ArraysVsCollectionsComparisonDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JCF Motivation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Arrays are Insufficient for Modern Software: Fixed Capacity &amp; Inflexibility
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why arrays fell short: examining fixed capacity constraints, manual element shifting overhead, and the architectural motivation behind the Java Collections Framework.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={arrDemoCode}
          title="ArraysVsCollectionsComparisonDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 23, 29, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Arrays vs Collections FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 0: Why Arrays are Insufficient"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic0_why_arrays_insufficient_note.txt"
        />
      </section>

      <Teacher
        note="Welcome to Segment 7: Java Collections Framework! Arrays were fine in the 1990s, but modern enterprise software needs dynamic resizing, hash lookup, uniqueness checks, and FIFO queues! JCF gives you all of this ready out of the box! — Sukanta Hui"
      />
    </div>
  );
}