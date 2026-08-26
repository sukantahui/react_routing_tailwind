import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ccaDemoCode from "./topic9_files/ConsumerChainingAndThenDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Consumer Chaining
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-purple-400 font-mono">Consumer</code> Chaining: Sequential Multi-Stage Processing via <code className="text-emerald-400 font-mono">andThen()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct sequential side-effect workflows: orchestrating multi-stage registration pipelines by linking discrete <code className="text-purple-300 font-mono">Consumer</code> tasks with fluent <code className="text-emerald-300 font-mono">andThen()</code> combinators.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ccaDemoCode}
          title="ConsumerChainingAndThenDemo.java"
          highlightLines={[7, 10, 23, 24, 28, 29, 33, 34, 38, 39, 40, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Consumer Chaining FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 9: Consumer Chaining"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic9_consumer_chaining_note.txt"
        />
      </section>

      <Teacher
        note="Instead of putting database saving, printing, and email notifications in one giant method, write 3 tiny Consumers and connect them with andThen()! You can re-arrange or turn off stages with zero hassle! — Sukanta Hui"
      />
    </div>
  );
}