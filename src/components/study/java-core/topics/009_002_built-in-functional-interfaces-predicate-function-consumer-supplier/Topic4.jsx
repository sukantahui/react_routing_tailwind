import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cseDemoCode from "./topic4_files/ConsumerSideEffectsDeepDiveDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Consumer&lt;T&gt;
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Consumer&lt;T&gt;</code>: Executing Side-Effects &amp; Pipeline Iteration
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Execute void side-effects: applying <code className="text-emerald-300 font-mono">Consumer&lt;T&gt;</code> <code className="text-sky-300 font-mono">void accept(T t)</code> methods for logging, console printing, and chaining with <code className="text-purple-300 font-mono">andThen()</code> in <code className="text-emerald-300 font-mono">forEach()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cseDemoCode}
          title="ConsumerSideEffectsDeepDiveDemo.java"
          highlightLines={[7, 10, 19, 20, 22, 23, 25, 26, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Consumer<T> FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 4: Consumer<T> Deep Dive"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic4_consumer_deep_dive_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you call 'list.forEach(item -> ...)', you are passing a Consumer! A Consumer is a hungry black hole: you give it data, it performs an action (prints, saves, emails), and returns nothing back! — Sukanta Hui"
      />
    </div>
  );
}