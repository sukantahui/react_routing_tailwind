import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import runDemoCode from "./topic8_files/ImplementingRunnableInterfaceDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Creation Method 2
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Creation Method 2: Implementing <code className="text-emerald-400 font-mono">java.lang.Runnable</code> (Preferred Pattern)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply loose coupling principles: separating business task logic (<code className="text-emerald-300 font-mono">Runnable</code>) from execution engines (<code className="text-sky-300 font-mono">Thread</code>) while preserving class inheritance hierarchies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={runDemoCode}
          title="ImplementingRunnableInterfaceDemo.java"
          highlightLines={[7, 10, 18, 19, 31, 34, 35, 37, 38]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Implementing Runnable FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 8: Implementing Runnable Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic8_implementing_runnable_interface_note.txt"
        />
      </section>

      <Teacher
        note="Always prefer implementing Runnable over extending Thread! It cleanly separates the 'job' to be done from the 'worker' doing the job, and lets your class extend any base class you want! — Sukanta Hui"
      />
    </div>
  );
}