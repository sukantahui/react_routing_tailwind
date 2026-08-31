import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import aecDemoCode from "./topic17_files/AsyncExceptionResiliencePipelineCapstoneDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Async Resilience Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Asynchronous Exception Resilience: <code className="text-rose-400 font-mono">exceptionally()</code>, <code className="text-emerald-400 font-mono">handle()</code> &amp; <code className="text-sky-400 font-mono">whenComplete()</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize resilient reactive systems: intercepting asynchronous pipeline exceptions, providing fallback recovery payloads with <code className="text-rose-300 font-mono">exceptionally()</code>, and managing bi-directional execution flows with <code className="text-emerald-300 font-mono">handle()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={aecDemoCode}
          title="AsyncExceptionResiliencePipelineCapstoneDemo.java"
          highlightLines={[7, 10, 14, 15, 21, 22, 23, 29, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Async Exception Resilience FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 17: Async Resilience Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic17_async_resilience_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 008_007! You have mastered enterprise thread pool engineering, custom ThreadPoolExecutor tuning, 2-phase shutdowns, Future SLA timeouts, CompletableFuture async chains, and resilient error recovery pipelines! — Sukanta Hui"
      />
    </div>
  );
}