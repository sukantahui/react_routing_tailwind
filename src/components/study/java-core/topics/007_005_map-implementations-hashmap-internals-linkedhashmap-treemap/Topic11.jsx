import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import untDemoCode from "./topic11_files/HashMapUntreeificationThresholdDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 11
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Untreeification &amp; Hysteresis
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Untreeification: <code className="text-amber-400 font-mono">UNTREEIFY_THRESHOLD (6)</code> &amp; Hysteresis Stabilization
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand algorithmic hysteresis: exploring why HashMap requires a 2-element gap between treeification (<code className="text-emerald-300 font-mono">8</code>) and untreeification (<code className="text-amber-300 font-mono">6</code>) to eliminate thrashing.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={untDemoCode}
          title="HashMapUntreeificationThresholdDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 18, 19, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Untreeification FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 11: Untreeification Threshold"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic11_untreeification_threshold_note.txt"
        />
      </section>

      <Teacher
        note="In electronics and computer science, 'hysteresis' means leaving a buffer zone to prevent rapid toggling! The gap between 8 and 6 ensures Java doesn't convert a tree to a list and back to a tree on every single add and remove! — Sukanta Hui"
      />
    </div>
  );
}