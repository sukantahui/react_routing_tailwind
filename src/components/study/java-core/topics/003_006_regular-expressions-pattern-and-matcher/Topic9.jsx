import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import groupsDemoCode from "./topic9_files/RegexCapturingGroupsMasteryDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Extraction Groups
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Capturing Groups <code className="text-purple-400 font-mono">()</code> &amp; Non-Capturing Groups <code className="text-emerald-400 font-mono">(?:)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Extract structural data from raw strings: decomposing dates into year, month, and day components and optimizing performance with non-capturing <code className="text-emerald-300 font-mono">(?:)</code> blocks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={groupsDemoCode}
          title="RegexCapturingGroupsMasteryDemo.java"
          highlightLines={[7, 14, 19, 20, 21, 22, 27, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Capturing Groups FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 9: Capturing Groups"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic9_capturing_groups_note.txt"
        />
      </section>

      <Teacher
        note="Remember: group(0) is always the ENTIRE match! group(1) is the first pair of parentheses, group(2) is the second pair, and so on! — Sukanta Hui"
      />
    </div>
  );
}