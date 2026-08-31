import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bswDemoCode from "./topic0_files/BusyWaitingVsInterThreadCommDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 0
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Busy-Waiting Anti-Pattern
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Inter-Thread Communication is Needed: Avoiding <code className="text-rose-400 font-mono">Busy Waiting</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze CPU efficiency: demonstrating how spin-polling loops burn millions of wasted processor cycles and why active inter-thread signaling (<code className="text-emerald-300 font-mono">wait()</code>/<code className="text-sky-300 font-mono">notify()</code>) delivers 0% idle CPU overhead.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bswDemoCode}
          title="BusyWaitingVsInterThreadCommDemo.java"
          highlightLines={[7, 10, 18, 19, 20, 21, 29, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Busy Waiting FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 0: Avoiding Busy Waiting"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic0_avoiding_busy_waiting_note.txt"
        />
      </section>

      <Teacher
        note="Imagine sitting at home checking your mailbox every 2 seconds for a letter—that is Busy Waiting, and you will exhaust yourself! Inter-Thread Communication is like the postman ringing your doorbell when the letter arrives: you sleep peacefully until the bell rings! — Sukanta Hui"
      />
    </div>
  );
}