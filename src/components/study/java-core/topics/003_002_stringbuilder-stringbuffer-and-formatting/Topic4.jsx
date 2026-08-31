import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import growthDemoCode from "./topic4_files/BufferCapacityAndGrowthFormulaDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Buffer Growth Formula
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Internal Buffer Mechanics: Initial Capacity (16) &amp; Growth Formula <code className="text-emerald-400 font-mono">(old * 2) + 2</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal buffer mechanics: default 16-character allocations, dynamic array resizing, and why pre-sizing buffers eliminates memory copying overhead.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={growthDemoCode}
          title="BufferCapacityAndGrowthFormulaDemo.java"
          highlightLines={[7, 15, 17, 21, 27, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Buffer Growth FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 4: Buffer Growth Formula"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic4_buffer_growth_note.txt"
        />
      </section>

      <Teacher
        note="If you know your string is going to be 500 characters long, initialize it as 'new StringBuilder(500)'! That stops Java from constantly resizing and copying the internal array 6 times. — Sukanta Hui"
      />
    </div>
  );
}