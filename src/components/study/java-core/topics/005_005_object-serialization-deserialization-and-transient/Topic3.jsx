import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import strmDemoCode from "./topic3_files/ObjectStreamReadWriteLifecycleDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Stream Streams
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">ObjectOutputStream</code> &amp; <code className="text-sky-400 font-mono">ObjectInputStream</code>: <code className="text-emerald-300 font-mono">writeObject()</code> &amp; <code className="text-sky-300 font-mono">readObject()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master object stream pipelines: writing mixed primitives and object graphs, casting deserialized instances, and maintaining strict FIFO sequence ordering.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={strmDemoCode}
          title="ObjectStreamReadWriteLifecycleDemo.java"
          highlightLines={[7, 10, 13, 14, 38, 39, 40, 41, 48, 49, 50]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Object Streams FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 3: ObjectOutputStream & InputStream"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic3_object_streams_note.txt"
        />
      </section>

      <Teacher
        note="Always read data in the exact same order you wrote it! If you wrote an int, a String, and then an Object, you must call readInt(), readUTF(), and then readObject() in that exact sequence! — Sukanta Hui"
      />
    </div>
  );
}