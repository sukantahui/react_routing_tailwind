import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import deqDemoCode from "./topic8_files/DequeDoubleEndedQueueContractDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Deque Contract
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.util.Deque</code> Interface: Double-Ended Queue Architecture
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master double-ended collection semantics: utilizing <code className="text-emerald-300 font-mono">Deque</code> as a versatile FIFO buffer, high-speed LIFO stack, and bidirectional work-stealing queue.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={deqDemoCode}
          title="DequeDoubleEndedQueueContractDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Deque FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 8: java.util.Deque Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic8_deque_interface_note.txt"
        />
      </section>

      <Teacher
        note="Deque (pronounced 'deck') is like a train tunnel with doors at both ends! You can load passengers from the front (addFirst) or the back (addLast), and unload them from either end! — Sukanta Hui"
      />
    </div>
  );
}