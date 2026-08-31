import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dulDemoCode from "./topic7_files/LinkedListDualInterfaceContractDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Dual Interface
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">LinkedList</code> Implementing Both <code className="text-emerald-400 font-mono">List</code> &amp; <code className="text-sky-400 font-mono">Deque</code> Interfaces
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore dual interface capabilities: utilizing LinkedList as a sequential index-based List and as a double-ended Queue (<code className="text-emerald-300 font-mono">addFirst()</code>, <code className="text-sky-300 font-mono">pollLast()</code>, <code className="text-purple-300 font-mono">push()</code>, <code className="text-amber-300 font-mono">pop()</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={dulDemoCode}
          title="LinkedListDualInterfaceContractDemo.java"
          highlightLines={[7, 10, 16, 17, 23, 24, 25, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Dual Interface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 7: LinkedList Dual Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic7_linkedlist_dual_interface_note.txt"
        />
      </section>

      <Teacher
        note="LinkedList wears two hats in Java! When treated as a List, it has get(index); when treated as a Deque, it has addFirst() and removeLast()! — Sukanta Hui"
      />
    </div>
  );
}