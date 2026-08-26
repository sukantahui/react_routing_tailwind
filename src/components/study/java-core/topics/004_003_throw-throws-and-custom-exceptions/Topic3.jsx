import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compDemoCode from "./topic3_files/ThrowVsThrowsComparisonDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 3
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Core Comparison
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Detailed Comparison: <code className="text-rose-400 font-mono">throw</code> vs <code className="text-indigo-400 font-mono">throws</code> Keywords
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the definitive interview comparison: contrasting active runtime exception throwing inside method bodies with passive signature declarations in headers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={compDemoCode}
          title="ThrowVsThrowsComparisonDemo.java"
          highlightLines={[7, 10, 14, 15, 18, 19, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Throw vs Throws FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 3: throw vs throws"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic3_throw_vs_throws_note.txt"
        />
      </section>

      <Teacher
        note="Remember the easy trick: 'throw' has NO 's', so it throws ONE object! 'throws' HAS an 's', so it can declare MULTIPLE classes in the header! — Sukanta Hui"
      />
    </div>
  );
}