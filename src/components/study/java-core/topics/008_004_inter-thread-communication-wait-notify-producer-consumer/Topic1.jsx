import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sigDemoCode from "./topic1_files/ObjectSignalingApiOverviewDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Object Signaling API
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.lang.Object</code> Signaling API: <code className="text-sky-400 font-mono">wait()</code>, <code className="text-amber-400 font-mono">notify()</code> &amp; <code className="text-purple-400 font-mono">notifyAll()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Survey the core signaling suite: reviewing method signatures, exception contracts, state transitions, and lock ownership prerequisites across <code className="text-emerald-300 font-mono">wait()</code> and <code className="text-purple-300 font-mono">notifyAll()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={sigDemoCode}
          title="ObjectSignalingApiOverviewDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 17, 18, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Object Signaling API FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 1: Object Signaling API"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic1_object_signaling_api_note.txt"
        />
      </section>

      <Teacher
        note="Every single object in Java inherits wait(), notify(), and notifyAll() from java.lang.Object! Notice that wait() throws InterruptedException because waiting threads can be interrupted, while notify() does not! — Sukanta Hui"
      />
    </div>
  );
}