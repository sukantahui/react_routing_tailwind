import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import staticImportDemoCode from "./topic10_files/StaticImportsDemonstrationDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_004 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Syntax Sugar
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Static Imports (<code className="text-emerald-300 font-mono">import static java.lang.Math.*</code>): Benefits &amp; Cautions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to write concise mathematical and test assertion code using static imports, while avoiding namespace pollution and readability pitfalls.
        </p>
      </header>

      {/* Section 1: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={staticImportDemoCode}
          title="StaticImportsDemonstrationDemo.java"
          highlightLines={[9, 10, 11, 20, 21]}
        />
      </section>

      {/* Section 2: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Static Imports FAQs"
          questions={questions}
        />
      </section>

      {/* Section 3: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_004 Topic 10: Static Imports"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_004_topic10_static_imports_note.txt"
        />
      </section>

      {/* Section 4: Teacher's Note */}
      <Teacher
        note="Use static imports for mathematical formulas and JUnit test assertions (like assertEquals). Avoid wildcard static imports in enterprise code! — Sukanta Hui"
      />
    </div>
  );
}