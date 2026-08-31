import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dprDemoCode from "./topic5_files/DeprecatedThreadMethodsAndCooperationDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Cooperative Cancellation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Cooperative Cancellation: Why <code className="text-rose-400 font-mono">stop()</code>, <code className="text-amber-400 font-mono">suspend()</code> &amp; <code className="text-purple-400 font-mono">resume()</code> are Deprecated
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze concurrency anti-patterns: discovering why forceful thread termination releases locks during half-finished mutations and understanding Java&apos;s cooperative cancellation design philosophy.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={dprDemoCode}
          title="DeprecatedThreadMethodsAndCooperationDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 18, 19, 20, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Deprecated Thread Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 5: Deprecated Thread Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic5_deprecated_thread_methods_note.txt"
        />
      </section>

      <Teacher
        note="Never use 'thread.stop()' to kill a thread! It pulls the plug while the thread is in the middle of writing data, leaving your database or memory corrupt! In Java, you must politely ask the thread to stop using 'thread.interrupt()' and let it exit safely! — Sukanta Hui"
      />
    </div>
  );
}