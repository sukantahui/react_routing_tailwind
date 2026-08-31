import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lnkDemoCode from "./topic6_files/LinkedListNodeStructureInternalsDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            LinkedList Internals
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.util.LinkedList</code> Internal Mechanics: Doubly Linked Node Structure
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect doubly linked list architecture: exploring the <code className="text-purple-300 font-mono">Node&lt;E&gt;</code> pointer layout (<code className="text-emerald-300 font-mono">prev</code>, <code className="text-sky-300 font-mono">item</code>, <code className="text-amber-300 font-mono">next</code>) and analyzing per-node heap memory overhead.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lnkDemoCode}
          title="LinkedListNodeStructureInternalsDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 14, 25, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="LinkedList Internals FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 6: LinkedList Node Internals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic6_linkedlist_node_internals_note.txt"
        />
      </section>

      <Teacher
        note="Every time you add an element to a LinkedList, Java creates a brand new Node object on the heap with 3 reference pointers! That creates 6 times more memory overhead than an ArrayList! — Sukanta Hui"
      />
    </div>
  );
}