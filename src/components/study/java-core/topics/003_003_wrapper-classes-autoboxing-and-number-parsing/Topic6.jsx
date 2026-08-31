import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cacheDemoCode from "./topic6_files/IntegerCachePoolMasteryDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Cache Pool Pitfall
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Integer Cache Pool (-128 to 127): Why <code className="text-emerald-400 font-mono">100 == 100</code> is True but <code className="text-rose-400 font-mono">200 == 200</code> is False
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the most famous Java interview trap: exploring the JVM Flyweight IntegerCache pool, boundary thresholds, and why comparing wrapper references with <code className="text-rose-400 font-mono">==</code> creates intermittent bugs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cacheDemoCode}
          title="IntegerCachePoolMasteryDemo.java"
          highlightLines={[7, 14, 15, 18, 22, 23, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Integer Cache FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 6: Integer Cache Pool"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic6_integer_cache_note.txt"
        />
      </section>

      <Teacher
        note="Imagine testing your code with student roll number 50 and '==' passes, then in production with roll number 150 it silently fails! ALWAYS use '.equals()' when comparing Integer objects. — Sukanta Hui"
      />
    </div>
  );
}