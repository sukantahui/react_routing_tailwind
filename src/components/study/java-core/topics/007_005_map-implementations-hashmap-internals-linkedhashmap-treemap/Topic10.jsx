import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import trfDemoCode from "./topic10_files/HashMapTreeificationOptimizationDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Treeification Internals
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Java 8 Treeification: <code className="text-emerald-400 font-mono">TREEIFY_THRESHOLD (8)</code> &amp; <code className="text-purple-400 font-mono">TreeNode</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze Java 8 performance upgrades: observing how buckets transform from linear linked lists into self-balancing Red-Black trees when collisions reach 8 nodes with capacity &ge; 64.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={trfDemoCode}
          title="HashMapTreeificationOptimizationDemo.java"
          highlightLines={[7, 10, 16, 17, 36, 37, 43, 44, 49, 50]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Treeification FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 10: Java 8 Treeification"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic10_java8_treeification_note.txt"
        />
      </section>

      <Teacher
        note="Before Java 8, if a malicious hacker sent thousands of keys with the exact same hash code, HashMap lookups slowed down to O(n) crawling speed (HashDoS attack)! Java 8 fixed this forever by turning long chains into Red-Black trees (O(log n))! — Sukanta Hui"
      />
    </div>
  );
}