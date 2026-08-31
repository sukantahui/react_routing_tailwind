import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bufDemoCode from "./topic0_files/WhyBufferingIsCrucialBenchmarkDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Performance Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Buffering is Crucial: Reducing Costly OS Kernel Syscalls
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Observe hardware execution pipelines: benchmarking unbuffered single-byte reads against 8KB buffered streams and eliminating user-kernel context-switch overhead.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bufDemoCode}
          title="WhyBufferingIsCrucialBenchmarkDemo.java"
          highlightLines={[7, 10, 18, 19, 21, 28, 29, 31, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Buffering FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_003 Topic 0: Why Buffering is Crucial"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_003_topic0_why_buffering_note.txt"
        />
      </section>

      <Teacher
        note="Think of unbuffered reading like walking to the grocery store in Barrackpore 100 times to buy 1 single grain of rice each time! Buffering is taking a shopping bag and bringing home 10 kilograms in 1 single trip! — Sukanta Hui"
      />
    </div>
  );
}