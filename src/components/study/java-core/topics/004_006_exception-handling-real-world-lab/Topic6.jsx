import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chalDemoCode from "./topic6_files/ExceptionHandlingCapstoneChallengeDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_006 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Segment 4 Capstone
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Timed Exception Framework Coding Challenge (Segment 4 Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize all Segment 4 competencies: assembling defensive checks, custom domain exceptions, Try-with-Resources stream pipelines, and root-cause chaining into a unified security gateway.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chalDemoCode}
          title="ExceptionHandlingCapstoneChallengeDemo.java"
          highlightLines={[7, 10, 15, 20, 23, 27, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Capstone Challenge FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_006 Topic 6: Exception Challenge Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_006_topic6_exception_challenge_capstone_note.txt"
        />
      </section>

      <Teacher
        note="CONGRATULATIONS! You have completed Module 004_006 and ALL OF SEGMENT 4! You are now a master of Java Exception Handling, ARM, AutoCloseable, and Robust Application Design! — Sukanta Hui"
      />
    </div>
  );
}