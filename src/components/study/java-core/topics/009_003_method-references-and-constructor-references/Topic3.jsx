import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import smrDemoCode from "./topic3_files/StaticMethodReferenceDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_003 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Static References
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Kind 1: Reference to a <code className="text-emerald-400 font-mono">Static Method</code> (<code className="text-sky-400 font-mono">ClassName::staticMethod</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply static functional handles: referencing JDK utilities like <code className="text-emerald-300 font-mono">Math::max</code> and <code className="text-sky-300 font-mono">Integer::parseInt</code> alongside custom business class calculations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={smrDemoCode}
          title="StaticMethodReferenceDemo.java"
          highlightLines={[7, 10, 11, 22, 23, 27, 28, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Static References FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_003 Topic 3: Static References"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_003_topic3_static_references_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you have a static utility method that takes arguments and returns a value, write 'ClassName::method'! For example, 'list.map(Integer::parseInt)' is 10 times cleaner than 'list.map(s -> Integer.parseInt(s))'! — Sukanta Hui"
      />
    </div>
  );
}