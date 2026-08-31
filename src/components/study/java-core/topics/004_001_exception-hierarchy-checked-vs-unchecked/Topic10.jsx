import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import npeDemoCode from "./topic10_files/HelpfulNpeAndDefensiveHandlingCapstoneDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            NPE Shield Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Handling <code className="text-rose-400 font-mono">NullPointerException</code> Gracefully: Defensive Checks &amp; Java 14+ Helpful NPEs
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build bulletproof data pipelines: fast-failing constructor boundaries with <code className="text-emerald-300 font-mono">Objects.requireNonNull()</code>, safe retrieval with <code className="text-sky-300 font-mono">Optional</code>, and modern Java 14 helpful diagnostics.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={npeDemoCode}
          title="HelpfulNpeAndDefensiveHandlingCapstoneDemo.java"
          highlightLines={[7, 16, 17, 23, 24, 25, 37, 43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="NPE Handling FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 10: NPE Defensive Handling Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic10_npe_defensive_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 004_001! You have mastered the Java Throwable hierarchy, Error vs Exception, Checked vs Unchecked design philosophy, modern framework trends, and defensive NPE shielding! — Sukanta Hui"
      />
    </div>
  );
}