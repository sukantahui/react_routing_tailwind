import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import logDemoCode from "./topic1_files/ServerAccessLogAnalyzerProjectDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_007 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Project 1: Log Analyzer
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Project 1: Multi-Threaded Server Access Log Analyzer
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build high-throughput log analytics: leveraging lazy <code className="text-emerald-300 font-mono">Files.lines()</code> stream pipelines to compute status code distributions and IP traffic metrics with constant memory.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={logDemoCode}
          title="ServerAccessLogAnalyzerProjectDemo.java"
          highlightLines={[7, 10, 24, 25, 26, 32, 33, 35, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Log Analyzer FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_007 Topic 1: Log Analyzer Project"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_007_topic1_log_analyzer_project_note.txt"
        />
      </section>

      <Teacher
        note="This is exactly how enterprise telemetry platforms analyze server logs! Using lazy streams ensures your application never runs out of memory even when analyzing 50 million access log lines! — Sukanta Hui"
      />
    </div>
  );
}