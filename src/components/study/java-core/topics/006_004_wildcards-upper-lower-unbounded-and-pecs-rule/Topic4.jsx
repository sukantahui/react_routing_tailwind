import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import covDemoCode from "./topic4_files/UpperBoundedWildcardCovarianceDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Covariant Wildcards
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Upper Bounded Wildcard (<code className="text-emerald-400 font-mono">List&lt;? extends Number&gt;</code>): Covariance
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Implement covariant collection reading: accepting parameterized subtypes with <code className="text-emerald-300 font-mono">&lt;? extends T&gt;</code> and accessing member methods safely as supertypes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={covDemoCode}
          title="UpperBoundedWildcardCovarianceDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 25, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Upper Bounded Wildcards FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 4: Upper Bounded Wildcard"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic4_upper_bounded_wildcard_note.txt"
        />
      </section>

      <Teacher
        note="'List<? extends Number>' lets you accept a List of Integers, Doubles, or Longs all in one method! You can read numbers out of it freely, making it the perfect data PRODUCER! — Sukanta Hui"
      />
    </div>
  );
}