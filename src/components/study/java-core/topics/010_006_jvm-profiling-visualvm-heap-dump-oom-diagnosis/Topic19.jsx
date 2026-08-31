import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic19_files/MemoryLeakForensicCapstoneDemo.java?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions";

export default function Topic19() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 010_006 · Topic 19
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JVM Profiling & OOM
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Hands-On Forensic Lab: <code className="text-emerald-400 font-mono">Diagnosing & Fixing a Real Multi-GB Leak</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          End-to-end memory engineering: reproducing an OutOfMemoryError, capturing HPROF dump, diagnosing root cause in MAT, and applying the permanent code fix.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="MemoryLeakForensicCapstoneDemo.java"
          highlightLines={[18,25,34,43,52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Memory Profiling & OOM FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 010_006 Topic 19: Memory Leak Forensic Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="010_006_topic19_memory_leak_forensic_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on mastering Module 6 of Segment 10! You have mastered the entire JVM profiling and memory forensics toolkit — jcmd, jstat, VisualVM, and Eclipse MAT! Next up: The JIT Compiler, HotSpot Optimizations & GraalVM! — Sukanta Hui"
      />
    </div>
  );
}
