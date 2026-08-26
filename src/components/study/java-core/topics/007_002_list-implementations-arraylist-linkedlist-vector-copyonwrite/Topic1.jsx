import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bckDemoCode from "./topic1_files/ArrayListBackingArrayInternalsDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_002 · Topic 1
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Backing Array Internals
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.util.ArrayList</code> Internal Mechanics: The Backing <code className="text-purple-400 font-mono">Object[] elementData</code> Array
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal JVM memory layouts: inspecting the private <code className="text-emerald-300 font-mono">elementData</code> array via reflection to observe lazy initialization and capacity vs size.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bckDemoCode}
          title="ArrayListBackingArrayInternalsDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 25, 29, 35, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Backing Array FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_002 Topic 1: ArrayList Backing Array"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_002_topic1_arraylist_backing_array_note.txt"
        />
      </section>

      <Teacher
        note="Under the hood, an ArrayList is just a plain Java array ('Object[] elementData') that automatically swaps itself for a larger array whenever it runs out of space! That's why it gives you the speed of an array with the flexibility of a dynamic list! — Sukanta Hui"
      />
    </div>
  );
}