import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import crcDemoCode from "./topic10_files/ArrayDequeCircularBufferInternalsDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_004 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Circular Buffer Internals
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.util.ArrayDeque</code>: Resizable Circular Array Buffer Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace circular ring-buffer mathematics: inspecting <code className="text-emerald-300 font-mono">head</code> and <code className="text-sky-300 font-mono">tail</code> pointer wrap-around algorithms (<code className="text-purple-300 font-mono">(head - 1) &amp; (length - 1)</code>) that eliminate array shifting.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={crcDemoCode}
          title="ArrayDequeCircularBufferInternalsDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 28, 29, 32, 33, 40, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Circular Buffer FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_004 Topic 10: ArrayDeque Circular Buffer"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_004_topic10_arraydeque_circular_buffer_note.txt"
        />
      </section>

      <Teacher
        note="ArrayDeque is a circular ring buffer! When you add to the front, it simply wraps the head pointer to the end of the array using bitwise logic! That's why it never shifts elements and runs at maximum speed! — Sukanta Hui"
      />
    </div>
  );
}