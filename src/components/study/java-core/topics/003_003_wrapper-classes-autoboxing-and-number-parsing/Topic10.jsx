import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import parseDemoCode from "./topic10_files/ParsingStringsToPrimitivesDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            String Parsing API
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Parsing Strings to Primitives: <code className="text-emerald-400 font-mono">parseInt()</code>, <code className="text-sky-400 font-mono">parseDouble()</code> &amp; <code className="text-amber-400 font-mono">parseBoolean()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to convert raw string inputs from web requests into strongly-typed primitives: understanding <code className="text-emerald-300 font-mono">parseInt()</code> versus <code className="text-indigo-300 font-mono">valueOf()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={parseDemoCode}
          title="ParsingStringsToPrimitivesDemo.java"
          highlightLines={[7, 14, 18, 22, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="String Parsing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 10: String to Primitive Parsing"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic10_string_parsing_note.txt"
        />
      </section>

      <Teacher
        note="If you need a primitive int, call 'Integer.parseInt()'. If you need an object for a List, call 'Integer.valueOf()'! — Sukanta Hui"
      />
    </div>
  );
}