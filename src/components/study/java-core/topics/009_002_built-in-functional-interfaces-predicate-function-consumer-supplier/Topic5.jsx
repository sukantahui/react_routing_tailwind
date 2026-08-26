import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sleDemoCode from "./topic5_files/SupplierLazyEvaluationDeepDiveDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Supplier&lt;T&gt;
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Supplier&lt;T&gt;</code>: Factory Generation &amp; Lazy Evaluation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Harness deferred execution: applying <code className="text-emerald-300 font-mono">Supplier&lt;T&gt;</code> <code className="text-sky-300 font-mono">T get()</code> methods for on-demand object instantiation, lazy fallbacks in <code className="text-emerald-300 font-mono">Optional.orElseGet()</code>, and factory decoupling.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sleDemoCode}
          title="SupplierLazyEvaluationDeepDiveDemo.java"
          highlightLines={[7, 10, 11, 20, 21, 26, 27, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Supplier<T> FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 5: Supplier<T> Deep Dive"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic5_supplier_deep_dive_note.txt"
        />
      </section>

      <Teacher
        note="Supplier is like ordering food at a restaurant: you don't cook the food when you print the menu; you only cook it (run the code) when the customer actually asks for it with get()! That is Lazy Evaluation! — Sukanta Hui"
      />
    </div>
  );
}