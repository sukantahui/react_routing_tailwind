import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import flagsDemoCode from "./topic8_files/AdvancedFormatFlagsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Financial &amp; Tabular Formatting
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Format Flags: Comma Grouping <code className="text-emerald-400 font-mono">%,d</code>, Width &amp; Left-Alignment <code className="text-emerald-400 font-mono">%-20s</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to render clean terminal tables and financial ledgers: using thousands separators, fixed-width column alignment, and zero-padded ID badges.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={flagsDemoCode}
          title="AdvancedFormatFlagsDemo.java"
          highlightLines={[7, 18, 21, 24, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Format Flags FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 8: Format Flags"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic8_format_flags_note.txt"
        />
      </section>

      <Teacher
        note="When displaying financial statements at our Barrackpore accounting portal, always use '%,.2f'! It automatically inserts commas and rounds decimals so clients see '₹1,50,000.00' cleanly. — Sukanta Hui"
      />
    </div>
  );
}