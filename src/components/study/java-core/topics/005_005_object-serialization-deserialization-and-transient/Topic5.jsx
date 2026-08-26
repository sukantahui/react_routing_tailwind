import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nseDemoCode from "./topic5_files/NotSerializableExceptionTroubleshootingDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Serialization Diagnostic
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-rose-400 font-mono">NotSerializableException</code>: Root Causes &amp; Troubleshooting
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Debug serialization failures: identifying un-serializable references from exception messages and applying the 3 canonical fixes including the <code className="text-emerald-300 font-mono">transient</code> keyword.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={nseDemoCode}
          title="NotSerializableExceptionTroubleshootingDemo.java"
          highlightLines={[7, 10, 14, 15, 18, 19, 21, 33, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="NotSerializableException FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 5: NotSerializableException Forensics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic5_not_serializable_exception_note.txt"
        />
      </section>

      <Teacher
        note="When you see NotSerializableException, look at the message! It will print the exact class name (e.g. 'com.app.LiveDatabaseConnection') that broke the chain! Just mark that field 'transient' to fix it! — Sukanta Hui"
      />
    </div>
  );
}