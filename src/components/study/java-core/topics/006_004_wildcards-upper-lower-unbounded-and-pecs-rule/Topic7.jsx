import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prdDemoCode from "./topic7_files/ProducerExtendsReadOnlyMechanicsDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Producer Role
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">? extends T</code> is READ-ONLY: Data Producer Role &amp; Mutation Guards
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze producer mechanics: discovering why upper bounded wildcards (<code className="text-emerald-300 font-mono">&lt;? extends T&gt;</code>) allow element extraction as T while strictly prohibiting collection mutation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={prdDemoCode}
          title="ProducerExtendsReadOnlyMechanicsDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Producer Extends FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 7: Producer Extends"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic7_producer_extends_note.txt"
        />
      </section>

      <Teacher
        note="When your method only reads data from a collection to calculate totals or print reports, always declare the parameter with '? extends T'! It makes your method flexible enough to accept any child list! — Sukanta Hui"
      />
    </div>
  );
}