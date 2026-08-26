import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import trendDemoCode from "./topic8_files/ModernUncheckedFrameworkTrendDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Modern Frameworks
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Modern Architectural Trend: Why Spring &amp; Modern Frameworks Prefer <code className="text-emerald-400 font-mono">Unchecked Exceptions</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand enterprise framework design: wrapping checked JDBC exceptions into clean unchecked domain types and building centralized <code className="text-sky-300 font-mono">@ControllerAdvice</code> error filters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={trendDemoCode}
          title="ModernUncheckedFrameworkTrendDemo.java"
          highlightLines={[7, 10, 11, 16, 20, 21, 35, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Modern Framework Trend FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 8: Modern Framework Trend"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic8_modern_framework_trend_note.txt"
        />
      </section>

      <Teacher
        note="If you work with Spring Boot, you will notice that almost 100% of Spring exceptions inherit from RuntimeException! This keeps your code clean and allows global handlers to catch everything! — Sukanta Hui"
      />
    </div>
  );
}