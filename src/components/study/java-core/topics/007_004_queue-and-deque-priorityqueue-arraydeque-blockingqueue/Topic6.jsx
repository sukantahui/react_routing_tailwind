import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sftDemoCode from "./topic6_files/PriorityQueueSiftOperationsDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Heap Sifting
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          PriorityQueue Operations: <code className="text-emerald-400 font-mono">O(log n)</code> Sift-Up &amp; Sift-Down Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect heap restoration algorithms: analyzing <code className="text-emerald-300 font-mono">siftUp</code> on insertion (<code className="text-sky-300 font-mono">offer</code>), <code className="text-amber-300 font-mono">siftDown</code> on extraction (<code className="text-purple-300 font-mono">poll</code>), and constant-time root peeks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sftDemoCode}
          title="PriorityQueueSiftOperationsDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 24, 25, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Heap Sifting FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 6: Sift-Up & Sift-Down Operations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic6_heap_sift_operations_note.txt"
        />
      </section>

      <Teacher
        note="When you add an item to a PriorityQueue, Java 'bubbles' it up the tree until it finds its proper place (sift-up). When you remove the top item, Java takes the bottom item, puts it at the top, and 'bubbles' it down (sift-down)! Both take O(log n) time! — Sukanta Hui"
      />
    </div>
  );
}