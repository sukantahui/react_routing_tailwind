import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mcqDemoCode from "./topic4_files/FileIoComprehensiveMcqExamDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_007 · Topic 4
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Self-Assessment Exam
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comprehensive File I/O Multiple Choice Question Assessment Exam
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Validate your Java I/O knowledge: solving multiple-choice questions covering stream buffer sizing, NIO.2 memory boundaries, and serialization contracts.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mcqDemoCode}
          title="FileIoComprehensiveMcqExamDemo.java"
          highlightLines={[7, 10, 24, 25, 30, 31, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="MCQ Exam FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_007 Topic 4: File I/O MCQ Exam"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_007_topic4_file_io_mcq_exam_note.txt"
        />
      </section>

      <Teacher
        note="Reviewing these core questions will prepare you for technical interviews at top software companies! Make sure you can explain why Files.lines() is superior to Files.readAllLines()! — Sukanta Hui"
      />
    </div>
  );
}