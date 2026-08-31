import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import capDemoCode from "./topic8_files/HighPerformanceCollectionsChallengeCapstoneDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_009 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Segment 7 Grand Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Timed High-Performance Collections Coding Challenge (Grand Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply master-level collections engineering: solving Top K frequent elements using bounded <code className="text-emerald-300 font-mono">PriorityQueue</code> Min-Heaps in <code className="text-sky-300 font-mono">O(N log K)</code> and validating expressions using <code className="text-amber-300 font-mono">ArrayDeque</code> LIFO stacks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={capDemoCode}
          title="HighPerformanceCollectionsChallengeCapstoneDemo.java"
          highlightLines={[7, 10, 16, 17, 23, 24, 30, 31, 41, 42, 45, 46]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Collections Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_009 Topic 8: Collections Capstone Challenge"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_009_topic8_collections_capstone_challenge_note.txt"
        />
      </section>

      <Teacher
        note="🎉 CONGRATULATIONS! You have officially conquered Segment 7: Java Collections Framework & Data Structures (all 9 modules and 125 topics)! You now possess elite knowledge of memory layouts, Big-O trade-offs, concurrent data structures, and high-performance algorithms! — Sukanta Hui"
      />
    </div>
  );
}