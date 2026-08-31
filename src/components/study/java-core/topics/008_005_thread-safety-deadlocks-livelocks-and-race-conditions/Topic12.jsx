import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tdaDemoCode from "./topic12_files/ThreadDumpAnalysisDecoderDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 12
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Thread Dump Forensics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Analyzing Thread Dumps: Decoding <code className="text-rose-400 font-mono">BLOCKED</code> States &amp; Deadlock Cycles
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master production forensic analysis: dissecting JVM thread dump stack traces, cross-referencing monitor hex addresses, and locating exact source code lock lines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tdaDemoCode}
          title="ThreadDumpAnalysisDecoderDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 21, 22, 23, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread Dump Forensics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 12: Thread Dump Forensics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic12_thread_dump_forensics_note.txt"
        />
      </section>

      <Teacher
        note="Thread dumps look intimidating at first with all those hex addresses, but all you need to do is match the '<0x...>' numbers between the two BLOCKED threads! Once you match the addresses, the stack trace points straight to the culprit line in your code! — Sukanta Hui"
      />
    </div>
  );
}