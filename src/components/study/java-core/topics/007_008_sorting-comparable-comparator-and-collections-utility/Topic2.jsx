import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sgnDemoCode from "./topic2_files/CompareToReturnContractDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 2
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            compareTo Contract
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Contract of <code className="text-emerald-400 font-mono">compareTo()</code>: Negative (<code className="text-sky-400 font-mono">&lt; 0</code>), Zero (<code className="text-amber-400 font-mono">== 0</code>) &amp; Positive (<code className="text-purple-400 font-mono">&gt; 0</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master mathematical comparison invariants: understanding the 3-way sign contract and avoiding dangerous integer overflow bugs in subtraction idioms.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sgnDemoCode}
          title="CompareToReturnContractDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="compareTo Contract FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 2: Contract of compareTo"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic2_contract_of_compareto_note.txt"
        />
      </section>

      <Teacher
        note="Never write 'return this.id - other.id' inside compareTo()! If the numbers are negative or large, integer overflow will turn a positive number into negative and break your entire sort order! Always use 'Integer.compare(a, b)'! — Sukanta Hui"
      />
    </div>
  );
}