import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whlDemoCode from "./topic9_files/WhileLoopWaitGoldenRuleDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            The Golden Rule
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The Golden Rule: ALWAYS Call <code className="text-emerald-400 font-mono">wait()</code> inside a <code className="text-sky-400 font-mono">while</code> Loop
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enforce concurrency safety: analyzing why condition re-evaluation loops (<code className="text-emerald-300 font-mono">while (!condition) wait()</code>) prevent race condition corruptions when multiple threads wake up sequentially.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={whlDemoCode}
          title="WhileLoopWaitGoldenRuleDemo.java"
          highlightLines={[7, 10, 15, 16, 26, 27, 28, 51, 52, 53]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="The Golden Rule FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 9: The Golden Rule (wait in while)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic9_golden_rule_wait_in_while_note.txt"
        />
      </section>

      <Teacher
        note="If you only remember ONE rule from multithreading, make it this one: ALWAYS call wait() inside a WHILE loop, NEVER inside an IF block! 'while (!ready) lock.wait();' is the golden law of Java concurrency! — Sukanta Hui"
      />
    </div>
  );
}