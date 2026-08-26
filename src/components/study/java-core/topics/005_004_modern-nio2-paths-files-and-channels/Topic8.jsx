import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import atomDemoCode from "./topic8_files/AtomicCopyMoveOptionsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Atomic Options
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Atomic &amp; Replace Options: <code className="text-emerald-400 font-mono">REPLACE_EXISTING</code> &amp; <code className="text-sky-400 font-mono">ATOMIC_MOVE</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master crash-safe file publishing: executing zero-downtime atomic renames with <code className="text-sky-300 font-mono">ATOMIC_MOVE</code> and safely replacing live config files.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={atomDemoCode}
          title="AtomicCopyMoveOptionsDemo.java"
          highlightLines={[7, 10, 24, 25, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Atomic Options FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 8: Atomic Options"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic8_atomic_options_note.txt"
        />
      </section>

      <Teacher
        note="In financial systems, never write directly to a live transaction file! Write to a temporary file first, and then call 'Files.move(temp, live, StandardCopyOption.ATOMIC_MOVE)'! If the system crashes mid-write, your live file remains 100% uncorrupted! — Sukanta Hui"
      />
    </div>
  );
}