import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import croDemoCode from "./topic11_files/CompletableFutureReactiveOverviewDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            CompletableFuture Overview
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Asynchronous Non-Blocking Pipelines: <code className="text-emerald-400 font-mono">CompletableFuture</code> in Java 8+
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Evolve beyond blocking calls: understanding how <code className="text-emerald-300 font-mono">CompletableFuture</code> and <code className="text-sky-300 font-mono">CompletionStage</code> replace blocking <code className="text-rose-300 font-mono">future.get()</code> with non-blocking functional chains.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={croDemoCode}
          title="CompletableFutureReactiveOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 19, 20, 25, 26, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="CompletableFuture Overview FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 11: CompletableFuture Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic11_completablefuture_overview_note.txt"
        />
      </section>

      <Teacher
        note="CompletableFuture is JavaScript Promises on steroids for Java! Instead of freezing your thread waiting for a database query with future.get(), you just say: 'When data arrives, thenApply(format) and thenAccept(display)!' Zero blocking, 100% reactive! — Sukanta Hui"
      />
    </div>
  );
}