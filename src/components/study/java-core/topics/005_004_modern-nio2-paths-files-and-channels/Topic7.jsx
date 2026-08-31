import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import opsDemoCode from "./topic7_files/FileOperationsLifecycleDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            File Lifecycle
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          File Operations: <code className="text-emerald-400 font-mono">createDirectories()</code>, <code className="text-sky-400 font-mono">copy()</code>, <code className="text-amber-400 font-mono">move()</code> &amp; <code className="text-rose-400 font-mono">deleteIfExists()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Execute full filesystem lifecycle management: creating recursive directory hierarchies, copying files with replacement flags, and performing atomic moves.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={opsDemoCode}
          title="FileOperationsLifecycleDemo.java"
          highlightLines={[7, 10, 18, 19, 23, 24, 29, 30, 34, 35, 39, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="File Operations FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 7: Files Lifecycle Operations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic7_files_lifecycle_operations_note.txt"
        />
      </section>

      <Teacher
        note="Always use 'Files.createDirectories(path)' with the plural 's' at the end! It saves you from having to manually check and create parent folders one by one! — Sukanta Hui"
      />
    </div>
  );
}