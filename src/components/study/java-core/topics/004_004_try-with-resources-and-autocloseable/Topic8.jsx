import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import supDemoCode from "./topic8_files/SuppressedExceptionsCaptureDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 8
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Diagnostic Preservation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Suppressed Exceptions: Capturing Secondary <code className="text-amber-400 font-mono">close()</code> Failures
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master deep exception diagnostics: understanding how try-with-resources attaches secondary teardown errors as suppressed exceptions to the primary business fault.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={supDemoCode}
          title="SuppressedExceptionsCaptureDemo.java"
          highlightLines={[7, 10, 11, 16, 17, 26, 27, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Suppressed Exceptions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 8: Suppressed Exceptions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic8_suppressed_exceptions_note.txt"
        />
      </section>

      <Teacher
        note="Before Java 7, if close() failed in finally, it completely erased your original database calculation error! With Suppressed Exceptions, you get both errors in your log file! — Sukanta Hui"
      />
    </div>
  );
}