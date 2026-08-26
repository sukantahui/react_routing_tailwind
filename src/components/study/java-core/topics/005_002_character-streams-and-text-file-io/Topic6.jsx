import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jepDemoCode from "./topic6_files/DefaultCharsetDilemmaJep400Demo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_002 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            JEP 400 Standard
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The Default Charset Dilemma &amp; Java 18 <code className="text-purple-400 font-mono">UTF-8 by Default</code> (JEP 400)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace the evolution of Java charsets: understanding how JEP 400 standardized UTF-8 across all operating systems to eliminate platform encoding variance.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jepDemoCode}
          title="DefaultCharsetDilemmaJep400Demo.java"
          highlightLines={[7, 10, 13, 14, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JEP 400 FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_002 Topic 6: Default Charset Dilemma"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_002_topic6_default_charset_jep400_note.txt"
        />
      </section>

      <Teacher
        note="Even though Java 18 made UTF-8 the default, never rely on default settings! In professional enterprise code, always write 'StandardCharsets.UTF_8' explicitly! — Sukanta Hui"
      />
    </div>
  );
}