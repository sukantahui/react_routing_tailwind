import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import catchDemoCode from "./topic1_files/CatchBlockInspectionDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Exception Interception
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">catch</code> Block: Intercepting &amp; Inspecting Exception Diagnostics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Intercept errors with surgical precision: extracting descriptive messages via <code className="text-emerald-300 font-mono">getMessage()</code> and logging call-stack execution paths.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={catchDemoCode}
          title="CatchBlockInspectionDemo.java"
          highlightLines={[7, 10, 11, 13, 14, 15, 16, 17, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Catch Block FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 1: The catch Block"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic1_catch_block_note.txt"
        />
      </section>

      <Teacher
        note="Never leave an empty catch block: 'catch (Exception e) {}'! That is called 'swallowing the exception' and it makes debugging impossible when something fails silently in production! — Sukanta Hui"
      />
    </div>
  );
}