import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bfcDemoCode from "./topic1_files/BigFourCoreInterfacesOverviewDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            The Big 4 Core
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Big 4 Core Interfaces: <code className="text-emerald-400 font-mono">Predicate</code>, <code className="text-sky-400 font-mono">Function</code>, <code className="text-purple-400 font-mono">Consumer</code> &amp; <code className="text-amber-400 font-mono">Supplier</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the four foundational pillars of modern Java: comparing condition testers, transformative mappers, side-effect consumers, and lazy factory suppliers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bfcDemoCode}
          title="BigFourCoreInterfacesOverviewDemo.java"
          highlightLines={[7, 8, 9, 10, 19, 20, 22, 23, 25, 26, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Big 4 Interfaces FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 1: The Big 4 Core Interfaces"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic1_big_four_core_interfaces_note.txt"
        />
      </section>

      <Teacher
        note="Memorize the Big 4 by their verbs: Predicate TESTS (yes/no), Function TRANSFORMS (A into B), Consumer ACCEPTS (eats data without returning anything), and Supplier GIVES (supplies data out of thin air)! — Sukanta Hui"
      />
    </div>
  );
}