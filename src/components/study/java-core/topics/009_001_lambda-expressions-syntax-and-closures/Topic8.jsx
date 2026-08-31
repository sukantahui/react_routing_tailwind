import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vceDemoCode from "./topic8_files/VariableCaptureEffectivelyFinalDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Effectively Final
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Variable Capture &amp; Closures: The <code className="text-emerald-400 font-mono">Effectively Final</code> Requirement
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master functional closures: analyzing stack value capture, compiler immutability checks, and the effectively final rule for local method variables.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vceDemoCode}
          title="VariableCaptureEffectivelyFinalDemo.java"
          highlightLines={[7, 10, 15, 16, 18, 19, 20, 21, 22, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Effectively Final FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 8: Effectively Final"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic8_effectively_final_note.txt"
        />
      </section>

      <Teacher
        note="In Java 7, you had to type 'final int x = 10;' before passing it into an inner class. In Java 8, you can omit the word 'final', but Java still watches you: if you try to change 'x = 20;' later, your code won't compile! That is Effectively Final! — Sukanta Hui"
      />
    </div>
  );
}