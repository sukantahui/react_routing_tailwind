import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import docDemoCode from "./topic9_files/JavadocExceptionDocumentationDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Javadoc Engineering
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Documenting Exceptions in Javadoc Using the <code className="text-emerald-400 font-mono">@throws</code> Tag
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply Effective Java Item 74: writing professional Javadoc <code className="text-emerald-300 font-mono">@throws</code> tags to clearly articulate precondition constraints and failure modes for API consumers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={docDemoCode}
          title="JavadocExceptionDocumentationDemo.java"
          highlightLines={[7, 13, 14, 15, 16, 17, 18, 19, 21, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Javadoc @throws FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 9: Javadoc Documentation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic9_javadoc_documentation_note.txt"
        />
      </section>

      <Teacher
        note="Never hide failure conditions! Use '@throws IllegalArgumentException if amount is negative' so that anyone calling your method from Naihati or Shyamnagar knows exactly how to use it safely! — Sukanta Hui"
      />
    </div>
  );
}