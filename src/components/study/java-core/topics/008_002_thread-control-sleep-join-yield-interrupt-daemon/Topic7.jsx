import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import irlDemoCode from "./topic7_files/InterruptResponsiveLoopsDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Responsive Loops
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Writing Interrupt-Responsive Loops: <code className="text-emerald-400 font-mono">while (!Thread.currentThread().isInterrupted())</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct production-grade worker loops: implementing the canonical <code className="text-emerald-300 font-mono">!isInterrupted()</code> loop header, handling blocking pauses, and executing clean resource shutdowns.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={irlDemoCode}
          title="InterruptResponsiveLoopsDemo.java"
          highlightLines={[7, 10, 18, 19, 29, 30, 36, 37, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Responsive Loops FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 7: Interrupt-Responsive Loops"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic7_interrupt_responsive_loops_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you write an infinite background loop, always make it interrupt-responsive: 'while(!Thread.currentThread().isInterrupted())'! That way, when the user clicks 'Cancel' or the server shuts down, your thread exits cleanly without hanging! — Sukanta Hui"
      />
    </div>
  );
}