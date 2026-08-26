import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import hbrDemoCode from "./topic4_files/HappensBeforeRelationshipRulesDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Happens-Before Rules
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Happens-Before</code> Relationship: Formal Visibility Rules
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Decode the 6 canonical JMM visibility axioms: tracing program order, monitor lock releases, volatile writes, thread start/join boundaries, and transitive ordering chains.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={hbrDemoCode}
          title="HappensBeforeRelationshipRulesDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 24, 25, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Happens-Before FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 4: Happens-Before Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic4_happens_before_rules_note.txt"
        />
      </section>

      <Teacher
        note="'Happens-Before' is the legal contract between you and the JVM! If you follow the rules (like writing to a volatile variable before another thread reads it), Java legally guarantees that the other thread will see the latest value 100% of the time! — Sukanta Hui"
      />
    </div>
  );
}