import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mthCharDemoCode from "./topic10_files/SpliteratorMethodsAndCharacteristicsDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_007 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            trySplit &amp; Characteristics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Spliterator Methods: <code className="text-emerald-400 font-mono">trySplit()</code> &amp; Bitmask Characteristics Flags
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect parallel stream partitioning: executing <code className="text-emerald-300 font-mono">trySplit()</code> data slicing and analyzing bitmask optimization flags (<code className="text-sky-300 font-mono">ORDERED</code>, <code className="text-amber-300 font-mono">SIZED</code>, <code className="text-purple-300 font-mono">DISTINCT</code>, <code className="text-rose-300 font-mono">SORTED</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mthCharDemoCode}
          title="SpliteratorMethodsAndCharacteristicsDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 29, 32, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="trySplit & Characteristics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_007 Topic 10: Spliterator Characteristics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_007_topic10_spliterator_characteristics_note.txt"
        />
      </section>

      <Teacher
        note="Calling 'spliterator.trySplit()' splits your collection right down the middle like cutting a cake! Thread 1 takes the first half, Thread 2 takes the second half, and both compute at double speed! — Sukanta Hui"
      />
    </div>
  );
}