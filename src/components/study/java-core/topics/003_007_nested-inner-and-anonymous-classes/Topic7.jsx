import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import methodLocalDemoCode from "./topic7_files/MethodLocalInnerClassDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 7
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Method-Scoped Classes
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-amber-400 font-mono">Method-Local Inner Class</code>: Scoped Declarations &amp; Variable Capture
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to declare classes inside execution method blocks: scoping specialized helper algorithms and capturing effectively final parameters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={methodLocalDemoCode}
          title="MethodLocalInnerClassDemo.java"
          highlightLines={[7, 10, 14, 15, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Method-Local FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 7: Method-Local Inner Class"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic7_method_local_note.txt"
        />
      </section>

      <Teacher
        note="A method-local inner class is like a temporary tool created inside a single function. Once the method finishes execution, that class definition is completely inaccessible outside! — Sukanta Hui"
      />
    </div>
  );
}