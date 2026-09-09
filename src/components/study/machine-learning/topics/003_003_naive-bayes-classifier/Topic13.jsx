"use client";

import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./topic13_files/topic13_quiz.json";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16 px-4 sm:px-6">
      {/* HERO BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full shadow-inner">
            🤖 Machine Learning • 003 • 003 • naive-bayes-classifier
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Comprehensive Module Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            750 Question Master Bank
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-purple-200 bg-clip-text text-transparent">
          Naive Bayes Classifier: Master Assessment &amp; Certification
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Comprehensive evaluation covering all 13 topics in this module with 50 dedicated questions per topic plus 100 integrated mixed scenarios. Test your knowledge in focus or list mode with instant feedback and honor roll certificate generation.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-indigo-400 font-bold">✓</span>
            <span><strong>50 Qs / Topic:</strong> 13 Topic Areas</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>100 Qs:</strong> Mixed Synthesis</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-amber-400 font-bold">✓</span>
            <span><strong>Pass Tier:</strong> 70% Cutoff</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-purple-400 font-bold">✓</span>
            <span><strong>Certificate:</strong> Verified Honor Roll</span>
          </div>
        </div>
      </header>

      {/* QUIZ ENGINE */}
      <section className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        <QuizEngine
          title="Naive Bayes Classifier Master Evaluation"
          questions={questions}
          testId="ml_003_003_naive_bayes_classifier_master_quiz"
          questionLimit={50}
          passPercent={70}
          certificateHeader="Coder & AccoTax"
          certificateSubtitle="Barrackpore Machine Learning & Data Science Academy · www.codernaccotax.co.in"
          certificateTitle="Naive Bayes Classifier Master Certificate"
          leaderboardTitle="Naive Bayes Classifier Leaderboard"
        />
      </section>

      {/* TEACHER GUIDANCE */}
      <Teacher
        note={
          "Congratulations on attempting the master evaluation for Naive Bayes Classifier! " +
          "Carefully review every question and explanation. Take the test in 25, 50, or full size, verify your score on the leaderboard, and lock in your conceptual foundation before proceeding."
        }
      />
    </div>
  );
}
