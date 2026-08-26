import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import limDemoCode from "./topic0_files/LegacyFileLimitationsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Legacy Limitations
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Limitations of Legacy <code className="text-rose-400 font-mono">java.io.File</code>: Why Java 7+ Introduced NIO.2
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why legacy file handling failed in enterprise computing: analyzing silent boolean failures, directory memory bottlenecks, and lack of atomic file operations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={limDemoCode}
          title="LegacyFileLimitationsDemo.java"
          highlightLines={[7, 10, 16, 17, 23, 24, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Legacy File Limitations FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 0: Legacy File Limitations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic0_legacy_file_limitations_note.txt"
        />
      </section>

      <Teacher
        note="If 'file.delete()' returns false, you have no idea whether the file was locked, permission was denied, or the folder was non-empty! NIO.2's 'Files.delete(path)' throws NoSuchFileException or DirectoryNotEmptyException with exact reasons! — Sukanta Hui"
      />
    </div>
  );
}