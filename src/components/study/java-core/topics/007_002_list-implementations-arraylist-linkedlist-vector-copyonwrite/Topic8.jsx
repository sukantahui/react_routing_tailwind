import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prfDemoCode from "./topic8_files/LinkedListPerformanceCharacteristicsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            LinkedList Traversal
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          LinkedList Performance: <code className="text-emerald-400 font-mono">O(1)</code> Head/Tail vs <code className="text-rose-400 font-mono">O(n)</code> Nearest-End Traversal
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal node traversal algorithms: exploring why head/tail operations execute in <code className="text-emerald-300 font-mono">O(1)</code> time while index lookups require walking pointers from the nearest end.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={prfDemoCode}
          title="LinkedListPerformanceCharacteristicsDemo.java"
          highlightLines={[7, 10, 16, 17, 22, 23, 27, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="LinkedList Performance FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 8: LinkedList Performance Profile"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic8_linkedlist_performance_note.txt"
        />
      </section>

      <Teacher
        note="If you call 'linkedList.get(50000)', Java literally walks 50,000 pointers one by one from head to node! Never loop through a LinkedList using an index 'for(int i=0; i<size; i++) list.get(i)' or it becomes a horrific O(n²) disaster! — Sukanta Hui"
      />
    </div>
  );
}