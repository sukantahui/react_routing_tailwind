import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import finallyDemoCode from "./topic7_files/FinallyBlockGuaranteedCleanupDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Resource Teardown
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">finally</code> Block: Guaranteed Resource Cleanup &amp; Teardown
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Guarantee resource safety in the JVM: releasing database connection locks, flushing file streams, and preventing leakages under unexpected runtime failures.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={finallyDemoCode}
          title="FinallyBlockGuaranteedCleanupDemo.java"
          highlightLines={[7, 10, 14, 15, 18, 19, 21, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Finally Block FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 7: The finally Block"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic7_finally_block_note.txt"
        />
      </section>

      <Teacher
        note="If your code opens a database connection or file, it MUST be closed in a finally block! Even if your calculation throws an ArithmeticException, the finally block will ensure the file is closed! — Sukanta Hui"
      />
    </div>
  );
}