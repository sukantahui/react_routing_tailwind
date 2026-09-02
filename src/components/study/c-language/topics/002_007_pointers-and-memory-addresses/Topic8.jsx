import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./topic8_files/topic8_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
            C Programming • Module 002_007 • Topic 8
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 002_007 Comprehensive Self-Test: Pointers, Memory Addresses &amp; Indirection
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Test your complete mastery over physical and virtual memory addresses, address-of and dereferencing operators, pass-by-reference simulation, pointer arithmetic scaling, <code>ptrdiff_t</code>, array decay mechanics, double pointers (<code>**ptr</code>), generic <code>void*</code> pointers, <code>const</code> pointer permutations, and function pointer callbacks with this 200-question interactive evaluation.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 002_007 Self-Test: Pointers & Memory Addresses"
          questions={questions}
          testId="c_language_002_007_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Intermediate C & Systems Architecture Certificate"
          certificateTitle="Certificate of Distinction in C Pointers & Memory Engineering"
          leaderboardTitle="C Programming Module 002_007 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on completing the entire Segment 2 ('intermediate') of our C Language Tutorial Roadmap! " +
          "You have mastered 1D/2D arrays, searching & sorting algorithms, null-terminated strings, buffer security, raw pointers, double pointers, and function callbacks. " +
          "You now possess the foundational memory mastery required for Segment 3: Dynamic Memory Allocation, Structs, Unions, and File Systems!"
        }
      />
    </div>
  );
}
