import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import j7DemoCode from "./topic4_files/Java7SegmentLockingArchitectureDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 4
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Java 7 Segment Locking
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Historical <code className="text-emerald-400 font-mono">ConcurrentHashMap</code> (Java 7): Segment Locking &amp; <code className="text-purple-400 font-mono">concurrencyLevel</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace concurrent data structure history: examining Java 7&apos;s 16-segment lock striping array (<code className="text-purple-300 font-mono">ReentrantLock</code>) and analyzing why it was superseded in Java 8.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={j7DemoCode}
          title="Java7SegmentLockingArchitectureDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 20, 21, 22]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Java 7 Segment Locking FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 4: Java 7 Segment Locking"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic4_java7_segment_locking_note.txt"
        />
      </section>

      <Teacher
        note="In Java 7, ConcurrentHashMap divided the map into 16 slices called Segments, each with its own lock! In Java 8, Doug Lea made it even better by putting locks directly on each individual bucket node! — Sukanta Hui"
      />
    </div>
  );
}