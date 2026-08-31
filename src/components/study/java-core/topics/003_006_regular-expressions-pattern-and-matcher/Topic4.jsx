import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import metaDemoCode from "./topic4_files/RegexMetaCharactersCatalogDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_006 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Meta-Characters
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Meta-Characters Breakdown: <code className="text-emerald-400 font-mono">d</code>, <code className="text-sky-400 font-mono">s</code>, <code className="text-amber-400 font-mono">w</code> &amp; <code className="text-purple-400 font-mono">.</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundational building blocks of regex: shorthand character classes, extracting numeric tokens with <code className="text-emerald-300 font-mono">d+</code>, and whitespace matching.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={metaDemoCode}
          title="RegexMetaCharactersCatalogDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 19, 20, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Meta-Characters FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_006 Topic 4: Meta-Characters Catalog"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_006_topic4_meta_characters_note.txt"
        />
      </section>

      <Teacher
        note="Remember the capital letter rule in regex: lowercase is the match, uppercase is the NEGATION! So d is digit, and D is NON-digit! — Sukanta Hui"
      />
    </div>
  );
}