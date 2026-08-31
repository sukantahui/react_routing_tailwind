import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mthDemoCode from "./topic4_files/FundamentalCollectionMethodsSuiteDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Core Methods Suite
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Fundamental Collection Methods: <code className="text-emerald-400 font-mono">add()</code>, <code className="text-sky-400 font-mono">removeIf()</code>, <code className="text-amber-400 font-mono">contains()</code> &amp; <code className="text-purple-400 font-mono">toArray()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete <code className="text-emerald-300 font-mono">Collection&lt;E&gt;</code> API: performing bulk operations, lambda-driven in-place filtering (<code className="text-sky-300 font-mono">removeIf</code>), and optimized typed array conversions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mthDemoCode}
          title="FundamentalCollectionMethodsSuiteDemo.java"
          highlightLines={[7, 10, 17, 18, 19, 26, 27, 31, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Collection Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 4: Fundamental Collection Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic4_fundamental_collection_methods_note.txt"
        />
      </section>

      <Teacher
        note="Use 'list.removeIf(x → condition)' instead of iterating and removing elements manually! It avoids ConcurrentModificationException and executes in a single clean pass! — Sukanta Hui"
      />
    </div>
  );
}