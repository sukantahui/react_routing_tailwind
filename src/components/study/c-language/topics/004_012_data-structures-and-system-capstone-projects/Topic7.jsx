import React from "react";
import QuizEngine from "../../../QuizEngine";
import { topic7Questions } from "./topic7_files/topic7_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-8 rounded-2xl border border-amber-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            C Programming • Module 004_012 • Topic 7 (Grand Final)
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Course Master Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 004_012 Grand Master Evaluation: Data Structures, Build Systems &amp; Systems Capstone
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Evaluate your comprehensive mastery over advanced C systems engineering: Singly Linked Lists, Doubly Linked Lists, Circular Lists, Sentinel Node patterns, Stack (LIFO) &amp; Queue (FIFO) pointer mechanics, Command-Line Argument processing (<code>argc</code>, <code>argv</code>, <code>strtol</code>), Multi-File modular project architecture, external vs internal linkage (<code>static</code> vs <code>extern</code>), GNU Makefiles (targets, automatic variables <code>$@</code>, <code>$&lt;</code>, <code>$^</code>, <code>.PHONY</code>), and production-grade persistent database engines with this 200-question master assessment.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 004_012 Grand Master Evaluation: Advanced C Systems Engineering"
          questions={topic7Questions}
          testId="c_language_004_012_master_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Master of C Systems Engineering Certificate"
          certificateTitle="Certificate of Master Distinction in Advanced C Systems & Data Structures"
          leaderboardTitle="C Programming Master Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Heartiest congratulations on completing the entire C Programming Master Series! " +
          "You have journeyed from the basics of control flow and pointers all the way to dynamic linked data structures, multi-file build automation, binary disk streams, and macro metaprogramming. " +
          "Achieving distinction on this 200-question Grand Master exam certifies you as a true Systems Engineer ready to build world-class, industrial software!"
        }
      />
    </div>
  );
}
