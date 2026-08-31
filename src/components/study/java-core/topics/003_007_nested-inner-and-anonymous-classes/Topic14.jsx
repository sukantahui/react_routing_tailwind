import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compDemoCode from "./topic14_files/AnonymousVsLambdaComparisonDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Modern Evolution
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comparing Anonymous Inner Classes vs Java 8 Lambdas: Architecture &amp; <code className="text-emerald-400 font-mono">this</code> Scope
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand the modern functional shift: contrasting object-level <code className="text-amber-300 font-mono">this</code> bindings, lexical scoping, and <code className="text-emerald-300 font-mono">invokedynamic</code> bytecode generation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={compDemoCode}
          title="AnonymousVsLambdaComparisonDemo.java"
          highlightLines={[7, 13, 14, 18, 19, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Anonymous vs Lambdas FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 14: Anonymous vs Lambdas"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic14_anonymous_vs_lambdas_note.txt"
        />
      </section>

      <Teacher
        note="Remember in technical interviews: A lambda is NOT just syntactic sugar for an anonymous class! Lambdas use invokedynamic, create no extra class files, and have lexical 'this' scoping! — Sukanta Hui"
      />
    </div>
  );
}