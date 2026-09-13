import React from "react";
import QuizEngine from "../../../QuizEngine";
import { topic7Questions } from "./topic7_files/topic7_questions.js";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-4 pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-8 rounded-2xl border border-emerald-800/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
            C Programming • Module 003_010 • Topic 7
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/40 rounded-full">
            Self-Assessment Evaluation
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
            200 Comprehensive MCQs
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Module 003_010 Comprehensive Self-Test: File Handling &amp; Stream I/O Operations
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
          Evaluate your mastery over C file streams: <code>FILE</code> handle lifecycles, user-space buffering modes (<code>_IONBF</code>, <code>_IOLBF</code>, <code>_IOFBF</code>, <code>setvbuf</code>), standard streams (<code>stdin</code>, <code>stdout</code>, <code>stderr</code>), file open modes (<code>r</code>, <code>w</code>, <code>a</code>, <code>r+</code>, <code>w+</code>, <code>a+</code>, and binary variants), text vs binary I/O (<code>fgetc</code>, <code>fgets</code>, <code>fprintf</code>, <code>fread</code>, <code>fwrite</code>), struct serialization, random access navigation (<code>fseek</code>, <code>ftell</code>, <code>rewind</code>), stream diagnostics (<code>feof</code>, <code>ferror</code>, <code>clearerr</code>, <code>perror</code>), and production-grade file database engines with this 200-question interactive assessment.
        </p>
      </header>

      {/* Quiz Engine Interactive Component */}
      <section className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <QuizEngine
          title="Module 003_010 Self-Test: File Handling & Stream I/O Operations"
          questions={topic7Questions}
          testId="c_language_003_010_selftest_200"
          questionLimit={200}
          passPercent={75}
          certificateHeader="Coder & AccoTax Barrackpore"
          certificateSubtitle="Advanced C & File Systems Engineering Certificate"
          certificateTitle="Certificate of Distinction in C File Handling & Stream I/O Architecture"
          leaderboardTitle="C Programming Module 003_010 Leaderboard"
        />
      </section>

      {/* Teacher Guidance Note */}
      <Teacher
        note={
          "Congratulations on completing Module 003_010 on File Handling & Stream I/O Operations! " +
          "You have mastered persistent disk storage, binary struct serialization, O(1) random seeking, and robust system error handling. " +
          "Achieving 75% or higher on this 200-question test proves you are ready for Segment 4: Advanced Systems Programming, Preprocessor Macros, and Data Structures!"
        }
      />
    </div>
  );
}
