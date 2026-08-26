import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import setDemoCode from "./topic7_files/SetInterfaceContractBehaviorDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Set Contract
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          2. <code className="text-emerald-400 font-mono">java.util.Set</code>: Unordered/Ordered Unique Elements &amp; Duplicate Rejection
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enforce mathematical uniqueness: exploring duplicate rejection mechanics, <code className="text-emerald-300 font-mono">equals()</code> and <code className="text-sky-300 font-mono">hashCode()</code> integration, and comparing HashSet, LinkedHashSet, and TreeSet.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={setDemoCode}
          title="SetInterfaceContractBehaviorDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 19, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Set Interface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 7: java.util.Set Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic7_set_interface_note.txt"
        />
      </section>

      <Teacher
        note="If you are storing emails, voter IDs, roll numbers, or usernames where duplicates must NEVER happen, use a Set! 'set.add()' returns false if the item already exists, making deduplication effortless! — Sukanta Hui"
      />
    </div>
  );
}