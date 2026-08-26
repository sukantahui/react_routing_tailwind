import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import examDemoCode from "./topic5_files/ExceptionHandlingComprehensiveExamDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_006 · Topic 5
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            MCQ Self-Assessment
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Comprehensive Exception Handling Multiple Choice Exam &amp; Self-Assessment
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Test your mastery across the entire exception hierarchy: answering core certification-style questions covering catch ordering, finally edge cases, and ARM semantics.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={examDemoCode}
          title="ExceptionHandlingComprehensiveExamDemo.java"
          highlightLines={[7, 13, 14, 15, 16, 17]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Exam Assessment FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_006 Topic 5: Exception MCQ Exam"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_006_topic5_exception_mcq_exam_note.txt"
        />
      </section>

      <Teacher
        note="Test yourself with these questions! If you can explain why catch order matters and why return-in-finally is dangerous, you are ready for any senior Java interview! — Sukanta Hui"
      />
    </div>
  );
}