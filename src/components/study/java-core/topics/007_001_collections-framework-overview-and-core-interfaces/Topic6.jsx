import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lstDemoCode from "./topic6_files/ListInterfaceContractBehaviorDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            List Contract
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          1. <code className="text-emerald-400 font-mono">java.util.List</code>: Ordered, Indexed Sequence &amp; Duplicate Permissibility
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master linear sequence semantics: utilizing zero-based index access (<code className="text-emerald-300 font-mono">get()</code>, <code className="text-sky-300 font-mono">set()</code>), duplicate permissibility, and positional sub-list manipulation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lstDemoCode}
          title="ListInterfaceContractBehaviorDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 24, 25, 33, 34]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="List Interface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 6: java.util.List Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic6_list_interface_note.txt"
        />
      </section>

      <Teacher
        note="A List is like a numbered notebook! You can open any page by index ('list.get(2)'), you can have duplicate names on different pages, and the order never changes unless you sort it! — Sukanta Hui"
      />
    </div>
  );
}