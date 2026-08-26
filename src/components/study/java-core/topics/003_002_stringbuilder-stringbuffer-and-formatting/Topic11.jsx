import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import templateDemoCode from "./topic11_files/RealWorldTemplateBuilderCapstoneDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Real-World Architecture: Building SQL Queries, JSON Payloads &amp; HTML Templates
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize all mutable buffers, format specifiers, and Java 15 Text Blocks into an enterprise microservice reporting layer: generating dynamic SQL statements and formatted JSON payloads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={templateDemoCode}
          title="RealWorldTemplateBuilderCapstoneDemo.java"
          highlightLines={[12, 13, 23, 27, 28, 40, 48]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Template Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 11: Template Builder Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic11_template_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 003_002! You have mastered StringBuilder, StringBuffer, buffer capacity growth formulas, advanced format specifiers, and modern Java 15 Text Blocks! — Sukanta Hui"
      />
    </div>
  );
}