import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vrgDemoCode from "./topic8_files/GenericVarargsCreationDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Generic Varargs
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Varargs with Generics: <code className="text-emerald-400 font-mono">&lt;T&gt; List&lt;T&gt; asList(T... elements)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build variable-arity factories: mastering generic varargs methods (<code className="text-emerald-300 font-mono">T...</code>) and analyzing compiler array allocation behind the scenes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vrgDemoCode}
          title="GenericVarargsCreationDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 23, 26, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Generic Varargs FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_002 Topic 8: Generic Varargs"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic8_generic_varargs_note.txt"
        />
      </section>

      <Teacher
        note="Generic varargs methods like 'Arrays.asList(T...)' or 'List.of(E...)' make initializing collections effortless! But be careful: mixing generics with varargs creates underlying array allocations that can cause heap pollution! — Sukanta Hui"
      />
    </div>
  );
}