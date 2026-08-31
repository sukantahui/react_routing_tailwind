import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import rcbDemoCode from "./topic5_files/ReadWriteLockCacheBenchmarkDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            High-Throughput Cache
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Massive Read Throughput with <code className="text-emerald-400 font-mono">ReadWriteLock</code> in Shared Caches
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct production caches: wrapping fast <code className="text-emerald-300 font-mono">HashMap</code> structures with asymmetric read/write locks to achieve 10x throughput scalability under read-heavy workloads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={rcbDemoCode}
          title="ReadWriteLockCacheBenchmarkDemo.java"
          highlightLines={[7, 10, 11, 17, 18, 22, 23, 26, 27, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ReadWriteLock Cache FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 5: ReadWriteLock in Caches"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic5_read_write_lock_cache_note.txt"
        />
      </section>

      <Teacher
        note="Most enterprise applications are 95% reads and only 5% writes! If you use standard 'synchronized' on a cache, 95% of your users are stuck waiting in line for no reason! ReadWriteLock lets all 95% read simultaneously! — Sukanta Hui"
      />
    </div>
  );
}