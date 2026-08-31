import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import wkaDemoCode from "./topic13_files/GenericInstantiationWorkaroundsDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Instantiation Patterns
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Workarounds for Generic Instantiation: <code className="text-emerald-400 font-mono">Class&lt;T&gt;</code> Tokens &amp; Suppliers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Bypass type erasure constraints: applying <code className="text-emerald-300 font-mono">Class&lt;T&gt;</code> reflection tokens, Array.newInstance, and functional <code className="text-sky-300 font-mono">Supplier&lt;T&gt;</code> factories.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={wkaDemoCode}
          title="GenericInstantiationWorkaroundsDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 20, 21, 33, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Instantiation Workarounds FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 13: Generic Instantiation Workarounds"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic13_generic_instantiation_workarounds_note.txt"
        />
      </section>

      <Teacher
        note="When you need to create a generic array or generic object, use 'Class&lt;T&gt;' or 'Supplier&lt;T&gt;'! 'Supplier&lt;T&gt;' with constructor references (Student::new) is the modern, super-clean Java 8+ way! — Sukanta Hui"
      />
    </div>
  );
}