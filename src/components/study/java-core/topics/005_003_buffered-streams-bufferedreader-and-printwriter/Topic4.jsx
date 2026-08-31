import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import loopDemoCode from "./topic4_files/BufferedReaderDiskFileLineLoopDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_003 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            File Parsing Loop
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Reading a Text File Line-by-Line in a Loop: <code className="text-emerald-400 font-mono">while ((line = br.readLine()) != null)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct production-grade file parsers: chaining buffered file readers with UTF-8 character sets and tokenizing delimited lines inside robust loops.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={loopDemoCode}
          title="BufferedReaderDiskFileLineLoopDemo.java"
          highlightLines={[7, 10, 27, 28, 30, 31, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="File Line Loop FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_003 Topic 4: BufferedReader File Loop"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_003_topic4_buffered_reader_file_loop_note.txt"
        />
      </section>

      <Teacher
        note="When parsing log files from Barrackpore or Naihati, always use BufferedReader with the while-loop pattern! It consumes almost zero memory even when reading a 2-gigabyte file! — Sukanta Hui"
      />
    </div>
  );
}