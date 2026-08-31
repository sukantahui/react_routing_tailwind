import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import psebDemoCode from "./topic12_files/PrimitiveSpecializationsEliminatingBoxingCapstoneDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Primitive Specializations Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Primitive Specializations: Eliminating Boxing Overhead &amp; High-Throughput Pipelines (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize high-performance functional programming: eliminating auto-boxing garbage collection pressure with <code className="text-emerald-300 font-mono">IntPredicate</code>, <code className="text-sky-300 font-mono">DoubleFunction</code>, <code className="text-purple-300 font-mono">LongConsumer</code>, and <code className="text-amber-300 font-mono">ToIntFunction</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={psebDemoCode}
          title="PrimitiveSpecializationsEliminatingBoxingCapstoneDemo.java"
          highlightLines={[7, 8, 9, 10, 11, 20, 21, 24, 25, 28, 29, 33, 34, 37, 38]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Primitive Specializations FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 12: Primitive Specializations Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic12_primitive_specializations_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 009_002! You have mastered the entire 43-interface landscape of java.util.function—from the Big 4 and two-argument Bi variants to operator specializations and zero-boxing primitive types! — Sukanta Hui"
      />
    </div>
  );
}