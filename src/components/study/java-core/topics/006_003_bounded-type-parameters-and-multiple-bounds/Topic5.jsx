import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ordDemoCode from "./topic5_files/MultipleBoundsRulesOrderingDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_003 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Ordering Rules
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Rules of Multiple Bounds: Class Bound First &amp; Single Class Mandate
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enforce grammatical type constraints: mastering the 3 golden rules of multiple bounds—class must come first, only one class allowed, and unlimited interfaces permitted.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ordDemoCode}
          title="MultipleBoundsRulesOrderingDemo.java"
          highlightLines={[7, 10, 20, 21, 22, 33, 34, 38, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Ordering Rules FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_003 Topic 5: Multiple Bounds Ordering Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_003_topic5_multiple_bounds_ordering_rules_note.txt"
        />
      </section>

      <Teacher
        note="Rule of thumb: Class comes first! Just like you cannot put the cart before the horse, you cannot put an interface before a class in multiple bounds: '<T extends MyClass & MyInterface>' is the only correct order! — Sukanta Hui"
      />
    </div>
  );
}