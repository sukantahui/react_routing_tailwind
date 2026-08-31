import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import legacyFlawsDemoCode from "./topic0_files/LegacyDateFlawsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Legacy Anti-Patterns
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Flaws of Legacy Date APIs: <code className="text-rose-400 font-mono">java.util.Date</code> &amp; <code className="text-rose-400 font-mono">Calendar</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why legacy date classes were deprecated: diagnosing mutable reference leaks, non-thread-safe <code className="text-rose-300 font-mono">SimpleDateFormat</code> crashes, and confusing 0-indexed months.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={legacyFlawsDemoCode}
          title="LegacyDateFlawsDemo.java"
          highlightLines={[7, 18, 19, 20, 24, 25, 29, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Legacy Date FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 0: Legacy Date Flaws"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic0_legacy_date_flaws_note.txt"
        />
      </section>

      <Teacher
        note="If you see 'new Date()' or 'SimpleDateFormat' in an interview or project, know that it is legacy code from the 1990s! Since Java 8, we exclusively use java.time (LocalDate, LocalDateTime, Instant). — Sukanta Hui"
      />
    </div>
  );
}