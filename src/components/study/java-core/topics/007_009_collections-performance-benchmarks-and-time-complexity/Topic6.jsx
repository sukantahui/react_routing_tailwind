import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jmhDemoCode from "./topic6_files/JmhBenchmarkingFundamentalsDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_009 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            JMH Benchmarks
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Microbenchmarking with <code className="text-emerald-400 font-mono">JMH</code>: JIT Warmup, Dead-Code Elimination &amp; Blackholes
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master scientific performance engineering: understanding HotSpot JIT warmup cycles, dead-code elimination compiler traps, and OpenJDK <code className="text-emerald-300 font-mono">JMH</code> benchmark architecture.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jmhDemoCode}
          title="JmhBenchmarkingFundamentalsDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 19, 20, 21, 22]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JMH Benchmarking FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_009 Topic 6: JMH Benchmarking Principles"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_009_topic6_jmh_benchmarking_principles_note.txt"
        />
      </section>

      <Teacher
        note="Never benchmark Java code with a simple 'for-loop + System.currentTimeMillis()'! The HotSpot JIT compiler will detect that the result isn't being used and completely delete the loop from bytecode! Always use JMH (Java Microbenchmark Harness) with Blackholes for real benchmarks! — Sukanta Hui"
      />
    </div>
  );
}