import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import hierarchyDemoCode from "./topic2_files/WrapperInheritanceHierarchyDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 2
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Class Hierarchy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Inheritance Hierarchy: <code className="text-indigo-400 font-mono">java.lang.Number</code> Superclass vs <code className="text-emerald-400 font-mono">Character</code> &amp; <code className="text-emerald-400 font-mono">Boolean</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand the OOP architecture of wrapper types: why numeric wrappers inherit from abstract <code className="text-indigo-300 font-mono">Number</code> while <code className="text-emerald-300 font-mono">Character</code> and <code className="text-emerald-300 font-mono">Boolean</code> extend <code className="text-sky-300 font-mono">Object</code> directly.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={hierarchyDemoCode}
          title="WrapperInheritanceHierarchyDemo.java"
          highlightLines={[7, 14, 15, 16, 23, 27, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Wrapper Hierarchy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 2: Wrapper Hierarchy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic2_wrapper_hierarchy_note.txt"
        />
      </section>

      <Teacher
        note="Notice that Number allows polymorphic numeric conversion: you can hold any Integer or Double in a Number reference and call .doubleValue() on it! — Sukanta Hui"
      />
    </div>
  );
}