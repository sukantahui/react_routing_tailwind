import React from "react";
import QuizEngine from "../../../QuizEngine";
import { topic7Questions } from "./topic7_files/topic7_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
            C Programming • Module 004_011 • Topic 7
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 004_011 Comprehensive Self-Test: Preprocessor Directives &amp; Macro Metaprogramming
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Evaluate your mastery over the C preprocessor: translation phases (<code>gcc -E</code>), object-like &amp; function-like macros, parenthesization rules, argument side-effect traps, the <code>do &#123; ... &#125; while(0)</code> idiom, stringizing (<code>#</code>), token concatenation (<code>##</code>), conditional compilation (<code>#ifdef</code>, <code>#if</code>, <code>#elif</code>, <code>#error</code>), header guards, <code>#pragma once</code>, standard predefined macros (<code>__FILE__</code>, <code>__LINE__</code>, <code>__func__</code>, <code>__DATE__</code>, <code>__TIME__</code>), and custom diagnostic telemetry frameworks with this 200-question interactive assessment.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 004_011 Self-Test: Preprocessor Directives & Macro Metaprogramming"
          questions={topic7Questions}
          testId="c_language_004_011_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Advanced C Metaprogramming Certificate"
          certificateTitle="Certificate of Distinction in Preprocessor Directives & Macro Metaprogramming"
          leaderboardTitle="C Programming Module 004_011 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on completing Module 004_011 on Preprocessor Directives & Macro Metaprogramming! " +
          "You have mastered zero-cost compile-time abstractions, cross-platform compilation gates, and industrial telemetry suites. " +
          "Achieving 75% or higher on this 200-question test proves you are ready for Module 004_012: Data Structures & Systems Capstone Projects!"
        }
      />
    </div>
  );
}
