import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import vteDemoCode from "./topic10_files/VirtualThreadPerTaskExecutorDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Virtual Thread Executor
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Executors.newVirtualThreadPerTaskExecutor()</code>: Enterprise Gold Standard
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master production virtual execution: utilizing <code className="text-emerald-300 font-mono">newVirtualThreadPerTaskExecutor()</code>, pairing with <code className="text-sky-300 font-mono">try-with-resources</code> auto-close mechanics, and executing concurrent workflows.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={vteDemoCode}
          title="VirtualThreadPerTaskExecutorDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 23, 24, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Virtual Thread Executor FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 10: Virtual Thread Executor"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic10_virtual_thread_executor_note.txt"
        />
      </section>

      <Teacher
        note="In modern Spring Boot 3.2+ and Java 21, you simply configure 'newVirtualThreadPerTaskExecutor()'! You don't have to guess pool sizes or queue capacities anymore—every incoming HTTP request gets its own brand-new virtual thread automatically! — Sukanta Hui"
      />
    </div>
  );
}