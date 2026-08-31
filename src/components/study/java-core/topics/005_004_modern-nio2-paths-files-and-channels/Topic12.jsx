import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import strmDemoCode from "./topic12_files/LazyStreamFileProcessingDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Lazy Stream I/O
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Stream-Based File Processing: <code className="text-emerald-400 font-mono">Files.lines()</code>, <code className="text-sky-400 font-mono">list()</code>, <code className="text-amber-400 font-mono">walk()</code> &amp; <code className="text-purple-400 font-mono">find()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Process massive datasets with minimal RAM: streaming multi-gigabyte log lines lazily and searching directory trees with declarative functional predicates.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={strmDemoCode}
          title="LazyStreamFileProcessingDemo.java"
          highlightLines={[7, 10, 26, 27, 28, 33, 34, 39, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Stream File Processing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 12: Stream File Processing"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic12_stream_file_processing_note.txt"
        />
      </section>

      <Teacher
        note="Remember: Always put 'Files.lines(path)' inside a try-with-resources! 'try (Stream<String> lines = Files.lines(path))' ensures that the underlying file descriptor is closed when the stream finishes! — Sukanta Hui"
      />
    </div>
  );
}