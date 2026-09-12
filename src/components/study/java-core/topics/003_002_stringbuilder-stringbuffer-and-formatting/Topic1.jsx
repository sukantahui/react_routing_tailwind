import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sbFoundationsDemoCode from "./topic1_files/StringBuilderFoundationsDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            High-Performance Mutable Buffer
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.lang.StringBuilder</code>: Un-synchronized Performance &amp; Usage
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the standard high-performance string builder in Java: buffer allocations, method chaining, and unsynchronized speed optimizations introduced in Java 5.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Single-Threaded Speed Demon</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Meet StringBuilder: Your Everyday High-Speed Workhorse
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Here is the direct truth: Over <strong>99% of string construction in real applications happens within a single method on a single thread</strong>.
          Before Java 5, developers were forced to use <code className="text-amber-300 font-mono">StringBuffer</code>, which acquired costly synchronization locks on every single call.
          Java 5 introduced <code className="text-emerald-300 font-mono">StringBuilder</code> as a drop-in replacement with all locks completely stripped away, delivering maximum CPU throughput.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertCircle size={16} />
              <span>The Synchronization Tax</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Locking an object that only one thread ever touches wastes millions of CPU cycles on monitor checks and memory barriers. Removing them makes operations up to 3x faster!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Lightbulb size={16} />
              <span>Personal Notebook Analogy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Writing in your personal diary at your private desk doesn't need a security guard checking credentials before every pencil stroke. That friction-free private desk is <code className="text-emerald-300">StringBuilder</code>!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 size={16} />
              <span>Assistant Rule of Thumb</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unless a variable is explicitly shared across multiple concurrent background threads, <code className="text-emerald-300">StringBuilder</code> should be your default choice 100% of the time.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Key Concepts You Need to Remember:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Drop-in API:</strong> Has the exact same method signatures as <code className="text-amber-300">StringBuffer</code> (<code className="text-emerald-300">append</code>, <code className="text-emerald-300">insert</code>, <code className="text-emerald-300">delete</code>, <code className="text-emerald-300">reverse</code>).</li>
            <li><strong>Thread Unsafe by Design:</strong> Not synchronized—do not share a single instance across concurrent threads without external locking.</li>
            <li><strong>Compiler Default:</strong> When you write <code className="text-slate-200">"a" + "b"</code> with variables in modern Java, the compiler automatically generates <code className="text-emerald-300">StringBuilder</code> or <code className="text-sky-300">StringConcatFactory</code> behind the scenes!</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sbFoundationsDemoCode}
          title="StringBuilderFoundationsDemo.java"
          highlightLines={[7, 15, 18, 19, 23, 24, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="StringBuilder FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 1: StringBuilder Usage"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic1_stringbuilder_note.txt"
        />
      </section>

      <Teacher
        note="Unless multiple background threads are writing to the exact same buffer at the same microsecond, always use StringBuilder! It is much faster than the legacy StringBuffer. — Sukanta Hui"
      />
    </div>
  );
}