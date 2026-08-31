import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prfDemoCode from "./topic4_files/HashSetPerformanceCharacteristicsDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            O(1) Performance
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          HashSet Performance: <code className="text-emerald-400 font-mono">O(1)</code> Constant Time <code className="text-emerald-400 font-mono">add()</code>, <code className="text-sky-400 font-mono">remove()</code> &amp; <code className="text-amber-400 font-mono">contains()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze constant-time hash mechanics: exploring direct bucket address computation, load factor thresholds (<code className="text-emerald-300 font-mono">0.75</code>), and Java 8 treeification worst-case guarantees.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={prfDemoCode}
          title="HashSetPerformanceCharacteristicsDemo.java"
          highlightLines={[7, 10, 16, 17, 22, 23, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="HashSet Performance FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 4: HashSet Performance"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic4_hashset_performance_note.txt"
        />
      </section>

      <Teacher
        note="If you need to check if 100,000 voter IDs or customer codes exist, an ArrayList takes seconds, but a HashSet takes nanoseconds! Direct bucket hashing makes lookup instantaneous! — Sukanta Hui"
      />
    </div>
  );
}