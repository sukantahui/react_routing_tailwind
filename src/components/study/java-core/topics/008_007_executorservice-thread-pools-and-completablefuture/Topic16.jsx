import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import aaoDemoCode from "./topic16_files/CompletableFutureAllOfAnyOfDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 16
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            allOf &amp; anyOf
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Waiting for Multiple Futures: <code className="text-purple-400 font-mono">allOf()</code> &amp; <code className="text-sky-400 font-mono">anyOf()</code> Scatter-Gather
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Coordinate multi-stage async batches: implementing Scatter-Gather barriers with <code className="text-purple-300 font-mono">CompletableFuture.allOf()</code> and racing parallel replicas with <code className="text-sky-300 font-mono">anyOf()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={aaoDemoCode}
          title="CompletableFutureAllOfAnyOfDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 26, 27, 32, 33, 42, 43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="allOf & anyOf FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 16: allOf & anyOf Coordination"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic16_allof_anyof_note.txt"
        />
      </section>

      <Teacher
        note="If you need to wait for 10 microservices to finish before rendering a dashboard, use 'allOf()'! If you send a request to 3 mirror servers and only care about the fastest one that replies first, use 'anyOf()' — Sukanta Hui"
      />
    </div>
  );
}