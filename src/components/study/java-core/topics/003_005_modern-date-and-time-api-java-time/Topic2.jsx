import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import taxonomyDemoCode from "./topic2_files/TemporalTaxonomyMapDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 2
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Taxonomy Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Core Temporal Classes Breakdown: Taxonomy Map &amp; Selection Guide
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete taxonomy of Java 8 temporal types: understanding when to choose <code className="text-emerald-400 font-mono">LocalDate</code>, <code className="text-sky-400 font-mono">LocalDateTime</code>, <code className="text-purple-400 font-mono">ZonedDateTime</code>, or <code className="text-amber-400 font-mono">Instant</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={taxonomyDemoCode}
          title="TemporalTaxonomyMapDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Temporal Taxonomy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 2: Temporal Taxonomy Map"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic2_temporal_taxonomy_note.txt"
        />
      </section>

      <Teacher
        note="Never store a birthday with time or timezone! A student born on August 15 in Kolkata will have their birthday shifted to August 14 if a server in New York converts a timezone! Use LocalDate! — Sukanta Hui"
      />
    </div>
  );
}