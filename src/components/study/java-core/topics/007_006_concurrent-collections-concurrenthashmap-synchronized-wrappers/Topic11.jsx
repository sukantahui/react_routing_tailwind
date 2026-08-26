import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cwsDemoCode from "./topic11_files/CopyOnWriteArraySetDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_006 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            CopyOnWriteArraySet
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">CopyOnWriteArraySet</code>: Thread-Safe Sets for Observer Registries
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct concurrent observer sets: utilizing <code className="text-emerald-300 font-mono">CopyOnWriteArraySet</code> for lock-free snapshot iterations and atomic duplicate rejection.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cwsDemoCode}
          title="CopyOnWriteArraySetDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 25, 26, 29, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="CopyOnWriteArraySet FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_006 Topic 11: CopyOnWriteArraySet"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_006_topic11_copy_on_write_arrayset_note.txt"
        />
      </section>

      <Teacher
        note="When building an event publisher or SMS alert system where thousands of threads trigger events and occasionally add subscribers, CopyOnWriteArraySet guarantees 100% thread safety with zero locking during event firing! — Sukanta Hui"
      />
    </div>
  );
}