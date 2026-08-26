import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import utcArchDemoCode from "./topic16_files/EnterpriseUtcArchitectureCapstoneDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Enterprise Architecture: Storing UTC Instants in DB &amp; Formatting to Local Timezones on UI
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize the entire modern Date &amp; Time API: implementing the golden enterprise rule of UTC database persistence and localized frontend rendering.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={utcArchDemoCode}
          title="EnterpriseUtcArchitectureCapstoneDemo.java"
          highlightLines={[12, 16, 17, 22, 23, 24, 25, 34, 38, 39, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="UTC Architecture FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 16: UTC Architecture Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic16_utc_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 003_005! You have mastered the modern Java 8 Date & Time API, domain separation, Period vs Duration, ChronoUnit, thread-safe DateTimeFormatter, and global UTC enterprise architecture! — Sukanta Hui"
      />
    </div>
  );
}