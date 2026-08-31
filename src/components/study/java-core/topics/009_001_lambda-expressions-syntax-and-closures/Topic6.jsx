import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import aivDemoCode from "./topic6_files/AnonymousInnerClassVsLambdaBytecodeDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Bytecode &amp; invokedynamic
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Anonymous Classes vs <code className="text-purple-400 font-mono">Lambdas</code>: Bytecode &amp; <code className="text-emerald-400 font-mono">invokedynamic</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine JVM internals: comparing legacy <code className="text-rose-300 font-mono">Outer$1.class</code> compilation with modern <code className="text-emerald-300 font-mono">invokedynamic</code> CallSites, singleton caching, and memory optimization.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={aivDemoCode}
          title="AnonymousInnerClassVsLambdaBytecodeDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bytecode & invokedynamic FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 6: Anonymous Classes vs Lambdas"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic6_anonymous_vs_lambdas_note.txt"
        />
      </section>

      <Teacher
        note="Don't think of a Lambda as just short syntax for an Anonymous Class! Under the hood, lambdas use 'invokedynamic' to execute directly without cluttering your hard drive with synthetic '$1.class' files or creating unnecessary heap objects! — Sukanta Hui"
      />
    </div>
  );
}