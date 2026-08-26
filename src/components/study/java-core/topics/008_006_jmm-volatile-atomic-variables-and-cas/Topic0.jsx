import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chmDemoCode from "./topic0_files/CpuHardwareMemoryHierarchyDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Hardware Memory Hierarchy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Modern CPU Architecture: <code className="text-emerald-400 font-mono">L1/L2/L3</code> Hardware Caches &amp; RAM
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Uncover the physics of multi-core concurrency: examining the 200x Memory Wall speed gap, private L1/L2 hardware cache lines, and multi-core cache coherence.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chmDemoCode}
          title="CpuHardwareMemoryHierarchyDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Hardware Hierarchy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 0: Hardware Memory Hierarchy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic0_hardware_memory_hierarchy_note.txt"
        />
      </section>

      <Teacher
        note="Reading from RAM is 200 times slower than doing math in a CPU register! That's why every CPU core has its own private L1 cache to store local variables. But when two threads on different cores share data, their private caches get out of sync! — Sukanta Hui"
      />
    </div>
  );
}