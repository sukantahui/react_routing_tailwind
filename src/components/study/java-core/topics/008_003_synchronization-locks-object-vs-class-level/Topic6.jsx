import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sbcDemoCode from "./topic6_files/SynchronizedBlocksCustomLocksDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Synchronized Blocks
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Synchronized Blocks: Locking on Specific Targets (<code className="text-emerald-400 font-mono">synchronized(lock)</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Achieve fine-grained concurrency: replacing coarse method locks with granular <code className="text-emerald-300 font-mono">synchronized(lockObject)</code> blocks to allow independent tasks to execute simultaneously without contention.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sbcDemoCode}
          title="SynchronizedBlocksCustomLocksDemo.java"
          highlightLines={[7, 10, 15, 16, 20, 21, 30, 31, 46, 47]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Synchronized Blocks FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 6: Synchronized Blocks & Custom Locks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic6_synchronized_blocks_custom_locks_note.txt"
        />
      </section>

      <Teacher
        note="Don't lock the entire method if only 2 lines touch shared data! Use a synchronized block to protect ONLY the critical lines, and let the rest of the method run at full parallel speed! — Sukanta Hui"
      />
    </div>
  );
}