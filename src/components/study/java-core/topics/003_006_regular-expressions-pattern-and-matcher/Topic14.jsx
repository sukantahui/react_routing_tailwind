import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import redosDemoCode from "./topic14_files/RedosSecurityAndCatastrophicBacktrackingDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 14
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Security Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Regex Performance Cautions: Catastrophic Backtracking &amp; <code className="text-rose-400 font-mono">ReDoS</code> Security
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Defend enterprise web applications against CPU exhaustion attacks: diagnosing exponential backtracking traps and writing immune possessive quantifier algorithms.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={redosDemoCode}
          title="RedosSecurityAndCatastrophicBacktrackingDemo.java"
          highlightLines={[7, 14, 15, 19, 20, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ReDoS Security FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 14: ReDoS Security Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic14_redos_security_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 003_006! You have mastered java.util.regex, Pattern and Matcher, boundary anchors, capturing groups, backreferences, and ReDoS security defenses! — Sukanta Hui"
      />
    </div>
  );
}