import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import spcDemoCode from "./topic3_files/QueueSpecialValueMethodsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Special Value Methods
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Special-Value Methods: <code className="text-emerald-400 font-mono">offer()</code>, <code className="text-sky-400 font-mono">poll()</code> &amp; <code className="text-amber-400 font-mono">peek()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build high-throughput queue consumers: utilizing <code className="text-emerald-300 font-mono">offer(e)</code>, <code className="text-sky-300 font-mono">poll()</code>, and <code className="text-amber-300 font-mono">peek()</code> for zero-exception buffer management.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={spcDemoCode}
          title="QueueSpecialValueMethodsDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 26, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Special-Value Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 3: Special-Value Queue Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic3_special_value_queue_methods_note.txt"
        />
      </section>

      <Teacher
        note="'poll()' and 'offer()' are the industry standard in production microservices and concurrency! If you want clean, lightning-fast code that never crashes on empty queues, always use special-value methods! — Sukanta Hui"
      />
    </div>
  );
}