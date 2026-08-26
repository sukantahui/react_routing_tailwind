import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import brnDemoCode from "./topic5_files/FourPrimaryJcfBranchesTaxonomyDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JCF 4 Branches
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The 4 Primary Branches of JCF: <code className="text-emerald-400 font-mono">List</code>, <code className="text-sky-400 font-mono">Set</code>, <code className="text-amber-400 font-mono">Queue</code> &amp; <code className="text-purple-400 font-mono">Map</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the four pillars of Java collections: comparing indexing, uniqueness contracts, buffering semantics, and key-value mapping paradigms.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={brnDemoCode}
          title="FourPrimaryJcfBranchesTaxonomyDemo.java"
          highlightLines={[7, 10, 13, 14, 16, 17, 19, 20, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="4 Branches FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 5: 4 Primary JCF Branches"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic5_four_primary_jcf_branches_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you have data to store, ask yourself 3 questions: Do I need an ordered list (List)? Do I need strict uniqueness (Set)? Do I need key-value lookup (Map)? Or do I need a processing queue (Queue)? Your answer picks the right branch instantly! — Sukanta Hui"
      />
    </div>
  );
}