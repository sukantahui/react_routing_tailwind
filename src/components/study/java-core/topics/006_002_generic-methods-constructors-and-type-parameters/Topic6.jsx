import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import arrDemoCode from "./topic6_files/GenericMethodArrayProcessingDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_002 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Generic Arrays
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Generic Methods with Array Arguments: <code className="text-emerald-400 font-mono">&lt;T&gt; void printArray(T[] array)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Process polymorphic arrays: designing generic array iteration utilities and understanding why boxed wrapper arrays are mandatory over primitives.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={arrDemoCode}
          title="GenericMethodArrayProcessingDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 23, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Generic Arrays FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_002 Topic 6: Generic Arrays"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic6_generic_arrays_note.txt"
        />
      </section>

      <Teacher
        note="Remember: Generics only work with Objects! You cannot pass a primitive 'int[]' to '&lt;T&gt; void print(T[] a)'. You must use 'Integer[]' instead! — Sukanta Hui"
      />
    </div>
  );
}