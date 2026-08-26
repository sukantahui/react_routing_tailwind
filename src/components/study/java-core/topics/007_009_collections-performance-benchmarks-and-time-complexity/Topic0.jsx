import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import synDemoCode from "./topic0_files/JcfTaxonomySynthesisDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_009 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Taxonomy Synthesis
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Review of All JCF Collections: 11 Core Concrete Implementations
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize the complete Java Collections Framework: reviewing internal structures, access paradigms, and operational tradeoffs across all 11 primary concrete classes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={synDemoCode}
          title="JcfTaxonomySynthesisDemo.java"
          highlightLines={[7, 10, 14, 15, 19, 20, 24, 25, 26, 30, 31, 32, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Taxonomy Synthesis FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_009 Topic 0: JCF Taxonomy Synthesis"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_009_topic0_jcf_taxonomy_synthesis_note.txt"
        />
      </section>

      <Teacher
        note="Welcome to Module 007_009—the grand finale of Segment 7! We have explored Lists, Sets, Queues, Maps, Iterators, and Comparators! Now let's master their low-level Big-O performance, memory layouts, and hardware benchmarks! — Sukanta Hui"
      />
    </div>
  );
}