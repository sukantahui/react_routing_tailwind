import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import storDemoCode from "./topic4_files/StoringPropertiesFileDiskDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Property Storage
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Setting &amp; Storing Properties to Disk: <code className="text-emerald-400 font-mono">properties.store(Writer, comments)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Persist runtime configuration state: saving modified <code className="text-emerald-300 font-mono">Properties</code> tables to disk with custom comment headers and automatic timestamp stamping.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={storDemoCode}
          title="StoringPropertiesFileDiskDemo.java"
          highlightLines={[7, 10, 20, 21, 22, 23, 29, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Property Storage FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 4: Storing Properties"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic4_storing_properties_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you save configuration changes, 'props.store(writer, 'Header')' automatically inserts the date and time in the file! It gives you a built-in audit trail of when the config was last updated! — Sukanta Hui"
      />
    </div>
  );
}