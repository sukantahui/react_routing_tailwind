import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import srtCapDemoCode from "./topic16_files/UnderlyingSortingAlgorithmsCapstoneDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Sorting Engine Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Java&apos;s Sorting Algorithms: <code className="text-emerald-400 font-mono">Dual-Pivot Quicksort</code> &amp; <code className="text-sky-400 font-mono">TimSort</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master JVM sorting internals: comparing in-place <code className="text-emerald-300 font-mono">Dual-Pivot Quicksort</code> for primitives against stable, adaptive hybrid <code className="text-sky-300 font-mono">TimSort</code> for object hierarchies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={srtCapDemoCode}
          title="UnderlyingSortingAlgorithmsCapstoneDemo.java"
          highlightLines={[7, 10, 16, 17, 22, 23, 27, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Sorting Algorithms Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 16: Sorting Engine Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic16_sorting_engine_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 007_008! You are now a master of Java sorting—from Comparable natural ordering and multi-level Comparator pipelines, to Collections utility algorithms and low-level TimSort/Dual-Pivot Quicksort engines! — Sukanta Hui"
      />
    </div>
  );
}