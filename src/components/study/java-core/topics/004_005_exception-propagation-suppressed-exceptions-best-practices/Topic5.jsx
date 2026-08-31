import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import causeDemoCode from "./topic5_files/PreservingRootCausesMechanismsDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Root Cause Linking
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Preserving Root Causes: <code className="text-emerald-400 font-mono">super(msg, cause)</code> vs <code className="text-sky-400 font-mono">initCause()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master cause attachment mechanics: comparing modern constructor forwarding against legacy <code className="text-sky-300 font-mono">initCause()</code> invocations and preventing diagnostic loss.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={causeDemoCode}
          title="PreservingRootCausesMechanismsDemo.java"
          highlightLines={[7, 10, 11, 12, 17, 18, 29, 34, 35, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Root Cause FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 5: Preserving Root Causes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic5_preserving_root_causes_note.txt"
        />
      </section>

      <Teacher
        note="Never throw a new exception without passing the old exception into the constructor! If you do 'throw new MyException('Failed')' without passing 'e', you completely destroy the stack trace of where the bug happened! — Sukanta Hui"
      />
    </div>
  );
}