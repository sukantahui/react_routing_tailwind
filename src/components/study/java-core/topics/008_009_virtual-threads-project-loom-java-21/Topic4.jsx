import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mtbDemoCode from "./topic4_files/MillionThreadBenchmarkSimulationDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Million-Thread Scale
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Million-Thread Benchmark</code>: Massive Concurrency on a Laptop
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Witness exponential scalability: launching 100,000+ concurrent <code className="text-emerald-300 font-mono">Virtual Threads</code> simultaneously, measuring sub-second throughput, and observing tiny heap memory footprints.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mtbDemoCode}
          title="MillionThreadBenchmarkSimulationDemo.java"
          highlightLines={[7, 10, 14, 15, 20, 21, 22, 23, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Million-Thread Scale FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 4: Million-Thread Scale"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic4_million_thread_scale_note.txt"
        />
      </section>

      <Teacher
        note="In the old days, launching 100,000 threads would freeze your computer and force a hard reboot! In Java 21, launching 100,000 Virtual Threads takes barely 1 second and only 200MB of RAM! This is the biggest leap in Java history! — Sukanta Hui"
      />
    </div>
  );
}