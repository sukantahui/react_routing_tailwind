import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lfrDemoCode from "./topic6_files/ConcurrentHashMapLockFreeReadsDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Lock-Free Reads
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">ConcurrentHashMap</code> Reads: Lock-Free via <code className="text-purple-400 font-mono">volatile</code> Fields
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace Java Memory Model visibility: examining how <code className="text-emerald-300 font-mono">volatile V val</code> and <code className="text-sky-300 font-mono">volatile Node next</code> provide lock-free reads with happens-before guarantees.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lfrDemoCode}
          title="ConcurrentHashMapLockFreeReadsDemo.java"
          highlightLines={[7, 10, 16, 17, 22, 23, 24, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Lock-Free Reads FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 6: Lock-Free Reads"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic6_lock_free_reads_note.txt"
        />
      </section>

      <Teacher
        note="In high-traffic systems, 95% of operations are 'get()' reads! Because ConcurrentHashMap declares node pointers as 'volatile', reading threads NEVER wait or block on locks! They read directly from memory at hardware speed! — Sukanta Hui"
      />
    </div>
  );
}