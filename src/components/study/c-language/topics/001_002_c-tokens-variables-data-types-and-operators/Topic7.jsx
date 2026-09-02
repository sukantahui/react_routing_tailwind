// src/components/study/c-language/topics/001_002_c-tokens-variables-data-types-and-operators/Topic7.jsx

import React from "react";
import QuizEngine from "../../../QuizEngine";
import { questions } from "./topic7_files/topic7_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 rounded-2xl border border-blue-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
            C Programming • Module 001_002 • Topic 7
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 001_002 Comprehensive Self-Test: C Tokens, Variables, Data Types & Operators
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Test your complete mastery over C tokens, identifier naming rules, keywords, primitive data types (int, float, double, char, void), type modifiers (short, long, signed, unsigned, stdint.h), constants & literals, operator precedence & associativity, bitwise manipulations (&amp;, |, ^, ~, &lt;&lt;, &gt;&gt;), and type promotion & casting rules with this 200-question interactive evaluation.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 001_002 Self-Test: C Tokens, Data Types & Operators"
          questions={questions}
          testId="c_language_001_002_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Systems Programming & C Language Mastery Certificate"
          certificateTitle="Certificate of Distinction in C Tokens & Operator Mechanics"
          leaderboardTitle="C Programming Module 001_002 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on attempting the 200-question self-test for Module 001_002! " +
          "Mastery of data types, bitwise operators, sizeof evaluation, and type promotion rules is essential for writing low-level, bug-free C code. " +
          "Analyze any wrong attempts, review the detailed explanations for each question, and make sure you can evaluate complex operator expressions and bit masking techniques effortlessly before proceeding to Module 001_003."
        }
      />
    </div>
  );
}
