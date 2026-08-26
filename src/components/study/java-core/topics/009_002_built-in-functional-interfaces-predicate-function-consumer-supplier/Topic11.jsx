import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import soubDemoCode from "./topic11_files/SpecializedOperatorsUnaryBinaryDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Operators
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Specialized Operators: <code className="text-emerald-400 font-mono">UnaryOperator&lt;T&gt;</code> &amp; <code className="text-sky-400 font-mono">BinaryOperator&lt;T&gt;</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Streamline mathematical operations: applying type-preserving <code className="text-emerald-300 font-mono">UnaryOperator</code> for in-place list transformations and <code className="text-sky-300 font-mono">BinaryOperator</code> for stream reductions and min/max evaluations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={soubDemoCode}
          title="SpecializedOperatorsUnaryBinaryDemo.java"
          highlightLines={[7, 8, 9, 10, 19, 20, 24, 25, 29, 30, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Operators FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 11: Operators"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic11_specialized_operators_note.txt"
        />
      </section>

      <Teacher
        note="Whenever your input type and output type are identical (e.g. String -> String or (int, int) -> int), don't write verbose 'Function<String, String>' or 'BiFunction<Integer, Integer, Integer>'! Use 'UnaryOperator<String>' or 'BinaryOperator<Integer>' for cleaner, professional code! — Sukanta Hui"
      />
    </div>
  );
}