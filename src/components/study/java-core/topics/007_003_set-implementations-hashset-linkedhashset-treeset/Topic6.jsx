import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lnkSetDemoCode from "./topic6_files/LinkedHashSetDoublyLinkedBucketDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            LinkedHashSet Internals
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.util.LinkedHashSet</code>: Doubly Linked Bucket Pointers &amp; Insertion Ordering
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover hybrid hash architectures: analyzing how LinkedHashSet embeds a global doubly-linked list (<code className="text-emerald-300 font-mono">before</code> / <code className="text-sky-300 font-mono">after</code>) across hash buckets to maintain insertion sequence.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lnkSetDemoCode}
          title="LinkedHashSetDoublyLinkedBucketDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="LinkedHashSet FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 6: LinkedHashSet Internals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic6_linkedhashset_internals_note.txt"
        />
      </section>

      <Teacher
        note="If you want the O(1) speed and uniqueness of a HashSet, but you need elements to stay in the exact order they arrived (like an audit trail), LinkedHashSet is the perfect data structure! — Sukanta Hui"
      />
    </div>
  );
}