import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import autoDemoCode from "./topic3_files/AutoCloseableInterfaceContractDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Core Contract
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.lang.AutoCloseable</code> Interface: <code className="text-sky-400 font-mono">void close() throws Exception</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Implement the foundational ARM interface: building custom managed resources, understanding idempotent cleanup guarantees, and narrowing exception signatures.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={autoDemoCode}
          title="AutoCloseableInterfaceContractDemo.java"
          highlightLines={[7, 9, 17, 18, 19, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="AutoCloseable FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 3: AutoCloseable Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic3_autocloseable_contract_note.txt"
        />
      </section>

      <Teacher
        note="When implementing AutoCloseable, if your close() method doesn't throw any exceptions, declare 'public void close()' WITHOUT 'throws Exception'! That way callers don't need a try-catch for close()! — Sukanta Hui"
      />
    </div>
  );
}