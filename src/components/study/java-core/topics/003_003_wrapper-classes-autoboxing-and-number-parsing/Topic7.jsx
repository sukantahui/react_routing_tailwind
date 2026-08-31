import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import otherCacheDemoCode from "./topic7_files/OtherWrapperCachingMechanicsDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Cache Landscape
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Caching in Other Wrappers: <code className="text-sky-400 font-mono">Byte</code>, <code className="text-emerald-400 font-mono">Character</code> &amp; <code className="text-amber-400 font-mono">Boolean</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Survey caching mechanisms across the entire wrapper family: ASCII character pooling, byte caching, and why <code className="text-rose-400 font-mono">Float</code> and <code className="text-rose-400 font-mono">Double</code> never cache instances.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={otherCacheDemoCode}
          title="OtherWrapperCachingMechanicsDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 19, 20, 21, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Wrapper Caching FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 7: Wrapper Caching Landscape"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic7_other_caching_note.txt"
        />
      </section>

      <Teacher
        note="Byte caches all 256 possible byte values, while Float and Double have zero caching because of infinite fractions! — Sukanta Hui"
      />
    </div>
  );
}