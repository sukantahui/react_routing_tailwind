import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nfaDemoCode from "./topic7_files/HowNotifyAllWakesAllWaitersDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_004 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            notifyAll() Broadcast
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          How <code className="text-emerald-400 font-mono">notifyAll()</code> Works: Broadcast Signaling &amp; Deadlock Prevention
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master broadcast notifications: understanding mass Wait-Set to Entry-Set migration, sequential lock contention, and the total elimination of missed-signal deadlocks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={nfaDemoCode}
          title="HowNotifyAllWakesAllWaitersDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 35, 36, 37, 43, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="notifyAll() Broadcast FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_004 Topic 7: How notifyAll() Works"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_004_topic7_how_notifyall_works_note.txt"
        />
      </section>

      <Teacher
        note="'notifyAll()' is like ringing the school bell—it alerts every single student in the building! Each student then checks their own class schedule and enters their room safely! Always prefer notifyAll()! — Sukanta Hui"
      />
    </div>
  );
}