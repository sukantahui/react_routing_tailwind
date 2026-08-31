import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import iceDemoCode from "./topic9_files/InvalidClassExceptionEvolutionDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 9
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Version Mismatch
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-rose-400 font-mono">InvalidClassException</code>: Class Definition Evolution &amp; UID Mismatches
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master schema versioning forensics: analyzing <code className="text-rose-300 font-mono">InvalidClassException</code> diagnostics and safely evolving class definitions across release cycles.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={iceDemoCode}
          title="InvalidClassExceptionEvolutionDemo.java"
          highlightLines={[7, 10, 15, 16, 37, 38, 40, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="InvalidClassException FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 9: InvalidClassException Diagnostics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic9_invalid_class_exception_note.txt"
        />
      </section>

      <Teacher
        note="If you change your Java class and bump the serialVersionUID from 1L to 2L, all files saved with version 1L will throw InvalidClassException! Keep UID unchanged if your edits are backward-compatible! — Sukanta Hui"
      />
    </div>
  );
}