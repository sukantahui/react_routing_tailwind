import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mhpDemoCode from "./topic5_files/PriorityQueueMinHeapArrayMathDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 5
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Min-Heap Array Math
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          PriorityQueue Internal Structure: Binary Min-Heap Array Indexing Mathematics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace binary heap storage: calculating parent (<code className="text-emerald-300 font-mono">(i-1)/2</code>) and child (<code className="text-sky-300 font-mono">2i+1</code>, <code className="text-amber-300 font-mono">2i+2</code>) offsets in flat array buffers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mhpDemoCode}
          title="PriorityQueueMinHeapArrayMathDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 30, 31, 35, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Heap Mathematics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 5: Binary Min-Heap Array Math"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic5_min_heap_array_math_note.txt"
        />
      </section>

      <Teacher
        note="Binary heaps do not need node pointers like linked trees! Because the tree is completely full, we store all nodes in a flat array and compute children with '(2*i) + 1'! It is clean, fast, and cache-friendly! — Sukanta Hui"
      />
    </div>
  );
}