import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mthDemoCode from "./topic1_files/CoreMapMethodsSuiteDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Core Map Methods
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Core Map Methods: <code className="text-emerald-400 font-mono">getOrDefault()</code>, <code className="text-sky-400 font-mono">containsKey()</code> &amp; <code className="text-amber-400 font-mono">entrySet()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master dictionary lookups: utilizing <code className="text-emerald-300 font-mono">getOrDefault</code> to eliminate boilerplate null checks and analyzing <code className="text-sky-300 font-mono">O(1)</code> key vs <code className="text-rose-300 font-mono">O(n)</code> value queries.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mthDemoCode}
          title="CoreMapMethodsSuiteDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 21, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Core Map Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 1: Core Map Methods Suite"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic1_core_map_methods_note.txt"
        />
      </section>

      <Teacher
        note="Use 'getOrDefault(key, defaultValue)' instead of checking 'if (map.get(key) != null)'! It makes your code clean, elegant, and prevents NullPointerExceptions! — Sukanta Hui"
      />
    </div>
  );
}