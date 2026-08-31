import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import srtDemoCode from "./topic8_files/SortedSetAndNavigableSetContractsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            NavigableSet Interface
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">SortedSet</code> &amp; <code className="text-sky-400 font-mono">NavigableSet</code> Interfaces: Proximity &amp; Range Queries
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master sorted collection navigation: utilizing proximity queries (<code className="text-emerald-300 font-mono">floor</code>, <code className="text-sky-300 font-mono">ceiling</code>, <code className="text-amber-300 font-mono">lower</code>, <code className="text-purple-300 font-mono">higher</code>) and descending set views.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={srtDemoCode}
          title="SortedSetAndNavigableSetContractsDemo.java"
          highlightLines={[7, 10, 19, 20, 21, 27, 28, 29, 30, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="NavigableSet FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 8: SortedSet & NavigableSet"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic8_sortedset_and_navigableset_note.txt"
        />
      </section>

      <Teacher
        note="If you need to find the closest number, nearest date, or score threshold, NavigableSet's 'floor()' and 'ceiling()' methods are like magic! They do binary search in O(log n) time! — Sukanta Hui"
      />
    </div>
  );
}