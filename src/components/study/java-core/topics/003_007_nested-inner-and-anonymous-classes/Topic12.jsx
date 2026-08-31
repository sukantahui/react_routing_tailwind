import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import byteDemoCode from "./topic12_files/BytecodeCompilationStructureDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JVM Internals
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Bytecode Analysis: How <code className="text-emerald-400 font-mono">javac</code> Compiles Inner Classes (<code className="text-emerald-300 font-mono">Outer$1.class</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Look under the hood of the Java compiler: understanding synthetic class generation, dollar sign file naming conventions, and how the JVM flattens nested hierarchies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={byteDemoCode}
          title="BytecodeCompilationStructureDemo.java"
          highlightLines={[7, 10, 15, 20, 26, 32, 43, 44, 45, 46, 47, 48]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bytecode Analysis FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 12: Bytecode Analysis"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic12_bytecode_analysis_note.txt"
        />
      </section>

      <Teacher
        note="If you open your bin/ or target/ folder after compiling, you will see many files with '$' in their names! Every anonymous class gets its own numbered .class file like Outer$1.class! — Sukanta Hui"
      />
    </div>
  );
}