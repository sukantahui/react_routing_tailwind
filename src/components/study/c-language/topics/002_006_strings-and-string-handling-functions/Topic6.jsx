import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./topic6_files/topic6_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
            C Programming • Module 002_006 • Topic 6
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 002_006 Comprehensive Self-Test: Strings, Buffer Safety &amp; Text Processing
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Test your mastery over null-terminated C string memory architecture, buffer overflow security vulnerabilities, <code>&lt;string.h&gt;</code> standard library mechanics, raw byte operations, custom string algorithms, and 2D character arrays vs. string pointer collections with this 200-question interactive evaluation.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 002_006 Self-Test: Strings & Character Array Handling"
          questions={questions}
          testId="c_language_002_006_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Intermediate C & String Architecture Certificate"
          certificateTitle="Certificate of Distinction in C Strings & Memory Safety"
          leaderboardTitle="C Programming Module 002_006 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on completing the 200-question self-assessment for Module 002_006! " +
          "Strings in C are simply character arrays accessed via pointer addresses. Having mastered the null terminator '\\0' and buffer boundary constraints, you are now perfectly primed to master raw pointers and memory addresses in Module 002_007!"
        }
      />
    </div>
  );
}
