import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ovrDemoCode from "./topic5_files/GenericsSevenRestrictionsOverviewDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            7 Core Restrictions
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The 7 Core Restrictions &amp; Limitations of Java Generics: Overview
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master architectural boundaries: cataloging the 7 fundamental language constraints imposed on Java Generics by compile-time type erasure.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ovrDemoCode}
          title="GenericsSevenRestrictionsOverviewDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 17, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="7 Restrictions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 5: 7 Generics Restrictions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic5_seven_generics_restrictions_note.txt"
        />
      </section>

      <Teacher
        note="Every restriction in Java Generics (why you can't write 'new T()' or 'List<int>') comes from one single reason: Type Erasure! At runtime, the JVM simply doesn't know what T is! — Sukanta Hui"
      />
    </div>
  );
}