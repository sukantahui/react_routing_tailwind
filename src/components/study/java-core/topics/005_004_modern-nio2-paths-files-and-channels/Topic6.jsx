import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import inspDemoCode from "./topic6_files/FileInspectionVerificationDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            File Inspection
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          File Checks: <code className="text-emerald-400 font-mono">Files.exists()</code>, <code className="text-sky-400 font-mono">isRegularFile()</code>, <code className="text-amber-400 font-mono">size()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Perform defensive file audits: inspecting file existence, permissions, directory flags, byte sizes, and OS modification timestamps.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={inspDemoCode}
          title="FileInspectionVerificationDemo.java"
          highlightLines={[7, 10, 16, 17, 21, 22, 23, 24, 25, 28, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="File Checks FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 6: File Checks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic6_file_checks_note.txt"
        />
      </section>

      <Teacher
        note="Before opening a file for reading, always do 'if (Files.isRegularFile(path) && Files.isReadable(path))'! It avoids runtime exceptions and makes your code rock solid! — Sukanta Hui"
      />
    </div>
  );
}