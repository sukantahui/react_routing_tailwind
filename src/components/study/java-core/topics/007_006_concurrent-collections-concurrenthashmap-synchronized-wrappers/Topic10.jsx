import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import skpDemoCode from "./topic10_files/ConcurrentSkipListMapDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            ConcurrentSkipListMap
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">ConcurrentSkipListMap</code>: Thread-Safe, Lock-Free Sorted Maps
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master lock-free sorted indexing: analyzing multi-level Skip List pointer mechanics and exploring why Skip Lists outperform tree rotations in concurrent architectures.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={skpDemoCode}
          title="ConcurrentSkipListMapDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 23, 24, 28, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Skip List Map FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 10: ConcurrentSkipListMap"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic10_concurrent_skiplist_map_note.txt"
        />
      </section>

      <Teacher
        note="If you need a TreeMap that is thread-safe and never slows down under heavy multi-threading, use ConcurrentSkipListMap! Its multi-level express lanes allow lock-free sorted searches in O(log n) time! — Sukanta Hui"
      />
    </div>
  );
}