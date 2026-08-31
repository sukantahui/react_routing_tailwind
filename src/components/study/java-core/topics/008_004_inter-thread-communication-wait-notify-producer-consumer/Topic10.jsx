import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bfqDemoCode from "./topic10_files/ProducerConsumerBoundedBufferCapstoneDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Producer-Consumer Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Classic Problem: Building a Thread-Safe <code className="text-emerald-400 font-mono">Bounded Buffer</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct production-grade concurrency queues: building a thread-safe <code className="text-emerald-300 font-mono">BoundedBlockingQueue</code> from scratch using <code className="text-sky-300 font-mono">wait()</code>, <code className="text-purple-300 font-mono">notifyAll()</code>, and dual condition while-loops.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bfqDemoCode}
          title="ProducerConsumerBoundedBufferCapstoneDemo.java"
          highlightLines={[7, 10, 21, 22, 29, 30, 39, 40, 47, 48]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bounded Buffer FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 10: Producer-Consumer Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic10_producer_consumer_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 008_004! You have built the holy grail of multithreading—a thread-safe Bounded Buffer from scratch using wait() and notifyAll()! This exact pattern powers modern thread pools, message queues, and Kafka consumers! — Sukanta Hui"
      />
    </div>
  );
}