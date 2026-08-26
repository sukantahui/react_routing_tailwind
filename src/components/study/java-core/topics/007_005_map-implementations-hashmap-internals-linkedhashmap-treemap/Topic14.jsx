import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import idlDemoCode from "./topic14_files/IdealHashMapKeysAnalysisDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Ideal Map Keys
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why <code className="text-emerald-400 font-mono">String</code> &amp; <code className="text-sky-400 font-mono">Integer</code> Are Ideal Keys: Immutability &amp; Cached Hash
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze key architectural requirements: inspecting String&apos;s private cached <code className="text-emerald-300 font-mono">hash</code> field and evaluating immutability guarantees.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={idlDemoCode}
          title="IdealHashMapKeysAnalysisDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 23, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Ideal Keys FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 14: String & Integer as Ideal Keys"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic14_ideal_map_keys_note.txt"
        />
      </section>

      <Teacher
        note="String is the king of Map keys! Because String is immutable, it calculates its hashCode only ONCE and caches it in memory. Every subsequent get() call uses the cached hash instantly with zero computation! — Sukanta Hui"
      />
    </div>
  );
}