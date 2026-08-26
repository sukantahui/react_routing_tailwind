import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pathDemoCode from "./topic2_files/PathInterfaceOverviewDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Path Interface
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.nio.file.Path</code> Interface: Modern Immutable Filesystem Locator
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand the foundational locator abstraction: exploring the immutable <code className="text-emerald-300 font-mono">Path</code> interface and bridging legacy <code className="text-sky-300 font-mono">toFile()</code> and <code className="text-sky-300 font-mono">toPath()</code> interoperability.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pathDemoCode}
          title="PathInterfaceOverviewDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Path Interface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 2: Path Interface Overview"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic2_path_interface_note.txt"
        />
      </section>

      <Teacher
        note="If an older library requires 'java.io.File', don't abandon Path! Just call 'path.toFile()' at the boundary, and when receiving a File, immediately convert it using 'file.toPath()'! — Sukanta Hui"
      />
    </div>
  );
}