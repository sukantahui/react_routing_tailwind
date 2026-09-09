"use client";

import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./topic9_files/topic9_quiz.json";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic9() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16 px-4 sm:px-6">
      {/* =========================================================================
          HERO BANNER: MODULE 1.2 MASTER ASSESSMENT
      ========================================================================= */}
      <header className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-10 rounded-3xl border border-sky-800/40 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-sky-500/20 text-sky-300 border border-sky-500/40 rounded-full shadow-inner">
            📊 Microsoft Excel • Module 1.2 • Topic 9
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Comprehensive Module Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            550 Question Master Bank
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-300 via-teal-200 to-indigo-200 bg-clip-text text-transparent">
          Module 1.2 Master Assessment: Data Entry, Editing, Formatting &amp; Grid Mechanics
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Evaluate your comprehensive proficiency across all 9 topics of Module 1.2. The master question bank includes 50 rigorous questions per topic (Data Types, 4-Section Custom Formatting Masks, AutoFill &amp; Flash Fill inductive logic, Row/Column Surgery, In-Cell Edit &amp; Paste Special operations, 1900 Date &amp; Time serial math, Alignment &amp; Executive Cell Styles, and Data Hygiene Auditing) plus 100 mixed cross-module integration questions.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-sky-400 font-bold">✓</span>
            <span><strong>50 Qs / Topic:</strong> 9 Topic Domains</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>100 Qs:</strong> Mixed Scenarios</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-bold">✓</span>
            <span><strong>Pass Tier:</strong> 70% Cutoff</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-indigo-400 font-bold">✓</span>
            <span><strong>Verified Certificate:</strong> Instant Honor Roll</span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          INTERACTIVE QUIZ ENGINE COMPONENT
      ========================================================================= */}
      <section className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        <QuizEngine
          title="Module 1.2 Master Quiz: Data Entry, Editing & Custom Number Formatting"
          questions={questions}
          testId="excel_001_002_data_entry_formatting_master"
          questionLimit={50}
          passPercent={70}
          certificateHeader="Coder & AccoTax"
          certificateSubtitle="Barrackpore Accounting & Spreadsheet Academy · www.codernaccotax.co.in"
          certificateTitle="Excel Data Entry, Editing & Custom Number Formatting Master Certificate"
          leaderboardTitle="Module 1.2 Data Hygiene & Formatting Leaderboard"
        />
      </section>

      {/* =========================================================================
          TEACHER'S ADVICE & EXAM GUIDANCE
      ========================================================================= */}
      <Teacher
        note={
          "Congratulations on reaching the Module 1.2 Master Assessment! " +
          "Spreadsheet engineering requires absolute precision in data types: understanding IEEE 754 15-digit precision, mastering 4-section custom number formatting masks (Positive;Negative;Zero;Text), harnessing inductive Flash Fill (Ctrl + E) pattern speed, executing surgical Paste Special operations (Values, Transpose, Multiply), and navigating 1900 Date/Time serial mathematics. " +
          "Take this evaluation in 50, 100, or full test sizes, review the in-depth explanations for every question, and lock in these fundamental skills before advancing to Module 1.3 formulas!"
        }
      />
    </div>
  );
}
