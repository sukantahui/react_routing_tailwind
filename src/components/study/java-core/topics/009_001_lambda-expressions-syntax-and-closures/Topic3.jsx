import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ttdDemoCode from "./topic3_files/TargetTypingDeductionDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Target Typing
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Target Typing</code>: How the Compiler Infers Lambda Types from Context
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand contextual type resolution: exploring variable assignments, method parameter descriptors, and how identical lambda expressions resolve to disparate functional interfaces.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ttdDemoCode}
          title="TargetTypingDeductionDemo.java"
          highlightLines={[7, 10, 14, 15, 21, 22, 24, 25, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Target Typing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 3: Target Typing"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic3_target_typing_note.txt"
        />
      </section>

      <Teacher
        note="A lambda is like a liquid: it has no shape of its own until you pour it into a cup (the Target Type)! Whether you pour '() -> \'Hi\'' into a Callable cup or a Supplier cup, Java shapes the lambda to match! — Sukanta Hui"
      />
    </div>
  );
}