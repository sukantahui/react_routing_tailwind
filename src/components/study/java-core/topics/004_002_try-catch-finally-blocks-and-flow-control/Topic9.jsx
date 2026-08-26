import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import retDemoCode from "./topic9_files/FinallyWithReturnStatementDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Classic Interview Favorite
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Corner Cases: Does <code className="text-emerald-400 font-mono">finally</code> Execute on <code className="text-amber-400 font-mono">return</code> Statements? (YES!)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the classic interview corner case: tracing how the JVM temporarily stores return values, completes finally blocks, and guarantees cleanup on early returns.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={retDemoCode}
          title="FinallyWithReturnStatementDemo.java"
          highlightLines={[7, 10, 12, 13, 14, 18, 19, 21, 22]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Finally on Return FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 9: finally on return"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic9_finally_on_return_note.txt"
        />
      </section>

      <Teacher
        note="This is asked in 99% of Java interviews: 'If I have return in try, does finally run?' The answer is ALWAYS YES! The finally block executes right before the return value is handed back to the caller! — Sukanta Hui"
      />
    </div>
  );
}