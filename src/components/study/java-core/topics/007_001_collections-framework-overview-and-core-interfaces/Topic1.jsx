import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jcfDemoCode from "./topic1_files/JcfArchitectureOverviewDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Architecture Tree
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Introduction to Java Collections Framework (JCF) Architecture in <code className="text-emerald-400 font-mono">java.util</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master JCF taxonomy: exploring the 3 pillars of collections architecture (Interfaces, Implementations, Algorithms) and understanding why Map sits in an independent hierarchy.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jcfDemoCode}
          title="JcfArchitectureOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 18, 19, 20, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JCF Architecture FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 1: JCF Architecture"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic1_jcf_architecture_note.txt"
        />
      </section>

      <Teacher
        note="A top interview question: 'Is Map a Collection in Java?' The answer is NO! Collection handles single elements, while Map handles key-value pairs! Map is part of the Collections Framework, but does NOT inherit from java.util.Collection! — Sukanta Hui"
      />
    </div>
  );
}