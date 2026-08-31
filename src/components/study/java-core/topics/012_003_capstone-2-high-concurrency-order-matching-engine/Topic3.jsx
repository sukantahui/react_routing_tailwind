import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/UltraLowLatencyZeroGCDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 012_003 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone 2: Order Matching Engine
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Ultra-Low Latency: <code className="text-emerald-400 font-mono">Zero-GC Allocation Patterns</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Microsecond engineering: object pooling, primitive specialized collections, and minimizing heap allocations to eliminate Stop-the-World GC pauses.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="UltraLowLatencyZeroGCDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Order Matching Engine FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 012_003 Topic 3: Ultra-Low Latency & Zero-GC"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="012_003_topic3_ultralow_latency_zerogc_note.txt"
        />
      </section>

      <Teacher
        note="In high-frequency trading (HFT), a 5-millisecond GC pause can cost millions of rupees! We avoid creating new temporary objects on the hot path by reusing pre-allocated event objects (Ring Buffer pattern)! — Sukanta Hui"
      />
    </div>
  );
}
