import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import shadowDemoCode from "./topic4_files/OuterClassThisShadowingDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 4
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Scope Disambiguation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">OuterClass.this</code> Syntax for Variable Shadowing
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Disambiguate three levels of variable scope: cleanly accessing method parameters, inner class instance fields with <code className="text-sky-300 font-mono">this</code>, and enclosing outer fields with <code className="text-emerald-300 font-mono">Outer.this</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={shadowDemoCode}
          title="OuterClassThisShadowingDemo.java"
          highlightLines={[7, 10, 14, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Variable Shadowing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 4: OuterClass.this Syntax"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic4_outer_this_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you have the same variable name in a method parameter, inner class, and outer class, 'OuterClass.this.field' is your universal rescue syntax! — Sukanta Hui"
      />
    </div>
  );
}