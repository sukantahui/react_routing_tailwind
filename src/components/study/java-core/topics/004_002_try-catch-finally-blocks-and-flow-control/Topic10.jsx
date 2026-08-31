import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import exitDemoCode from "./topic10_files/WhenFinallyDoesNotExecuteDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            JVM Termination
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          When Does <code className="text-emerald-400 font-mono">finally</code> NOT Execute? <code className="text-rose-400 font-mono">System.exit()</code> &amp; JVM Crashes
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the exact boundary limits of the JVM: identifying the 4 rare scenarios where finally blocks are bypassed by OS process termination and native crashes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={exitDemoCode}
          title="WhenFinallyDoesNotExecuteDemo.java"
          highlightLines={[7, 10, 14, 15, 18, 19, 26, 27, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="When Finally Fails FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 10: When finally Does Not Execute"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic10_when_finally_fails_note.txt"
        />
      </section>

      <Teacher
        note="Remember: 'finally' is guaranteed to execute against all normal Java code and exceptions. The ONLY way it won't run is if you pull the plug on the JVM with System.exit() or a native OS kill! — Sukanta Hui"
      />
    </div>
  );
}