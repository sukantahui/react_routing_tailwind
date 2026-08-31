import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import readerDemoCode from "./topic2_files/ReaderCoreMethodsDeepDiveDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_002 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Reader API
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Core Methods of <code className="text-emerald-400 font-mono">Reader</code>: <code className="text-emerald-300 font-mono">read()</code>, <code className="text-sky-400 font-mono">read(char[])</code>, <code className="text-amber-400 font-mono">ready()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the reader method suite: reading single characters, filling array block buffers, verifying non-blocking readiness, and detecting -1 EOF boundaries.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={readerDemoCode}
          title="ReaderCoreMethodsDeepDiveDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 24, 25, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Reader Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_002 Topic 2: Core Methods of Reader"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_002_topic2_reader_core_methods_note.txt"
        />
      </section>

      <Teacher
        note="Always check 'while ((ch = reader.read()) != -1)' when processing character streams! Storing the return value in an int before casting to (char) prevents premature termination! — Sukanta Hui"
      />
    </div>
  );
}