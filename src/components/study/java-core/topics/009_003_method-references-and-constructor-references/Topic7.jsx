import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import acrDemoCode from "./topic7_files/ArrayConstructorReferenceDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Array Constructors
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Array Constructor References: <code className="text-emerald-400 font-mono">String[]::new</code> &amp; Type-Safe Streams
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Overcome generic type erasure: applying <code className="text-emerald-300 font-mono">Type[]::new</code> array constructor references to extract strongly typed arrays from stream pipelines via <code className="text-sky-300 font-mono">Stream.toArray(String[]::new)</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={acrDemoCode}
          title="ArrayConstructorReferenceDemo.java"
          highlightLines={[7, 10, 18, 19, 28, 29, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Array Constructors FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_003 Topic 7: Array Constructors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_003_topic7_array_constructors_note.txt"
        />
      </section>

      <Teacher
        note="If you ever write 'stream.toArray()', Java returns an Object[] and you'll get ClassCastException when casting it to String[]! Always pass the array constructor 'stream.toArray(String[]::new)' for 100% type-safe array generation! — Sukanta Hui"
      />
    </div>
  );
}