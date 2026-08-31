import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import plcDemoCode from "./topic2_files/TypeParameterPlacementSymbolDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_002 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Symbol Resolution
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Type Parameter Placement: Compiler Symbol Resolution Order
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand compiler symbol tables: discovering why type parameter declarations precede return types in left-to-right lexical analysis.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={plcDemoCode}
          title="TypeParameterPlacementSymbolDemo.java"
          highlightLines={[7, 10, 11, 12, 19, 20, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Type Parameter Placement FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_002 Topic 2: Type Parameter Placement"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic2_type_parameter_placement_note.txt"
        />
      </section>

      <Teacher
        note="The Java compiler reads code like a book from left to right. By writing '&lt;E&gt;' before 'E pickFirst()', you introduce 'E' to the compiler so it doesn't get confused looking for a class named 'E'! — Sukanta Hui"
      />
    </div>
  );
}