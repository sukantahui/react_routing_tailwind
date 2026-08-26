import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import synDemoCode from "./topic1_files/GenericMethodSyntaxBreakdownDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_002 · Topic 1
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Syntax Breakdown
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Generic Method Syntax: <code className="text-emerald-400 font-mono">&lt;T&gt; returnType methodName(T param)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master generic signature anatomy: positioning type parameter brackets before return types and managing multi-type parameter mappings (<code className="text-sky-300 font-mono">&lt;K, V&gt;</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={synDemoCode}
          title="GenericMethodSyntaxBreakdownDemo.java"
          highlightLines={[7, 10, 11, 15, 16, 24, 25, 30, 31, 32]}
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
          title="Module 006_002 Topic 1: Generic Method Syntax"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic1_generic_method_syntax_note.txt"
        />
      </section>

      <Teacher
        note="Always check where '<T>' is placed! In Java, '<T>' must come BEFORE the return type! 'public <T> T getFirst(List<T> list)' is valid; 'public T <T> getFirst' is a syntax error! — Sukanta Hui"
      />
    </div>
  );
}