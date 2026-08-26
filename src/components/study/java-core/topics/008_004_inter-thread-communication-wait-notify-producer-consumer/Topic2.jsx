import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whyDemoCode from "./topic2_files/WhyWaitNotifyInObjectNotThreadDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            OOP Design Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Why <code className="text-emerald-400 font-mono">wait()</code> &amp; <code className="text-sky-400 font-mono">notify()</code> Belong to <code className="text-purple-400 font-mono">java.lang.Object</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Uncover JVM architectural design decisions: analyzing why intrinsic locks and Wait Sets belong to heap objects rather than thread execution stacks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={whyDemoCode}
          title="WhyWaitNotifyInObjectNotThreadDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Why wait/notify in Object FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 2: Why wait/notify are in Object"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic2_why_wait_notify_in_object_note.txt"
        />
      </section>

      <Teacher
        note="This is one of the all-time favorite Java interview questions! The answer is simple: 'Locks belong to objects, not threads! If a thread holds 3 different locks, calling objA.wait() tells Java exactly which lock to release!' — Sukanta Hui"
      />
    </div>
  );
}