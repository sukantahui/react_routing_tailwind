import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import unwDemoCode from "./topic14_files/UnmodifiableWrappersDeepDiveDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 14
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Unmodifiable Wrappers
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Unmodifiable Wrappers: <code className="text-emerald-400 font-mono">Collections.unmodifiableList()</code> &amp; The Backing View Trap
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Safeguard internal collection state: constructing read-only view decorators, handling <code className="text-rose-300 font-mono">UnsupportedOperationException</code>, and distinguishing view wrappers from immutable <code className="text-sky-300 font-mono">List.copyOf()</code> snapshots.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={unwDemoCode}
          title="UnmodifiableWrappersDeepDiveDemo.java"
          highlightLines={[7, 10, 16, 17, 22, 23, 29, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Unmodifiable Wrappers FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 14: Unmodifiable Wrappers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic14_unmodifiable_wrappers_note.txt"
        />
      </section>

      <Teacher
        note="Collections.unmodifiableList() gives you a read-only pair of glasses looking at an original list! If someone modifies the original list behind the scenes, the view also changes! For a 100% immutable list that never changes, use 'List.copyOf(orig)'! — Sukanta Hui"
      />
    </div>
  );
}