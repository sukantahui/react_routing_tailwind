import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import collDemoCode from "./topic11_files/EnumSetAndEnumMapHighPerformanceDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Specialized Collections
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          High-Performance Enum Collections: <code className="text-emerald-400 font-mono">EnumSet</code> (Bit-Vector) &amp; <code className="text-sky-400 font-mono">EnumMap</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Supercharge collection performance: using bit-vector backed <code className="text-emerald-300 font-mono">EnumSet</code> and array-indexed <code className="text-sky-300 font-mono">EnumMap</code> for zero-collision lookups.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={collDemoCode}
          title="EnumSetAndEnumMapHighPerformanceDemo.java"
          highlightLines={[7, 10, 19, 20, 21, 29, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Enum Collections FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 11: Enum Collections"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic11_enum_collections_note.txt"
        />
      </section>

      <Teacher
        note="Never use HashSet for enums! EnumSet is backed by a 64-bit Long bitmask. Adding and checking elements takes literally 1 CPU clock cycle! It is the fastest collection in the entire Java runtime! — Sukanta Hui"
      />
    </div>
  );
}