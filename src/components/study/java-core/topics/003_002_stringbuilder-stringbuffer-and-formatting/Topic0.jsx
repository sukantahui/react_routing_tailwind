import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whySbDemoCode from "./topic0_files/WhyStringBuildersAreEssentialDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Buffer Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Mutable String Builders Are Essential: Avoiding Heap Garbage
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why high-throughput backend applications replace immutable string concatenation with mutable internal buffers: eliminating GC churn and memory thrashing.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• Core Concept Breakdown</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              Why We Can't Just Use the '+' Operator in Loops
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Welcome to Module 003_002! As your personal assistant, let me share the big picture before you touch the code:
          Java <code className="text-sky-300 font-mono">String</code> objects are strictly <strong>immutable</strong>.
          Every time you write <code className="text-rose-300 font-mono">str += "item"</code>, Java cannot modify the existing text in place.
          Instead, it creates a whole new object in Heap memory, copies the old characters, appends the new ones, and abandons the old object.
          Doing this in a loop creates an avalanche of short-lived garbage objects that slows down or crashes real-world servers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertCircle size={16} />
              <span>The O(N²) Trap</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Concatenating inside a 10,000-iteration loop creates 10,000 intermediate objects and copies roughly 50 million characters. Your CPU spends more time running garbage collection than real work!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Lightbulb size={16} />
              <span>The Whiteboard Analogy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard <code className="text-sky-300">String</code> is like a printed sheet of paper—to add a sentence, you must reprint the entire sheet. <code className="text-emerald-300">StringBuilder</code> is an erasable whiteboard where you write and edit on the same surface!
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 size={16} />
              <span>Assistant Rule of Thumb</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use standard <code className="text-sky-300">String</code> for fixed values, constants, and 1-line messages. For any loop or multi-step text assembly, always use <code className="text-emerald-300">StringBuilder</code>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Key Concepts You Need to Remember:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Mutable Buffer:</strong> <code className="text-emerald-300">StringBuilder</code> manages an internal resizable array that updates in place without allocating new Heap references.</li>
            <li><strong>Zero Memory Thrashing:</strong> Single-buffer accumulation transforms <code className="text-rose-400">O(N²)</code> time complexity into blazing fast <code className="text-emerald-400">O(N)</code> linear throughput.</li>
            <li><strong>Garbage Collection Relief:</strong> Eliminates millions of intermediate throwaway objects, keeping the JVM young generation clean and latency predictable.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={whySbDemoCode}
          title="WhyStringBuildersAreEssentialDemo.java"
          highlightLines={[7, 13, 14, 15, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Mutable String Builders FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 0: Mutable String Builders"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic0_why_stringbuilder_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you are building a string with more than 3 steps, always switch to StringBuilder! It modifies its internal array directly without creating temporary junk objects on the Heap. — Sukanta Hui"
      />
    </div>
  );
}