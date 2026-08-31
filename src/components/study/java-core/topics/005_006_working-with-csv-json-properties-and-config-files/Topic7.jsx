import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import wrtDemoCode from "./topic7_files/WritingCleanEscapedCsvDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            CSV Generation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Writing Clean CSV Files: RFC 4180 Field Escaping &amp; Header Generation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Generate compliant spreadsheet data: applying RFC 4180 escaping algorithms to quote embedded commas and double internal quotation marks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={wrtDemoCode}
          title="WritingCleanEscapedCsvDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 14, 19, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="CSV Writing FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 7: Writing Escaped CSV"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic7_writing_escaped_csv_note.txt"
        />
      </section>

      <Teacher
        note="When exporting billing reports for AccoTax clients in Barrackpore, always double-escape quotes in customer company names! This guarantees the CSV opens perfectly in Microsoft Excel without misaligned columns! — Sukanta Hui"
      />
    </div>
  );
}