import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vucDemoCode from "./topic9_files/ValidVolatileUseCasesDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            DCL &amp; Flags
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Valid Use Cases for <code className="text-emerald-400 font-mono">volatile</code>: Status Flags &amp; Double-Checked Locking
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct production singletons: analyzing the mechanics of Double-Checked Locking (DCL) and discovering why <code className="text-emerald-300 font-mono">volatile</code> is mandatory to prevent partially-initialized object exposures.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vucDemoCode}
          title="ValidVolatileUseCasesDemo.java"
          highlightLines={[7, 10, 11, 20, 21, 22, 25, 26, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="volatile Use Cases FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 9: Valid volatile Use Cases & DCL"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic9_valid_volatile_use_cases_note.txt"
        />
      </section>

      <Teacher
        note="If you ever write a Double-Checked Locking singleton without the word 'volatile', your code has a hidden landmine! Without volatile, another thread can read an object before its constructor has finished running! Always make your DCL instance volatile! — Sukanta Hui"
      />
    </div>
  );
}