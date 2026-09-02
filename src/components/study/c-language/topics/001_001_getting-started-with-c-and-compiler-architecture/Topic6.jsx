// src/components/study/c-language/topics/001_001_getting-started-with-c-and-compiler-architecture/Topic6.jsx

import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./topic6_files/topic6_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 rounded-2xl border border-blue-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
            C Programming • Module 001_001 • Topic 6
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 001_001 Comprehensive Self-Test: C Foundations &amp; Compiler Architecture
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Test your complete mastery over C language origins, ISO standards evolution (K&amp;R to C23), GCC compilation pipeline stages (Preprocessing, Compilation, Assembly, Linking), program structure, execution memory layout, and formatted console I/O with this 200-question interactive test.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 001_001 Self-Test: C Foundations & Compiler Architecture"
          questions={questions}
          testId="c_language_001_001_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Systems Programming & C Language Mastery Certificate"
          certificateTitle="Certificate of Distinction in C Compiler Architecture"
          leaderboardTitle="C Programming Module 001_001 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on attempting the 200-question self-test for Module 001_001! " +
          "Understanding how the GCC toolchain processes C source code into machine executables is what separates average coders from systems engineers. " +
          "Review any missed questions, inspect the detailed explanations provided for each question, and ensure you can explain the GCC compilation stages (-E, -S, -c, -o) from memory before advancing to Module 001_002."
        }
      />
    </div>
  );
}
