import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import iroDemoCode from "./topic2_files/InstructionReorderingExplanationDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Instruction Reordering
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-purple-400 font-mono">Instruction Reordering</code>: JIT Optimizations &amp; As-If-Serial Semantics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect compiler optimizations: exploring how JIT compilers and out-of-order CPU execution pipelines reorder instructions for speed and why multi-threaded programs require memory barriers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={iroDemoCode}
          title="InstructionReorderingExplanationDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 21, 22, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Instruction Reordering FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 2: Instruction Reordering"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic2_instruction_reordering_note.txt"
        />
      </section>

      <Teacher
        note="The CPU is allowed to execute line 2 before line 1 if it makes the computer faster! For 1 thread, you never notice. But with multiple threads, thread 2 might see your ready flag before your data is even initialized! That's why we need memory barriers! — Sukanta Hui"
      />
    </div>
  );
}