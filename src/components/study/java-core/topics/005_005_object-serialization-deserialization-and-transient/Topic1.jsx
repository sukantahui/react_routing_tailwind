import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import deserDemoCode from "./topic1_files/DeserializationReconstructionDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 1
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Object Rehydration
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          What is Deserialization: Reconstructing Live Java Objects from Byte Streams
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand object rehydration mechanics: reading serialized bytes with <code className="text-emerald-300 font-mono">readObject()</code> and discovering why constructors are never invoked during deserialization.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={deserDemoCode}
          title="DeserializationReconstructionDemo.java"
          highlightLines={[7, 10, 11, 18, 19, 41, 42, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Deserialization FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 1: What is Deserialization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic1_what_is_deserialization_note.txt"
        />
      </section>

      <Teacher
        note="A huge interview question: 'Does deserialization call the constructor?' The answer is NO! The JVM directly allocates memory and fills in the fields without running your constructor logic! — Sukanta Hui"
      />
    </div>
  );
}