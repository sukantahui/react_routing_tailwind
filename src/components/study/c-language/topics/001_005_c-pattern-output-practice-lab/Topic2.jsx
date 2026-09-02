// src/components/study/c-language/topics/001_005_c-pattern-output-practice-lab/Topic2.jsx

import React from "react";
import QuizEngine from "../../../QuizEngine";
import { questions } from "./topic2_files/topic2_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 rounded-2xl border border-blue-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
            C Programming • Segment 1 • Self Test 1
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Comprehensive Foundation Assessment
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 MCQs (50 per Module 001-004)
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Self Test 1: Segment 1 Comprehensive C Fundamentals Review
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Evaluate your overall mastery over Segment 1 of the C Language curriculum with this comprehensive 200-question test. Includes 50 questions from each of the four core foundation modules:
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-300 pt-2">
          <li className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <strong>Module 001_001 (50 MCQs):</strong> GCC Compiler Pipeline &amp; Console I/O
          </li>
          <li className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <strong>Module 001_002 (50 MCQs):</strong> Tokens, Data Types, Modifiers &amp; Bitwise Mechanics
          </li>
          <li className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <strong>Module 001_003 (50 MCQs):</strong> Control Flow, Branching, Loops &amp; Pattern Geometry
          </li>
          <li className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <strong>Module 001_004 (50 MCQs):</strong> Functions, Scope, Storage Classes &amp; Recursion
          </li>
        </ul>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Self Test 1: Segment 1 Comprehensive C Fundamentals Review"
          questions={questions}
          testId="c_language_001_005_selftest1_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Systems Programming & C Language Mastery Certificate"
          certificateTitle="Certificate of Distinction in Segment 1 C Fundamentals"
          leaderboardTitle="C Programming Segment 1 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on completing Self Test 1 for Segment 1! " +
          "This 200-question exam tests your overall proficiency across C compiler architecture, data types, operators, branching/looping algorithms, and modular function memory mechanics. " +
          "A score of 75% or higher confirms a solid foundation for advancing to Segment 2 (Arrays, Strings, Pointers, and Memory Allocation)."
        }
      />
    </div>
  );
}
