import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic16_files/UnifiedGcLoggingDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 010_005 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Garbage Collection & Tuning
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Unified GC Logging in Java 9+: <code className="text-emerald-400 font-mono">-Xlog:gc* Framework</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          The modern logging standard: replacing legacy -XX:+PrintGCDetails with the powerful -Xlog:gc* syntax, log rotation, and phase tags.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="UnifiedGcLoggingDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Garbage Collection FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 010_005 Topic 16: Unified GC Logging (-Xlog)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="010_005_topic16_unified_gc_logging_note.txt"
        />
      </section>

      <Teacher
        note="In Java 9+, legacy flags like -XX:+PrintGCDetails are obsolete! Use the Unified JVM Logging framework with -Xlog:gc*:file=gc.log:time,uptime,pid:filecount=5,filesize=100m! — Sukanta Hui"
      />
    </div>
  );
}
