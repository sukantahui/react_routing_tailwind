import React from "react";
import clsx from "clsx";
import { Bot, Sparkles, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import methodsDemoCode from "./topic5_files/StringBuilderMethodsMasteryDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="mt-6 space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen rounded-2xl border border-slate-800/60">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_002 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Buffer Manipulation API
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">StringBuilder</code> Core Methods: <code className="text-emerald-400 font-mono">append()</code>, <code className="text-sky-400 font-mono">insert()</code> &amp; <code className="text-amber-400 font-mono">reverse()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete in-place buffer manipulation API: inserting at offsets, slicing with <code className="text-rose-300 font-mono">delete()</code>, character replacement, and instant palindromic reversal.
        </p>
      </header>

      {/* ================= PERSONAL ASSISTANT GUIDE SECTION ================= */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Personal Assistant Guide
              </span>
              <span className="text-xs text-slate-500">• In-Place Text Surgery</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              The 5 Core Tools for Manipulating Strings In-Place
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Think of <code className="text-emerald-300 font-mono">StringBuilder</code> as a live text editor in memory.
          Unlike <code className="text-sky-300 font-mono">String</code>, where every edit forces a new object, these methods operate directly on the existing character array without creating a single extra String in Heap memory:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <span>➕</span>
              <span>append() &amp; insert()</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-emerald-300 font-mono">append(val)</code> adds to the end. <code className="text-sky-300 font-mono">insert(offset, val)</code> shifts characters right and squeezes content into the middle.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <span>✂️</span>
              <span>delete() &amp; deleteCharAt()</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-rose-300 font-mono">delete(start, end)</code> removes a range (end is exclusive). <code className="text-rose-300 font-mono">deleteCharAt(idx)</code> removes a single target character.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>🔄</span>
              <span>reverse() &amp; replace()</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-amber-300 font-mono">reverse()</code> flips characters in-place (ideal for palindrome problems!). <code className="text-amber-300 font-mono">replace(s, e, str)</code> swaps an exact range.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs md:text-sm text-slate-300">
          <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Assistant Memory Keys:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400 pl-1">
            <li><strong>Exclusive End Indices:</strong> In <code className="text-emerald-300">delete(start, end)</code> and <code className="text-emerald-300">replace(start, end, str)</code>, the <code className="text-amber-300 font-mono">end</code> index is always exclusive!</li>
            <li><strong>Zero Allocation Reverse:</strong> <code className="text-emerald-300 font-mono">sb.reverse()</code> swaps indices from opposite ends with zero additional memory overhead.</li>
            <li><strong>Direct Mutator:</strong> No need to re-assign (<code className="text-rose-300 font-mono">sb = sb.append("x")</code> is redundant; just call <code className="text-emerald-300 font-mono">sb.append("x")</code> directly).</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={methodsDemoCode}
          title="StringBuilderMethodsMasteryDemo.java"
          highlightLines={[7, 15, 19, 23, 27, 31, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="StringBuilder Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_002 Topic 5: StringBuilder Core Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_002_topic5_sb_methods_note.txt"
        />
      </section>

      <Teacher
        note="Notice how all these methods modify the SAME buffer in RAM and return 'this'! That lets you chain them together in 1 elegant sentence. — Sukanta Hui"
      />
    </div>
  );
}