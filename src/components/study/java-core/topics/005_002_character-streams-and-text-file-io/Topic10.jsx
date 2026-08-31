import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import strDemoCode from "./topic10_files/StringReaderWriterCapstoneDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Character Stream Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">StringReader</code> &amp; <code className="text-sky-400 font-mono">StringWriter</code>: Wrapping Strings as Stream Sources &amp; Sinks (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize character I/O mastery: bridging Java Strings into stream-compatible sources and capturing rich multi-line formatted reports into in-memory StringWriters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={strDemoCode}
          title="StringReaderWriterCapstoneDemo.java"
          highlightLines={[7, 13, 14, 20, 21, 35, 36, 42, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="String Streams FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_002 Topic 10: String Streams Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_002_topic10_string_streams_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 005_002! You have mastered Unicode text processing, Reader/Writer core methods, modern UTF-8 Charsets, JEP 400 standards, and in-memory String/CharArray stream pipelines! — Sukanta Hui"
      />
    </div>
  );
}