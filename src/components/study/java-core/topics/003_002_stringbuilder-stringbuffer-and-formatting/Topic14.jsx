// src/components/study/java-core/topics/003_002_stringbuilder-stringbuffer-and-formatting/Topic14.jsx

import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./module-test-questions.json";

export default function Topic14() {
  return (
    <div className="mt-6 space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HERO BANNER */}
      <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded-full shadow-inner">
            Java Core · Module 003_002 · Topic 14
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full">
            Comprehensive Module Test
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
            200 Questions Master Pool
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
          Module Test: StringBuilder, StringBuffer &amp; String Formatting
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
          Validate your deep mastery of mutable string mechanics, internal capacity expansion algorithms,
          multi-threaded StringBuffer synchronization, high-speed formatting specifiers and flags,
          and modern Java 15+ Text Blocks. Choose your desired question batch or tackle the full pool with instant feedback, explanations, and certificate generation.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-sky-400 font-bold">✓</span>
            <span><strong>200 Questions:</strong> 10 Key Categories</span>
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
          title="Module 003_002: StringBuilder, StringBuffer & String Formatting - Module Test"
          questions={questions}
          testId="java_core_003_002_module_test"
          questionLimit={25}
          passPercent={70}
          certificateTitle="Certificate of Mastery - StringBuilder, StringBuffer & String Formatting"
          certificateHeader="Coder & AccoTax"
          certificateSubtitle="Barrackpore, West Bengal · www.codernaccotax.co.in"
          leaderboardTitle="Module 003_002 Leaderboard"
        />
      </section>
    </div>
  );
}
