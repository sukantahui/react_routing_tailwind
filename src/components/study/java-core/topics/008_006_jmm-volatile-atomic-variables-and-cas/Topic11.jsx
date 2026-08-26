import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import aovDemoCode from "./topic11_files/AtomicPackageLockFreeOverviewDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Atomic Overview
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Lock-Free Concurrency with <code className="text-emerald-400 font-mono">java.util.concurrent.atomic</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Supercharge multi-core performance: replacing heavy <code className="text-rose-300 font-mono">synchronized</code> locks with lock-free <code className="text-emerald-300 font-mono">AtomicInteger</code> operations backed by hardware CAS.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={aovDemoCode}
          title="AtomicPackageLockFreeOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 20, 21, 27, 28, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Atomic Package FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 11: java.util.concurrent.atomic Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic11_atomic_overview_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you need a thread-safe counter or accumulator, reach for AtomicInteger instead of writing synchronized methods! It gives you 100% thread safety at lightning-fast hardware CPU speeds! — Sukanta Hui"
      />
    </div>
  );
}