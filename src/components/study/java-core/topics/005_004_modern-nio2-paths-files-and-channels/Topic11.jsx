import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import binDemoCode from "./topic11_files/BinaryFilesReadAllBytesDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Binary I/O
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Binary File Operations: <code className="text-emerald-400 font-mono">Files.readAllBytes()</code> &amp; <code className="text-sky-400 font-mono">Files.write(path, byte[])</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Process binary assets without character corruption: reading and writing images, PDFs, bytecode binaries, and compressed archives in single-line operations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={binDemoCode}
          title="BinaryFilesReadAllBytesDemo.java"
          highlightLines={[7, 10, 19, 20, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="readAllBytes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 11: Binary Files.readAllBytes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic11_binary_read_all_bytes_note.txt"
        />
      </section>

      <Teacher
        note="Never use readString() on an image or PDF! Character sets like UTF-8 will alter binary bytes and corrupt the file! Always use 'Files.readAllBytes(path)' for raw binary data! — Sukanta Hui"
      />
    </div>
  );
}