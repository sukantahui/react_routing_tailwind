import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import trpDemoCode from "./topic11_files/TreeSetCompareToUniquenessTrapDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 11
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            compareTo vs equals Trap
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          TreeSet Does <code className="text-rose-400 font-mono">NOT</code> Use <code className="text-rose-400 font-mono">equals/hashCode</code>: <code className="text-emerald-400 font-mono">compareTo() == 0</code> Dictates Uniqueness
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Avoid silent data loss: discovering why TreeSet ignores <code className="text-rose-400 font-mono">equals()</code> and relies exclusively on <code className="text-emerald-300 font-mono">compareTo() == 0</code> to evaluate duplicate membership.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={trpDemoCode}
          title="TreeSetCompareToUniquenessTrapDemo.java"
          highlightLines={[7, 10, 20, 21, 28, 29, 44, 45, 52, 53]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="TreeSet Uniqueness Trap FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 11: TreeSet compareTo vs equals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic11_treeset_compareto_vs_equals_note.txt"
        />
      </section>

      <Teacher
        note="This is one of the biggest gotchas in Java! If two different students have the exact same fee of ₹5000, and your compareTo() only compares fees, TreeSet will think they are duplicates and DROP the second student completely! Always include unique IDs in compareTo()! — Sukanta Hui"
      />
    </div>
  );
}