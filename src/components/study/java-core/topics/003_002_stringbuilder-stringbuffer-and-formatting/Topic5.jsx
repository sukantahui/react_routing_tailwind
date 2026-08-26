import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import methodsDemoCode from "./topic5_files/StringBuilderMethodsMasteryDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Buffer Manipulation API
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">StringBuilder</code> Core Methods: <code className="text-emerald-400 font-mono">append()</code>, <code className="text-sky-400 font-mono">insert()</code> &amp; <code className="text-amber-400 font-mono">reverse()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete in-place buffer manipulation API: inserting at offsets, slicing with <code className="text-rose-300 font-mono">delete()</code>, character replacement, and instant palindromic reversal.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={methodsDemoCode}
          title="StringBuilderMethodsMasteryDemo.java"
          highlightLines={[7, 15, 19, 23, 27, 31, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="StringBuilder Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 5: StringBuilder Core Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic5_sb_methods_note.txt"
        />
      </section>

      <Teacher
        note="Notice how all these methods modify the SAME buffer in RAM and return 'this'! That lets you chain them together in 1 elegant sentence. — Sukanta Hui"
      />
    </div>
  );
}