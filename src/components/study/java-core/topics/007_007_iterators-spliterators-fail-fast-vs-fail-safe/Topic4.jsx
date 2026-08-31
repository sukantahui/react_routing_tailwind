import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import modDemoCode from "./topic4_files/ModCountInternalTrackingDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_007 · Topic 4
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            modCount Internals
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">modCount</code> Internal Mechanism: Structural Modification Tracking
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal version counters: inspecting the private <code className="text-emerald-300 font-mono">modCount</code> field and differentiating structural mutations (<code className="text-sky-300 font-mono">add/remove</code>) from in-place replacements (<code className="text-amber-300 font-mono">set</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={modDemoCode}
          title="ModCountInternalTrackingDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 27, 28, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="modCount FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_007 Topic 4: The modCount Mechanism"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_007_topic4_modcount_mechanism_note.txt"
        />
      </section>

      <Teacher
        note="modCount is like a version timestamp on the collection! Every time someone adds or removes an item, modCount goes up by 1! If you just replace an element with 'set()', modCount does not change because the size of the list remained identical! — Sukanta Hui"
      />
    </div>
  );
}