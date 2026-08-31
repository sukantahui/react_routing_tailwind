import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lodDemoCode from "./topic2_files/LoadingPropertiesFileDiskDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Property Loading
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Loading Properties from Disk: <code className="text-emerald-400 font-mono">properties.load(Reader)</code> &amp; UTF-8
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Ingest persistent configuration: loading <code className="text-emerald-300 font-mono">.properties</code> files from disk using UTF-8 character readers to prevent character corruption.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lodDemoCode}
          title="LoadingPropertiesFileDiskDemo.java"
          highlightLines={[7, 10, 20, 21, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Loading Properties FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 2: Loading Properties"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic2_loading_properties_note.txt"
        />
      </section>

      <Teacher
        note="Always use 'props.load(new FileReader(file, StandardCharsets.UTF_8))'! If your configuration file contains Bengali or Hindi text, this ensures it loads 100% cleanly without corruption! — Sukanta Hui"
      />
    </div>
  );
}