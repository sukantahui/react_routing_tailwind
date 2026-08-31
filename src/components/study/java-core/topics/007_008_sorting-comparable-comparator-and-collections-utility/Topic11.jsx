import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import algDemoCode from "./topic11_files/CollectionsAlgorithmsSuiteDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Collections Algorithms
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Algorithms: <code className="text-emerald-400 font-mono">sort()</code>, <code className="text-sky-400 font-mono">binarySearch()</code>, <code className="text-amber-400 font-mono">reverse()</code> &amp; <code className="text-purple-400 font-mono">shuffle()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply polymorphic collection algorithms: mastering <code className="text-emerald-300 font-mono">O(log n)</code> binary search prerequisite rules, in-place sequence reversals, element swaps, and random permutations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={algDemoCode}
          title="CollectionsAlgorithmsSuiteDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 28, 29, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Collections Algorithms FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 11: Collections Algorithms"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic11_collections_algorithms_note.txt"
        />
      </section>

      <Teacher
        note="Remember: You MUST sort a list before calling 'Collections.binarySearch()'! If the list is unsorted, binarySearch will return random, incorrect results! — Sukanta Hui"
      />
    </div>
  );
}