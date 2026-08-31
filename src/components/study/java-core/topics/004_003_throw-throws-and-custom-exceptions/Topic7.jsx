import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import checkDemoCode from "./topic7_files/GSTINValidationException.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Checked Pattern
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Creating Custom Checked Exceptions: Extending <code className="text-amber-400 font-mono">java.lang.Exception</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enforce critical business validation: creating custom checked exceptions that compel calling services to verify tax compliance and correct invalid GST numbers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={checkDemoCode}
          title="GSTINValidationException.java"
          highlightLines={[7, 9, 11, 12, 13, 20, 21, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Custom Checked FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 7: Custom Checked Exceptions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic7_custom_checked_exceptions_note.txt"
        />
      </section>

      <Teacher
        note="If a user enters an invalid GST number, our AccoTax accounting engine throws GSTINValidationException (Checked) so the UI form is forced to highlight the input field and prompt the user to re-enter it! — Sukanta Hui"
      />
    </div>
  );
}