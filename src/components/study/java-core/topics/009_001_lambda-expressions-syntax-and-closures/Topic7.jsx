import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import llsDemoCode from "./topic7_files/LambdaLexicalScopingScopeDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Lexical Scoping
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Lexical Scoping</code>: What <code className="text-sky-400 font-mono">this</code> &amp; <code className="text-purple-400 font-mono">super</code> Mean in Lambdas
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master lexical binding: understanding why lambdas do not shadow surrounding scope, and contrasting enclosing class <code className="text-emerald-300 font-mono">this</code> references with anonymous inner class instances.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={llsDemoCode}
          title="LambdaLexicalScopingScopeDemo.java"
          highlightLines={[7, 10, 11, 15, 16, 20, 21, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Lexical Scoping FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 7: Lexical Scoping"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic7_lexical_scoping_note.txt"
        />
      </section>

      <Teacher
        note="Inside an Anonymous Inner Class, 'this' was a trap that pointed to the anonymous object itself! Inside a Lambda, 'this' behaves intuitively and points straight to your outer enclosing class! No more 'OuterClass.this' gymnastics needed! — Sukanta Hui"
      />
    </div>
  );
}