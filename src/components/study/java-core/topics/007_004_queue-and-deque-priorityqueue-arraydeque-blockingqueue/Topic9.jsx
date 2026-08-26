import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mtxDemoCode from "./topic9_files/DequeMethodSuiteMatrixDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            12-Method Matrix
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Deque Methods: <code className="text-emerald-400 font-mono">offerFirst()</code>, <code className="text-sky-400 font-mono">pollLast()</code> &amp; <code className="text-amber-400 font-mono">peekFirst()</code> Matrix
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete 12-method Deque matrix: comparing head and tail manipulation APIs across exception-throwing and safe special-value failure modes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mtxDemoCode}
          title="DequeMethodSuiteMatrixDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 23, 24, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Deque Matrix FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 9: Deque Method Matrix"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic9_deque_method_matrix_note.txt"
        />
      </section>

      <Teacher
        note="Memorizing the 12 Deque methods is easy! Just remember 3 verbs (add/offer, remove/poll, get/peek) and attach either 'First' or 'Last' to each! That covers all 12 combinations! — Sukanta Hui"
      />
    </div>
  );
}