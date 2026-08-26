import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lhmDemoCode from "./topic16_files/LinkedHashMapOrderingModesDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            LinkedHashMap Modes
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">LinkedHashMap</code>: Insertion Order vs Access Order (<code className="text-sky-400 font-mono">accessOrder = true</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master access-driven collection reordering: configuring <code className="text-emerald-300 font-mono">accessOrder = true</code> to automatically relocate accessed entries to the tail of the doubly linked chain.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lhmDemoCode}
          title="LinkedHashMapOrderingModesDemo.java"
          highlightLines={[7, 10, 16, 17, 27, 28, 36, 37, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="LinkedHashMap Modes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 16: LinkedHashMap Modes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic16_linkedhashmap_ordering_modes_note.txt"
        />
      </section>

      <Teacher
        note="When you pass 'true' as the third argument to LinkedHashMap, every time you call 'get()', Java moves that item to the very back of the line! The oldest unused item stays at the front, ready to be evicted! — Sukanta Hui"
      />
    </div>
  );
}