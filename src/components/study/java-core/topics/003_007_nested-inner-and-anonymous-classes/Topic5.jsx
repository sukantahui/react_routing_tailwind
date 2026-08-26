import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import staticDemoCode from "./topic5_files/StaticNestedClassArchitectureDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Static Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Static Nested Class</code>: Zero Outer Reference &amp; Direct Instantiation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master standalone nested architecture: constructing static nested objects with <code className="text-emerald-300 font-mono">new Outer.StaticNested()</code>, memory efficiency, and eliminating outer reference leaks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={staticDemoCode}
          title="StaticNestedClassArchitectureDemo.java"
          highlightLines={[7, 10, 14, 18, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Static Nested Class FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 5: Static Nested Class"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic5_static_nested_class_note.txt"
        />
      </section>

      <Teacher
        note="If your nested class does not need to access non-static fields of the outer class, ALWAYS mark it 'static'! Joshua Bloch calls this one of the most important rules in Effective Java! — Sukanta Hui"
      />
    </div>
  );
}