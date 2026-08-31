import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sdbDemoCode from "./topic10_files/SetDaemonBeforeStartRuleDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            setDaemon() Rule
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Setting Daemon Status: <code className="text-emerald-400 font-mono">thread.setDaemon(true)</code> &amp; The Start-Order Rule
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master daemon initialization invariants: configuring daemon flags in the <code className="text-emerald-300 font-mono">NEW</code> state and avoiding <code className="text-rose-300 font-mono">IllegalThreadStateException</code> from post-start mutations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sdbDemoCode}
          title="SetDaemonBeforeStartRuleDemo.java"
          highlightLines={[7, 10, 18, 19, 27, 28, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="setDaemon() Rule FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 10: setDaemon() Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic10_setdaemon_rules_note.txt"
        />
      </section>

      <Teacher
        note="Always call 'thread.setDaemon(true)' BEFORE 'thread.start()'! If you start the thread first and then try to make it a daemon, Java will immediately crash with an IllegalThreadStateException! — Sukanta Hui"
      />
    </div>
  );
}