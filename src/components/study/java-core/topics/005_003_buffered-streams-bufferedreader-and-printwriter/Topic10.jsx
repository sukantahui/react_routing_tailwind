import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import flushDemoCode from "./topic10_files/FlushingBuffersAutoFlushCapstoneDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_003 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Buffering Capstone
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Flushing Buffers: Explicit <code className="text-emerald-400 font-mono">flush()</code> vs Auto-Flush Behavior (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize buffered stream management: mastering manual buffer flushing, configuring real-time auto-flush for network sockets, and avoiding stream stall hazards.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={flushDemoCode}
          title="FlushingBuffersAutoFlushCapstoneDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Flush Mechanics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_003 Topic 10: Buffer Flushing Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_003_topic10_buffer_flushing_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 005_003! You have mastered buffering mechanics, BufferedReader line processing, BufferedWriter cross-platform newlines, PrintWriter formatted tables, and high-performance I/O benchmarking! — Sukanta Hui"
      />
    </div>
  );
}