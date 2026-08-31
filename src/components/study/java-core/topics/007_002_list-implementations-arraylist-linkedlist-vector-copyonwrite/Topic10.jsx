import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whyDemoCode from "./topic10_files/WhyArrayListWinsRealWorldAnalysisDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Real-World Architectural Analysis
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why <code className="text-emerald-400 font-mono">ArrayList</code> Almost Always Outperforms <code className="text-purple-400 font-mono">LinkedList</code> in Production
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze production architecture: discovering why GC pressure, CPU cache thrashing, and node traversal latency make ArrayList and ArrayDeque the dominant choices in enterprise Java.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={whyDemoCode}
          title="WhyArrayListWinsRealWorldAnalysisDemo.java"
          highlightLines={[7, 10, 13, 14, 19, 20, 25, 26, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ArrayList Dominance FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 10: Why ArrayList Wins"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic10_why_arraylist_wins_note.txt"
        />
      </section>

      <Teacher
        note="Even Brian Goetz (Java Language Architect) has stated that LinkedList is almost never the right choice in modern Java! If you need a list, use ArrayList; if you need a queue or stack, use ArrayDeque! — Sukanta Hui"
      />
    </div>
  );
}