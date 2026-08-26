import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import spuDemoCode from "./topic8_files/SpuriousWakeupsMechanismDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 8
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Spurious Wakeups
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-purple-400 font-mono">Spurious Wakeups</code>: POSIX Kernel Realities &amp; Spontaneous Wakeups
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Examine low-level OS threading quirks: discovering why POSIX kernel condition variables wake threads spontaneously and understanding the mandatory architectural defense.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={spuDemoCode}
          title="SpuriousWakeupsMechanismDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 26, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Spurious Wakeups FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 8: Spurious Wakeups"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic8_spurious_wakeups_note.txt"
        />
      </section>

      <Teacher
        note="Sometimes the operating system wakes up a sleeping thread for no reason at all (a Spurious Wakeup)! If you used an 'if' statement, your thread would wake up and read corrupt data! But if you used a 'while' loop, your thread sees that data isn't ready and goes right back to sleep! — Sukanta Hui"
      />
    </div>
  );
}