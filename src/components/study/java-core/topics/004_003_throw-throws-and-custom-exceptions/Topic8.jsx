import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import metaDemoCode from "./topic8_files/CustomExceptionDomainMetadataDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Enterprise Metadata
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Adding Domain Metadata to Custom Exceptions (<code className="text-emerald-400 font-mono">errorCode</code>, <code className="text-sky-400 font-mono">transactionId</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Architect production-ready exceptions: enriching error objects with machine-parseable error codes, UTC timestamps, and correlation IDs for distributed tracing.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={metaDemoCode}
          title="CustomExceptionDomainMetadataDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 16, 17, 18, 19, 20, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Exception Metadata FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 8: Exception Domain Metadata"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic8_exception_metadata_note.txt"
        />
      </section>

      <Teacher
        note="In enterprise systems, loggers shouldn't just print 'Error!'. By attaching an errorCode ('ERR_GST_404') and transactionId, your support team in Barrackpore can locate the exact failing database query in 5 seconds! — Sukanta Hui"
      />
    </div>
  );
}