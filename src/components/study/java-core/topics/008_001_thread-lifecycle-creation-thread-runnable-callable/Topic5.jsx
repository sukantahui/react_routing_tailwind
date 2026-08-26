import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bnwDemoCode from "./topic5_files/BlockedAndWaitingStatesDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            BLOCKED &amp; WAITING
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Thread Lifecycle: <code className="text-rose-400 font-mono">BLOCKED</code> (Monitor Lock) vs <code className="text-purple-400 font-mono">WAITING</code> (Indefinite Wait)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect synchronization pauses: distinguishing active lock contention (<code className="text-rose-300 font-mono">BLOCKED</code>) from passive indefinite inter-thread signaling (<code className="text-purple-300 font-mono">WAITING</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bnwDemoCode}
          title="BlockedAndWaitingStatesDemo.java"
          highlightLines={[7, 10, 16, 17, 24, 25, 34, 35, 41, 42, 48, 49]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="BLOCKED vs WAITING FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 5: BLOCKED and WAITING States"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic5_blocked_and_waiting_states_note.txt"
        />
      </section>

      <Teacher
        note="BLOCKED means you are standing outside a locked bathroom door trying to turn the handle (waiting for a synchronized lock). WAITING means you sat down in the waiting room and asked someone to tap your shoulder when the meeting starts (Object.wait)! — Sukanta Hui"
      />
    </div>
  );
}