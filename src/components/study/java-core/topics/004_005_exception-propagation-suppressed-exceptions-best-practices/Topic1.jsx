import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import unwindDemoCode from "./topic1_files/StackUnwindingLifecycleDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 1
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Frame Dismantling
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Stack Unwinding: Automatic Stack Frame Teardown &amp; Finally Guarantees
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Observe JVM call-stack mechanics: tracing how the JVM systematically deconstructs active stack frames and guarantees finally execution across all unwound layers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={unwindDemoCode}
          title="StackUnwindingLifecycleDemo.java"
          highlightLines={[7, 10, 11, 13, 17, 18, 20, 24, 25, 27, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Stack Unwinding FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 1: Stack Unwinding"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic1_stack_unwinding_note.txt"
        />
      </section>

      <Teacher
        note="Notice in the demo how Depth 3 finally runs, then Depth 2 finally runs, and then Depth 1 catch runs! Even during catastrophic unwinding, Java never forgets a single finally block! — Sukanta Hui"
      />
    </div>
  );
}