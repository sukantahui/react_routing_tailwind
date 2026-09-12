import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import textBlocksDemoCode from "./topic9_files/ModernJavaTextBlocksDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Modern Java 15+ Feature
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Modern Java Text Blocks (Java 15+): Multi-Line String Literals (<code className="text-purple-400 font-mono">"""</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Say goodbye to ugly string concatenation and backslash clutter: embedding multi-line JSON, SQL, and HTML templates naturally with Java 15 triple-quoted Text Blocks.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Modern Java 15+ Syntax</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Multi-Line Strings Without The Escaping Nightmare
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Before Java 15, writing a 5-line JSON payload or SQL query in Java was torture.
          You had to escape every double quote (<code className="text-rose-300 font-mono">\"name\"</code>), append <code className="text-rose-300 font-mono">\n</code>, and chain lines with plus signs (<code className="text-rose-300 font-mono">+</code>).
          Java 15 introduced <strong>Text Blocks</strong> with triple double-quotes (<code className="text-purple-300 font-mono">"""</code>), letting you copy and paste raw SQL, HTML, or JSON straight into your Java editor!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <span>🚫</span>
              <span>The Legacy Clutter</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Old way: <code className="text-slate-300">{`"{\\n" + " \\"id\\": 1\\n" + "}"`}</code>. Hard to read, easy to mess up, and diffs look ugly in Git code reviews.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
              <span>✨</span>
              <span>The Text Block Way</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enclose with <code className="text-purple-300 font-mono">"""</code>. Double quotes inside do <strong>not</strong> need escaping. Newlines are preserved naturally.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span>⚠️</span>
              <span>The Line Break Rule</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The opening <code className="text-purple-300 font-mono">"""</code> <strong>MUST</strong> be followed immediately by a line break! You cannot put content on the same line as the opening triple-quotes.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-purple-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Essential Syntax Rules:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Compile-time Type:</strong> At runtime, a text block is compiled as a standard <code className="text-sky-300">java.lang.String</code> instance—it is 100% compatible with existing String methods!</li>
            <li><strong>Quotes Inside:</strong> You can write <code className="text-slate-300">"hello"</code> inside a text block without any backslash escaping. Only triple quotes need escaping (<code className="text-slate-300">\"""</code>).</li>
            <li><strong>Line Continuation:</strong> Adding a trailing backslash (<code className="text-purple-300 font-mono">\</code>) at the end of a line suppresses the newline character, keeping content on a single line!</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={textBlocksDemoCode}
          title="ModernJavaTextBlocksDemo.java"
          highlightLines={[7, 14, 15, 21, 22, 23, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Text Blocks FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 9: Modern Text Blocks"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic9_text_blocks_note.txt"
        />
      </section>

      <Teacher
        note="Text blocks are one of the most beloved modern Java features! You can paste raw JSON or SQL straight into Java source code without escaping quotes or adding '+' signs! — Sukanta Hui"
      />
    </div>
  );
}