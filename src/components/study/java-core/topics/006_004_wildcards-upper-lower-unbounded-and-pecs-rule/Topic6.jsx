import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import matDemoCode from "./topic6_files/WildcardReadWriteRulesSummaryDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Read/Write Rules
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Read/Write Rules with Wildcards: Complete Decision Matrix
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete decision matrix: analyzing why <code className="text-emerald-300 font-mono">&lt;? extends T&gt;</code> is read-only as T while <code className="text-purple-300 font-mono">&lt;? super T&gt;</code> is write-enabled for T.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={matDemoCode}
          title="WildcardReadWriteRulesSummaryDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Read/Write Rules FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 6: Wildcard Read/Write Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic6_wildcard_read_write_rules_note.txt"
        />
      </section>

      <Teacher
        note="If you only remember one thing from generics, remember this: 'extends' is for reading (get), and 'super' is for writing (add)! This simple rule will make you pass any Java interview with flying colors! — Sukanta Hui"
      />
    </div>
  );
}