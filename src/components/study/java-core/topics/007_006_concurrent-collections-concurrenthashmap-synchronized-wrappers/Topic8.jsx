import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nulDemoCode from "./topic8_files/ConcurrentHashMapNullProhibitionDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Null Prohibition
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why <code className="text-emerald-400 font-mono">ConcurrentHashMap</code> Prohibits <code className="text-rose-400 font-mono">null</code> Keys &amp; <code className="text-rose-400 font-mono">null</code> Values
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze concurrent design principles: discovering why Doug Lea banned nulls in <code className="text-emerald-300 font-mono">ConcurrentHashMap</code> to prevent race conditions between <code className="text-sky-300 font-mono">get()</code> and <code className="text-amber-300 font-mono">containsKey()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={nulDemoCode}
          title="ConcurrentHashMapNullProhibitionDemo.java"
          highlightLines={[7, 10, 17, 18, 25, 26, 33, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Null Prohibition FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 8: Null Prohibition"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic8_null_prohibition_note.txt"
        />
      </section>

      <Teacher
        note="Never pass null to ConcurrentHashMap! In multithreaded systems, if get() returns null, you can't tell if the key is missing or if another thread just deleted it! To avoid bugs, ConcurrentHashMap throws a NullPointerException immediately! — Sukanta Hui"
      />
    </div>
  );
}