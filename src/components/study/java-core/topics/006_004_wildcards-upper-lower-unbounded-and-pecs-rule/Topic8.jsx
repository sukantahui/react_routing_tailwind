import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import csmDemoCode from "./topic8_files/ConsumerSuperWriteEnabledMechanicsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 8
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Consumer Role
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-purple-400 font-mono">? super T</code> is WRITE-ENABLED: Data Consumer Role &amp; Ingestion
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Ingest data with contravariance: understanding why lower bounded wildcards (<code className="text-purple-300 font-mono">&lt;? super T&gt;</code>) safely permit adding elements into destination collection sinks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={csmDemoCode}
          title="ConsumerSuperWriteEnabledMechanicsDemo.java"
          highlightLines={[7, 10, 14, 15, 18, 19, 39, 40, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Consumer Super FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 8: Consumer Super"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic8_consumer_super_note.txt"
        />
      </section>

      <Teacher
        note="If your method is a data generator (like filling a list with IDs or DB records), always declare the destination parameter as 'List<? super T>'! This allows callers to pass in a List of Objects or Numbers! — Sukanta Hui"
      />
    </div>
  );
}