import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import overDemoCode from "./topic4_files/OverridingThrowsRulesDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_003 · Topic 4
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Polymorphic Contract
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Method Overriding Rules with <code className="text-amber-400 font-mono">throws</code> (Liskov Substitution Principle)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master polymorphic exception contracts: learning why child methods cannot throw broader checked exceptions and how to narrow exception signatures cleanly.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={overDemoCode}
          title="OverridingThrowsRulesDemo.java"
          highlightLines={[7, 10, 15, 17, 23, 25, 31, 33, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Overriding Throws FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_003 Topic 4: Overriding Throws Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_003_topic4_overriding_throws_rules_note.txt"
        />
      </section>

      <Teacher
        note="If a parent method promises to throw only IOException, the child cannot suddenly throw Exception! Otherwise, polymorphism would break for anyone holding a parent reference! — Sukanta Hui"
      />
    </div>
  );
}