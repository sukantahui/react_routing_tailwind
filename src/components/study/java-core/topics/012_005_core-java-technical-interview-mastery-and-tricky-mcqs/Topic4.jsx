import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/TrickyRiddle5IntegerCacheEqualityDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 012_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Interview Mastery &amp; Tricky MCQs
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Tricky Riddle 5: <code className="text-emerald-400 font-mono">Integer Cache Equality (-128 to 127)</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Flyweight caching: understanding why Integer.valueOf(100) == Integer.valueOf(100) is true, but Integer.valueOf(200) == Integer.valueOf(200) is false!
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="TrickyRiddle5IntegerCacheEqualityDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Interview Riddles &amp; MCQs FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 012_005 Topic 4: Tricky Riddle 5 - Integer Cache Equality"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="012_005_topic4_tricky_riddle_5_integer_cache_equality_note.txt"
        />
      </section>

      <Teacher
        note="Autoboxing uses Integer.valueOf() under the hood! Java caches Integer objects in the range -128 to 127. So == works for 100, but fails for 200 because 200 creates two separate heap objects! Always use .equals() for objects! — Sukanta Hui"
      />
    </div>
  );
}
