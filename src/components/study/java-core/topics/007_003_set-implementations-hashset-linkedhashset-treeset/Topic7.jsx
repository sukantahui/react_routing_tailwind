import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dedDemoCode from "./topic7_files/DeduplicatePreservingOrderDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Deduplication Pattern
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          When to Use <code className="text-emerald-400 font-mono">LinkedHashSet</code>: Deduplicating Lists While Preserving Sequence
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply production design idioms: constructing <code className="text-emerald-300 font-mono">O(n)</code> list deduplication pipelines that remove duplicates while strictly preserving first-seen chronological order.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={dedDemoCode}
          title="DeduplicatePreservingOrderDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Deduplication FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 7: Deduplicating with LinkedHashSet"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic7_deduplicate_linkedhashset_note.txt"
        />
      </section>

      <Teacher
        note="If an interviewer asks: 'How do you remove duplicates from a List while keeping the exact same order?', write 'new ArrayList&lt;&gt;(new LinkedHashSet&lt;&gt;(list))'! It is clean, elegant, and executes in linear O(n) time! — Sukanta Hui"
      />
    </div>
  );
}