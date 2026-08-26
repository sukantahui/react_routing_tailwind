import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import casDemoCode from "./topic5_files/ModernJava8CasAndBucketLockDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Modern CAS &amp; Bucket Locks
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Modern <code className="text-emerald-400 font-mono">ConcurrentHashMap</code> (Java 8+): <code className="text-emerald-400 font-mono">CAS</code> &amp; Synchronized Bucket Head
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect Java 8+ concurrency internals: analyzing lock-free atomic <code className="text-emerald-300 font-mono">CAS</code> insertions for empty buckets and fine-grained head-node synchronization (<code className="text-sky-300 font-mono">synchronized(f)</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={casDemoCode}
          title="ModernJava8CasAndBucketLockDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 26, 27, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Modern CAS & Bucket Locks FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 5: Modern CAS & Bucket Locks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic5_modern_cas_and_bucket_locks_note.txt"
        />
      </section>

      <Teacher
        note="In Java 8+, if a bucket is empty, Java puts your item there using CPU hardware CAS without any locks at all! If the bucket is occupied, it locks ONLY that one bucket's first node! All other buckets stay wide open! — Sukanta Hui"
      />
    </div>
  );
}