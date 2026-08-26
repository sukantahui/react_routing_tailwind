import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import formatDemoCode from "./topic7_files/StringFormattingSpecifiersDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Formatting Engine
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Formatted Output with <code className="text-emerald-400 font-mono">printf()</code> &amp; <code className="text-emerald-400 font-mono">String.format()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the Java formatting engine: precision rounding with <code className="text-emerald-300 font-mono">%.2f</code>, zero-padding, and platform-independent newlines via <code className="text-emerald-300 font-mono">%n</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={formatDemoCode}
          title="StringFormattingSpecifiersDemo.java"
          highlightLines={[7, 15, 16, 17, 21, 22, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="String Formatting FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 7: String Formatting"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic7_string_format_note.txt"
        />
      </section>

      <Teacher
        note="Always use %n instead of 
 in your formatting strings! %n automatically adapts to Windows CRLF and Linux LF without breaking file outputs. — Sukanta Hui"
      />
    </div>
  );
}