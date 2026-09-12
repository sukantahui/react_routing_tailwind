"use client";

import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./topic19_files/topic19_quiz.json";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic19 – SQL Fundamentals Module Comprehensive Assessment & Certification
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} 200 MCQ Master Assessment utilizing QuizEngine
 */
export default function Topic19() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16 px-4 sm:px-6">
      {/* HERO BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-10 rounded-3xl border border-sky-800/40 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-sky-500/20 text-sky-300 border border-sky-500/40 rounded-full shadow-inner">
            🐬 RDBMS &amp; MySQL • 001_002 • sql-fundamentals
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Module Final Comprehensive Assessment
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 MCQ Master Question Bank
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-300 via-teal-200 to-indigo-200 bg-clip-text text-transparent">
          Module 1.2: SQL Fundamentals Comprehensive Module Test &amp; Certification
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Full module evaluation covering MySQL Data Types, DDL Schema Design (CREATE, ALTER, DROP, TRUNCATE), DML Operations (INSERT, UPDATE, DELETE), Advanced WHERE Predicates, Logical/Comparison Operators, Pattern Matching, NULL Three-Valued Logic, and Sorting &amp; Pagination. Test yourself in Focus or List mode with instant explanations and generate your verified certificate.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-sky-400 font-bold">✓</span>
            <span><strong>200 Qs:</strong> Comprehensive Bank</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>14 Core Domains:</strong> DDL, DML &amp; DQL</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-bold">✓</span>
            <span><strong>Pass Tier:</strong> 70% Cutoff</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-indigo-400 font-bold">✓</span>
            <span><strong>Certificate:</strong> Verified Honor Roll</span>
          </div>
        </div>
      </header>

      {/* QUIZ ENGINE */}
      <section className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        <QuizEngine
          title="Module 1.2: SQL Fundamentals Comprehensive Module Evaluation"
          questions={questions}
          testId="001_002_sql-fundamentals_module_test"
          questionLimit={50}
          passPercent={70}
          certificateHeader="Coder & AccoTax"
          certificateSubtitle="Database Engineering & SQL Academy · www.codernaccotax.co.in"
          certificateTitle="Module 1.2: SQL Fundamentals Master Certificate"
          leaderboardTitle="Module 1.2: SQL Fundamentals Assessment Leaderboard"
        />
      </section>

      {/* TEACHER GUIDANCE */}
      <Teacher
        note={
          "Congratulations on reaching the Module Test for SQL Fundamentals! " +
          "Carefully review every question and explanation. Attempt the test in 25, 50, or full 200 mode, evaluate your score on the leaderboard, and lock in your core database engineering principles before advancing to Keys & Constraints."
        }
      />
    </div>
  );
}
