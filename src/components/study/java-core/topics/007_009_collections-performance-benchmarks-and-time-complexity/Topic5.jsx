import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import gcpDemoCode from "./topic5_files/GarbageCollectionPressureAnalysisDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_009 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            GC Pressure
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Garbage Collection Pressure: Node-Based Collections vs Contiguous Arrays
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace JVM garbage collector latency: analyzing object allocation storms in <code className="text-rose-300 font-mono">LinkedList</code> and <code className="text-amber-300 font-mono">TreeMap</code> versus contiguous <code className="text-emerald-300 font-mono">ArrayList</code> buffers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={gcpDemoCode}
          title="GarbageCollectionPressureAnalysisDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 17, 18, 22, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="GC Pressure FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_009 Topic 5: GC Pressure Analysis"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_009_topic5_gc_pressure_analysis_note.txt"
        />
      </section>

      <Teacher
        note="If you put 1 million items in a LinkedList, you are forcing the Java Garbage Collector to track 1 million separate Node objects across the heap! When GC kicks in, your application will experience long Stop-The-World pauses! Always stick with ArrayList unless you have a proven reason! — Sukanta Hui"
      />
    </div>
  );
}