import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import growthDemoCode from "./topic4_files/BufferCapacityAndGrowthFormulaDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Buffer Growth Formula
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Internal Buffer Mechanics: Initial Capacity (16) &amp; Growth Formula <code className="text-emerald-400 font-mono">(old * 2) + 2</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal buffer mechanics: default 16-character allocations, dynamic array resizing, and why pre-sizing buffers eliminates memory copying overhead.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Under the Hood Architecture</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              How StringBuilder Grows When It Runs Out of Space
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Inside every <code className="text-emerald-300 font-mono">StringBuilder</code> is a plain old array.
          When you invoke <code className="text-sky-300 font-mono">new StringBuilder()</code> with no arguments, Java creates an internal array with an initial capacity of exactly <strong>16 characters</strong>.
          What happens when you append your 17th character? The array is full! It must resize dynamically using a specific mathematical formula.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertCircle size={16} />
              <span>The Dynamic Growth Math</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              New capacity formula: <code className="text-emerald-300 font-mono">(oldCapacity * 2) + 2</code>.<br />
              Progression: <strong>16 &rarr; 34 &rarr; 70 &rarr; 142 &rarr; 286</strong> slots. Java doubles plus two so capacity never stalls.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Lightbulb size={16} />
              <span>The Suitcase Analogy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When your 16-slot suitcase is full, you can't stretch the fabric. You buy a 34-slot suitcase, move all 16 items over using <code className="text-sky-300">System.arraycopy</code>, and discard the old suitcase!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 size={16} />
              <span>Assistant Rule of Thumb</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pre-size your builders! If you know you're building an HTML table or JSON body of roughly 1,000 characters, write <code className="text-emerald-300 font-mono">new StringBuilder(1024)</code> to avoid 6 costly array copy operations.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-teal-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Key Concepts You Need to Remember:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Length vs Capacity:</strong> <code className="text-sky-300">sb.length()</code> is the number of characters currently written. <code className="text-emerald-300">sb.capacity()</code> is the total slots available in the internal buffer array.</li>
            <li><strong>String Constructor Capacity:</strong> If you pass an initial string like <code className="text-slate-200">new StringBuilder("hello")</code>, initial capacity is <code className="text-emerald-300">"hello".length() + 16 = 21</code>.</li>
            <li><strong>trimToSize():</strong> Shrinks the internal buffer array down to match <code className="text-sky-300">length()</code> if you need to reclaim unused heap memory after large builder tasks.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={growthDemoCode}
          title="BufferCapacityAndGrowthFormulaDemo.java"
          highlightLines={[7, 15, 17, 21, 27, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Buffer Growth FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 4: Buffer Growth Formula"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic4_buffer_growth_note.txt"
        />
      </section>

      <Teacher
        note="If you know your string is going to be 500 characters long, initialize it as 'new StringBuilder(500)'! That stops Java from constantly resizing and copying the internal array 6 times. — Sukanta Hui"
      />
    </div>
  );
}