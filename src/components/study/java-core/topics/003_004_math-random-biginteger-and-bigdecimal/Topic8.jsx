import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bdInstDemoCode from "./topic8_files/BigDecimalInstantiationPitfallDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Instantiation Pitfall
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">BigDecimal</code> Instantiation: <code className="text-emerald-400 font-mono">new BigDecimal("0.1")</code> vs Fatal <code className="text-rose-400 font-mono">new BigDecimal(0.1)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn why the double constructor corrupts decimal precision at instantiation time: comparing string constructors against <code className="text-emerald-300 font-mono">BigDecimal.valueOf()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bdInstDemoCode}
          title="BigDecimalInstantiationPitfallDemo.java"
          highlightLines={[7, 16, 17, 22, 23, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="BigDecimal Instantiation FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 8: BigDecimal Instantiation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic8_bigdecimal_instantiation_note.txt"
        />
      </section>

      <Teacher
        note="If you write 'new BigDecimal(0.1)', you defeat the entire purpose of using BigDecimal because the double was already corrupted before BigDecimal received it! Always pass a String: new BigDecimal('0.1')! — Sukanta Hui"
      />
    </div>
  );
}
