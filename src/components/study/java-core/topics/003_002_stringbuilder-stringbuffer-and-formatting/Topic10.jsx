import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tbMethodsDemoCode from "./topic10_files/TextBlockMethodsAndInterpolationDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Modern Text Utilities
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Text Block Interpolation: <code className="text-purple-400 font-mono">.formatted()</code> &amp; Line Continuations
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn modern template interpolation: using Java 15 <code className="text-emerald-300 font-mono">.formatted()</code> on text blocks, suppressing line breaks with trailing backslashes, and preserving trailing whitespace.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Indentation &amp; Dynamic Values</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              How Java Manages Margins &amp; Variables Inside Text Blocks
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          When you write a Text Block inside an indented method, you naturally indent the code 8 or 12 spaces from the left margin.
          Does Java include all that extra indentation in your string? <strong>No!</strong>
          Java automatically calculates the <em>incidental whitespace</em> and strips it off so your text starts at column 0.
          Plus, with <code className="text-emerald-300 font-mono">.formatted(...)</code>, you can inject runtime variables directly into your template!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <span>📏</span>
              <span>Incidental Whitespace</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Java finds the leftmost non-whitespace character (or closing <code className="text-purple-300">"""</code>) and strips common leading spaces from all lines automatically.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span>🪄</span>
              <span>.formatted(args...)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instead of wrapping in <code className="text-slate-300">String.format("""...""", a, b)</code>, you can call <code className="text-emerald-300 font-mono">"""...""".formatted(a, b)</code> fluently right on the text block!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>🔗</span>
              <span>Line Continuation (\)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Put a backslash (<code className="text-amber-300 font-mono">\</code>) at the end of a line in your text block to visually split a long sentence without creating a newline in the output!
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-purple-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Modern Text Block Methods:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><code className="text-emerald-300 font-mono">stripIndent()</code>: Explicitly strips incidental indentation from any multi-line String.</li>
            <li><code className="text-sky-300 font-mono">translateEscapes()</code>: Parses escape sequences (like <code className="text-slate-400">\n</code> or <code className="text-slate-400">\t</code>) stored as raw characters in a string.</li>
            <li><code className="text-amber-300 font-mono">\s</code>: Explicitly preserves trailing whitespace at the end of a line that would otherwise be trimmed by the compiler.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tbMethodsDemoCode}
          title="TextBlockMethodsAndInterpolationDemo.java"
          highlightLines={[7, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Text Block Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 10: Text Block Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic10_tb_methods_note.txt"
        />
      </section>

      <Teacher
        note="Using .formatted() at the end of a Text Block gives you clean, python-like template interpolation without needing third-party template libraries! — Sukanta Hui"
      />
    </div>
  );
}