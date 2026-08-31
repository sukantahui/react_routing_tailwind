import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cbrDemoCode from "./topic8_files/CyclicBarrierRendezvousDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_008 · Topic 8
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            CyclicBarrier
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Concurrency Synchronizers: <code className="text-purple-400 font-mono">CyclicBarrier</code> Rendezvous Points
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master reusable barriers: establishing rendezvous checkpoints with <code className="text-purple-300 font-mono">CyclicBarrier</code>, executing aggregate barrier actions, and cycling multi-phase parallel pipelines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cbrDemoCode}
          title="CyclicBarrierRendezvousDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="CyclicBarrier FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_008 Topic 8: CyclicBarrier Rendezvous"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_008_topic8_cyclicbarrier_rendezvous_note.txt"
        />
      </section>

      <Teacher
        note="CyclicBarrier is like a group of friends meeting at Naihati station before boarding the train: Nobody boards alone; everyone waits at the platform (barrier.await()) until all friends arrive, and then they all board together! And tomorrow they can do it all over again because it resets automatically! — Sukanta Hui"
      />
    </div>
  );
}