import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rlmDemoCode from "./topic9_files/RefactoringLambdasToMethodReferencesDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_003 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Refactoring Pipelines
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Refactoring <code className="text-purple-400 font-mono">Complex Lambdas</code> into Declarative <code className="text-emerald-400 font-mono">Method References</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Clean production pipelines: refactoring noisy lambda forwarding statements into elegant <code className="text-emerald-300 font-mono">Objects::nonNull</code> and domain getter method references.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rlmDemoCode}
          title="RefactoringLambdasToMethodReferencesDemo.java"
          highlightLines={[7, 8, 38, 39, 40, 41, 42, 47, 48, 49, 50, 51]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Refactoring Pipelines FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_003 Topic 9: Refactoring Pipelines"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_003_topic9_refactoring_pipelines_note.txt"
        />
      </section>

      <Teacher
        note="Compare the two pipelines in this demo: the verbose lambda version is full of noisy 'record → record...' clutter, while the method reference version reads like a clean executive summary! That is the power of modern Java! — Sukanta Hui"
      />
    </div>
  );
}