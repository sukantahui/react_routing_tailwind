import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rshDemoCode from "./topic13_files/HashMapRehashingBitwiseRedistributionDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 13
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Bitwise Resizing
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Rehashing &amp; Resizing: Doubling (<code className="text-emerald-400 font-mono">2x</code>) &amp; Bitwise Node Redistribution (<code className="text-sky-400 font-mono">e.hash &amp; oldCap</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect table expansion algorithms: analyzing how <code className="text-emerald-300 font-mono">(e.hash &amp; oldCap) == 0</code> splits bucket chains into low and high partitions with zero re-hashing computation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rshDemoCode}
          title="HashMapRehashingBitwiseRedistributionDemo.java"
          highlightLines={[7, 10, 13, 14, 21, 22, 28, 29, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Resizing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 13: Rehashing & Resizing"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic13_rehashing_and_resizing_note.txt"
        />
      </section>

      <Teacher
        note="Java 8's resizing algorithm is pure mathematical genius! When the table doubles from 16 to 32, Java checks just 1 single bit with '(hash & 16)'. If it's 0, the node stays in bucket 5; if it's 1, it moves to bucket 21! No re-hashing required! — Sukanta Hui"
      />
    </div>
  );
}