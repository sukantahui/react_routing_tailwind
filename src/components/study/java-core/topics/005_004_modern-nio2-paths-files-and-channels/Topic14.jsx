import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mmapDemoCode from "./topic14_files/MemoryMappedFilesPerformanceDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 14
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Zero-Copy MMap
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Memory-Mapped Files (<code className="text-purple-400 font-mono">MappedByteBuffer</code>) for Ultra-Fast Gigabyte Processing
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Achieve zero-copy performance: mapping multi-gigabyte files directly into OS virtual memory pages to read and write data at hardware RAM speeds.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mmapDemoCode}
          title="MemoryMappedFilesPerformanceDemo.java"
          highlightLines={[7, 10, 20, 21, 23, 27, 28, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Memory Mapping FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 14: Memory-Mapped Files"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic14_memory_mapped_files_note.txt"
        />
      </section>

      <Teacher
        note="Memory-mapped files are how systems like Apache Kafka and Elasticsearch achieve million-record-per-second speeds! You read and write directly to virtual memory pages while the OS handles disk writes in the background! — Sukanta Hui"
      />
    </div>
  );
}