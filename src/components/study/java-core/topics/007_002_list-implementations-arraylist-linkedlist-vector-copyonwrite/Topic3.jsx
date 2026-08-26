import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import expDemoCode from "./topic3_files/ArrayListExpansionArrayCopyDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Expansion &amp; ArrayCopy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          How ArrayList Expands: Memory Allocation &amp; <code className="text-emerald-400 font-mono">System.arraycopy()</code> Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace low-level memory transfers: observing how ArrayList expands its backing array using native <code className="text-emerald-300 font-mono">System.arraycopy()</code> and <code className="text-sky-300 font-mono">Arrays.copyOf()</code> intrinsics.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={expDemoCode}
          title="ArrayListExpansionArrayCopyDemo.java"
          highlightLines={[7, 10, 18, 19, 24, 25, 29, 39, 46]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Expansion FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 3: ArrayList Expansion"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic3_arraylist_expansion_note.txt"
        />
      </section>

      <Teacher
        note="'System.arraycopy()' is not written in Java—it is written in pure assembly/C! It moves memory blocks using CPU hardware acceleration, which is why resizing an ArrayList takes only a fraction of a millisecond! — Sukanta Hui"
      />
    </div>
  );
}