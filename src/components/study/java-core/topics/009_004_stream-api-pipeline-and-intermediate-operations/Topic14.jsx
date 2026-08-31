import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic14_files/FlatMapFunctionDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_004 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Stream API Pipelines
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">flatMap(Function)</code>: 1-to-Many Flattening & Nested Collections
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Demystifying flatMap: flattening lists of lists, unpacking nested streams, and merging complex hierarchy data structures.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="FlatMapFunctionDemo.java"
          highlightLines={[18,25,34,42]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Stream API Pipeline FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_004 Topic 14: flatMap(Function)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_004_topic14_flatmap_function_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you find yourself writing map(x → x.getListOfThings().stream()), STOP! If you leave it as map, you will end up with Stream<Stream<String>> (a stream of streams). Use flatMap to flatten all inner streams into a single unified Stream<String>! — Sukanta Hui"
      />
    </div>
  );
}
