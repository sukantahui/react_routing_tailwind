import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import queDemoCode from "./topic8_files/QueueAndDequeContractBehaviorDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 8
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Queue &amp; Deque
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          3. <code className="text-amber-400 font-mono">Queue</code> &amp; <code className="text-amber-400 font-mono">Deque</code>: FIFO Buffers, LIFO Stacks &amp; Priority Heaps
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct high-throughput dispatchers: mastering First-In First-Out buffering (<code className="text-emerald-300 font-mono">Queue</code>), Last-In First-Out stacks (<code className="text-sky-300 font-mono">Deque</code>), and heap priority queues.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={queDemoCode}
          title="QueueAndDequeContractBehaviorDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 25, 26, 27, 34, 35, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Queue & Deque FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 8: Queue & Deque"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic8_queue_and_deque_note.txt"
        />
      </section>

      <Teacher
        note="Never use the old legacy 'Stack' class in Java! Always use 'ArrayDeque' for both queues (offer/poll) and stacks (push/pop)! It is faster, modern, and unsynchronized for maximum performance! — Sukanta Hui"
      />
    </div>
  );
}