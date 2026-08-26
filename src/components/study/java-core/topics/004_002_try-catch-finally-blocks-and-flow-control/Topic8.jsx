import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import branchDemoCode from "./topic8_files/TryCatchFinallyAllBranchesDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            All Execution Branches
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Flow of Control in <code className="text-emerald-400 font-mono">try-catch-finally</code> Under All Execution Branches
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace all execution pathways: analyzing normal completion, handled recovery, and verifying that finally blocks execute even when exceptions are uncaught.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={branchDemoCode}
          title="TryCatchFinallyAllBranchesDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 15, 17, 18, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Execution Branches FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 8: Flow of Control Branches"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic8_control_flow_branches_note.txt"
        />
      </section>

      <Teacher
        note="Even if nobody catches the exception, the finally block runs right before the method dies! That is why finally is so reliable for closing files and network sockets! — Sukanta Hui"
      />
    </div>
  );
}