import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import j8ovDemoCode from "./topic6_files/Java8ComparatorEnhancementsOverviewDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Java 8 Comparators
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Java 8 <code className="text-emerald-400 font-mono">Comparator</code> Enhancements: Static Factories &amp; Default Combinators
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover modern declarative sorting pipelines: cataloging factory builders (<code className="text-emerald-300 font-mono">comparing</code>), secondary tie-breakers (<code className="text-sky-300 font-mono">thenComparing</code>), and null-safe wrappers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={j8ovDemoCode}
          title="Java8ComparatorEnhancementsOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Java 8 Comparator FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 6: Java 8 Comparator Toolkit"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic6_java8_comparator_toolkit_note.txt"
        />
      </section>

      <Teacher
        note="Java 8 transformed Comparators forever! Instead of writing messy anonymous inner classes with 15 lines of boilerplate, you can now write 'Comparator.comparing(Student::getGpa).reversed()' in one readable line! — Sukanta Hui"
      />
    </div>
  );
}