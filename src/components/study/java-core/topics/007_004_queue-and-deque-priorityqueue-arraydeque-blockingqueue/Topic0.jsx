import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import qDemoCode from "./topic0_files/QueueFifoTaskProcessingDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            FIFO Processing
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.util.Queue</code> Interface: FIFO Task &amp; Message Buffering
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master linear buffering architecture: implementing First-In First-Out (<code className="text-emerald-300 font-mono">FIFO</code>) queue dispatchers with tail ingestion and head processing.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={qDemoCode}
          title="QueueFifoTaskProcessingDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 23, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Queue FIFO FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 0: Queue FIFO Processing"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic0_queue_fifo_processing_note.txt"
        />
      </section>

      <Teacher
        note="A Queue is like standing in line at the Barrackpore railway ticket counter! The first person in line is the first person served (FIFO)! In Java, we use 'offer()' to join the line and 'poll()' to serve and leave! — Sukanta Hui"
      />
    </div>
  );
}