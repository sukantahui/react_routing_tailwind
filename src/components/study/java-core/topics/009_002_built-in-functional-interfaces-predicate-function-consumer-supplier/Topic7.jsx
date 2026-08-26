import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pcoDemoCode from "./topic7_files/PredicateChainingOperatorsDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Predicate Chaining
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Predicate</code> Chaining: <code className="text-sky-400 font-mono">and()</code>, <code className="text-purple-400 font-mono">or()</code>, <code className="text-rose-400 font-mono">negate()</code> &amp; <code className="text-amber-400 font-mono">isEqual()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct complex Boolean evaluation trees: chaining discrete predicates with short-circuiting logical operators, negating conditions, and testing null-safe object equality.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pcoDemoCode}
          title="PredicateChainingOperatorsDemo.java"
          highlightLines={[7, 10, 31, 32, 35, 38, 41, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Predicate Chaining FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 7: Predicate Chaining"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic7_predicate_chaining_note.txt"
        />
      </section>

      <Teacher
        note="Instead of writing messy nested if-else statements with &&, ||, and ! operators, write clean named micro-predicates and chain them together: 'isAdult.and(hasPassport).and(isVisaApproved)'! Readable like plain English! — Sukanta Hui"
      />
    </div>
  );
}