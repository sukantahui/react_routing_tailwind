import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import textBlocksDemoCode from "./topic9_files/ModernJavaTextBlocksDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Modern Java 15+ Feature
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Modern Java Text Blocks (Java 15+): Multi-Line String Literals (<code className="text-purple-400 font-mono">"""</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Say goodbye to ugly string concatenation and backslash clutter: embedding multi-line JSON, SQL, and HTML templates naturally with Java 15 triple-quoted Text Blocks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={textBlocksDemoCode}
          title="ModernJavaTextBlocksDemo.java"
          highlightLines={[7, 14, 15, 21, 22, 23, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Text Blocks FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 9: Modern Text Blocks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic9_text_blocks_note.txt"
        />
      </section>

      <Teacher
        note="Text blocks are one of the most beloved modern Java features! You can paste raw JSON or SQL straight into Java source code without escaping quotes or adding '+' signs! — Sukanta Hui"
      />
    </div>
  );
}