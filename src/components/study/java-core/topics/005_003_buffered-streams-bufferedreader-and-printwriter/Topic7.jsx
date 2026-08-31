import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import errDemoCode from "./topic7_files/PrintWriterCheckErrorProtocolDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Error Protocol
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why <code className="text-emerald-400 font-mono">PrintWriter</code> Does NOT Throw <code className="text-rose-400 font-mono">IOException</code>: The <code className="text-sky-400 font-mono">checkError()</code> Protocol
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand exception-free printing architecture: learning why PrintWriter catches I/O exceptions internally and using <code className="text-sky-300 font-mono">checkError()</code> for diagnostic health verification.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={errDemoCode}
          title="PrintWriterCheckErrorProtocolDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="checkError() FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_003 Topic 7: PrintWriter checkError Protocol"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_003_topic7_print_writer_check_error_note.txt"
        />
      </section>

      <Teacher
        note="If PrintWriter threw IOException on every single line, printing a 10-line table would require 10 try-catch blocks! That's why Java designed PrintWriter to swallow the exception and let you call 'pw.checkError()' once at the end! — Sukanta Hui"
      />
    </div>
  );
}