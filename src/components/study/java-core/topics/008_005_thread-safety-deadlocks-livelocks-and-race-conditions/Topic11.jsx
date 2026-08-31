import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pddDemoCode from "./topic11_files/ProductionDeadlockDiagnosisDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Deadlock Diagnostics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Diagnosing Deadlocks in Production: <code className="text-emerald-400 font-mono">jcmd</code>, <code className="text-sky-400 font-mono">jstack</code> &amp; <code className="text-purple-400 font-mono">ThreadMXBean</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master production telemetry: utilizing <code className="text-emerald-300 font-mono">jcmd</code> thread dump snapshots, VisualVM monitors, and <code className="text-purple-300 font-mono">ThreadMXBean</code> programmatic health-check endpoints.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pddDemoCode}
          title="ProductionDeadlockDiagnosisDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 20, 21, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Deadlock Diagnostics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 11: Production Deadlock Diagnosis"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic11_deadlock_diagnosis_note.txt"
        />
      </section>

      <Teacher
        note="When a production server suddenly stops processing requests and CPU drops to 0%, the first command you run in terminal is 'jcmd <PID> Thread.print'! Scroll straight to the bottom of the dump to find the exact lines causing the deadlock! — Sukanta Hui"
      />
    </div>
  );
}