import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jtdDemoCode from "./topic9_files/JvmTerminationAndDaemonShutdownDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Daemon Shutdown
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          JVM Process Termination: Abrupt Shutdown of Running <code className="text-rose-400 font-mono">Daemon Threads</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand JVM shutdown boundaries: observing how the termination of the last active User thread triggers instantaneous process exit, abandoning daemon threads and bypassing <code className="text-amber-300 font-mono">finally</code> blocks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jtdDemoCode}
          title="JvmTerminationAndDaemonShutdownDemo.java"
          highlightLines={[7, 10, 16, 17, 26, 27, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Daemon Shutdown FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 9: Daemon Shutdown"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic9_daemon_shutdown_note.txt"
        />
      </section>

      <Teacher
        note="Remember this for exams: When the last User thread finishes, the JVM kills all Daemon threads instantly! Their 'finally' blocks will NOT run! So never save important files or close database transactions inside a Daemon thread! — Sukanta Hui"
      />
    </div>
  );
}