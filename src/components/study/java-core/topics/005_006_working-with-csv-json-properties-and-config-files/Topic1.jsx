import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import synDemoCode from "./topic1_files/PropertiesFileSyntaxRulesDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 1
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Syntax Specification
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Structure &amp; Syntax Rules of <code className="text-emerald-400 font-mono">.properties</code> Files
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master property file syntax: parsing key-value delimiters (<code className="text-emerald-300 font-mono">=</code>, <code className="text-sky-300 font-mono">:</code>, spaces), handling <code className="text-amber-300 font-mono">#</code> and <code className="text-rose-300 font-mono">!</code> comments, and escaping multi-line values.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={synDemoCode}
          title="PropertiesFileSyntaxRulesDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 24, 27, 30, 31, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Syntax Rules FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 1: .properties Syntax Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic1_properties_syntax_rules_note.txt"
        />
      </section>

      <Teacher
        note="Did you know you can use both '=' and ':' in .properties files? Even a simple space 'db.port 5432' is a valid delimiter! Use '=' consistently for clean code readability! — Sukanta Hui"
      />
    </div>
  );
}