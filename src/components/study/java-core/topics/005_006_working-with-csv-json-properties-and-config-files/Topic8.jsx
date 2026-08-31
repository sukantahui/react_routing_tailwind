import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jsonDemoCode from "./topic8_files/JsonFormatStructureOverviewDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JSON Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Overview of JSON Format Structure: Objects, Arrays &amp; Primitives
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master web data interchange: exploring the 6 core JSON data types conforming to RFC 8259 and mapping JSON trees to Java domain models.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jsonDemoCode}
          title="JsonFormatStructureOverviewDemo.java"
          highlightLines={[7, 10, 15, 16, 20, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JSON Format FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 8: JSON Format Structure"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic8_json_format_structure_note.txt"
        />
      </section>

      <Teacher
        note="JSON is the universal language of modern web and mobile apps! Knowing how to map JSON objects and arrays into Java records or classes is a vital skill for every backend engineer! — Sukanta Hui"
      />
    </div>
  );
}