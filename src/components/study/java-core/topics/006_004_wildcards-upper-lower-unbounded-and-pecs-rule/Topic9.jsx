import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pecsDemoCode from "./topic9_files/PecsPrincipleJoshuaBlochDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            The PECS Rule
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Joshua Bloch&apos;s PECS Principle: <code className="text-emerald-400 font-mono">&quot;Producer Extends, Consumer Super&quot;</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master Effective Java Item 31: applying the gold standard PECS rule to design highly flexible, polymorphic enterprise generic APIs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pecsDemoCode}
          title="PecsPrincipleJoshuaBlochDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 28, 29, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="PECS Principle FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 9: The PECS Principle"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic9_pecs_principle_note.txt"
        />
      </section>

      <Teacher
        note="Joshua Bloch's PECS rule is legendary in the Java universe! 'Producer Extends, Consumer Super'! If data is coming out of a collection, use extends; if data is going into a collection, use super! — Sukanta Hui"
      />
    </div>
  );
}