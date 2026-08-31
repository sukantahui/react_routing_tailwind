import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import revDemoCode from "./topic0_files/Segment4ExceptionGrandReviewDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_006 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Segment 4 Grand Review
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Review of Segment 4: Throwable Hierarchy, Try-Catch-Finally, ARM &amp; Chaining
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Consolidate exception handling mastery: synthesizing the 6 core pillars of robust application design before undertaking real-world lab implementations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={revDemoCode}
          title="Segment4ExceptionGrandReviewDemo.java"
          highlightLines={[7, 13, 14, 15, 16, 17, 18]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Segment 4 Review FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_006 Topic 0: Segment 4 Grand Review"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_006_topic0_segment4_review_note.txt"
        />
      </section>

      <Teacher
        note="Welcome to the final capstone lab of Segment 4! In this lab, we will assemble all the pieces—custom exceptions, ARM, unified REST error models, and retry engines—into real enterprise code! — Sukanta Hui"
      />
    </div>
  );
}