import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import flagsDemoCode from "./topic8_files/AdvancedFormatFlagsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
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

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Column Alignment &amp; Ledgers</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Turn Raw Data Into Beautiful Tabular Invoices &amp; Receipts
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          If you've ever printed a receipt or table to the console and noticed that columns zigzag left and right because character lengths differ, format flags are your cure!
          Flags let you define fixed column widths, align text to the left or right, format currency with commas, and pad student IDs with zeros.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span>💰</span>
              <span>Comma Grouping (,)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-emerald-300 font-mono">%,d</code> inserts thousands separators: turns <code className="text-slate-300">1250000</code> into <code className="text-emerald-300">1,250,000</code>. Pair with decimals: <code className="text-emerald-300 font-mono">%,.2f</code> for financial currency!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <span>📐</span>
              <span>Width &amp; Alignment (-)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-sky-300 font-mono">%-20s</code> left-aligns text in a fixed 20-space column. Without the minus (<code className="text-sky-300 font-mono">%20s</code>), text is right-aligned—perfect for numeric totals!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>🏷️</span>
              <span>Zero-Padding (0)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-amber-300 font-mono">%05d</code> pads numbers with leading zeros up to 5 digits: turns serial number <code className="text-slate-300">7</code> into order ID <code className="text-amber-300">00007</code>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-amber-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Format Flag Cheat-Sheet:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-slate-400 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-emerald-300 block font-bold font-sans mb-1">Currency</span>
              "%,.2f"<br/><span className="text-slate-500 font-sans">&rarr; 1,450.50</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-sky-300 block font-bold font-sans mb-1">Left Column</span>
              "%-15s"<br/><span className="text-slate-500 font-sans">&rarr; "Apples       "</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-amber-300 block font-bold font-sans mb-1">Right Column</span>
              "%10d"<br/><span className="text-slate-500 font-sans">&rarr; "       250"</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-purple-300 block font-bold font-sans mb-1">Serial ID</span>
              "%06d"<br/><span className="text-slate-500 font-sans">&rarr; "000108"</span>
            </div>
          </div>
        </div>
      </section>

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