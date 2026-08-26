import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compArchDemoCode from "./topic2_files/CompilerEnumInheritanceDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 2
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Compiler Decompilation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          How the Compiler Compiles Enums: Implicit <code className="text-indigo-400 font-mono">java.lang.Enum</code> Inheritance
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Decompile Java enums under the hood: understanding how <code className="text-emerald-300 font-mono">javac</code> converts enum syntax into a final class extending <code className="text-indigo-300 font-mono">java.lang.Enum</code> with static singleton constants.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={compArchDemoCode}
          title="CompilerEnumInheritanceDemo.java"
          highlightLines={[7, 10, 17, 18, 19, 20, 21, 22, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Enum Inheritance FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 2: Compiler Enum Architecture"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic2_compiler_enum_note.txt"
        />
      </section>

      <Teacher
        note="If an interviewer asks: 'Can an enum extend a class?', answer with a confident NO! Because the compiler already made it extend java.lang.Enum, and Java does not support multiple class inheritance! — Sukanta Hui"
      />
    </div>
  );
}