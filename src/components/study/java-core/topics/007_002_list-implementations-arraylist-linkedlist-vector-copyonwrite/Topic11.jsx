import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import legDemoCode from "./topic11_files/LegacyVectorAndStackFlawsDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 11
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Legacy Collections
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Legacy Classes: <code className="text-rose-400 font-mono">java.util.Vector</code> &amp; <code className="text-rose-400 font-mono">java.util.Stack</code> Architectural Flaws
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine historical design anti-patterns: analyzing method-level synchronization overhead in Vector and inheritance encapsulation violations in Stack.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={legDemoCode}
          title="LegacyVectorAndStackFlawsDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 24, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Legacy Collections FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 11: Legacy Vector & Stack"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic11_legacy_vector_and_stack_note.txt"
        />
      </section>

      <Teacher
        note="If you see 'Vector' or 'Stack' in a Java codebase, you are looking at code from 1996! Replace Vector with ArrayList and replace Stack with ArrayDeque immediately! — Sukanta Hui"
      />
    </div>
  );
}