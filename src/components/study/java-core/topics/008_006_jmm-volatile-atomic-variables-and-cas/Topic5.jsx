import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vovDemoCode from "./topic5_files/VolatileKeywordOverviewDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            volatile Keyword
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">volatile</code> Keyword in Java: Lightweight Memory Visibility
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Achieve non-blocking coordination: utilizing the <code className="text-emerald-300 font-mono">volatile</code> modifier to flush CPU cache write-buffers directly to RAM with zero thread locking overhead.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vovDemoCode}
          title="VolatileKeywordOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 21, 22, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="volatile Overview FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 5: volatile Keyword Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic5_volatile_keyword_overview_note.txt"
        />
      </section>

      <Teacher
        note="Think of 'volatile' as a direct hotline to main RAM! Normal variables can hide in a CPU core's private drawer (L1 cache), but a volatile variable is always written straight to the big whiteboard in main memory for all threads to see! — Sukanta Hui"
      />
    </div>
  );
}