import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import autoboxingDemoCode from "./topic3_files/AutoboxingFoundationsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Compiler Automation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Autoboxing: Automatic Primitive to Wrapper Conversion (<code className="text-emerald-400 font-mono">valueOf()</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how Java 5 Autoboxing simplifies coding: eliminating deprecated <code className="text-rose-400 font-mono">new Integer()</code> constructors and automating <code className="text-emerald-300 font-mono">Integer.valueOf()</code> bytecode generation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={autoboxingDemoCode}
          title="AutoboxingFoundationsDemo.java"
          highlightLines={[7, 13, 18, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Autoboxing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 3: Autoboxing Foundations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic3_autoboxing_note.txt"
        />
      </section>

      <Teacher
        note="Before Java 5, programmers had to write 'new Integer(10)' manually every time they put a number in an ArrayList. Today, Java automatically boxes primitives for you via Integer.valueOf()! — Sukanta Hui"
      />
    </div>
  );
}