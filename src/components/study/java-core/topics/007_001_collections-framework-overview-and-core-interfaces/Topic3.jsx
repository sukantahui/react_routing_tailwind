import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import colDemoCode from "./topic3_files/CoreCollectionInterfaceContractDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Collection Contract
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Core Collection Interface: <code className="text-emerald-400 font-mono">java.util.Collection&lt;E&gt;</code> Contract
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply loose coupling principles: programming to the <code className="text-emerald-300 font-mono">java.util.Collection</code> interface to build generic utilities that operate seamlessly across Lists, Sets, and Queues.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={colDemoCode}
          title="CoreCollectionInterfaceContractDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 27, 28, 32, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Collection Interface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 3: java.util.Collection Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic3_collection_interface_note.txt"
        />
      </section>

      <Teacher
        note="Always program to the interface! If you write 'void print(Collection<String> c)', your method can print an ArrayList today and a HashSet tomorrow without changing a single line of code! — Sukanta Hui"
      />
    </div>
  );
}