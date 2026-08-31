import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import c2hDemoCode from "./topic5_files/Coffman2HoldAndWaitDeepDiveDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 5
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Coffman 2: Hold &amp; Wait
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Coffman Condition 2: <code className="text-purple-400 font-mono">Hold and Wait</code> (Nested Lock Acquisition)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect nested lock hazards: analyzing how holding onto initial locks while requesting subsequent resources creates deadlocks and exploring all-or-nothing acquisition strategies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={c2hDemoCode}
          title="Coffman2HoldAndWaitDeepDiveDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Hold and Wait FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 5: Hold and Wait"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic5_hold_and_wait_note.txt"
        />
      </section>

      <Teacher
        note="'Hold and Wait' is like holding the only printer in the office with your left hand while waiting in line to grab the only stapler with your right hand! If someone else has the stapler and is waiting for your printer, nobody works! — Sukanta Hui"
      />
    </div>
  );
}