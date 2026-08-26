import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import efdDemoCode from "./topic1_files/ExecutorFrameworkDecouplingDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Executor Framework
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Executor Framework</code>: Decoupling Task Submission from Execution
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master managed concurrency: separating task definitions (<code className="text-emerald-300 font-mono">Runnable</code>/<code className="text-sky-300 font-mono">Callable</code>) from thread pooling infrastructure and recycling worker threads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={efdDemoCode}
          title="ExecutorFrameworkDecouplingDemo.java"
          highlightLines={[7, 10, 15, 16, 21, 22, 30, 31, 35, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Executor Framework FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 1: Executor Framework Architecture"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic1_executor_framework_note.txt"
        />
      </section>

      <Teacher
        note="The Executor Framework is like a professional delivery company: You just hand them the packages (tasks), and they have a permanent fleet of delivery drivers (thread pool) who deliver them efficiently without you ever having to hire or fire drivers! — Sukanta Hui"
      />
    </div>
  );
}