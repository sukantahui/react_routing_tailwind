import React from "react";
import QuizEngine from "../../../QuizEngine";
import { questions } from "./topic7_files/topic7_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-8 rounded-2xl border border-purple-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
            C Programming • Module 003_009 • Topic 7
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 003_009 Comprehensive Self-Test: Dynamic Memory Allocation &amp; Heap Management
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Evaluate your in-depth mastery over dynamic heap memory: stack vs heap architecture, <code>malloc()</code> uninitialized allocation, <code>calloc()</code> zero-initialization, <code>realloc()</code> in-place vs relocated expansion, safe deallocation with <code>free()</code>, dangling pointer elimination, Memory Leaks, Double Free bugs, dynamic 2D array allocation, and compiler diagnostic tooling (AddressSanitizer and Valgrind) with this 200-question interactive assessment.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 003_009 Self-Test: Dynamic Memory Allocation & Heap Management"
          questions={questions}
          testId="c_language_003_009_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Advanced C & Heap Systems Engineering Certificate"
          certificateTitle="Certificate of Distinction in Dynamic Memory Management & Heap Architecture"
          leaderboardTitle="C Programming Module 003_009 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on completing Module 003_009 on Dynamic Memory Allocation! " +
          "You have mastered the hardest and most critical concepts in C systems programming: heap lifecycles, memory safety, pointer nullification, and diagnostic sanitizers. " +
          "Achieving 75% or higher on this 200-question test proves you are ready for Module 003_010: File Handling & Stream I/O Operations!"
        }
      />
    </div>
  );
}
