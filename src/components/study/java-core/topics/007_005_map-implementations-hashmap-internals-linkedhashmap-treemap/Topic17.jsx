import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lruDemoCode from "./topic17_files/LinkedHashMapLruCacheImplementationDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            LRU Cache Pattern
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Implementing an LRU Cache Using <code className="text-emerald-400 font-mono">LinkedHashMap</code> &amp; <code className="text-sky-400 font-mono">removeEldestEntry()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct production memory caches: overriding <code className="text-emerald-300 font-mono">removeEldestEntry</code> on access-ordered LinkedHashMaps to build bounded O(1) LRU eviction pipelines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lruDemoCode}
          title="LinkedHashMapLruCacheImplementationDemo.java"
          highlightLines={[7, 10, 11, 15, 16, 20, 21, 38, 39, 44, 45]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="LRU Cache FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 17: LRU Cache Implementation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic17_lru_cache_implementation_note.txt"
        />
      </section>

      <Teacher
        note="If an interviewer asks: 'Write an LRU Cache in Java in 5 minutes', write this exact class! Subclass LinkedHashMap, pass 'true' for accessOrder, and override 'removeEldestEntry(eldest) { return size() > maxCapacity; }'! It is flawless! — Sukanta Hui"
      />
    </div>
  );
}