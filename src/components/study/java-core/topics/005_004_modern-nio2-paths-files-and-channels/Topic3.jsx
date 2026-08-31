import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import factDemoCode from "./topic3_files/CreatingPathInstancesFactoryDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Path Factories
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Creating Path Instances: <code className="text-emerald-400 font-mono">Path.of()</code> (Java 11+) &amp; <code className="text-sky-400 font-mono">Paths.get()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct filesystem locators: comparing modern Java 11+ <code className="text-emerald-300 font-mono">Path.of()</code> varargs factories with legacy <code className="text-sky-300 font-mono">Paths.get()</code> and URI resolution.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={factDemoCode}
          title="CreatingPathInstancesFactoryDemo.java"
          highlightLines={[7, 10, 16, 20, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Path Factories FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 3: Creating Path Instances"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic3_creating_path_instances_note.txt"
        />
      </section>

      <Teacher
        note="Always pass folder names as separate vararg arguments: 'Path.of('data', 'reports', 'tax.csv')'! This guarantees correct operating system slashes on both Windows and Linux! — Sukanta Hui"
      />
    </div>
  );
}