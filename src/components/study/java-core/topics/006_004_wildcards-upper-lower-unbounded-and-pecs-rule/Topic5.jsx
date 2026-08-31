import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cntDemoCode from "./topic5_files/LowerBoundedWildcardContravarianceDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 5
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Contravariant Wildcards
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Lower Bounded Wildcard (<code className="text-purple-400 font-mono">List&lt;? super Integer&gt;</code>): Contravariance
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master contravariant collection writing: utilizing <code className="text-purple-300 font-mono">&lt;? super T&gt;</code> to ingest elements safely into supertype collections (Consumer role).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cntDemoCode}
          title="LowerBoundedWildcardContravarianceDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 17, 28, 32, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Lower Bounded Wildcards FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 5: Lower Bounded Wildcard"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic5_lower_bounded_wildcard_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you want a method to WRITE or CONSUME data into a collection, use '? super T'! 'List<? super Integer>' allows you to safely insert Integers into a List of Integers, a List of Numbers, or a List of Objects! — Sukanta Hui"
      />
    </div>
  );
}