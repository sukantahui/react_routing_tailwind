import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mflDemoCode from "./topic10_files/ManagingFutureLifecycleDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Future&lt;T&gt; Management
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Managing <code className="text-emerald-400 font-mono">Future&lt;T&gt;</code>: Bounded <code className="text-sky-400 font-mono">get()</code>, <code className="text-amber-400 font-mono">isDone()</code> &amp; <code className="text-rose-400 font-mono">cancel()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Harvest concurrent results: managing asynchronous <code className="text-emerald-300 font-mono">Future&lt;T&gt;</code> handles, unwrapping <code className="text-sky-300 font-mono">ExecutionException</code> payloads, and enforcing bounded SLA timeouts.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mflDemoCode}
          title="ManagingFutureLifecycleDemo.java"
          highlightLines={[7, 10, 19, 20, 26, 27, 30, 31, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Future&lt;T&gt; FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 10: Future&lt;T&gt; Management"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic10_managing_future_lifecycle_note.txt"
        />
      </section>

      <Teacher
        note="Think of a Future as a claim ticket at a dry cleaner: You hand over your clothes, get a ticket (Future), go shopping, and come back later with 'ticket.get()' to pick up your clean clothes! Always use 'get(timeout)' so you don't stand at the counter forever! — Sukanta Hui"
      />
    </div>
  );
}