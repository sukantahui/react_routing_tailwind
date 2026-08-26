import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import atmDemoCode from "./topic9_files/ConcurrentHashMapAtomicOperationsDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Atomic Map Methods
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Atomic Operations: <code className="text-emerald-400 font-mono">putIfAbsent()</code>, <code className="text-sky-400 font-mono">replace()</code> &amp; <code className="text-amber-400 font-mono">computeIfAbsent()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Eliminate check-then-act race conditions: utilizing atomic <code className="text-emerald-300 font-mono">putIfAbsent</code>, conditional <code className="text-sky-300 font-mono">replace(k, old, new)</code>, and atomic removals.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={atmDemoCode}
          title="ConcurrentHashMapAtomicOperationsDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Atomic Operations FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 9: Atomic Operations on ConcurrentMap"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic9_atomic_operations_note.txt"
        />
      </section>

      <Teacher
        note="Never write 'if (!map.containsKey(k)) map.put(k, v)' in multithreaded code! That creates a classic check-then-act race condition! Use 'map.putIfAbsent(k, v)' or 'map.computeIfAbsent()' instead to make it 100% atomic! — Sukanta Hui"
      />
    </div>
  );
}