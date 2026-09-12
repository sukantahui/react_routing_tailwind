import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import formatDemoCode from "./topic7_files/StringFormattingSpecifiersDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Formatting Engine
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Formatted Output with <code className="text-emerald-400 font-mono">printf()</code> &amp; <code className="text-emerald-400 font-mono">String.format()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the Java formatting engine: precision rounding with <code className="text-emerald-300 font-mono">%.2f</code>, zero-padding, and platform-independent newlines via <code className="text-emerald-300 font-mono">%n</code>.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Precision String Templates</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Stop Gluing Strings Together: Use Professional Format Specifiers
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          How many times have you written messy code like this:<br />
          <code className="text-rose-300 font-mono">"Student " + name + " scored " + score + " out of " + max + " (" + pct + "%)"</code>?<br />
          It is difficult to read, hard to internationalize, and impossible to format decimals cleanly.
          Java's formatting engine (<code className="text-emerald-300 font-mono">printf</code> and <code className="text-emerald-300 font-mono">String.format</code>) solves this with clean, fill-in-the-blank placeholders!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <span>🔤</span>
              <span>%s &amp; %c (Text)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-sky-300 font-mono">%s</code> formats any String or Object (via <code className="text-slate-300">toString()</code>). <code className="text-sky-300 font-mono">%c</code> formats single unicode characters.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span>🔢</span>
              <span>%d &amp; %f (Numbers)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-emerald-300 font-mono">%d</code> formats decimal integers (byte, int, long). <code className="text-emerald-300 font-mono">%f</code> formats floating-point values with controllable decimal precision.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>🌐</span>
              <span>%n (Cross-Platform)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Always use <code className="text-amber-300 font-mono">%n</code> for newlines instead of <code className="text-slate-300">\n</code>! It generates Windows <code className="text-slate-400">\r\n</code> or Linux <code className="text-slate-400">\n</code> automatically.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-teal-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>printf() vs String.format():</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><code className="text-emerald-300 font-mono">System.out.printf(...)</code> prints formatted text directly to the console without creating an intermediate String object.</li>
            <li><code className="text-sky-300 font-mono">String.format(...)</code> builds and returns a reusable, formatted <code className="text-sky-300">String</code> in memory for loggers, UI, or files.</li>
            <li><strong>Type Safety Trap:</strong> Passing a float to <code className="text-rose-400 font-mono">%d</code> throws a runtime <code className="text-rose-400 font-mono">IllegalFormatConversionException</code>—always match your specifiers to types!</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={formatDemoCode}
          title="StringFormattingSpecifiersDemo.java"
          highlightLines={[7, 15, 16, 17, 21, 22, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="String Formatting FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 7: String Formatting"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic7_string_format_note.txt"
        />
      </section>

      <Teacher
        note="Always use %n instead of \n in your formatting strings! %n automatically adapts to Windows CRLF and Linux LF without breaking file outputs. — Sukanta Hui"
      />
    </div>
  );
}