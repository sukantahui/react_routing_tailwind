import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic8_files/ThroughputBenchmarkingCapstoneDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 012_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone 2: Order Matching Engine
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Engine Throughput Benchmarking: <code className="text-emerald-400 font-mono">&gt;100,000 Orders/Sec</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Performance validation: measuring matching engine throughput, P99 latency percentiles, and proving sub-millisecond execution speeds under heavy load.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="ThroughputBenchmarkingCapstoneDemo.java"
          highlightLines={[18,25,34,43,52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Order Matching Engine FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 012_003 Topic 8: Throughput Benchmarking Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="012_003_topic8_throughput_benchmarking_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Capstone 2! Our pure in-memory Java matching engine processes over 500,000 orders per second with P99 latency below 2 microseconds! This proves how powerful and blazing fast modern Core Java is! — Sukanta Hui"
      />
    </div>
  );
}
