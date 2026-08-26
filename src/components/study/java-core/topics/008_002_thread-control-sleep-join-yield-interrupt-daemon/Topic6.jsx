import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import intDemoCode from "./topic6_files/ThreadInterruptTriadMethodsDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Interrupt Triad API
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Interrupt API: <code className="text-emerald-400 font-mono">interrupt()</code>, <code className="text-sky-400 font-mono">isInterrupted()</code> &amp; static <code className="text-amber-400 font-mono">Thread.interrupted()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect the 3-method cancellation suite: understanding signal dispatching (<code className="text-emerald-300 font-mono">t.interrupt()</code>), non-clearing status inspection (<code className="text-sky-300 font-mono">t.isInterrupted()</code>), and static flag-clearing queries (<code className="text-amber-300 font-mono">Thread.interrupted()</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={intDemoCode}
          title="ThreadInterruptTriadMethodsDemo.java"
          highlightLines={[7, 10, 19, 20, 21, 31, 32, 35, 36, 42, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Interrupt Triad FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 6: The 3 Interrupt Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic6_interrupt_triad_methods_note.txt"
        />
      </section>

      <Teacher
        note="Be careful with static 'Thread.interrupted()'! It checks the flag AND resets it back to false! If you just want to check the flag without changing it, use the instance method 'thread.isInterrupted()' instead! — Sukanta Hui"
      />
    </div>
  );
}