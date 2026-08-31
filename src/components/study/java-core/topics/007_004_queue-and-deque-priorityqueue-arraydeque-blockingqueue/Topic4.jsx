import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prqDemoCode from "./topic4_files/PriorityQueueNaturalVsCustomDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Priority Ordering
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.util.PriorityQueue</code>: Priority Ordering (<code className="text-emerald-400 font-mono">Comparable</code> vs <code className="text-sky-400 font-mono">Comparator</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Implement priority-based scheduling: constructing task dispatchers that order elements by natural severity (<code className="text-emerald-300 font-mono">Comparable</code>) or custom criteria.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={prqDemoCode}
          title="PriorityQueueNaturalVsCustomDemo.java"
          highlightLines={[7, 10, 21, 22, 38, 39, 40, 41, 46, 52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="PriorityQueue Ordering FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 4: PriorityQueue Ordering"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic4_priorityqueue_ordering_note.txt"
        />
      </section>

      <Teacher
        note="Think of PriorityQueue as a hospital emergency ward! Even if a routine patient arrives first, an emergency patient will be jumped to the front of the queue automatically! That is Min-Heap prioritization! — Sukanta Hui"
      />
    </div>
  );
}