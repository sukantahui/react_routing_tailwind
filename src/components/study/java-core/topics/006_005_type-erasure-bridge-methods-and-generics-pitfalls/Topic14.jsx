import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stkDemoCode from "./topic14_files/SuperTypeTokenReflectionCapstoneDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Segment 6 Master Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Super Type Tokens &amp; The <code className="text-emerald-400 font-mono">TypeToken</code> Pattern: Segment 6 Master Capstone
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Conquer advanced generic reflection: implementing Neal Gafter&apos;s super type token architecture to capture and deserialize parameterized types under runtime type erasure.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={stkDemoCode}
          title="SuperTypeTokenReflectionCapstoneDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 17, 18, 20, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="TypeToken FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 14: Super Type Tokens Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic14_super_type_tokens_capstone_note.txt"
        />
      </section>

      <Teacher
        note="CONGRATULATIONS! You have officially conquered Segment 6: Java Generics &amp; Type Safety! You have mastered Generic Classes, Generic Methods, Bounded Types, the PECS Principle, Type Erasure, Bridge Methods, and Super Type Tokens! — Sukanta Hui"
      />
    </div>
  );
}