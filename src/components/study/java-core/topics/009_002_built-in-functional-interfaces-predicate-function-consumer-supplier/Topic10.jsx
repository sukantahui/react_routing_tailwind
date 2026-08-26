import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tabDemoCode from "./topic10_files/TwoArgumentBiVariantsDeepDiveDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Bi Variants
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Two-Argument (Bi) Variants: <code className="text-emerald-400 font-mono">BiPredicate</code>, <code className="text-sky-400 font-mono">BiFunction</code> &amp; <code className="text-purple-400 font-mono">BiConsumer</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master two-parameter functional operations: evaluating dual inputs with <code className="text-emerald-300 font-mono">BiPredicate</code>, computing transformations with <code className="text-sky-300 font-mono">BiFunction</code>, and iterating Map entries with <code className="text-purple-300 font-mono">BiConsumer</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tabDemoCode}
          title="TwoArgumentBiVariantsDeepDiveDemo.java"
          highlightLines={[7, 8, 9, 10, 18, 19, 22, 23, 26, 27, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bi Variants FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 10: Bi Variants"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic10_bi_variants_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you have two inputs instead of one, prefix the interface with 'Bi'! 'BiConsumer' is the secret engine powering 'map.forEach((k, v) -> ...)' in all modern Java applications! — Sukanta Hui"
      />
    </div>
  );
}