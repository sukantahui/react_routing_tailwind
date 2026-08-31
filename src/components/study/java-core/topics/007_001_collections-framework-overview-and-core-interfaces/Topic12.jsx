import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import decDemoCode from "./topic12_files/CollectionSelectionDecisionTreeCapstoneDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Selection Decision Tree
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Decision Tree: Choosing the Optimal Collection Archetype (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize collection architecture: following a structured decision tree based on ordering, uniqueness, indexing, and access patterns to pick the perfect data structure.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={decDemoCode}
          title="CollectionSelectionDecisionTreeCapstoneDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 20, 21, 26, 27, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Collection Decision Tree FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 12: Decision Tree Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic12_decision_tree_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 007_001! You now have a crystal-clear roadmap of the entire Java Collections Framework—from Iterable to List, Set, Queue, and Map—and you know exactly which data structure to choose for any project! — Sukanta Hui"
      />
    </div>
  );
}