import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vmvDemoCode from "./topic6_files/VolatileMemoryVisibilityDeepDiveDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Memory Visibility
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">volatile</code> Guarantee 1: Immediate Memory Visibility Across Caches
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace hardware cache coherence: exploring the MESI cache protocol, bus invalidation broadcasts, and direct RAM write-buffer flushes triggered by volatile modifications.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vmvDemoCode}
          title="VolatileMemoryVisibilityDeepDiveDemo.java"
          highlightLines={[7, 10, 13, 14, 20, 21, 29, 30, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="volatile Visibility FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 6: volatile Memory Visibility"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic6_volatile_memory_visibility_note.txt"
        />
      </section>

      <Teacher
        note="When you write to a volatile variable, your CPU core immediately sends an invalidation message over the hardware bus to every other CPU core! Any other thread trying to read that variable is forced to throw away its stale cache and load the fresh value! — Sukanta Hui"
      />
    </div>
  );
}