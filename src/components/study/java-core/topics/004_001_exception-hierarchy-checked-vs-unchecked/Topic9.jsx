import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import catDemoCode from "./topic9_files/CommonStandardExceptionsCatalogDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 9
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Standard Catalog
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Common Standard Java Exceptions &amp; Their Root Triggers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Catalogue the core exceptions in the JDK: distinguishing <code className="text-emerald-300 font-mono">IllegalArgumentException</code> from <code className="text-sky-300 font-mono">IllegalStateException</code> and practicing standard exception reuse.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={catDemoCode}
          title="CommonStandardExceptionsCatalogDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 19, 20, 27, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Standard Catalog FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_001 Topic 9: Common Exceptions Catalog"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_001_topic9_common_exceptions_catalog_note.txt"
        />
      </section>

      <Teacher
        note="Don't invent custom exceptions for everything! Java already provides IllegalArgumentException, IllegalStateException, and UnsupportedOperationException! Reusing standard exceptions makes your API easy for other developers to learn! — Sukanta Hui"
      />
    </div>
  );
}