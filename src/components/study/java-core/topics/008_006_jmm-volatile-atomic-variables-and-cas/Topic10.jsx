import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import casDemoCode from "./topic10_files/HardwareCompareAndSwapCasDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_006 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Hardware CAS
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Hardware <code className="text-purple-400 font-mono">CAS (Compare-And-Swap)</code>: The Engine of Lock-Free Concurrency
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dive into hardware silicon atomicity: exploring the <code className="text-purple-300 font-mono">LOCK CMPXCHG</code> CPU instruction, optimistic lock-free retry loops, and the mechanics of <code className="text-emerald-300 font-mono">compareAndSet()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={casDemoCode}
          title="HardwareCompareAndSwapCasDemo.java"
          highlightLines={[7, 10, 13, 14, 19, 20, 24, 25, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Hardware CAS FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_006 Topic 10: Hardware CAS"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_006_topic10_hardware_cas_note.txt"
        />
      </section>

      <Teacher
        note="CAS is optimistic locking built directly into the CPU processor! Instead of locking the door before entering, a thread does its calculation and asks the CPU: 'Has anyone changed this number since I looked at it? If not, save my new number!' If someone changed it, the thread just retries! Zero locking, pure speed! — Sukanta Hui"
      />
    </div>
  );
}