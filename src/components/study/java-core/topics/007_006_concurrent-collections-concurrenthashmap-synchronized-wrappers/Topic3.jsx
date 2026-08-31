import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chmDemoCode from "./topic3_files/ConcurrentHashMapFundamentalsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            ConcurrentHashMap
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.util.concurrent.ConcurrentHashMap</code>: High-Performance Thread Safety
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover modern concurrent map architecture: analyzing fine-grained bucket synchronization, lock-free reads, and linear multi-core scalability.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chmDemoCode}
          title="ConcurrentHashMapFundamentalsDemo.java"
          highlightLines={[7, 10, 16, 20, 21, 26, 27, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ConcurrentHashMap FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 3: ConcurrentHashMap Fundamentals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic3_concurrenthashmap_fundamentals_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you need a shared map in a multithreaded web application or Spring Boot backend, ALWAYS reach for ConcurrentHashMap! It gives you 100% thread safety with virtually zero lock contention! — Sukanta Hui"
      />
    </div>
  );
}