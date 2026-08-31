import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic11_files/ZgcSubmillisecondPausesDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 010_005 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Garbage Collection & Tuning
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Z Garbage Collector: <code className="text-emerald-400 font-mono">ZGC Sub-Millisecond Pauses (Java 15+ Production)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Ultra-low latency at terabyte scale: how ZGC achieves sub-millisecond STW pauses using Colored Pointers, Load Barriers, and concurrent compaction.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="ZgcSubmillisecondPausesDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Garbage Collection FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 010_005 Topic 11: The Z Garbage Collector (ZGC)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="010_005_topic11_zgc_submillisecond_pauses_note.txt"
        />
      </section>

      <Teacher
        note="ZGC is one of the greatest engineering feats in JVM history! Whether your heap is 16MB or 16 TERABYTES, ZGC pause times are less than 1 MILLISECOND! It marks and moves objects concurrently while your code is running! — Sukanta Hui"
      />
    </div>
  );
}
