import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import subDemoCode from "./topic9_files/AnonymousSubclassingDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 9
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Subclassing Rules
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Anonymous Classes: Implementing Interfaces vs Extending Abstract Classes
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore polymorphic anonymous expressions: overriding methods in abstract classes, inheritance access, and the single-type inheritance constraint.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={subDemoCode}
          title="AnonymousSubclassingDemo.java"
          highlightLines={[7, 18, 19, 20, 27, 28, 29, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Anonymous Subclassing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 9: Anonymous Subclassing"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic9_anonymous_subclassing_note.txt"
        />
      </section>

      <Teacher
        note="Since anonymous classes have no name, you cannot write a constructor like 'public MyAnon()'! If you need initialization logic, use an instance initializer block '{ ... }'! — Sukanta Hui"
      />
    </div>
  );
}