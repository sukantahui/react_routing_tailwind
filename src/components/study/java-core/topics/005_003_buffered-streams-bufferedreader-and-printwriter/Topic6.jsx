import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pwDemoCode from "./topic6_files/PrintWriterFormattedOutputDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_003 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Formatted Output
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.io.PrintWriter</code>: Versatile Formatted Text Output (<code className="text-sky-400 font-mono">printf</code>, <code className="text-amber-400 font-mono">println</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build tabular enterprise reports: formatting text, numbers, and currency using <code className="text-emerald-300 font-mono">PrintWriter.printf()</code> with aligned columnar specifiers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={pwDemoCode}
          title="PrintWriterFormattedOutputDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 22, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="PrintWriter FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_003 Topic 6: PrintWriter Formatted Output"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_003_topic6_print_writer_note.txt"
        />
      </section>

      <Teacher
        note="PrintWriter is exactly like System.out (which is a PrintStream)! Whenever you need to write formatted tables or reports to a file or string, reach for PrintWriter! — Sukanta Hui"
      />
    </div>
  );
}