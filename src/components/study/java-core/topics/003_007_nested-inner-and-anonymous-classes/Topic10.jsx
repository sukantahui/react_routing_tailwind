import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import callbackDemoCode from "./topic10_files/AnonymousCallbacksAndListenersDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Callbacks &amp; Threads
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Anonymous Classes in Event Listeners, Callbacks &amp; Legacy Multithreading
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build interactive pipelines: dispatching asynchronous background threads with <code className="text-emerald-300 font-mono">new Runnable() {'{ ... }'}</code> and custom sorting with anonymous <code className="text-sky-300 font-mono">Comparator</code> instances.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={callbackDemoCode}
          title="AnonymousCallbacksAndListenersDemo.java"
          highlightLines={[7, 19, 20, 21, 34, 35, 36, 37, 38]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Callbacks FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 10: Anonymous Callbacks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic10_anonymous_callbacks_note.txt"
        />
      </section>

      <Teacher
        note="Understanding anonymous classes is vital for reading legacy enterprise codebases like Spring 3/4 or Android apps before Java 8 lambdas became prevalent! — Sukanta Hui"
      />
    </div>
  );
}