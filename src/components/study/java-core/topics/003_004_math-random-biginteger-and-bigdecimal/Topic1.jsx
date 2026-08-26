import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mathCatalogDemoCode from "./topic1_files/MathMethodsCatalogDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Method Catalog
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Math Methods: <code className="text-emerald-400 font-mono">ceil()</code>, <code className="text-sky-400 font-mono">floor()</code>, <code className="text-amber-400 font-mono">round()</code> &amp; <code className="text-purple-400 font-mono">sqrt()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete mathematical library: directional ceiling/floor bounds, precision exponents with <code className="text-purple-300 font-mono">pow()</code>, and trigonometric calculations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mathCatalogDemoCode}
          title="MathMethodsCatalogDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 21, 22, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Math Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 1: Math Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic1_math_methods_note.txt"
        />
      </section>

      <Teacher
        note="If you are calculating pagination in a web app with 21 items and 10 per page, write '(int) Math.ceil(21.0 / 10)' to get 3 pages! — Sukanta Hui"
      />
    </div>
  );
}