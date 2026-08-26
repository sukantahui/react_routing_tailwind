import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import iterDemoCode from "./topic4_files/EnumIterationPatternsDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Iteration Patterns
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Iterating Enum Constants: For-Each Loops &amp; Stream Pipelines
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Process enum constants systematically: traversing array constants with <code className="text-emerald-300 font-mono">values()</code>, filtering schedules, and integrating functional Stream pipelines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={iterDemoCode}
          title="EnumIterationPatternsDemo.java"
          highlightLines={[7, 10, 11, 20, 21, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Enum Iteration FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 4: Enum Iteration"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic4_enum_iteration_note.txt"
        />
      </section>

      <Teacher
        note="When building UI dropdown menus or REST validation lists, 'MyEnum.values()' allows you to populate all available options in 1 line of code! — Sukanta Hui"
      />
    </div>
  );
}