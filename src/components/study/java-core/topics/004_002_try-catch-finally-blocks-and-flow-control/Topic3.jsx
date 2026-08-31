import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import multiCatchDemoCode from "./topic3_files/MultipleCatchBlocksDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Specialized Handlers
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Multiple <code className="text-emerald-400 font-mono">catch</code> Blocks: Handling Diverse Failure Scenarios Independently
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build multi-lane error recovery: routing array index bounds, null pointers, and number format errors to dedicated recovery handlers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={multiCatchDemoCode}
          title="MultipleCatchBlocksDemo.java"
          highlightLines={[7, 10, 13, 16, 19, 22, 26, 28, 30, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Multiple Catch FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 3: Multiple Catch Blocks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic3_multiple_catch_blocks_note.txt"
        />
      </section>

      <Teacher
        note="Multiple catch blocks allow you to tailor your response! For a NumberFormatException, you ask the user to re-type the input; for a DatabaseException, you reconnect! Different problems get different solutions! — Sukanta Hui"
      />
    </div>
  );
}