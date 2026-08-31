import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import leakDemoCode from "./topic13_files/InnerClassMemoryLeakDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 13
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Memory Leak Pitfall
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Inner Classes &amp; Memory Leaks: Hidden Outer References in Event Listeners
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnose severe garbage collection traps in GUI and mobile apps: tracing how long-lived listeners retain heavy outer instances via compiler-generated <code className="text-rose-300 font-mono">this$0</code> pointers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={leakDemoCode}
          title="InnerClassMemoryLeakDemo.java"
          highlightLines={[7, 13, 16, 17, 20, 21, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Memory Leaks FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 13: Inner Class Memory Leaks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic13_inner_memory_leak_note.txt"
        />
      </section>

      <Teacher
        note="This is why Android developers used to get Activity memory leaks all the time with Handlers and AsyncTasks! Making the inner class 'static' completely breaks the retention link! — Sukanta Hui"
      />
    </div>
  );
}