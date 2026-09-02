// src/components/study/c-language/topics/001_004_functions-and-modular-programming/Topic6.jsx

import React from "react";
import QuizEngine from "../../../QuizEngine";
import { questions } from "./topic6_files/topic6_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 rounded-2xl border border-blue-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
            C Programming • Module 001_004 • Topic 6
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 001_004 Comprehensive Self-Test: Functions, Scope &amp; Storage Classes
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Test your complete mastery over modular software design, function prototypes &amp; definitions, parameter passing mechanisms (Call by Value vs Pointer Pass-by-Reference), return mechanics &amp; variadic functions (<code className="text-amber-300">&lt;stdarg.h&gt;</code>), variable scope &amp; linkage, storage class specifiers (<code className="text-amber-300">auto</code>, <code className="text-amber-300">register</code>, <code className="text-amber-300">static</code>, <code className="text-amber-300">extern</code>), recursion call stack frame unwinding &amp; Tail Call Optimization (TCO), and function pointers with callbacks &amp; dispatch tables with this 200-question interactive evaluation.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 001_004 Self-Test: Functions, Scope & Storage Classes"
          questions={questions}
          testId="c_language_001_004_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Systems Programming & C Language Mastery Certificate"
          certificateTitle="Certificate of Distinction in Modular C Architecture & Storage Classes"
          leaderboardTitle="C Programming Module 001_004 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on attempting the 200-question self-test for Module 001_004! " +
          "Modular function decomposition, stack frame behavior, storage class lifetime rules, and function pointer callbacks are fundamental to professional systems engineering and library design. " +
          "Review any missed questions, study the detailed explanations provided for each question, and ensure you can trace call stack frames and linkage rules effortlessly before advancing to Module 001_005."
        }
      />
    </div>
  );
}
