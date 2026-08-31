import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mathIntroDemoCode from "./topic0_files/MathClassOverviewDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Scientific Math Engine
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-indigo-400 font-mono">java.lang.Math</code> Utility Class: Constants &amp; Static Architecture
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore Java's core mathematical utility engine: private constructor design patterns, static constant precision (<code className="text-emerald-400 font-mono">Math.PI</code>, <code className="text-emerald-400 font-mono">Math.E</code>), and scientific calculations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mathIntroDemoCode}
          title="MathClassOverviewDemo.java"
          highlightLines={[7, 13, 14, 15, 19, 20, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Math Architecture FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 0: java.lang.Math Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic0_math_overview_note.txt"
        />
      </section>

      <Teacher
        note="Math is in the 'java.lang' package, so you NEVER need an import statement to use Math.PI or Math.sqrt()! — Sukanta Hui"
      />
    </div>
  );
}