import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import c4cDemoCode from "./topic7_files/Coffman4CircularWaitDeepDiveDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Coffman 4: Circular Wait
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Coffman Condition 4: <code className="text-purple-400 font-mono">Circular Wait</code> (Resource Graph Cycles)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace dependency graphs: analyzing Resource Allocation Graph (RAG) cycles and discovering why breaking circular wait via global ordering is the industry standard for deadlock immunity.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={c4cDemoCode}
          title="Coffman4CircularWaitDeepDiveDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Circular Wait FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 7: Circular Wait"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic7_circular_wait_note.txt"
        />
      </section>

      <Teacher
        note="Circular Wait is the circle of death: A waits for B, B waits for C, and C waits for A! To break the circle, just enforce a rule: Everyone MUST pick up locks in numerical order (Lock 1 before Lock 2)! The circle disappears immediately! — Sukanta Hui"
      />
    </div>
  );
}