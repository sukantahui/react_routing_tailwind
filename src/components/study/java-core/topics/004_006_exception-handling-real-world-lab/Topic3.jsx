import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import retryDemoCode from "./topic3_files/ResilientRetryTransactionProcessorDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_006 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Fault Tolerance
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Building a Resilient Transaction Processor with Automatic Retry on Transient Failures
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build self-healing distributed microservices: implementing exponential backoff retry policies for transient glitches while fast-failing permanent validation errors.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={retryDemoCode}
          title="ResilientRetryTransactionProcessorDemo.java"
          highlightLines={[7, 10, 15, 19, 20, 26, 27, 30, 31, 35, 36, 40, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Resilient Retry FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_006 Topic 3: Resilient Retry Engine"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_006_topic3_resilient_retry_note.txt"
        />
      </section>

      <Teacher
        note="In high-volume systems like GST filing or payment gateways, 80% of network hiccups resolve if you just retry 100 milliseconds later! Building a smart retry loop makes your app virtually crash-proof! — Sukanta Hui"
      />
    </div>
  );
}