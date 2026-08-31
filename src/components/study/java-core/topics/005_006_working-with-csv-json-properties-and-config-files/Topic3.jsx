import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import defDemoCode from "./topic3_files/PropertiesDefaultFallbackDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Fallback Defaults
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Accessing Properties with Fallback Defaults: <code className="text-emerald-400 font-mono">getProperty(key, defaultVal)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build resilient application bootstrap routines: providing safe default fallback strings and chaining hierarchical parent property dictionaries.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={defDemoCode}
          title="PropertiesDefaultFallbackDemo.java"
          highlightLines={[7, 10, 15, 16, 20, 24, 25, 26, 32, 35, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Fallback Defaults FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 3: Properties Fallback Defaults"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic3_properties_fallback_defaults_note.txt"
        />
      </section>

      <Teacher
        note="Never do 'Integer.parseInt(props.getProperty('port'))' without a default! If the user forgot to add 'port' to the file, getProperty() returns null and Integer.parseInt throws NumberFormatException! Always supply a fallback like '8080'! — Sukanta Hui"
      />
    </div>
  );
}