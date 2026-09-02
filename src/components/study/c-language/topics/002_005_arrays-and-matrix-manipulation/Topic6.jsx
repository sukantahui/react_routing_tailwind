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
            C Programming • Module 002_005 • Topic 6
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 002_005 Comprehensive Self-Test: Arrays, Matrix Operations, Searching &amp; Sorting
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Test your complete mastery over 1D and 2D arrays, contiguous physical RAM address mapping, row-major offset mathematics, pointer decay mechanics, searching algorithms (Linear &amp; Binary Search), sorting paradigms (Bubble, Selection, Insertion Sort), and matrix algebra with this 200-question interactive evaluation.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 002_005 Self-Test: Arrays, Searching, Sorting & Matrices"
          questions={questions}
          testId="c_language_002_005_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Intermediate C & Data Sequence Mastery Certificate"
          certificateTitle="Certificate of Distinction in C Arrays & Matrix Algorithms"
          leaderboardTitle="C Programming Module 002_005 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on completing the 200-question self-assessment for Module 002_005! " +
          "Understanding contiguous memory addresses and pointer decaying is the exact foundation you need for string manipulation and raw pointers. " +
          "Review any questions you missed, especially row-major offset calculations and sorting stability rules, before advancing to Module 002_006."
        }
      />
    </div>
  );
}
