import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bndDemoCode from "./topic0_files/BoundedTypesNecessityDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Bounded Generics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Bounded Types are Necessary: Restricting Subtype Hierarchies
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Constrain type variables: restricting generic arguments to specific class hierarchies and unlocking supertype member methods without casting.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bndDemoCode}
          title="BoundedTypesNecessityDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bounded Generics FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_003 Topic 0: Bounded Types Necessity"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_003_topic0_bounded_types_necessity_note.txt"
        />
      </section>

      <Teacher
        note="Without bounds, '&lt;T&gt;' is treated as pure java.lang.Object! By writing '<T extends Number>', you tell Java: 'T is guaranteed to be a number', allowing you to call 'doubleValue()' or 'intValue()' directly! — Sukanta Hui"
      />
    </div>
  );
}