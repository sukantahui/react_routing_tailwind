import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import scwDemoCode from "./topic13_files/SynchronizedWrappersDeepDiveDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 13
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Synchronized Wrappers
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Synchronized Wrappers: <code className="text-emerald-400 font-mono">Collections.synchronizedList()</code> &amp; The Iteration Mutex Trap
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect synchronized collection wrappers: mastering coarse mutex synchronization and uncovering why manual <code className="text-emerald-300 font-mono">synchronized(syncList)</code> blocks are mandatory during iteration.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={scwDemoCode}
          title="SynchronizedWrappersDeepDiveDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 26, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Synchronized Wrappers FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 13: Synchronized Wrappers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic13_synchronized_wrappers_note.txt"
        />
      </section>

      <Teacher
        note="If you wrap a list with Collections.synchronizedList, remember this rule: You MUST wrap every for-each loop inside a 'synchronized(list) { ... }' block! Otherwise, another thread can modify the list mid-loop and crash your program! — Sukanta Hui"
      />
    </div>
  );
}