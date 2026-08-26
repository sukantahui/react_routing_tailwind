import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cmpDemoCode from "./topic9_files/ManualJsonVsJacksonConceptsDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JSON Libraries
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Manual JSON Serialization vs Enterprise Libraries (<code className="text-emerald-400 font-mono">Jackson</code>, <code className="text-sky-400 font-mono">Gson</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Evaluate JSON serialization options: building zero-dependency manual JSON generators in Core Java and comparing with enterprise ObjectMapper paradigms.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cmpDemoCode}
          title="ManualJsonVsJacksonConceptsDemo.java"
          highlightLines={[7, 10, 20, 21, 22, 23, 24, 25, 26, 42]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JSON Libraries FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 9: Manual JSON vs Jackson"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic9_manual_json_vs_jackson_note.txt"
        />
      </section>

      <Teacher
        note="Writing a simple JSON string manually is great practice for understanding how JSON works under the hood! In full-scale enterprise microservices, you will use Jackson's ObjectMapper! — Sukanta Hui"
      />
    </div>
  );
}