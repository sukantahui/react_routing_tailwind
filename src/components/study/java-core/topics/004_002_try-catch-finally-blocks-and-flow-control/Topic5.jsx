import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import multiDemoCode from "./topic5_files/Java7MultiCatchSyntaxDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Java 7 Multi-Catch
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Java 7 Multi-Catch Syntax: <code className="text-emerald-400 font-mono">catch (IOException | SQLException ex)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Eliminate repetitive error-handling boilerplate: using the pipe operator to catch disjoint exception siblings and understanding type hierarchy constraints.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={multiDemoCode}
          title="Java7MultiCatchSyntaxDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 23, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Multi-Catch FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 5: Java 7 Multi-Catch"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic5_multi_catch_syntax_note.txt"
        />
      </section>

      <Teacher
        note="Before Java 7, if you had 5 different exceptions requiring the same logger statement, you had to copy-paste 5 identical catch blocks! Multi-catch lets you combine them with '|' into 1 clean block! — Sukanta Hui"
      />
    </div>
  );
}