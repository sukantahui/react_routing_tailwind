import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dnpDemoCode from "./topic10_files/ClassicDiningPhilosophersDeadlockDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_005 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Dining Philosophers
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Classic Concurrency Simulation: The <code className="text-purple-400 font-mono">Dining Philosophers</code> Problem
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Simulate Dijkstra&apos;s classical dilemma: demonstrating circular chopstick starvation deadlocks and implementing asymmetric resource numbering to restore continuous dining progress.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={dnpDemoCode}
          title="ClassicDiningPhilosophersDeadlockDemo.java"
          highlightLines={[7, 10, 13, 14, 19, 20, 26, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Dining Philosophers FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_005 Topic 10: Dining Philosophers Simulation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_005_topic10_dining_philosophers_simulation_note.txt"
        />
      </section>

      <Teacher
        note="The Dining Philosophers is Dijkstra's timeless thought experiment that explains every multi-lock system on earth! If all 5 philosophers grab their left chopstick at the same second, everyone starves! The solution is simply numbering chopsticks and grabbing the smaller one first! — Sukanta Hui"
      />
    </div>
  );
}