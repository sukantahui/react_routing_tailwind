import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import compTableDemoCode from "./topic3_files/StringVsBuilderVsBufferComparisonDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 3
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Mastery Matrix
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comparison Table: <code className="text-sky-400 font-mono">String</code> vs <code className="text-emerald-400 font-mono">StringBuilder</code> vs <code className="text-amber-400 font-mono">StringBuffer</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete feature matrix: mutability, thread-safety, heap footprint, and performance trade-offs across Java's three textual representations.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Complete Decision Matrix</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Which String Tool Should You Use? (The Golden Rules)
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Interviewers and senior architects constantly evaluate candidates on knowing exactly when to use each of Java's three textual classes.
          Here is how to think about them with zero confusion:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-sky-500/30 bg-slate-900/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <span>📄</span>
              <span>1. java.lang.String</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Immutable &amp; Thread-Safe.</strong> Stored and pooled in the String Constant Pool (SCP). Use for unchanging text, map keys, entity IDs, and method parameters.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-slate-900/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span>⚡</span>
              <span>2. java.lang.StringBuilder</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Mutable &amp; Fast.</strong> Not synchronized. 99% of all text assembly, loops, JSON formatting, and SQL query generation should use this.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-slate-900/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>🔒</span>
              <span>3. java.lang.StringBuffer</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Mutable &amp; Synchronized.</strong> Thread-safe through method locks. Slower due to locking overhead. Reserved for multi-threaded shared buffers.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-sky-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Assistant Summary Checklist:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-400 text-xs">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-sky-300 font-bold block mb-1">String</span>
              • Thread-safe: YES<br/>• Modifiable: NO<br/>• Storage: Heap / SCP<br/>• Speed: Slow for changes
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-emerald-300 font-bold block mb-1">StringBuilder</span>
              • Thread-safe: NO<br/>• Modifiable: YES<br/>• Storage: Heap only<br/>• Speed: Maximum
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-amber-300 font-bold block mb-1">StringBuffer</span>
              • Thread-safe: YES<br/>• Modifiable: YES<br/>• Storage: Heap only<br/>• Speed: Moderate
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={compTableDemoCode}
          title="StringVsBuilderVsBufferComparisonDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Comparison Matrix FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 3: String Comparison Table"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic3_comparison_matrix_note.txt"
        />
      </section>

      <Teacher
        note="If it never changes, use String. If you are constructing it inside a single method, use StringBuilder. If 10 threads are writing to it at once, use StringBuffer! — Sukanta Hui"
      />
    </div>
  );
}