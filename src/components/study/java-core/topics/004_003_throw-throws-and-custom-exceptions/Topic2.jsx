import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import throwsDemoCode from "./topic2_files/ThrowsKeywordContractDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 2
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            API Contract
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-indigo-400 font-mono">throws</code> Keyword: Declaring Checked Exceptions in Method Signatures
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Design transparent API contracts: using the <code className="text-indigo-300 font-mono">throws</code> clause in method signatures to declare potential checked failure modes to callers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={throwsDemoCode}
          title="ThrowsKeywordContractDemo.java"
          highlightLines={[7, 12, 15, 16, 19, 20, 31, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Throws Keyword FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 2: The throws Keyword"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic2_throws_keyword_note.txt"
        />
      </section>

      <Teacher
        note="The 'throws' keyword is like putting a warning label on a medicine bottle! It tells whoever calls this method: 'Caution: this method may throw IOException or SQLException, make sure you are prepared!' — Sukanta Hui"
      />
    </div>
  );
}