import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import shallowDeepDemoCode from "./topic13_files/ShallowVsDeepCopyMemoryDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_010 · Topic 13
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Memory Mutation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Shallow Copy vs Deep Copy Mechanics in Memory
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace how shallow copies share heap references, discover the accidental mutation side-effects on nested objects, and contrast with independent deep copying.
        </p>
      </header>

      {/* Section 1: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={shallowDeepDemoCode}
          title="ShallowVsDeepCopyMemoryDemo.java"
          highlightLines={[12, 17, 24, 38, 43, 44]}
        />
      </section>

      {/* Section 2: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Shallow vs Deep Copy FAQs"
          questions={questions}
        />
      </section>

      {/* Section 3: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_010 Topic 13: Shallow vs Deep Copy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_010_topic13_shallow_deep_copy_note.txt"
        />
      </section>

      {/* Section 4: Teacher's Note */}
      <Teacher
        note="If Swadeep and Tuhina share the same house address object in a shallow copy, changing Tuhina's city will change Swadeep's city too! That is why shallow copy can be dangerous for mutable fields. — Sukanta Hui"
      />
    </div>
  );
}