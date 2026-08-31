import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import benchDemoCode from "./topic9_files/BufferedReaderVsScannerBenchmarkDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_003 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Performance Benchmark
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          In-Depth Benchmark: <code className="text-emerald-400 font-mono">BufferedReader</code> vs <code className="text-rose-400 font-mono">Scanner</code> Throughput
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Execute high-throughput benchmarks: comparing 8KB buffered character parsing against regex-driven Scanner tokenization for big data workloads and competitive programming.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={benchDemoCode}
          title="BufferedReaderVsScannerBenchmarkDemo.java"
          highlightLines={[7, 10, 20, 21, 23, 24, 30, 31, 32, 33, 40, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Benchmark FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_003 Topic 9: Reader vs Scanner Benchmark"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_003_topic9_reader_vs_scanner_benchmark_note.txt"
        />
      </section>

      <Teacher
        note="In competitive programming or when parsing millions of banking rows, Scanner will give you 'Time Limit Exceeded (TLE)'! Always use BufferedReader for fast I/O! — Sukanta Hui"
      />
    </div>
  );
}