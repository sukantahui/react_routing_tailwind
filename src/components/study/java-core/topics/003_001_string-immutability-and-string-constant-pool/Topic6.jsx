import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import strEqualsDemoCode from "./topic6_files/StringEqualsVsOperatorDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Cardinal Equality Law
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comparing Strings: Reference Identity (<code className="text-rose-400 font-mono">==</code>) vs Content Equality (<code className="text-emerald-400 font-mono">.equals()</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the cardinal law of String comparisons: compiler constant folding, literal pooling, and why <code className="text-rose-300 font-mono">==</code> produces catastrophic false negatives on dynamic strings.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={strEqualsDemoCode}
          title="StringEqualsVsOperatorDemo.java"
          highlightLines={[7, 15, 16, 17, 18, 22, 23, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="String Comparison FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 6: String == vs equals()"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic6_string_equals_note.txt"
        />
      </section>

      <Teacher
        note="If you take input from a Scanner or web form and compare it with 'name == Swadeep', it will ALWAYS return false! Always use 'Swadeep'.equals(name) to avoid null pointers and bugs. — Sukanta Hui"
      />
    </div>
  );
}
