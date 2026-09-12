// src/components/study/icse-java-x/topics/003_001_array-2d-concepts/Topic7.jsx

import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./module-test-questions.json";

export default function Topic7() {
  return (
    <div className="mt-6 space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HERO BANNER */}
      <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full shadow-inner">
            ICSE Class 10 · Module 003_001 · Topic 7
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full">
            Comprehensive Module Test
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
            200 Questions Master Pool
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">
          Module Test: 2D Array Master Assessment
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Validate your mastery of Two-Dimensional Arrays according to the ICSE Class 10 Computer Applications curriculum.
          This comprehensive test pool spans matrix declarations, memory layout, row-by-row and column-by-column traversals,
          primary and secondary diagonals, boundary and non-boundary processing, matrix arithmetic and transposition,
          special matrices (symmetric, identity, upper/lower triangular, magic square), and rigorous board-level output predictions.
          Filter questions by topic, practice in Card or List view, and earn an authentic mastery certificate upon achieving 70%+ score.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-cyan-400 font-bold">✓</span>
            <span><strong>200 Questions:</strong> 8 Board Categories</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Exam Modes:</strong> Focus Card / Full List</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-bold">✓</span>
            <span><strong>Pass Cutoff:</strong> 70% Score</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-purple-400 font-bold">✓</span>
            <span><strong>Certificate:</strong> Instant Verification</span>
          </div>
        </div>
      </header>

      {/* QUIZ ENGINE */}
      <section className="rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl bg-slate-900/60 p-2 sm:p-4">
        <QuizEngine
          title="ICSE Java 10 · Module 003_001: Two-Dimensional Array Concepts - Master Assessment"
          questions={questions}
          testId="icse_java_x_003_001_2d_array_module_test"
          questionLimit={25}
          passPercent={70}
          certificateTitle="Certificate of Mastery - ICSE Class 10 Two-Dimensional Array Concepts"
          certificateHeader="Coder & AccoTax"
          certificateSubtitle="Barrackpore, West Bengal · www.codernaccotax.co.in"
          leaderboardTitle="ICSE Class 10: 2D Array Master Leaderboard"
        />
      </section>
    </div>
  );
}
