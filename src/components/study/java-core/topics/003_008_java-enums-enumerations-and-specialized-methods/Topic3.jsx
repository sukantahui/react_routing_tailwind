import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import methodsDemoCode from "./topic3_files/BuiltInEnumMethodsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Built-in Methods
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Built-in Enum Methods: <code className="text-emerald-400 font-mono">name()</code>, <code className="text-amber-400 font-mono">ordinal()</code>, <code className="text-sky-400 font-mono">values()</code> &amp; <code className="text-purple-400 font-mono">valueOf()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the standard enum utility suite: iterating array constants with <code className="text-sky-300 font-mono">values()</code>, parsing strings with <code className="text-purple-300 font-mono">valueOf()</code>, and avoiding ordinal database persistence pitfalls.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={methodsDemoCode}
          title="BuiltInEnumMethodsDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 23, 26, 30, 31, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Built-in Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 3: Built-in Enum Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic3_builtin_enum_methods_note.txt"
        />
      </section>

      <Teacher
        note="Never store ordinal() in MySQL database columns! If someone adds a new enum constant at the top tomorrow, ordinal 0 becomes 1 and your entire database records will be scrambled! Store name() or a custom code! — Sukanta Hui"
      />
    </div>
  );
}