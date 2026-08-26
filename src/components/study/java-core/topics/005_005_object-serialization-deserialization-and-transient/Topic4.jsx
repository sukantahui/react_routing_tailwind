import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import graphDemoCode from "./topic4_files/ComplexObjectGraphSerializationDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Object Graph Traversal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Serializing Complex Object Graphs: Deep Traversal &amp; Graph Cycles
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master deep graph serialization: flattening nested object hierarchies, managing circular reference handles, and enforcing complete graph serializability.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={graphDemoCode}
          title="ComplexObjectGraphSerializationDemo.java"
          highlightLines={[7, 10, 11, 23, 24, 26, 45, 46, 51, 52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Object Graphs FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 4: Complex Object Graphs"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic4_complex_object_graphs_note.txt"
        />
      </section>

      <Teacher
        note="If your class contains a reference to another custom class (like Student has Address), BOTH Student and Address must implement Serializable! If even 1 class in the chain forgets it, the whole serialization crashes! — Sukanta Hui"
      />
    </div>
  );
}