import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import taxDemoCode from "./topic2_files/ThreeWildcardTypesTaxonomyDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Wildcard Taxonomy
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The 3 Types of Wildcards: Unbounded, Upper Bounded &amp; Lower Bounded
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master generic variance: categorizing wildcards into Unbounded (<code className="text-emerald-300 font-mono">&lt;?&gt;</code>), Covariant Upper Bounded (<code className="text-sky-300 font-mono">&lt;? extends T&gt;</code>), and Contravariant Lower Bounded (<code className="text-purple-300 font-mono">&lt;? super T&gt;</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={taxDemoCode}
          title="ThreeWildcardTypesTaxonomyDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Wildcard Taxonomy FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 2: 3 Types of Wildcards"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic2_three_types_of_wildcards_note.txt"
        />
      </section>

      <Teacher
        note="Mastering these 3 wildcard variations—Unbounded, 'extends' for reading, and 'super' for writing—is what separates a beginner Java programmer from an expert enterprise architect! — Sukanta Hui"
      />
    </div>
  );
}